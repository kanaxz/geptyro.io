const THREE = require('three')
const { getStats } = require('./utils')

module.exports = class ThreeObject extends THREE.Object3D {

  constructor() {
    super()
    this.ressources = []
  }

  setup() {
    this.updateMatrixWorld()
    const { size, center } = getStats(this)
    this.size = size
    return {
      size, 
      center
    }
  }

  ressource(ressource) {
    this.ressources.push(ressource)
    return ressource
  }

  dispose() {
    while (this.ressources.length) {
      const ressource = this.ressources.shift()
      ressource.dispose()
    }
  }
}