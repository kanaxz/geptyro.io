const mushroom = require('./assets/Mushroom.stl')
const ThreeObject = require('./ThreeObject')
const { loadSTL } = require('./utils')


module.exports = class Mushroom extends ThreeObject {
  async setup() {
    const mesh = await loadSTL(mushroom)
    this.add(mesh)
    const { center } = super.setup()
    mesh.position.sub(center)
  }

  animate() {
    this.rotation.y = (Date.now() * 0.0003) % 360
  }
}