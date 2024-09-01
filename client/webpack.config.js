const { join } = require('path')
const config = require('sools-webpack/config')
const { DefinePlugin } = require('webpack')

const path = (p) => join(__dirname, p)
const ENV = process.env.ENV

require('dotenv').config({ path: path(`../envs/${ENV}.env`) })

const envKeys = ['HOST', 'API_SERVER_PORT'].reduce((acc, next) => {
  acc[`process.env.${next}`] = JSON.stringify(process.env[next]);
  return acc;
}, {});

module.exports = (nope, argv) => {
  const result = config(
    argv,
    {
      entry: {
        main: path('./src/index.js')
      },
      output: {
        path: path('../serve/build'),
      },
      devServer: {
        https: true,
        historyApiFallback: true,
        port: process.env.SERVE_SERVER_PORT,
        allowedHosts: 'all',
      },
      plugins: [
        new DefinePlugin(envKeys),
      ]
    },
    {
      favicon: path('./src/assets/logo-head.png'),
    }
  )
  console.log('config', result)
  return result
}