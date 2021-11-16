import React from 'react'
import { intl } from 'serpens'
import { useSelector, useDispatch } from 'react-redux'
import { Input, Button, Row, Col, Form, message } from 'antd'
import { MessageType } from 'antd/lib/message'
import lodash from 'lodash'
import { withRouter, routerRedux, RouteProps } from 'serpens/router'
// import LanguageSelector from 'components/LanguageSelector'
import { clearToken } from 'utils/token'
import styles from './Login.less'
import locales, { Banner } from './index.json'

const t = intl.load(locales)
interface Authenticated {
	accountId: string
	enterpriseId: string
	id: string
	name: string
}
interface OwnProps extends RouteProps {
	banner?: Banner
	setType:()=>void
}
let messageInstance: MessageType
const LoginPage: React.FC<OwnProps> = props => {
	const { banner,setType } = props
	const { hashKey, imageUrl } = useSelector<GlobalState, GlobalState['login']>(
		state => state?.login,
	)
	const {
		'login/login': submitting = false,
		'login/authenticatedPrincipal': authenticatedPrincipalLoading = false,
		'global/fetchAccountById': fetchAccountByIdLoading = false,
	} = useSelector<GlobalState, GlobalState['loading']['effects']>(
		state => state?.loading?.effects,
	)
	const dispatch = useDispatch<EffectsDispatch>()
	const [form] = Form.useForm()
	const fetchCode = () => {
		dispatch({
			type: 'login/fetchCaptcha',
		})
		form.setFieldsValue({
			answer: '',
		})
	}
	React.useEffect(() => {
		clearToken?.()
		localStorage?.removeItem?.('refreshToken')
		localStorage?.removeItem?.('accountId')
		fetchCode?.()
		return () => {
			messageInstance?.()
		}
	}, [])
	const renderError = (mes: string) => {
		messageInstance?.()
		messageInstance = message.error(mes, 0)
	}
	const handleSubmit = async (values: { username: string; password: string; answer: string }) => {
		messageInstance?.()
		// if (hashKey === null) {
		// 	return renderError(t('captcha_failed_to_load'))
		// }
		if (submitting) return
		try {
			await dispatch({
				type: 'login/login',
				payload: {
					...values,
					hashKey,
				},
			})
		} catch ({ data }) {
			const { message } = data
			fetchCode()
			return renderError(message)
		}

		try {
			// 认证token 是否存在account
			const authenticated: Authenticated = await dispatch({
				type: 'login/authenticatedPrincipal',
			})
			const { accountId } = authenticated
			if (authenticated) {
				if (accountId && typeof accountId === 'string') {
					localStorage.setItem('accountId', accountId)
					await dispatch({
						type: 'global/fetchAccountById',
						payload: accountId,
					})
					let path = localStorage.getItem('rollback-route') || '/'
					if (/user\/login/.test(path)) {
						path = '/'
					}
					dispatch(routerRedux.push(path))
					localStorage.setItem('rollback-route', '/')
				} else {
					banner?.next()
				}
			} else {
				return renderError(t('authentication_failed'))
			}
		} catch (err) {
			return renderError(t('authentication_failed'))
		}
	}
	return (
		<div className={styles.main}>
			<Form
				layout="vertical"
				form={form}
				onFinish={lodash.throttle(handleSubmit, 1000, { leading: true, trailing: false })}
			>
				<Form.Item
					rules={[
						{ required: true, whitespace: true, message: t('please_enter_username') },
					]}
					name="username"
				>
					<Input size="large" placeholder={t('username')} />
				</Form.Item>
				<Form.Item
					rules={[
						{ required: true, whitespace: true, message: t('please_enter_password') },
					]}
					name="password"
				>
					<Input
						size="large"
						type="password"
						placeholder={t('password')}
					// autoComplete="off"
					/>
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						style={{ backgroundColor: '#0068eb', color: '#fff', borderRadius: 0 }}
						size="large"
						block
						loading={
							submitting || authenticatedPrincipalLoading || fetchAccountByIdLoading
						}
						htmlType="submit"
					>
						{t('sign_in')}
					</Button>
				</Form.Item>
				<Row justify="space-between">
					<Col span={19}>
						<Form.Item>
							<Button
								style={{ padding: '0' }}
                                onClick={()=>{
                                    setType('Register')
                                }}
								type='text'><b>No users? Click to register</b></Button>
						</Form.Item>
					</Col>
					<Col span={5}>
						<div />
					</Col>
				</Row>
			</Form>
		</div>
	)
}
const wrapMemo = React.memo(LoginPage)
const wrapRouter = withRouter(wrapMemo)
const wrapIntl = intl(wrapRouter)
export default wrapIntl
