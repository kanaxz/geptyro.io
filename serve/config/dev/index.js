const { join } = require('path')
const { readFileSync } = require('fs')

const path = join(__dirname, '../../../envs/dev.env')
require('dotenv').config({ path })

const certsPath = join(__dirname, `cert`)

module.exports = {
  serve: {
    mode: 'https',
    options: {
      cert: readFileSync(join(certsPath, 'cert.pem'), 'utf-8'),
      key: readFileSync(join(certsPath, 'key.pem'), 'utf-8')
    },
    puppeteer: {
      ignoreHTTPSErrors: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--ignore-certificate-errors', // Ignore certificate errors
      ]
    }
  }
}