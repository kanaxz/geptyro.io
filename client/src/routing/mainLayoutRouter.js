const LayoutRouter = require('sools-hedera/routing/routers/LayoutRouter')

const pages = require('../pages')
const { wait } = require('sools-core/utils/promise')

const router = new LayoutRouter({
  layout: require('../layouts/Main')
})

router.route(/^\/$/, (req, res) => res.page(import('../pages/Home')))
router.route('/code-30000', (req, res) => res.page(import('../pages/NotFound')))
router.route('/not-found', (req, res) => res.navigate('/code-30000', true))

pages.forEach((page) => {
  if (!page.import) { return }
  router.route(page.url, (req, res) => {

    return res.page(page.import(), [], {
      transition: async (layout, next) => {
        layout.classList.add('transition')
        await wait(500)
        await next()
        layout.classList.remove('transition')
        await wait(500)
      }
    })
  })
})

/*
router.use((req, res) => {
  res.navigate('/not-found')
})
*/

module.exports = router