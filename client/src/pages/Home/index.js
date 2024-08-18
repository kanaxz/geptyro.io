const template = require('./template.html')
const Component = require('sools-hedera/Component')
require('./style.scss')

module.exports = class Home extends Component {
 
  async onReady() {

  }
}
  .define({
    name: 'home-page',
    template,
  })