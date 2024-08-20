const { join } = require('path')

module.exports = {
  express: {
    dist: {
      path: '/etc/build',
      publicPath: '/static',
    },
    distPath: '/static/',
    mode: 'http',
  },
  node_modules: join(__dirname, '..', 'node_modules'),
}