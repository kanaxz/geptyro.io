(self["webpackChunksools_webpack"] = self["webpackChunksools_webpack"] || []).push([[201],{

/***/ 869:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "signup-page{display:flex;width:100%;height:100%;align-items:center;justify-content:center}signup-page>.content{width:350px;padding:25px;border:1px solid #e1e1e1}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 1687:
/***/ (function(module) {

// Module
var code = "<self> <div class=\"content\"> <h3>Signup</h3> <object-form :type=\"Credentials\" :on-submit=\"this.onSubmit(event)\"> <slot name=\"bottom\"> <button class=\"submit\" type=\"submit\"> Login </button> </slot> </object-form> <a :v-link=\"'/login'\">Login</a> </div> </self>";
// Exports
module.exports = code;

/***/ }),

/***/ 191:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(869);

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

/***/ 1201:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const template = __webpack_require__(1687)
const { navigator, auth } = __webpack_require__(2372)
const Component = __webpack_require__(5468)
const Credentials = __webpack_require__(3929)

__webpack_require__(191)

module.exports = class Signup extends Component {
  async onSubmit({ object }) {
    console.log('submitting')
    await auth.signup(object)
    await navigator.navigate('/')
  }
}
  .define({
    name: 'signup-page',
    template,
  })
  .variables({
    Credentials
  })

/***/ })

}]);
//# sourceMappingURL=201.bundle.js.map