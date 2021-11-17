/* eslint-disable no-console */
const webpack = require('webpack')
const merge = require('webpack-merge')
const BundlePlugin = require('webpack-bundle-analyzer')
const path = require('path')
const openBrowser = require('react-dev-utils/openBrowser')
const address = require('address')
const chalk = require('chalk')
const WebpackBar = require('webpackbar')
const lodash = require('lodash')
// const memwatch = require('@airbnb/node-memwatch')
const applyMock = require('./mockServer')
const common = require('./webpack.common.js')

// const origin = process.env.NOVA_ROOT.replace(/nebula/g, 'autoring')
// const origin = 'https://autoring.momenta.cn'
const origin = 'http://localhost:8000'
// const origin = 'https://vela.m56-dev.momenta.works'

// const isInteractive = process.stdout.isTTY
// memwatch.on('stats', function(info) {
// 	console.log('stats', info)
// })
// let hd
// memwatch.on('leak', function(info) {
// 	console.log('leak', info)
// 	if (!hd) {
// 		hd = new memwatch.HeapDiff()
// 	} else {
// 		const diff = hd.end()
// 		// eslint-disable-next-line no-undef
// 		console.error(util.inspect(diff, true, null))
// 		hd = null
// 	}
// })

// const clearConsole = () =>
// 	process.stdout.write(process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H')

const { BundleAnalyzerPlugin } = BundlePlugin

if (process.env.ANALYZER) {
	common.plugins.push(
		new BundleAnalyzerPlugin({
			analyzerMode: 'server',
			analyzerHost: '127.0.0.1',
			analyzerPort: 8888,
			reportFilename: 'report.html',
			defaultSizes: 'parsed',
			openAnalyzer: true,
			generateStatsFile: false,
			statsFilename: 'stats.json',
			logLevel: 'info',
		}),
	)
}

if (typeof process.env.PORT === 'undefined') {
	process.env.PORT = 8001
}
const wrapOnceApplyMock = lodash.once(applyMock)

module.exports = merge(common, {
	mode: 'development',
	// devtool: 'eval-cheap-source-map',
	devtool: 'eval-source-map',

	devServer: {
		host: '0.0.0.0',
		port: process.env.PORT,
		contentBase: path.join(__dirname, 'dist'),
		hot: true,
		headers: {
			Origin: origin,
		},
		// hotOnly: true,
		inline: true,
		watchOptions: {
			ignored: [
				'node_modules/**',
				'webpack',
				'mock',
				'build',
				'ci',
				'dist',
				'docs',
				'etc',
				'yarn.lock',
			],
			aggregateTimeout: 300,
			poll: 1000,
		},
		// overlay: false,
		overlay: {
			warnings: true,
			errors: true,
		},

		// clientLogLevel: 'none', // 阻止浏览器console消息
		noInfo: true, // 启动时和每次保存之后，那些显示的 webpack 包(bundle)的消息将被隐藏。错误和警告仍然会显示。
		proxy: {
		},
		// before(app, server) {
		// 	wrapOnceApplyMock(app)
		// },

		after(app, server, compiler) {
			// clearConsole()
			// console.log(chalk.cyan('Starting the development server...\n'))
			// const { compiler } = server
			// compiler.hooks.invalid.tap('invalid', () => {
			// 	if (isInteractive) {
			// 		clearConsole()
			// 	}
			// 	console.log('Compiling...')
			// })
			compiler.hooks.done.tap('done', () => {
				wrapOnceApplyMock(app)
			})

			// compiler.hooks.done.tap('done', () => {
			// 	wrapOnceApplyMock(app)

			// 	// if (isInteractive) {
			// 	// 	// clearConsole()
			// 	// }
			// 	console.log()
			// 	console.log(`  You can now view ${chalk.bold('VELA')} in the browser.  `)
			// 	console.log()
			// 	console.log(`  ${chalk.bold('API ROOT:')}		${process.env.NOVA_ROOT}`)
			// 	console.log(`  ${chalk.bold('Local:')}		http://localhost:${process.env.PORT}`)
			// 	console.log(
			// 		`  ${chalk.bold('On Your Network:')}	http://${address.ip()}:${process.env.PORT}`,
			// 	)
			// 	openBrowser(localAccess)
			// })
		},
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new WebpackBar({
			color: 'orange',
			name: 'Build of development',
			reporters: [
				class {
					constructor() {
						if (process) {
							process.exitCode = 1
							process.on('SIGINT', () => {
								process.exit(1)
								process.exit(1)
								// process.kill(process.pid)
							})
						}
					}

					afterAllDone() {
						console.log()
						console.log(`  You can now view ${chalk.bold('VELA')} in the browser.  `)
						console.log()
						console.log(`  ${chalk.bold('API ROOT:')}		${process.env.NOVA_ROOT}`)
						console.log(`  ${chalk.bold('Local:')}		http://localhost:${process.env.PORT}`)
						console.log(
							`  ${chalk.bold('On Your Network:')}	http://${address.ip()}:${
								process.env.PORT
							}`,
						)
						openBrowser(localAccess)
					}
				},
				'fancy', // Show Bar
				'basic', // 开始编译，编译结束总体耗时 Title 提示
				'profile', // Loader 耗时统计
				// 'stats', // 打包后资源结果展示
			],
			fancy: true,
			basic: true,
		}),
	],
	// externals: {
	// 	react: 'React',
	// 	'react-dom': 'ReactDOM',
	// },
})

const localAccess = `localhost:${process.env.PORT}`
