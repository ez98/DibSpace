import React from 'react'
import { intl } from 'serpens'
import BannerAnim from 'rc-banner-anim'
import { withRouter,routerRedux ,RouteProps} from 'serpens/router'
import styles from './Login.less'
import locales from './index.json'
import Login from './Login'
import Register from './Register'
import UserLayoutStyles from './UserLayout.less'
import { Button } from 'antd'
import { Switch, Route } from 'serpens/router'
import { useDispatch } from 'react-redux'

const t = intl.load(locales)
export type Banner = BannerAnim<unknown> & {
	next?: () => void
	prev?: () => void
}
const SignIn: React.FC<RouteProps> = props => {
	const dispatch = useDispatch<EffectsDispatch>()
	const {location}=props
	
	const [banner, setBanner] = React.useState<Banner>()
	return (
		<div className={UserLayoutStyles.container}>
			<div className={UserLayoutStyles.content}>
				<div className={UserLayoutStyles.top}>
					<div className={UserLayoutStyles.header}>
						<h1>DibSpace {location?.pathname.includes('register')?"Register":"Login"}</h1>
						{ location?.pathname.includes('register') ? (
							<Button
							
								style={{ padding: '0' }}
								onClick={() => {
									dispatch(
										routerRedux.push({
										  pathname: "/user/login",
										})
									)
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
					<Switch>
						<Route path='/user/login' component={Login}/>
						<Route path='/user/register' component={Register}/>

						</Switch>
				
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
