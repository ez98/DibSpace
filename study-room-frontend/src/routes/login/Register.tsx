import React from 'react'
import { intl } from 'serpens'
import { useSelector, useDispatch } from 'react-redux'
import { Input, Button, Row, Col, Form, message, notification } from 'antd'
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
    setType: () => void
}
let messageInstance: MessageType
const LoginPage: React.FC<OwnProps> = props => {
    const { banner, setType } = props
    const { hashKey, codeSecond } = useSelector<GlobalState, GlobalState['login']>(
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
    const sendEmail = () => {
        const sendTo = form.getFieldValue('email')
        if (sendTo) {

            const payload = {
                sendTo: form.getFieldValue('email')
            }
            dispatch({
                type: 'login/sendEmail',
                payload,
            }).then((res: any) => {
                if (res.state) {

                    notification.success({
                        type: 'success',
                        message: res.message
                    })
                    let mySecond = 60
                    const codeInterval = setInterval(async () => {
                        if (mySecond <= 0) {
                            dispatch({
                                type: 'login/save',
                                payload: {
                                    codeSecond: undefined

                                }
                            })
                            clearInterval(codeInterval)
                        } else {
                            mySecond = mySecond - 1
                            dispatch({
                                type: 'login/save',
                                payload: {
                                    codeSecond: mySecond

                                }
                            })
                        }

                    }, 1000)
                } else {
                    notification.warning({
                        type: 'warning',
                        message: res.message
                    })
                }
            })
        } else {
            notification.warning({
                type: 'warning',
                message: 'Please enter email address'
            })
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
                <Form.Item
                    rules={[
                        { required: true, whitespace: true, message: "please enter Confirm password" },
                    ]}
                    name="confirm_password"
                >
                    <Input
                        size="large"
                        type="confirm_password"
                        placeholder="Confirm password"
                    // autoComplete="off"
                    />
                </Form.Item>
                <Form.Item
                    rules={[
                        { required: true, whitespace: true, message: 'Please enter the Email' },
                    ]}
                    name="email"
                >
                    <Input
                        size="large"
                        type="email"
                        placeholder={'Email'}
                        // autoComplete="off"
                    />
                </Form.Item>
                <Form.Item
                    rules={[
                        { required: true, whitespace: true, message: 'Please enter the verification code' },
                    ]}
                    name="code"
                >
                    <Row>
                        <Col span={16}>
                            <Input
                                size="large"
                                type="code"
                                placeholder={'Verification code'}
                            // autoComplete="off"
                            />
                        </Col>
                        <Col span={8} style={{
                            padding: ' 0 10px',
                            textAlign: 'center',
                            alignSelf: 'center'
                        }}>
                            <Button type='text'
                                style={{ padding: 0 }}
                                disabled={codeSecond !== undefined}
                                onClick={sendEmail}>
                                {codeSecond === undefined ? (
                                    <span>
                                        <div>Click send </div>
                                        <div>verification code</div>
                                    </span>
                                ) : `${codeSecond} S`}
                            </Button>
                        </Col>
                    </Row>
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
                        {'Register'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
const wrapMemo = React.memo(LoginPage)
const wrapRouter = withRouter(wrapMemo)
const wrapIntl = intl(wrapRouter)
export default wrapIntl
