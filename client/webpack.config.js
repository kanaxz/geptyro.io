const { join } = require('path')
const config = require('sools-webpack/config')

const path = (p) => join(__dirname, p)
const ENV = process.env.ENV

require('dotenv').config({ path: path(`../envs/${ENV}.env`) })

const {
  HOST,
  EXPRESS_PORT
} = process.env

module.exports = (nope, argv) => {
  return config(
    argv,
    {
      entry: {
        main: path('./src/index.js')
      },
      output: {
        path: path('../build')
      },
      devServer: {
        https: true,
        historyApiFallback: true,
        port: 9001,
        proxy: [
          {
            context: ['/api'],
            target: `https://${HOST}:${EXPRESS_PORT}`,
            secure: false,
          },
        ],
        allowedHosts: 'all',
      },
    },
    {
      favicon: path('./src/assets/favicon.ico'),
    }
  )
}