(self["webpackChunkgeptyro_io_client"] = self["webpackChunkgeptyro_io_client"] || []).push([[863],{

/***/ 57863:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const template = __webpack_require__(83253)
const Component = __webpack_require__(50722)
const pages = __webpack_require__(16031)
__webpack_require__(52685)

module.exports = class Home extends Component {

  async onReady() {

  }
}
  .define({
    name: 'home-page',
    template,
  })
  .variables({
    pages
  })

/***/ }),

/***/ 57611:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(40935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "home-page{display:block;padding:10px}home-page>h1{font-size:32px}home-page .pages{display:flex;flex-direction:row}home-page .pages .page{background-size:contain;background-repeat:no-repeat;background-position:center;display:block;width:300px;height:175px;border:1px solid #e1e1e1;margin-right:10px;margin-bottom:10px;position:relative}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 83253:
/***/ (function(module) {

// Module
var code = "<self> <h1>Applications</h1> <div class=\"pages\" :v-for=\"page of pages\"> <a class=\"page\" :href=\"page.url\" :target=\"page.target\" :style=\"page.style\" :style.background-image=\"`url(${page.image})`\"> </a> </div> </self>";
// Exports
module.exports = code;

/***/ }),

/***/ 52685:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(72591);
            var content = __webpack_require__(57611);

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
//# sourceMappingURL=863.bundle.js.map