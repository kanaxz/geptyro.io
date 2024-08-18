(self["webpackChunksools_webpack"] = self["webpackChunksools_webpack"] || []).push([[890],{

/***/ 9686:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "model-edit-page{display:block;padding:15px;height:100%;width:100%;overflow-y:auto}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 2198:
/***/ (function(module) {

// Module
var code = "<self> <model-form :on-saved=\"this.onSaved(event)\" :model=\"this.model\" :type=\"this.model.constructor\"> </model-form> </self>";
// Exports
module.exports = code;

/***/ }),

/***/ 6816:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(9686);

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

/***/ 6890:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Component = __webpack_require__(5468)
const template = __webpack_require__(2198)
const { navigator } = __webpack_require__(2372)
__webpack_require__(6816)

module.exports = class ModelEditPage extends Component {
  constructor(model){
    super()
    this.model = model
  }
  async onSaved({ model }) {
    await navigator.navigate(model.url)
  }

}
  .define({
    name: 'model-edit-page',
    template,
  })

/***/ })

}]);
//# sourceMappingURL=890.bundle.js.map