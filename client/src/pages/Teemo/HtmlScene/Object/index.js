const template = require('./template.html')
const Component = require('sools-hedera/Component')
require('./style.scss')



module.exports = class HtmlSceneObject extends Component {

  constructor(values) {
    super()
    Object.assign(this, values)
  }

  onInit() {
    const { scene } = this
    scene.addEventListener('mousemove', this.b(this.onMouseMove))
    scene.addEventListener('mousedown', this.b(this.onMouseDown))
    scene.addEventListener('mouseup', this.b(this.onMouseUp))
  }

  onMouseDown(e) {
    if (!this.corners.contains(e.target)) {
      this.selectedCorner = null
      return
    }
    e.stopPropagation()
    this.selectedCorner = e.target
  }

  onMouseUp(e) {
    this.selectedCorner = null
  }

  onMouseMove(e) {

    if (!this.selectedCorner) { return }

    const corner = this.selectedCorner
    const { object } = this
    const parentRect = this.scene.getBoundingClientRect()

    const mov = {
      x: (100 * e.movementX) / parentRect.width,
      y: (100 * e.movementY) / parentRect.height,
    }

    if (!object.size.y) {
      const rect = this.getBoundingClientRect()
      object.size.y = (100 * rect.height) / parentRect.height
    }
    if (corner.matches('.left')) {
      object.position.x += mov.x
      object.size.x -= mov.x
    }
    if (corner.matches('.right')) {
      object.size.x += mov.x
    }
    if (corner.matches('.top')) {
      object.position.y += mov.y
      object.size.y -= mov.y
    }
    if (corner.matches('.bottom')) {
      object.size.y += mov.y
    }
  }
}
  .define({
    name: 'html-scene-object',
    template
  })
