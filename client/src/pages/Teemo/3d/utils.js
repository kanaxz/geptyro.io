const THREE = require('three')
const { STLLoader } = require('three/examples/jsm/loaders/STLLoader')
const { OrbitControls } = require('three/examples/jsm/controls/OrbitControls')
const aSTLLoader = new STLLoader()

const getRenderer = (size) => {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  })

  renderer.setSize(size.width, size.height)
  renderer.setPixelRatio(window.devicePixelRatio)
  return renderer
}

const getCamera = (size) => {
  const camera = new THREE.PerspectiveCamera(50, size.width / size.height, 0.01, 1000)
  const light1 = new THREE.AmbientLight('#FFFFFF', 0.2)
  const light2 = new THREE.DirectionalLight('#FFFFFF', 0.8 * Math.PI)
  camera.add(light1, light2)
  camera.updateProjectionMatrix()
  return camera
}

const getStats = (object) => {
  const box = new THREE.Box3().setFromObject(object)
  const size = box.getSize(new THREE.Vector3()).length()
  const center = box.getCenter(new THREE.Vector3())
  return {
    size,
    center
  }
}

const loadSTL = async (path) => {
  return new Promise((resolve, reject) => {
    aSTLLoader.load(path, (geometry) => {
      // Create a material
      const material = new THREE.MeshPhongMaterial({
        vertexColors: THREE.VertexColors
      })

      // Create a mesh with the loaded geometry and material
      const mesh = new THREE.Mesh(geometry, material);

      // Add the mesh to the scene
      resolve(mesh)
    })
  })
}

const getAll = (size) => {
  const scene = new THREE.Scene()
  const renderer = getRenderer(size)
  const camera = getCamera(size)
  const objects = []
  scene.add(camera)
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.screenSpacePanning = true
  const addObject = (object) => {
    objects.push(object)
    scene.add(object)
  }
  const animate = () => {
    requestAnimationFrame(animate)
    for (const object of objects) {
      object.animate()
    }
    controls.update()
    renderer.render(scene, camera)
  }

  return {
    addObject,
    canvas: renderer.domElement,
    animate,
    camera,
  }
}

const getForObject = async (size, object) => {
  const { camera, canvas, animate, addObject } = getAll(size)

  await object.setup()
  addObject(object)

  camera.near = object.size / 1000
  camera.position.add({
    x: object.size,
    y: object.size,
    z: object.size
  })
  animate()
  return canvas
}

module.exports = {
  loadSTL,
  getStats,
  getRenderer,
  getCamera,
  getAll,
  getForObject,
}