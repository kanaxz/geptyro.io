const template = require('./template.html')
const Component = require('sools-hedera/Component')
const { hexToRgb } = require('sools-core/utils/color')
require('./style.scss')
require('./ColorArc')
require('./HtmlScene')

module.exports = class Teemo extends Component {

  onReady(){
    this.setColor('#000000')
  }

  setColor(hexColor) {
    const rgbColor = hexToRgb(hexColor)
    this.color = `rgba(${rgbColor.r},${rgbColor.g},${rgbColor.b},0.3)`
  }


}
  .define({
    name: 'teemo-page',
    template,
  })
  .properties({
    color: 'any'
  })
  .variables({
    images:[
      require('./assets/teemo.png'),
      require('./assets/grass2.webp'),
      require('./assets/grass3.png'),
      require('./assets/mushroom.png'),
    ]
  })