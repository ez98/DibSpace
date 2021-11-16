import React from 'react'
import { intl } from 'serpens'
import BannerAnim from 'rc-banner-anim'
import { withRouter } from 'serpens/router'
import styles from './Login.less'
import locales from './index.json'
import Login from './Login'
import Register from './Register'
import UserLayoutStyles from './UserLayout.less'
import { Button } from 'antd'

const t = intl.load(locales)
export type Banner = BannerAnim<unknown> & {
	next?: () => void
	prev?: () => void
}
interface OwnProps { }
const SignIn: React.FC<OwnProps> = props => {
	// const dispatch = useDispatch<EffectsDispatch>()
	const [banner, setBanner] = React.useState<Banner>()
	const [type, setType] = React.useState('Login')
	return (
		<div className={UserLayoutStyles.container}>
			<div className={UserLayoutStyles.content}>
				<div className={UserLayoutStyles.top}>
					<div className={UserLayoutStyles.header}>
						<h1>DibSpace {type}</h1>
						{type === 'Register' ? (
							<Button
							
								style={{ padding: '0' }}
								onClick={() => {
									setType('Login')
								}}
								type='text'><b style={{color:'olive'}}>Return to the login</b></Button>
						) : null}

					</div>
				</div>
				<BannerAnim
					prefixCls={styles['anim-switch-wrapper']}
					sync
					type="across"
					duration={1000}
					arrow={false}
					thumb={false}
					ease="easeInOutExpo"
					ref={c => {
						setBanner(c)
					}}
					dragPlay={false}
				>
					<BannerAnim.Element key="login-element" leaveChildHide>
						{type === 'Login' ? (
							<Login key="login" banner={banner} setType={setType} />

						) :
							(
								<Register key='register' setType={setType} banner={banner} />
							)
						}
					</BannerAnim.Element>
				</BannerAnim>
			</div>
		</div>
	)
}
const wrapMemo = React.memo(SignIn)
const wrapRouter = withRouter(wrapMemo)
const wrapIntl = intl(wrapRouter)
export default wrapIntl
