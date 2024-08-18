(self["webpackChunksools_webpack"] = self["webpackChunksools_webpack"] || []).push([[223],{

/***/ 6223:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const template = __webpack_require__(2905)
const Component = __webpack_require__(5468)
__webpack_require__(249)

module.exports = class Home extends Component {
 
  async onReady() {

  }
}
  .define({
    name: 'home-page',
    template,
  })

/***/ }),

/***/ 5267:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 2905:
/***/ (function(module) {

// Module
var code = "<self> </self>";
// Exports
module.exports = code;

/***/ }),

/***/ 249:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(5267);

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
//# sourceMappingURL=223.bundle.js.map