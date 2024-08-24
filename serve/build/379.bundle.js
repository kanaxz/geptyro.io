(self["webpackChunkgeptyro_io_client"] = self["webpackChunkgeptyro_io_client"] || []).push([[379],{

/***/ 4922:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "explorer-model-panel{display:block}explorer-model-panel .properties{padding:10px}explorer-model-panel .properties .property{background-color:#ecf0f1;padding:5px 10px;cursor:pointer;margin-bottom:10px}explorer-model-panel .properties .property:hover{background-color:rgba(53,153,219,0.3)}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 6882:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "explorer-model-panel{display:block}explorer-model-panel .properties{padding:10px}explorer-model-panel .properties .property{background-color:#ecf0f1;padding:5px 10px;cursor:pointer;margin-bottom:10px}explorer-model-panel .properties .property:hover{background-color:rgba(53,153,219,0.3)}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 7753:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "explorer-models-panel{display:block}explorer-models-panel .models{padding:10px}explorer-models-panel .models .model{background-color:#ecf0f1;cursor:pointer;margin-bottom:10px}explorer-models-panel .models .model:hover{background-color:rgba(53,153,219,0.3)}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 4767:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "model-explorer-page{display:block;height:100%;width:100%;overflow-x:auto}model-explorer-page .panels{display:flex;flex-direction:row;height:100%}model-explorer-page .panels .panel{display:flex;flex-direction:column;height:100%;width:450px;background-color:rgba(236,240,241,0.2);border-right:1px solid #e1e1e1}model-explorer-page .panels .panel header{display:flex;flex-direction:row;align-items:center;height:50px;border-bottom:1px solid #e1e1e1}model-explorer-page .panels .panel header h4{padding:10px;font-size:24px}model-explorer-page .panels .panel .content{overflow-y:auto}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 4998:
/***/ (function(module) {

// Module
var code = "<self> <model-form :on-saved=\"this.onSaved(event)\" :type=\"this.property.type\"> </model-form> </self>";
// Exports
module.exports = code;

/***/ }),

/***/ 7086:
/***/ (function(module) {

// Module
var code = "<self> <div class=\"properties\" :v-for=\"property of this.properties\"> <div class=\"property\" :on-click=\"this.openProperty(property)\"> <label>{{ property.name }}</label> </div> </div> </self>";
// Exports
module.exports = code;

/***/ }),

/***/ 4391:
/***/ (function(module) {

// Module
var code = "<self> <div class=\"models\" :v-for=\"model of this.models\"> <div class=\"model\" :on-click=\"this.openModel(model)\"> {{= this.template(model) }} </div> </div> </self>";
// Exports
module.exports = code;

/***/ }),

/***/ 7049:
/***/ (function(module) {

// Module
var code = "<self> <div class=\"panels\" :v-for=\"panel of this.panels\"> <div class=\"panel\"> <header> <h4>{{ panel.title }}</h4> </header> <div> {{= panel }} </div> </div> </div> </self>";
// Exports
module.exports = code;

/***/ }),

/***/ 3390:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(4922);

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

/***/ 4392:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(6882);

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

/***/ 703:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(7753);

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

/***/ 3033:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(4767);

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

/***/ 2379:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Component = __webpack_require__(722)
const template = __webpack_require__(7049)
const Array = __webpack_require__(6014)
const ExplorerModelPanel = __webpack_require__(4374)
__webpack_require__(3033)


module.exports = class ModelExplorerPage extends Component {
  constructor(model) {
    super()
    this.model = model
    this.panels = new Array()
    this.panels.push(new ExplorerModelPanel(this, this.model))
  }

  open(from, panel) {
    const index = this.panels.indexOf(from)
    this.panels.splice(index + 1, this.panels.length)
    this.panels.push(panel)
  }
}
  .define({
    name: 'model-explorer-page',
    template,
  })
  .properties({

  })

/***/ }),

/***/ 8246:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const template = __webpack_require__(4998)
const ExplorerPanel = __webpack_require__(100)
__webpack_require__(3390)


module.exports = class ExplorerCreateModelPanel extends ExplorerPanel {
  constructor(page, property) {
    super(page)
    this.property = property
    this.title = `Creating ${property.name} ${property.type.definition.name}`
  }

  async onInit() {
   
  }
}
  .define({
    name: 'explorer-create-model-panel',
    template,
  })

/***/ }),

/***/ 4374:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const template = __webpack_require__(7086)
const { Model, ArrayAssociation } = __webpack_require__(5079)
const ExplorerPanel = __webpack_require__(100)
const ExplorerModelsPanel = __webpack_require__(3877)
const ExplorerCreateModelPanel = __webpack_require__(8246)
__webpack_require__(4392)

const map = [
  [ArrayAssociation, ExplorerModelsPanel]
]

class ExplorerModelPanel extends ExplorerPanel {
  constructor(page, model) {
    super(page)
    this.model = model
    this.title = this.model.title
  }

  async onInit() {
    await this.model.load()
    this.properties = this.model.constructor.properties
      .filter((p) => {
        return map.find(([t]) => p.type.prototype instanceof t)
      })
  }

  openProperty(property) {
    const value = this.model[property.name]
    let panel
    if (value) {
      const [, panelType] = map.find(([t]) => value instanceof t)
      panel =new panelType(this.page, value, property.name)
    } else {
      panel = new ExplorerCreateModelPanel(this.page, property)
    }
    this.page.open(this, panel)
  }

}

map.push([Model, ExplorerModelPanel])
ExplorerModelsPanel.ExplorerModelPanel = ExplorerModelPanel
module.exports = ExplorerModelPanel
  .define({
    name: 'explorer-model-panel',
    template,
  })

/***/ }),

/***/ 3877:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const template = __webpack_require__(4391)
const ExplorerPanel = __webpack_require__(100)
const componentsService = __webpack_require__(1234)
__webpack_require__(703)


module.exports = class ExplorerModelsPanel extends ExplorerPanel {
  constructor(page, models, title) {
    super(page)
    this.models = models
    this.title = title
  }

  onInit() {

  }

  template(model) {
    const type = componentsService.get(model.constructor, 'row')
    return new type(model)
  }

  async onReady() {
    await this.models.load()
  }

  openModel(model) {
    this.page.open(this, new ExplorerModelsPanel.ExplorerModelPanel(this.page, model))
  }

}
  .define({
    name: 'explorer-models-panel',
    template,
  })

/***/ }),

/***/ 100:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Component = __webpack_require__(722)

module.exports = class ExplorerPanel extends Component {
  constructor(page){
    super()
    this.page = page
  }

}
  .define()

/***/ })

}]);
//# sourceMappingURL=379.bundle.js.map