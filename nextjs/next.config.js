require('dotenv').config()
const webpack = require('webpack')
const withCss = require('@zeit/next-css')

module.exports = withCss(
    {
        webpack: (config) => {
            config.plugins.push(new webpack.EnvironmentPlugin(process.env))

            return config
        },
        cssModules: true
    }    
)