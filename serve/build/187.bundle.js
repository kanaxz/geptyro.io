(self["webpackChunkgeptyro_io_client"] = self["webpackChunkgeptyro_io_client"] || []).push([[187],{

/***/ 45187:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const template = __webpack_require__(48457)
const Component = __webpack_require__(50722)
__webpack_require__(49313)

module.exports = class NotFound extends Component {

}.define({
  name: 'not-found-page',
  template,
})

/***/ }),

/***/ 11567:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(40935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "not-found-page{display:flex;height:100%;width:100%;align-items:center;justify-content:center}not-found-page>div{border:3px solid #2980b9;background-color:#202a44;padding:35px;min-width:350px;min-height:250px}not-found-page>div>p{border-top:3px solid #fff;background-color:rgba(255,255,255,0.3);padding:10px;color:#fff;font-size:27px}not-found-page>div>p>span{display:block;width:100%}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 48457:
/***/ (function(module) {

// Module
var code = "<self> <div> <p> <span>ERROR - Not found (CODE 30000) </span> <span>The Page you tried to access was not found </span> <span>If the problem persist please contact the administration</span> </p> </div> </self> ";
// Exports
module.exports = code;

/***/ }),

/***/ 49313:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(72591);
            var content = __webpack_require__(11567);

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
//# sourceMappingURL=187.bundle.js.map