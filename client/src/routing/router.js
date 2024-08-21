const authRouter = require('sools-auth-hedera/router')
const ModelingRouter = require('sools-modeling-hedera/routing/Router')
const Router = require('sools-hedera/routing/routers/Router')
const mainLayoutRouter = require('./mainLayoutRouter')
const emptyLayoutRouter = require('./emptyLayoutRouter')

emptyLayoutRouter.use(authRouter)
mainLayoutRouter.use(new ModelingRouter())

const router = new Router()

router.use(mainLayoutRouter)
router.use(emptyLayoutRouter)

router.use((req, res) => {
  res.navigate('/code-30000', true)
})

module.exports = router
