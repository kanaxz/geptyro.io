const { readFileSync } = require('fs')
const { join } = require('path')

const ENV = process.env.ENV
console.log({ ENV })
let certsPath = '/etc/nginx/certs'
const root = join(__dirname, '..')

if (ENV === 'dev') {
  certsPath = join(root, 'certs/dev')
  require('dotenv').config({ path: '../envs/dev.env' })
}

const { HOST } = process.env
const config = require('sools-core/config')

const FULL_HOST = `${process.env.LETSENCRYPT_STAGING === "1" ? '_test_' : ''}${HOST}`

module.exports = config(
  {
    env: ENV,
    root,
    express: {
      port: process.env.EXPRESS_PORT,
      host: process.env.HOST,
      options: {
        cert: readFileSync(join(certsPath, `${FULL_HOST}/cert.pem`), 'utf-8'),
        key: readFileSync(join(certsPath, `${FULL_HOST}/key.pem`), 'utf-8')
      },
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
  require('./private'),
  require(`./${ENV}`),
)