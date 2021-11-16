import {
	fetchCaptcha,
	login,
	authenticatedPrincipal,
	fetchTokenFromAccount,
	fetchUserAccounts,
	sendEmail,
} from 'services/login'
import { setToken, clearToken } from 'utils/token'

export default {
	namespace: 'login',

	state: {
		hashKey: null,
		imageUrl: null,
		codeSecond:undefined,
	},

	effects: {
		*sendEmail({payload},{call,put}){
			const {data}=yield call(sendEmail,payload)
			return data
		},
		*login({ payload }, { call, put }) {
			const { hashKey, answer, password, username } = payload
			const { data } = yield call(login, {
				authenticationType: 'local',
				username,
				password,
				hashKey,
				answer,
			})
			const { accessToken, refreshToken } = data
			const token = accessToken || data?.token
			if (token) {
				setToken(token)
				// yield put({ type: 'global/initialize' })
			} else {
				clearToken()
			}
			if (refreshToken) {
				localStorage.setItem('refreshToken', refreshToken)
			} else {
				localStorage.removeItem('refreshToken')
			}
			return token
		},

		*fetchTokenFromAccount({ payload }, { call }) {
			const { data } = yield call(fetchTokenFromAccount, payload)
			const { accessToken, refreshToken, token } = data
			const shouldToken = accessToken || data
			if (shouldToken) {
				setToken(shouldToken)
			} else {
				clearToken()
			}
			if (refreshToken) {
				localStorage.setItem('refreshToken', refreshToken)
			} else {
				localStorage.removeItem('refreshToken')
			}
			return data
		},

		*authenticatedPrincipal(_, { call, put }) {
			const { data } = yield call(authenticatedPrincipal)
			return data
		},

		*fetchUserAccounts(_, { call }) {
			const { data } = yield call(fetchUserAccounts)
			return data
		},

		*logout({ payload }) {
			yield localStorage.setItem('rollback-route', payload || '/')
			window.location = '/#/user/login'
		},

		*fetchCaptcha(_, { call, put }) {
			const {
				data: { hashKey },
			} = yield call(fetchCaptcha)
			yield put({
				type: 'save',
				payload: {
					hashKey,
					// eslint-disable-next-line no-undef
					imageUrl: `${NOVA_ROOT}/bootes2/passport/captcha/${hashKey}`,
				},
			})
		},
	},

	reducers: {
		save(state, { payload }) {
			console.log(payload);
			return {
				...state,
				...payload,
			}
		},

		changeLoginStatus(state, { payload }) {
			return {
				...state,
				status: payload.status,
			}
		},
	},
}
