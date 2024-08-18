const { join } = require('path')

module.exports = {
  express: {
    dist: '/etc/build',
    mode: 'http',
  },
  node_modules: join(__dirname, '..', 'node_modules'),
}