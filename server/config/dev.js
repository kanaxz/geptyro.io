const { join } = require('path')

module.exports = {
  node_modules: join(__dirname, '..', '../../node_modules'),
  express: {
    options: {
      cert: readFileSync(join(certsPath, `${FULL_HOST}/cert.pem`), 'utf-8'),
      key: readFileSync(join(certsPath, `${FULL_HOST}/key.pem`), 'utf-8')
    },
  }
}