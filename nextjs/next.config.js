require('dotenv').config()
const webpack = require('webpack')
const withCss = require('@zeit/next-css')
const path = require('path')

module.exports = withCss(
    {
        webpack: (config) => {
            config.plugins.push(new webpack.EnvironmentPlugin(process.env))
            config.plugins.push(new webpack.DefinePlugin({
                //this is kind of a hack, but i guess it beats using Linux sed
                'process.env.SERVER_HOST': JSON.stringify(process.env.SERVER_HOST)
            }))
            config.resolve.modules.push(path.resolve('./'))

            return config
        },
        cssModules: true
    }    
)