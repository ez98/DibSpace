import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import mva, { dispatch } from 'serpens'
import { Provider } from 'react-redux'
import App from './App';
import models from './models'
import { createHashHistory } from 'history'
import createLoading from 'dva-loading'
import { initializeLanguage } from 'utils/language'
import { developmentConfig } from './services/config'
import './index.less'

// 1. Initialize

mva({
	history: createHashHistory(),
	onError: err => {
		// eslint-disable-next-line
		console.error('mva =>', err)
	},
})
// 2. Plugins
mva.use(createLoading())

// 3. Register models
models.forEach(model => {
	mva.model(model.default)
})
initializeLanguage()
// 4. Router
// mva.router(require('./app').default)
mva.router(props => {
	const store = mva._get_global_dva_app()._store
	return (
		<Provider store={store}>
			<App {...props} />
		</Provider>
	)
})
// 5. Start
mva.start('#root')
window['@mva'] = mva
window['@dispatch'] = dispatch

// eslint-disable-next-line
if (DEV_MODE) {
	// eslint-disable-next-line
	console.log(developmentConfig)
}

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
