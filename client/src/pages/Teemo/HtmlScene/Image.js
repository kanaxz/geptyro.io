const { Object, Number, Vector2D, String } = require('sools-modeling/types')

module.exports = class Image extends Object {

}
  .define({
    name: 'HtmlSceneImage',
  })
  .properties({
    id: String,
    index: {
      type: Number,
      state: {
        min: 0,
      }
    },
    position: {
      type: Vector2D,
      state: {
        required: true,
      }
    },
    size: {
      type: Vector2D,
      state: {
        required: true,
      }
    },
    src: String,
  })