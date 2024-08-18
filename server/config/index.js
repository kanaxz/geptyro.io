const { join } = require('path')
const ENV = process.env.ENV
const root = join(__dirname, '..')
const config = require('sools-core/config')

module.exports = config(
  require(`./${ENV}`),
  require('./private'),
  {
    env: ENV,
    root,
    express: {
      port: process.env.EXPRESS_PORT,
      host: process.env.HOST,

    },
    management: {
      systemUser: {
        username: 'geptyro',
        wiki: 'abc',
      }
    },
    mongo: {
      url: `${process.env.MONGO_URL}:${process.env.MONGO_PORT}`,
      db: `geptyro-io-${ENV}`,
    }
  },
)