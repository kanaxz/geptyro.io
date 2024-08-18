(self["webpackChunksools_webpack"] = self["webpackChunksools_webpack"] || []).push([[502],{

/***/ 8098:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "login-page{display:flex;width:100%;height:100%;align-items:center;justify-content:center}login-page>.content{width:350px;padding:25px;border:1px solid #e1e1e1}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 6486:
/***/ (function(module) {

// Module
var code = "<self> <div class=\"content\"> <h3>Login</h3> <object-form :type=\"Credentials\" :on-submit=\"this.onSubmit(event)\"> <slot name=\"bottom\"> <button class=\"submit\" type=\"submit\"> Login </button> </slot> </object-form> <a :v-link=\"'/signup'\">Signup</a> </div> </self>";
// Exports
module.exports = code;

/***/ }),

/***/ 5528:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(8098);

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

/***/ 7502:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const template = __webpack_require__(6486)
const { auth, navigator } = __webpack_require__(2372)
const Component = __webpack_require__(5468)
const Credentials = __webpack_require__(3929)
__webpack_require__(5528)

module.exports = class Home extends Component {

  onInit() {

  }

  async onSubmit({ object }) {
    console.trace('onSubmit')

    await auth.login(object)
    await navigator.navigate('/')
  }
}
  .define({
    name: 'login-page',
    template,
  })
  .variables({
    Credentials
  })

/***/ })

}]);
//# sourceMappingURL=502.bundle.js.map