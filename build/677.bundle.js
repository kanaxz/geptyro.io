(self["webpackChunksools_webpack"] = self["webpackChunksools_webpack"] || []).push([[677],{

/***/ 1677:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const template = __webpack_require__(2855)
const Component = __webpack_require__(5468)
__webpack_require__(1767)

module.exports = class EmptyPage extends Component {

  async onInit() {
   
  }
}
  .define({
    name: 'empty-page',
    template,
  })
  .properties({
    name: 'any',
  })



/***/ }),

/***/ 9001:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "empty-page{display:block;width:100%;height:100%}empty-page .root{transform-style:preserve-3d;transform:rotateX(10deg) rotateY(10deg)}empty-page .element{width:fit-content;height:fit-content;position:relative;margin:100px;perspective:550px;transform-style:preserve-3d;transform:translateZ(10px);background-color:rgba(255,255,255,0.2);padding:5px;transition-duration:0.2s}empty-page .element:hover{transform:translateZ(30px)}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 2855:
/***/ (function(module) {

// Module
var code = "<self> <model-render style=\"width:100%;height:100%\" :model=\"this.entity\"></model-render> </self> ";
// Exports
module.exports = code;

/***/ }),

/***/ 1767:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(9001);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ })

}]);
//# sourceMappingURL=677.bundle.js.map