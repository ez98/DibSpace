import React from 'react'
import { isUrl } from 'utils/utils'
import Icon, { CameraOutlined } from '@ant-design/icons'
const createMenuData = () => {
	return [
		{
			name: '登录',
			// icon: <Icon component={securityAlarmIcon} />,
			path: 'login',
			// authority: ['page/security-alarm-display', '*'],
		},
	]
}

function formatter(data, parentPath = '/', parentAuthority) {
	return data.map(item => {
		let { path } = item
		if (!isUrl(path)) {
			path = parentPath + item.path
		}
		const result = {
			...item,
			path,
			authority: item.authority || parentAuthority,
		}
		if (item.children) {
			result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority)
		}
		return result
	})
}

export const getMenuData = () => formatter(createMenuData())
