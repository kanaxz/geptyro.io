const THREE = require('three');
const ThreeObject = require('../3d/ThreeObject');
const Material = require('./Material')
const model = require('./model.gltf')
const { GLTFLoader } = require('three/examples/jsm/loaders/GLTFLoader')
const loader = new GLTFLoader()
const COUNT = 5

module.exports = class Grass extends ThreeObject {
  async setup() {
    const gltf = await loader.loadAsync(model)
    Object.assign(this, {
      clock: new THREE.Clock(),
      mesh: new THREE.InstancedMesh(
        gltf.scene.children[0].geometry.clone(),
        new Material({
          side: THREE.DoubleSide
        }),
        30
      )
    })
    this.add(this.mesh)
    this.instances = Array.from(Array(COUNT)).map((i) => {
      const position = new THREE.Vector3().randomDirection()
        .multiply(new THREE.Vector3(
          1.0,
          0.0,
          1.0
        ))
        .multiplyScalar(10.0)
      const rotation = new THREE.Euler(
        0.0,
        Math.random() * Math.PI * 2.0,
        0.0,
      )
      const scale = new THREE.Vector3().setScalar(Math.random() * 0.25 + 0.25)
      const grass = new THREE.Object3D()
      grass.position.copy(position)
      grass.rotation.copy(rotation)
      grass.scale.copy(scale)
      grass.visible = false
      return grass
    })
    super.setup()
  }

  animate() {
    const { mesh, clock } = this
    this.instances.forEach((grass, index) => {
      grass.updateMatrix()
      mesh.setMatrixAt(index, grass.matrix)
    })

    mesh.instanceMatrix.needsUpdate = true
    mesh.computeBoundingSphere()

    mesh.material.uniforms.fTime.value = clock.getElapsedTime()
  }
}