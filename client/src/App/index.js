require('../setup')
const starborRouter = require('../routing/router')

const template = require('./template.html')
const Root = require('sools-hedera/routing/Root')
const { auth, navigator } = require('../global')
require('./style.scss')


module.exports = class App extends Root {

  async start() {
    document.body.appendChild(this)

    this.router.use(starborRouter)

    navigator.use(this.router)
    await auth.getMe()
    await super.start()
    await navigator.start()
  }

}
  .define({
    name: 'geptyro-io-app',
    template,
  })