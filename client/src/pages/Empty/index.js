const template = require('./template.html')
const Component = require('sools-hedera/Component')
require('./style.scss')

module.exports = class EmptyPage extends Component {

  async onInit() {
   
  }
}
  .define({
    name: 'empty-page',
    template,
  })
  .properties({
    name: 'any',
  })

