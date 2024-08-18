const { join } = require('path')

module.exports = {
  dist: '/etc/build',
  express: {
    mode: 'http',
  },
  node_modules: join(__dirname, '..', 'node_modules'),
}