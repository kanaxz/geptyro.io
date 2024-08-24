(self["webpackChunkgeptyro_io_client"] = self["webpackChunkgeptyro_io_client"] || []).push([[543],{

/***/ 5171:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "login-page{display:flex;width:100%;height:100%;align-items:center;justify-content:center}login-page>.content{width:350px;padding:25px;border:1px solid #e1e1e1}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 3473:
/***/ (function(module) {

// Module
var code = "<self> <div class=\"content\"> <h3>Login</h3> <a :v-link=\"'/signup'\">Signup</a> </div> </self>";
// Exports
module.exports = code;

/***/ }),

/***/ 2625:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(5171);

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

/***/ 6543:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const template = __webpack_require__(3473)
const { auth, navigator } = __webpack_require__(4934)
const Component = __webpack_require__(722)
__webpack_require__(2625)

module.exports = class Login extends Component {

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

/***/ })

}]);
//# sourceMappingURL=543.bundle.js.map