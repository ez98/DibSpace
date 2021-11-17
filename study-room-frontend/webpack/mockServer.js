const { existsSync, realpathSync } = require('fs')
const { resolve } = require('path')
const requireContext = require('require-context')
const assert = require('assert')
const { pathToRegexp } = require('path-to-regexp')
const bodyParser = require('body-parser')
const multer = require('multer')
const chokidar = require('chokidar')
const chalk = require('chalk')

const getMockFilePath = () => {
	let mockFilePaths = []
	const mockFolder = resolve(process.cwd(), './mock')
	if (existsSync(mockFolder)) {
		const context = requireContext(mockFolder, false, /\.[t|j]sx?$/)
		mockFilePaths = context
			.keys()
			.map(item => {
				return `${mockFolder}/${item}`
			})
			.filter(item => item && existsSync(item))
	}
	return mockFilePaths
}

const getMockConfig = filePaths => {
	return filePaths.reduce((rmemo, filePath) => {
		/* eslint global-require: 0 */
		const config = require(filePath)
		const memo = {
			...rmemo,
			...(config.default || config),
		}

		return memo
	}, {})
}

const VALID_METHODS = ['get', 'post', 'put', 'patch', 'delete']
const parseKey = key => {
	let method = 'get'
	let path = key

	if (/\s+/.test(key)) {
		const splited = key.split(/\s+/)
		if (splited[0]) {
			method = splited[0].toLowerCase()
		}
		path = splited[1] // eslint-disable-line
	}
	assert(
		VALID_METHODS.includes(method),
		`Invalid method ${method} for path ${path}, please check your mock files.`,
	)
	return {
		method,
		path,
	}
}

const BODY_PARSED_METHODS = ['post', 'put', 'patch', 'delete']
function createHandler(method, path, handler) {
	return function(req, res, next) {
		if (BODY_PARSED_METHODS.includes(method)) {
			bodyParser.json({ limit: '5mb', strict: false })(req, res, () => {
				bodyParser.urlencoded({ limit: '5mb', extended: true })(req, res, () => {
					sendData()
				})
			})
		} else {
			sendData()
		}

		function sendData() {
			if (typeof handler === 'function') {
				multer().any()(req, res, () => {
					handler(req, res, next)
				})
			} else {
				res.json(handler)
			}
		}
	}
}

const parseConfig = config => {
	return Object.keys(config).reduce((memo, key) => {
		const handler = config[key]
		const type = typeof handler
		assert(
			type === 'function' || type === 'object',
			`mock value of ${key} should be function or object, but got ${type}`,
		)
		const { method, path } = parseKey(key)

		const keys = []
		const re = pathToRegexp(path, keys, {
			// encode: encodeURI,
			// decode: decodeURIComponent,
		})
		memo.push({
			method,
			path,
			re,
			keys,
			handler: createHandler(method, path, handler),
		})
		return memo
	}, [])
}

const matchMock = (req, mockData) => {
	const { path: targetPath, method } = req
	const targetMethod = method.toLowerCase()
	for (const mock of mockData) {
		const { re, keys } = mock
		if (mock.method === targetMethod) {
			const match = re.exec(targetPath)
			if (match) {
				const params = {}
				for (let i = 1; i < match.length; i += 1) {
					const key = keys[i - 1]
					const prop = key.name
					const val = decodeURIComponent(match[i])
					// eslint-disable-next-line no-undef
					if (val !== undefined || !hasOwnProdperty.call(params, prop)) {
						params[prop] = val
					}
				}
				req.params = params
				return mock
			}
		}
	}
}

const cleanRequireCache = paths => {
	function winPath(path) {
		const isExtendedLengthPath = /^\\\\\?\\/.test(path)
		if (isExtendedLengthPath) {
			return path
		}

		return path.replace(/\\/g, '/')
	}
	Object.keys(require.cache).forEach(file => {
		if (
			paths.some(path => {
				return winPath(file).indexOf(path) > -1
			})
		) {
			delete require.cache[file]
		}
	})
}

const realApplyMock = app => {
	const mockFolder = resolve(process.cwd(), './mock')
	const watcher = chokidar.watch(mockFolder, {
		ignoreInitial: true,
	})
	watcher.on('all', async (event, file) => {
		const mockWatcherPaths = getMockFilePath()
		cleanRequireCache(mockWatcherPaths)
		// eslint-disable-next-line no-console
		console.log(chalk.green(event), file.replace(mockWatcherPaths.appDirectory, '.'))
	})
	app.use((req, res, next) => {
		try {
			const mockConfig = getMockConfig(getMockFilePath())
			const parseConfigRes = parseConfig(mockConfig)
			const match = parseConfigRes && matchMock(req, parseConfigRes)
			if (match) {
				return match.handler(req, res, next)
			} else {
				return next()
			}
		} catch (error) {
			// eslint-disable-next-line no-console
			console.log('error: ', error)
		}
		next()
	})
}

const applyMock = app => {
	try {
		realApplyMock(app)
	} catch (e) {
		const mockFolder = resolve(process.cwd(), './mock')
		const mockFilePaths = getMockFilePath()

		const watcher = chokidar.watch([mockFilePaths, mockFolder], {
			ignored: /node_modules/,
			ignoreInitial: true,
		})
		watcher.on('change', path => {
			// eslint-disable-next-line no-console
			console.log(chalk.green('CHANGED'), path.replace(realpathSync(process.cwd()), '.'))
			watcher.close()
			applyMock(app)
		})
	}
}

module.exports = applyMock
