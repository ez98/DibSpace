import React from 'react'
import { Form, Button, Select } from 'antd'
import { intl } from 'serpens'
import { routerRedux, withRouter, RouteProps } from 'dva/router'
import { useSelector, useDispatch } from 'react-redux'
import { Banner } from './index.js'
import locales from './index.json'

const t = intl.load(locales)
interface Account {
	createDate: string
	description: string
	displayName: string
	enterpriseId: string
	id: string
	modifiedDate: string
	name: string
	operator: string
}
interface OwnProps extends RouteProps {
	banner?: Banner
}
interface FormValues {
	account: string
}
const Login: React.FC<OwnProps> = props => {
	const { banner } = props
	const dispatch = useDispatch<EffectsDispatch>()
	const {
		'login/fetchTokenFromAccount': loading = false,
		'login/fetchUserAccounts': fetchUserAccountsLoading = false,
		'login/fetchAccountById': fetchAccountByIdLoading = false,
	} = useSelector<GlobalState, GlobalState['loading']['effects']>(
		state => state?.loading?.effects,
	)

	const [form] = Form.useForm()
	const handleSubmit = async (values: FormValues) => {
		const { account } = values
		localStorage.setItem('accountId', account)
		await dispatch({
			type: 'global/fetchAccountById',
			payload: account,
		})
		await dispatch({
			type: 'login/fetchTokenFromAccount',
			payload: {
				accountId: account,
			},
		})

		let rollbackRoute = localStorage.getItem('rollback-route') || '/'
		if (/user\/login/.test(rollbackRoute)) {
			rollbackRoute = '/'
		}
		// const rollbackRoute = parse(history.location.search, { ignoreQueryPrefix: true })
		if (rollbackRoute) {
			dispatch(routerRedux.push(rollbackRoute))
		} else {
			dispatch(routerRedux.push('/'))
		}
		localStorage.setItem('rollback-route', '/')
	}

	const [accountList, setAccountList] = React.useState<Account[]>([])

	React.useEffect(() => {
		dispatch<Account[]>({
			type: 'login/fetchUserAccounts',
		}).then(accounts => {
			setAccountList(accounts)
			const [firstAccount] = accounts
			if (firstAccount) {
				form.setFieldsValue({
					account: firstAccount.id,
				})
			}
		})
	}, [])

	return (
		<div>
			<Form
				labelAlign="right"
				form={form}
				layout="vertical"
				style={{
					textAlign: 'left',
					marginTop: 20,
				}}
				onFinish={handleSubmit}
			>
				<Form.Item
					label={t('account')}
					name="account"
					rules={[{ required: true, message: t('no_empty') }]}
				>
					<Select style={{ width: '100%' }} loading={fetchUserAccountsLoading}>
						{accountList.map(account => (
							<Select.Option key={account.id} value={account.id}>
								{account.displayName}({account.name})
							</Select.Option>
						))}
					</Select>
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						block
						loading={loading || fetchAccountByIdLoading}
						htmlType="submit"
						style={{ borderRadius: 0 }}
					>
						{t('enter_system')}
					</Button>
				</Form.Item>

				<Form.Item>
					<Button
						block
						onClick={() => {
							banner?.prev?.()
						}}
						loading={loading}
					>
						{t('return_login')}
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}
const wrapMemo = React.memo(Login)
const wrapRouter = withRouter(wrapMemo)
const wrapIntl = intl(wrapRouter)
export default wrapIntl
