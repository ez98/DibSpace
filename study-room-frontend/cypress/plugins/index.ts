// promisified fs module
import fs from 'fs-extra'
import path from 'path'
import webpack from '@cypress/webpack-preprocessor'

function getConfigurationByFile(file) {
    const pathToConfigFile = path.resolve('cypress', 'config', `${file}.json`)

    return fs.readJson(pathToConfigFile)
}

// plugins file
module.exports = (on, config) => {
    require('cypress-terminal-report/src/installLogsPrinter')(on)
    require('cypress-log-to-output').install(on, (type, event) => {
        return (event.level === 'error' || event.type === 'error') && islogableError(event)
    })
    const options = {
        // send in the options from your webpack.config.js, so it works the same
        // as your app's code
        webpackOptions: require('../../webpack.config'),
        watchOptions: {},
    }
    on('file:preprocessor', webpack(options))

    const environment = process.env.ENVIRONMENT || config.env.ENVIRONMENT || 'acceptance'
    console.log(`plugins/index.ts: Loading local config from cypress/config/${environment}.json...`)
    return getConfigurationByFile(environment)
}
