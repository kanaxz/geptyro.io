(self["webpackChunkgeptyro_io_client"] = self["webpackChunkgeptyro_io_client"] || []).push([[444],{

/***/ 5912:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "model-edit-page{display:block;padding:15px;height:100%;width:100%;overflow-y:auto}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 3484:
/***/ (function(module) {

// Module
var code = "<self> <model-form :on-saved=\"this.onSaved(event)\" :model=\"this.model\" :type=\"this.model.constructor\"> </model-form> </self>";
// Exports
module.exports = code;

/***/ }),

/***/ 2462:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(5912);

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

/***/ 444:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Component = __webpack_require__(722)
const template = __webpack_require__(3484)
const { navigator } = __webpack_require__(4934)
__webpack_require__(2462)

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
//# sourceMappingURL=444.bundle.js.map