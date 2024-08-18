const { join } = require('path')
const { readFileSync } = require('fs')

require('dotenv').config({ path: '../envs/dev.env' })

const { HOST } = process.env
const root = join(__dirname, '..')
const certsPath = join(root, 'nginx/dev/certs')

module.exports = {
  node_modules: join(root, '../../node_modules'),
  express: {
    options: {
      cert: readFileSync(join(certsPath, `${HOST}/cert.pem`), 'utf-8'),
      key: readFileSync(join(certsPath, `${HOST}/key.pem`), 'utf-8')
    },
  }
}