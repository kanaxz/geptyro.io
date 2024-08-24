const { join } = require('path')
const ENV = process.env.ENV
const root = join(__dirname, '..')
const config = require('sools-core/config')

const envConfig = require(`./${ENV}`)

const {
  HOST,
  API_SERVER_PORT,
  MONGO_PORT,
  MONGO_URL,
  SERVE_SERVER_PORT,
} = process.env

module.exports = config(
  envConfig,
  require('./private'),
  {
    env: ENV,
    root,
    express: {
      port: API_SERVER_PORT,
      host: HOST,
      origin: `https://${HOST}:${SERVE_SERVER_PORT}`
    },
    auth: {
      systemUser: {
        username: 'geptyro',
        wiki: 'abc',
      }
    },
    mongo: {
      url: `${MONGO_URL}:${MONGO_PORT}`,
      db: `geptyro-io-${ENV}`,
    }
  },
)