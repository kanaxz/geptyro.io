const { join } = require('path')

require('./setup')
const CoreModule = require('sools-core-server/CoreModule')
const config = require('./config')


const start = async () => {
  const core = new CoreModule({
    config,
    root: join(__dirname, '/src'),
    node_modules: config.node_modules,
    bundles: [
      'sools-core-server',
      'sools-migrations',
      'sools-mongo',
      'sools-modeling-server',
      'sools-modeling-server-express',
      'sools-management-server',
      'sools-express',
    ]
  })
  await core.start()
  await core.object.trigger('purge')
  await core.object.trigger('migrate')

  return core
}

module.exports = start()
  .catch((err) => {
    if (err.detail) {
      console.error(JSON.stringify(err.detail, null, ' '))
      console.error(err)
    } else {
      console.error(err)
    }
  })


/**/