const { join } = require('path')
const { readFileSync } = require('fs')

require('dotenv').config({ path: '../envs/dev.env' })

const root = join(__dirname, '../..')
const certsPath = join(__dirname, `cert`)

module.exports = {
  node_modules: join(root, '../../node_modules'),
  purge: true,
  express: {
    options: {
      cert: readFileSync(join(certsPath, 'cert.pem'), 'utf-8'),
      key: readFileSync(join(certsPath, 'key.pem'), 'utf-8')
    },
  }
}