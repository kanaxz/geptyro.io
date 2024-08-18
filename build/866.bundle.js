(self["webpackChunksools_webpack"] = self["webpackChunksools_webpack"] || []).push([[866],{

/***/ 4502:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "model-layout{display:block;width:100%;height:100%}model-layout>header{display:flex;flex-direction:row;align-items:center;width:100%;height:150px}model-layout>header>.before{display:flex;flex-direction:row;align-items:center;height:100%}model-layout>header>.before>div{height:100%}model-layout>header .infos{margin-left:50px}model-layout>header .infos h3{font-size:26px}model-layout>.content{display:flex;flex-direction:row;align-items:start;height:calc(100% - 150px)}model-layout>.content .actions{display:flex;flex-direction:column;height:100%;width:fit-content}model-layout>.content .actions app-interface{margin-top:10px;color:#fff}model-layout>.content .actions a{width:60px;height:60px;display:flex;align-items:center;justify-content:center;padding:5px;cursor:pointer;font-size:30px}model-layout>.content>.container{position:relative;width:100%;height:100%;flex:1}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 3574:
/***/ (function(module) {

// Module
var code = "<self> <header> <div class=\"before\" :v-for=\"fragment of this.@beforeHeader\"> <div :inner-html=\"fragment.fragment\"> </div> </div> <app-interface class=\"infos\"> <h3>{{ this.@model.@title }}</h3> </app-interface> </header> <div class=\"content\"> <div class=\"actions\" :v-for=\"action of this.@actions\"> <app-interface :v-link=\"action.url !== undefined ? this.@model.url + action.url : null\" :class=\"`${action.class || ''} interactable clickable activable`\"> <a :href=\"action.url !== undefined ? this.@model.url + action.url : null\" :on-click=\"this.onActionClicked(action, event)\"> {{= action.content}} </a> </app-interface> </div> <div class=\"container\" as=\"container\"></div> </div> </self> ";
// Exports
module.exports = code;

/***/ }),

/***/ 1888:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(4502);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ 5866:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Layout = __webpack_require__(6922)
const template = __webpack_require__(3574)
const setup = __webpack_require__(7403)
__webpack_require__(1888)


module.exports = class ModelLayout extends Layout {

  constructor() {
    super()
    this.on('propertyChanged:model', this.b(this.onModelChanged))
  }

  async onInit() {
    await this.onModelChanged()
  }

  async onActionClicked(action) {
    if (action.url != undefined) { return }
    await action.execute(this.model)
  }

  async onModelChanged() {
    if (!this.model) { return }
    const setupActions = Object.values(setup.actions).sort((a, b) => (b.position || 1) - (a.position || 1))
    const actions = []
    for (const action of setupActions) {
      try {
        await action?.check(this.model)
        actions.push(action)
      } catch (err) {

      }
    }
    this.actions = actions

    this.beforeHeader = (await Promise.all(
      setup.layout.header.before.map((builder) => builder(this.model))
    ))
      .filter((o) => o)
  }
}
  .define({
    name: 'model-layout',
    template,
  })
  .properties({
    actions: 'any',
    model: 'any',
    beforeHeader: 'any',
  })

/***/ })

}]);
//# sourceMappingURL=866.bundle.js.map