/* eslint no-undef: 0 */
import moment from 'moment'
// import packageJson from 'root/package.json'

declare const NOVA_ROOT: string
declare const IS_PROXY: boolean
declare const NOVA_MEDIA_ROOT: string

// export const APP_VERSION = packageJson.version
const NOVA_ROOT_ENV = NOVA_ROOT
const IS_PROXY_ENV = IS_PROXY
const NOVA_MEDIA_ROOT_ENV =
	NOVA_MEDIA_ROOT?.replace(/^(https?\:\/\/)/i, '') || 'nebula-streaming-dev.momenta.works'

// export const NOVA_ROOT = process.env.NOVA_ROOT ? process.env.NOVA_ROOT : ''
export const NOVA_DEFAULT_ROOT = NOVA_ROOT_ENV
export const NOVA_API_ROOT = `${IS_PROXY_ENV ? '' : NOVA_ROOT_ENV}/vela_api/v1`
export const NOVA_SITE_API_ROOT = `${IS_PROXY_ENV ? '' : NOVA_ROOT_ENV}/site_api/v1`
export const NOVA_TUCANA_API_ROOT = `${IS_PROXY_ENV ? '' : NOVA_ROOT_ENV}/tucana`
export const NOVA_DEMO_API_ROOT = `${IS_PROXY_ENV ? '' : NOVA_ROOT_ENV}/demo_api/v0`
export const NOVA_MEDIA_API_ROOT = `${window.location.protocol}//${NOVA_MEDIA_ROOT_ENV}`

// export const APP_VERSION = PACKAGE_VERSION

export const developmentConfig = `
======================VELA======================
LOCAL_ROOT:       http://localhost:${process.env.PORT || 8001}
API_ROOT:         ${NOVA_ROOT_ENV || '/'}
BUILD_TIME:       ${moment().format('YYYY-MM-DD HH:mm:ss')}
======================END=======================
`
// BUILD_VERSION:    v${packageJson.version.replace(/-/, '.')}
