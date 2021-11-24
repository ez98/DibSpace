import moment from 'moment'

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path, routerData) {
	let routes = Object.keys(routerData).filter(
		routePath => routePath.indexOf(path) === 0 && routePath !== path,
	)
	routes = routes.map(item => item.replace(path, ''))
	const renderRoutes = routes.map(item => {
		const itemPath = `${path}${item}`
		return {
			exact: routerData[itemPath].exact !== false,
			...routerData[itemPath],
			key: itemPath,
			path: itemPath,
		}
	})
	window.renderRoutes = renderRoutes
	window.routes = routes
	return renderRoutes
}

export function isUrl(path) {
	/* eslint no-useless-escape:0 */
	const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g
	return reg.test(path)
}

export const formatTimeKeyByPeriod = (period = 'MONTH', targetTime) => {
	const locale = localStorage.getItem('locale')
	const isEn = new RegExp(locale).test('en')
	let timeKey
	let flag = false
	const time = moment(targetTime).startOf('day')
	const now = moment().startOf('day')
	if (time >= now) {
		flag = true
	}
	switch (period) {
		case 'DAY':
			timeKey = flag ? now.subtract(1, 'day').format('YYYY-MM-DD') : time.format('YYYY-MM-DD')
			break
		case 'WEEK':
			timeKey = flag ? now.startOf('week').subtract(1, 'week') : time.startOf('week')
			if (isEn) {
				timeKey = timeKey.add(1, 'day').format('YYYY-MM-DD')
			} else {
				timeKey = timeKey.format('YYYY-MM-DD')
			}
			break
		case 'MONTH':
			timeKey = flag ? now.subtract(1, 'month').format('YYYY-MM') : time.format('YYYY-MM')
			break
		default:
			timeKey = flag ? now.subtract(1, 'day').format('YYYY-MM-DD') : time.format('YYYY-MM-DD')
	}
	return timeKey
}
