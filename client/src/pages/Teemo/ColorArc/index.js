const template = require('./template.html')
const Component = require('sools-hedera/Component')
require('./style.scss')

module.exports = class ColorArc extends Component {

  async onReady() {

  }
}
  .define({
    name: 'color-arc',
    template,
  })
  .properties({
    color: 'any'
  })