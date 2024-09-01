const template = require('./template.html')
const Component = require('sools-hedera/Component')
const Array = require('sools-core/types/Array')
const { makeId } = require('sools-core/utils/string')
const Vector2D = require('sools-modeling/types/Vector2D')
const { random } = require('sools-core/utils/number')
const Image = require('./Image')
require('./Object')
require('./style.scss')

const LOCAL_STORAGE_KEY = 'teemo'

module.exports = class Parallax extends Component {

  onInit() {
    this.objects = new Array()
    this.selecteds = []
    this.history = []
    this.selectedsHistory = []
  }

  save() {
    if (this.destroyed) {
      return
    }

    const json = this.objects.map((o) => o.toJSON())
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(json))

    setTimeout(() => {
      this.save()
    }, 1000)
  }

  createImage(src) {
    const object = Image.parse({
      id: makeId(),
      src,
      index: 0,
      position: {
        x: 50,
        y: 50,
      },
      size: {
        x: 10,
      }
    })
    this.objects.push(object)
    this.select([object])
  }

  objectFromJson(json) {
    return Image.build({
      ...json,
      parallax: this,
      index: Math.max(json.index, 0),
      size: new Vector2D(json.size),
      position: new Vector2D(json.position),
    })
  }

  load() {
    const result = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!result) { return }

    const json = JSON.parse(result)
    for (const objectJson of json) {
      const object = Image.parse(objectJson)
      this.objects.push(object)
    }
  }

  async edit(object) {
    const editTab = await this.scope.renderTemplate(this.editTabTemplate, { object })
    this.tabs.tabs.push(editTab)
    this.tabs.focus(editTab)
  }


  onReady() {
    this.load()
    this.save()
    const { scene } = this
  }

  select(array = []) {
    console.trace('select', array)
    if (this.selecteds) {
      this.selectedsHistory.push(this.selecteds)
    }
    this.selecteds = array.filter((a, i) => array.indexOf(a) === i)
  }

  onMouseDown(e) {
    const sceneObject = e.target.closest('html-scene-object')
    this.target = sceneObject?.object
    this.clicked = sceneObject?.image.contains(e.target)
    if (!this.target) {
      this.select([])
    }
  }

  onDoubleClick(e) {


  }

  onMouseUp(e) {
    this.clicked = null
    if (this.moved) {
      this.moved = false
      return
    }

    const target = e.target.closest('html-scene-object')?.object
    if (!target) {
      return
    }

    const selecteds = this.getSelecteds(e)
    if (this.selecteds.indexOf(target) !== -1) {
      const index = selecteds.indexOf(target)
      if (index !== -1) {
        console.log(2)
        selecteds.splice(index, 1)
      }
    } else {
      selecteds.push(target)
    }
    this.select(selecteds)
  }

  getSelecteds(e) {
    if (e.ctrlKey) {
      return this.selecteds
    }
    return []
  }

  onMouseMove(e) {
    if (!this.clicked) { return }

    if (this.target) {
      const selecteds = this.getSelecteds(e)
      selecteds.push(this.target)
      this.select(selecteds)
      this.target = null
    }
    this.moved = true
    const rect = this.getBoundingClientRect()
    const mov = {
      x: (100 * e.movementX) / rect.width,
      y: (100 * e.movementY) / rect.height,
    }
    this.selecteds.forEach((object) => {
      object.position.add(mov)
    })
  }

  onKeyDown(e) {
    if (e.key === 'c' && e.ctrlKey) {
      this.copied = this.selecteds
    }
    if (e.key === 'v' && e.ctrlKey) {
      const json = this.copied.map((c) => c.toJSON())
      console.log(json)
      const copiedObjects = json.map((json) => Image.parse({
        ...json,
        id: makeId(),
        position: new Vector2D(json.position).add(3)
      }))

      this.objects.push(...copiedObjects)
      this.select(copiedObjects)
      this.copied = copiedObjects
    }
    if (e.key === 'Delete') {
      this.selecteds.forEach((o) => {
        o.destroy()
        this.objects.remove(o)
      })
      let last
      do {
        last = this.selectedsHistory.pop()
        if (last?.filter((o) => !o.destroyed).length === 0) { last = null }
      } while (!last && this.selectedsHistory.length)
      this.select(last || [])
    }
    if (e.key === 'z' && e.ctrlKey) {

    }
  }
}
  .define({
    name: 'html-scene',
    template
  })
  .properties({
    selecteds: 'any',
    selected: 'any',
  })
  .variables({
    Image
  })