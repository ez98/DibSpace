import React from 'react'
import fetch from 'serpens/fetch'
// import { dispatch } from 'serpens'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { notification } from 'antd'
import { getToken } from './token'
import wrapRefreshToken from './refreshToken'

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export function reRequest(url, options) {
	const defaultOptions = {}
	const newOptions = { ...defaultOptions, ...options }
	newOptions.headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json; charset=utf-8',
		...newOptions.headers,
	}
	const token = getToken()
	if (token) {
		newOptions.headers.Authorization = `Bearer ${token}`
	}
	newOptions.body = JSON.stringify(newOptions.body)

	// const hasSignal = 'signal' in new Request('')
	// console.log('hasSignal: ', hasSignal)

	return fetch(url, newOptions)
		.then(handleFetchSuccess, handleFetchFail)
		.then(checkStatus)
		.catch(e => {
			// eslint-disable-next-line
			// 			console.error(`
			// status: ${e.status},
			// url: ${e.url},
			// message: ${JSON.stringify(e.data)}`)
			throw e
		})
}

const checkStatus = res => {
	const block = res
	const { status } = block
	if (status >= 200 && status < 300) {
		block.code = 1
	} else if (status === 400 || status === 404) {
		block.code = 0
		throw block
	} else if (status === 401) {
		// let currentPathName = '/'
		// const { url } = res

		// if (
		// 	/bootes\/passport\/captcha/.test(url) ||
		// 	/bootes\/passport\/security-tokens/.test(url)
		// ) {
		// 	block.code = 0
		// 	throw block
		// }

		// if (!/user\/login/.test(window.location)) {
		// 	currentPathName = window.location.hash.replace('#', '')
		// }

		// dispatch({
		// 	type: 'login/logout',
		// 	payload: currentPathName,
		// })
		block.code = 0
		throw block
	} else {
		block.code = -1
		showErrorNotification(block)
		throw block
	}
	return block
}

const handleFetchSuccess = async response => {
	const { status } = response
	const block = {
		status,
		url: response.url,
	}
	const contentType = response.headers.get('content-type')
	if (/text\/csv/.test(contentType)) {
		block.data = response.blob()
	} else if (/octets\/stream/.test(contentType)) {
		block.data = response.blob()
	} else {
		const text = await response.text()
		if (text === '') {
			block.data = text
		} else {
			try {
				block.data = JSON.parse(text)
			} catch (err) {
				block.data = text
			}
		}
	}

	// if (/application\/json/.test(contentType)) {
	// 	if (Number(contentLength) === 0) {
	// 		block.data = ''
	// 	} else {
	// 		block.data = await response.json()
	// 	}
	// } else {
	// 	block.data = await response.text()
	// }
	return block
}

const handleFetchFail = response => {
	const error = new Error()
	error.url = response.url
	error.status = -1
	throw error
}

const showErrorNotification = block => {
	const { status, url } = block
	if (status === 403) {
		return notification.error({
			icon: <ExclamationCircleOutlined style={{ color: '#f04134' }} />,
			message: '没有权限',
			description: '你没有权限执行该操作',
		})
	}
	// eslint-disable-next-line no-useless-return
	if (url && url.indexOf('/site_api/v1/api-token') > -1) return

	// const description = (
	// 	<div>
	// 		<div>错误识别码：{status}</div>
	// 		<div>{url}</div>
	// 	</div>
	// )
	// notification.error({
	// 	message: '数据接口错误',
	// 	description,
	// })
}

const request = wrapRefreshToken(reRequest)
export default request
