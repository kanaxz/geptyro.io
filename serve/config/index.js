const { join } = require('path')
const config = require('sools-core/config')
const ENV = process.env.ENV
const envConfig = require(`./${ENV}`)

module.exports = config(
  envConfig,
  {
    serve: {
      port: process.env.SERVE_SERVER_PORT,
      dist: join(__dirname, '../build'),
      puppeteer: {
        args: [
          '--no-sandbox',
        ]
      }
    }
  }
)