require('../setup')
const starborRouter = require('../routing/router')

const template = require('./template.html')
const Root = require('sools-hedera/routing/Root')
const { auth, navigator } = require('../global')
const { wait } = require('sools-core/utils/promise')
require('./style.scss')


module.exports = class App extends Root {

  async start() {
    document.body.appendChild(this)
    this.router.use(starborRouter)
    let start = new Date()
    navigator.use(this.router)
    await super.start()
    await navigator.start()
    await wait(Math.max(400 - (new Date() - start), 0))

    this.classList.add('ready')
  }
}
  .define({
    name: 'geptyro-io-app',
    template,
  })