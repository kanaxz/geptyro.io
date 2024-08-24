/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 4264:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(4205)
const starborRouter = __webpack_require__(3956)

const template = __webpack_require__(2560)
const Root = __webpack_require__(2338)
const { auth, navigator } = __webpack_require__(1109)
__webpack_require__(3738)


module.exports = class App extends Root {

  async start() {
    document.body.appendChild(this)

    this.router.use(starborRouter)

    navigator.use(this.router)
    await super.start()
    await navigator.start()
  }

}
  .define({
    name: 'geptyro-io-app',
    template,
  })

/***/ }),

/***/ 5789:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Component = __webpack_require__(722)
const template = __webpack_require__(8695)
__webpack_require__(6007)
const sound = __webpack_require__(7597)

let clicked = false
window.addEventListener('click', () => {
  clicked = true
})

module.exports = class StarborInterface extends Component {
  onReady() {
    this.addEventListener('animationend', () => {
      this.classList.remove('start')
    })
    if (this.classList.contains('interactable')) {
      this.audio = new Audio(sound)
      this.audio.volume = 0.3
      this.addEventListener('mouseenter', this.b(this.onMouseEnter))
    }

    if (this.classList.contains('clickable')) {
      this.addEventListener('click', this.b(this.onClick))
    }
  }

  playAudio() {
    if (!clicked) { return }
    this.audio.currentTime = 0
    this.audio.play()
  }

  onClick() {
    this.playAudio()
    this.classList.remove('clicked')

    setTimeout(() => {
      this.classList.add('clicked')
    })
  }

  onMouseEnter() {
    this.playAudio()
  }

  destroy() {
    //this.classList.add('destroy')
    super.destroy()
  }
}
  .define({
    name: 'app-interface',
    template,
  })

/***/ }),

/***/ 2825:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const template = __webpack_require__(1199)
const BaseLoader = __webpack_require__(5146)
__webpack_require__(8255)

module.exports = class Loader extends BaseLoader {

}
  .define({
    name: 'app-loader',
    template,
  })

/***/ }),

/***/ 8384:
/***/ (function(module) {

module.exports = {
  api: {
    url: `https://api.${"geptyro.io"}:${"11002"}`,
  }
}

/***/ }),

/***/ 1109:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const AuthService = __webpack_require__(335)
const NotificationsService = __webpack_require__(5203)
const global = __webpack_require__(4934)
const Navigator = __webpack_require__(8917)
const MenuService = __webpack_require__(2659)
const config = __webpack_require__(8384)

Object.assign(global, {
  auth: new AuthService(config.api.url),
  notifications: new NotificationsService(),
  navigator: new Navigator(),
  menu: new MenuService(),
})

module.exports = global


/***/ }),

/***/ 3170:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Layout = __webpack_require__(5624)
const template = __webpack_require__(3934)
__webpack_require__(5771)

module.exports = class Empty extends Layout {

}.define({
  name: 'empty-layout',
  template,
})

/***/ }),

/***/ 7808:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Layout = __webpack_require__(5624)
const template = __webpack_require__(1052)
__webpack_require__(2478)
__webpack_require__(9408)
const { auth, menu } = __webpack_require__(4934)

module.exports = class Main extends Layout {
  constructor() {
    super()
    this.menus = Array.from(Array(9)) 
  }
}
  .define({
    name: 'app-layout-main',
    template,
  })
  .variables({
    auth,
    menu,
  })
  .properties({
    open: 'any'
  })
  .localStorage({
    name: 'main',
    properties: ['open'],
  })

/***/ }),

/***/ 5167:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const LayoutRouter = __webpack_require__(9954)

const router = new LayoutRouter({
  layout: __webpack_require__(3170)
})

router.route('/empty', async (req, res) => {
  await res.page(__webpack_require__.e(/* import() */ 125).then(__webpack_require__.t.bind(__webpack_require__, 1125, 23)))
})

module.exports = router

/***/ }),

/***/ 9835:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const LayoutRouter = __webpack_require__(9954)
const router = new LayoutRouter({
  layout: __webpack_require__(7808)
})

router.route(/^\/$/, (req, res) => {
  res.page(__webpack_require__.e(/* import() */ 863).then(__webpack_require__.t.bind(__webpack_require__, 7863, 23)))
})

router.route('/code-30000', (req, res) => {
  res.page(__webpack_require__.e(/* import() */ 187).then(__webpack_require__.t.bind(__webpack_require__, 5187, 23)))
})

router.route('/not-found', (req, res) => {
  res.navigate('/code-30000', true)
})

/*
router.use((req, res) => {
  res.navigate('/not-found')
})
*/

module.exports = router

/***/ }),

/***/ 3956:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const authRouter = __webpack_require__(2349)
const ModelingRouter = __webpack_require__(3683)
const Router = __webpack_require__(9240)
const mainLayoutRouter = __webpack_require__(9835)
const emptyLayoutRouter = __webpack_require__(5167)

emptyLayoutRouter.use(authRouter)
mainLayoutRouter.use(new ModelingRouter())

const router = new Router()

router.use(mainLayoutRouter)
router.use(emptyLayoutRouter)

router.use((req, res) => {
  res.navigate('/code-30000', true)
})

module.exports = router


/***/ }),

/***/ 4205:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

const config = __webpack_require__(8384)

// hedera
__webpack_require__(9840)
__webpack_require__(1351)
__webpack_require__(6980)
__webpack_require__(9924)

const global = __webpack_require__(1109)
const Loader = __webpack_require__(2825)
const Interface = __webpack_require__(5789)
const { buildCollections } = __webpack_require__(999)
buildCollections(config.api.url)

Object.assign(global.components, {
  Loader,
  Interface,
})

global.menu.links.push({
  label: 'Home',
  class: 'fa-solid fa-house',
  url: '/',
})

// index
__webpack_require__(6985)
__webpack_require__(9486)
__webpack_require__(6533)


// local sources
__webpack_require__(2234)

/***/ }),

/***/ 6660:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(8226);

/***/ }),

/***/ 8427:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4345);
var settle = __webpack_require__(6435);
var cookies = __webpack_require__(5905);
var buildURL = __webpack_require__(3025);
var buildFullPath = __webpack_require__(3916);
var parseHeaders = __webpack_require__(6135);
var isURLSameOrigin = __webpack_require__(6923);
var createError = __webpack_require__(1792);
var transitionalDefaults = __webpack_require__(3201);
var Cancel = __webpack_require__(9945);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;
    var onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
        request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
      var transitional = config.transitional || transitionalDefaults;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(
        timeoutErrorMessage,
        config,
        transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = function(cancel) {
        if (!request) {
          return;
        }
        reject(!cancel || (cancel && cancel.type) ? new Cancel('canceled') : cancel);
        request.abort();
        request = null;
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ 8226:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4345);
var bind = __webpack_require__(5063);
var Axios = __webpack_require__(9560);
var mergeConfig = __webpack_require__(4816);
var defaults = __webpack_require__(6075);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(9945);
axios.CancelToken = __webpack_require__(5912);
axios.isCancel = __webpack_require__(6945);
axios.VERSION = (__webpack_require__(9978).version);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(8127);

// Expose isAxiosError
axios.isAxiosError = __webpack_require__(6187);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports["default"] = axios;


/***/ }),

/***/ 9945:
/***/ (function(module) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ 5912:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(9945);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;

  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;

  // eslint-disable-next-line func-names
  this.promise.then(function(cancel) {
    if (!token._listeners) return;

    var i;
    var l = token._listeners.length;

    for (i = 0; i < l; i++) {
      token._listeners[i](cancel);
    }
    token._listeners = null;
  });

  // eslint-disable-next-line func-names
  this.promise.then = function(onfulfilled) {
    var _resolve;
    // eslint-disable-next-line func-names
    var promise = new Promise(function(resolve) {
      token.subscribe(resolve);
      _resolve = resolve;
    }).then(onfulfilled);

    promise.cancel = function reject() {
      token.unsubscribe(_resolve);
    };

    return promise;
  };

  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Subscribe to the cancel signal
 */

CancelToken.prototype.subscribe = function subscribe(listener) {
  if (this.reason) {
    listener(this.reason);
    return;
  }

  if (this._listeners) {
    this._listeners.push(listener);
  } else {
    this._listeners = [listener];
  }
};

/**
 * Unsubscribe from the cancel signal
 */

CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
  if (!this._listeners) {
    return;
  }
  var index = this._listeners.indexOf(listener);
  if (index !== -1) {
    this._listeners.splice(index, 1);
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ 6945:
/***/ (function(module) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ 9560:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4345);
var buildURL = __webpack_require__(3025);
var InterceptorManager = __webpack_require__(546);
var dispatchRequest = __webpack_require__(1617);
var mergeConfig = __webpack_require__(4816);
var validator = __webpack_require__(6552);

var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(configOrUrl, config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof configOrUrl === 'string') {
    config = config || {};
    config.url = configOrUrl;
  } else {
    config = configOrUrl || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var transitional = config.transitional;

  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean),
      forcedJSONParsing: validators.transitional(validators.boolean),
      clarifyTimeoutError: validators.transitional(validators.boolean)
    }, false);
  }

  // filter out skipped interceptors
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });

  var promise;

  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];

    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);

    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }


  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ 546:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4345);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ 3916:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(4860);
var combineURLs = __webpack_require__(7825);

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ 1792:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(7148);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ 1617:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4345);
var transformData = __webpack_require__(7638);
var isCancel = __webpack_require__(6945);
var defaults = __webpack_require__(6075);
var Cancel = __webpack_require__(9945);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new Cancel('canceled');
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ 7148:
/***/ (function(module) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  };
  return error;
};


/***/ }),

/***/ 4816:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4345);

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(prop) {
    if (prop in config2) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  var mergeMap = {
    'url': valueFromConfig2,
    'method': valueFromConfig2,
    'data': valueFromConfig2,
    'baseURL': defaultToConfig2,
    'transformRequest': defaultToConfig2,
    'transformResponse': defaultToConfig2,
    'paramsSerializer': defaultToConfig2,
    'timeout': defaultToConfig2,
    'timeoutMessage': defaultToConfig2,
    'withCredentials': defaultToConfig2,
    'adapter': defaultToConfig2,
    'responseType': defaultToConfig2,
    'xsrfCookieName': defaultToConfig2,
    'xsrfHeaderName': defaultToConfig2,
    'onUploadProgress': defaultToConfig2,
    'onDownloadProgress': defaultToConfig2,
    'decompress': defaultToConfig2,
    'maxContentLength': defaultToConfig2,
    'maxBodyLength': defaultToConfig2,
    'transport': defaultToConfig2,
    'httpAgent': defaultToConfig2,
    'httpsAgent': defaultToConfig2,
    'cancelToken': defaultToConfig2,
    'socketPath': defaultToConfig2,
    'responseEncoding': defaultToConfig2,
    'validateStatus': mergeDirectKeys
  };

  utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    var merge = mergeMap[prop] || mergeDeepProperties;
    var configValue = merge(prop);
    (utils.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
};


/***/ }),

/***/ 6435:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(1792);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ 7638:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4345);
var defaults = __webpack_require__(6075);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  var context = this || defaults;
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });

  return data;
};


/***/ }),

/***/ 6075:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4345);
var normalizeHeaderName = __webpack_require__(2327);
var enhanceError = __webpack_require__(7148);
var transitionalDefaults = __webpack_require__(3201);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(8427);
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(8427);
  }
  return adapter;
}

function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

var defaults = {

  transitional: transitionalDefaults,

  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data) || (headers && headers['Content-Type'] === 'application/json')) {
      setContentTypeIfUnset(headers, 'application/json');
      return stringifySafely(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional || defaults.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw enhanceError(e, this, 'E_JSON_PARSE');
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;


/***/ }),

/***/ 3201:
/***/ (function(module) {

"use strict";


module.exports = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};


/***/ }),

/***/ 9978:
/***/ (function(module) {

module.exports = {
  "version": "0.26.1"
};

/***/ }),

/***/ 5063:
/***/ (function(module) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ 3025:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4345);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ 7825:
/***/ (function(module) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ 5905:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4345);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ 4860:
/***/ (function(module) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ 6187:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4345);

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return utils.isObject(payload) && (payload.isAxiosError === true);
};


/***/ }),

/***/ 6923:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4345);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ 2327:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4345);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ 6135:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4345);

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ 8127:
/***/ (function(module) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ 6552:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var VERSION = (__webpack_require__(9978).version);

var validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

var deprecatedWarnings = {};

/**
 * Transitional option validator
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return function(value, opt, opts) {
    if (validator === false) {
      throw new Error(formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')));
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new TypeError('options must be an object');
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator = schema[opt];
    if (validator) {
      var value = options[opt];
      var result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new TypeError('option ' + opt + ' must be ' + result);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw Error('Unknown option ' + opt);
    }
  }
}

module.exports = {
  assertOptions: assertOptions,
  validators: validators
};


/***/ }),

/***/ 4345:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(5063);

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return Array.isArray(val);
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return toString.call(val) === '[object FormData]';
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return toString.call(val) === '[object URLSearchParams]';
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};


/***/ }),

/***/ 4212:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "starbor-app{width:100%;height:100%;display:block}starbor-app .background{position:absolute;z-index:-9999;top:0;left:0;filter:blur(10px) brightness(0.5);height:100%;width:100%;transition-duration:0.2s;background-position:center;background-repeat:no-repeat;background-size:cover}starbor-app>.container{width:100%;height:100%;display:block}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 4057:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, ".app-interface{display:block;position:relative;transform-style:preserve-3d;transition-duration:0.1s;width:fit-content;height:fit-content}.app-interface.start{transition-duration:0.1s;animation-name:appear;animation-duration:0.5s;animation-iteration-count:1;animation-timing-function:ease;animation-fill-mode:forwards}@keyframes appear{0%{transform:scale(0) rotateX(-5deg) rotateY(10deg)}100%{transform:scale(1) rotateX(-5deg) rotateY(10deg) translateZ(0)}}.app-interface>.content{transform-style:preserve-3d;transition-duration:0.1s}.app-interface.interactable{cursor:pointer}.app-interface.interactable.active,.app-interface.interactable.loading,.app-interface.interactable:hover{transform:rotateX(-4deg) rotateY(15deg) !important}.app-interface.interactable.active>.content,.app-interface.interactable.loading>.content,.app-interface.interactable:hover>.content{transform:translateZ(50px)}.app-interface.activable.active>.content,.app-interface.activable:hover>.content{background:green}.app-interface.loading>.content{animation-name:background;animation-duration:0.5s;animation-iteration-count:infinite;animation-timing-function:ease;animation-fill-mode:forwards}@keyframes background{0%{background:none}20%{background:red}40%{background:none}50%{background:red}60%{background:none}}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 1397:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "app-loader{z-index:1;display:flex;position:absolute;top:0;left:0;width:100%;height:100%;background-color:rgba(255,255,255,0.5);align-items:center;justify-content:center}app-loader .loader{border:8px solid #f3f3f3;border-top:8px solid #3498db;border-radius:50%;width:120px;height:120px;animation:spin 2s linear infinite}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 2014:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "empty-layout{display:block;width:100%;height:100%}empty-layout>.container{width:100%;height:100%}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 7244:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "app-layout-main{width:100%;height:100%;overflow:hidden;display:flex;flex-direction:column;padding:20px}app-layout-main>.top-bar{height:50px;width:100%;padding-right:30px;display:flex;flex-direction:row;align-items:center}app-layout-main>.top-bar .left{flex:1;display:flex;flex-direction:row;align-items:center}app-layout-main>.top-bar .left>a{display:flex;flex-direction:row;align-items:center}app-layout-main>.top-bar .left>a>*{cursor:pointer}app-layout-main>.top-bar .logo{margin-left:15px;width:35px}app-layout-main>.top-bar .logo .projection-shadow,app-layout-main>.top-bar .logo .content{border-radius:100%}app-layout-main>.top-bar .logo img{width:100%}app-layout-main>.top-bar .title{position:relative;margin-left:7px}app-layout-main>.top-bar .title h3{text-transform:uppercase;font-weight:700;padding:5px;color:#fff}app-layout-main>.top-bar search-bar{z-index:1;margin-left:50px}app-layout-main>.row{width:100%;flex:1;display:flex;flex-direction:row;overflow:auto}app-layout-main>.row>.left-bar{width:250px;height:100%;transition-duration:0.2s}app-layout-main>.row>.left-bar .menu{width:100%;height:100%;padding:5px;display:inline-block}app-layout-main>.row>.left-bar .menu app-interface{margin:10px;width:calc(100% - 20px)}app-layout-main>.row>.left-bar .menu app-interface .content{display:flex;flex-direction:row;cursor:pointer;color:#fff;padding:10px}app-layout-main>.row>.left-bar .menu app-interface .content .image{width:17px;height:17px}app-layout-main>.row>.left-bar .menu app-interface .content .image svg{width:100%;height:100%}app-layout-main>.row>.left-bar .menu app-interface .content label{margin-left:20px;flex:1}app-layout-main>.row .outer-container{position:relative;padding:30px;flex:1}app-layout-main>.row .outer-container>.container{width:100%;height:100%}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 7984:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 5236:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "user-menu{display:block;color:#fff}user-menu.has-user{position:relative}user-menu.has-user .logged-in{display:block}user-menu.has-user .logged-out{display:none}user-menu .logged-in{display:none}user-menu .logged-in.is-open .list{display:flex;flex-direction:column;align-items:center;margin-top:10px;width:100%}user-menu .logged-in .list{display:none;position:absolute}user-menu .logged-in .list a{padding-bottom:5px}user-menu .logged-in .list a:hover{font-weight:bold;cursor:pointer}user-menu .logged-in header{border:2px solid #55c;padding:5px 10px;display:flex;align-items:center;justify-content:center;transition-duration:0.1s;cursor:pointer}user-menu .logged-in header label{position:relative;text-transform:uppercase;font-weight:500;font-size:20px}user-menu .logged-in header:hover{background-color:rgba(85,85,204,0.1)}user-menu .logged-out{display:block;background-color:#55c;color:#fff}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 2377:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 9004:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, ".action{color:#fff}.action.warning{background-color:#c55;color:#fff}.action.active,.action:hover{background-color:#3599db;color:#fff}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 4989:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "tool-tip{display:none;position:absolute;z-index:10;background-color:#e1e1e1;border:1px solid rgba(225,225,225,0.5);width:max-content;padding:5px;top:0;left:calc(100% + 10px)}tool-tip.show{display:block}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 3301:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "context-menu{display:none;position:absolute;min-width:200px;background:#fff;border:1px solid #e1e1e1;border-bottom:none;box-shadow:10px 5px 5px #e1e1e1;transform:translateY(100%)}context-menu.open{display:flex;flex-direction:column}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 5058:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "context-menu-item{display:block;width:100%;padding:5px;border-bottom:1px solid #e1e1e1;cursor:pointer}context-menu-item:hover,context-menu-item.selected{background-color:rgba(52,152,219,0.3)}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 8347:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "editable-grid{display:block;width:100%;height:100%}editable-grid.hover .object{pointer-events:none}editable-grid .root{width:100%;height:100%}editable-grid .root .column{height:100%;display:flex;flex-direction:column}editable-grid .root .column .row{width:100%;height:100%;display:flex;flex-direction:row;flex:1}editable-grid .root .column .row.hover.left::before{content:\" \";background-color:aquamarine;width:50px;height:100%}editable-grid .root .column .row.hover.right::after{content:\" \";background-color:aquamarine;width:50px;height:100%}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 2359:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, ".grid-panel{display:flex;width:100%;height:100%;flex-direction:column}.grid-panel:not(:last-child){border-right:1px solid #e1e1e1}.grid-panel>header{height:35px;display:flex;flex-direction:row}.grid-panel>.content{flex:1;position:relative}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 4800:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "grid-tab-panel>header .tabs{display:flex;flex-direction:row}grid-tab-panel>header .tabs .tab{padding:5px 10px;display:flex;flex-direction:row;align-items:center;border-right:1px solid #e1e1e1;cursor:pointer}grid-tab-panel>header .tabs .tab.current{background-color:#e1e1e1}grid-tab-panel>header .tabs .tab.selected.current,grid-tab-panel>header .tabs .tab:hover{background-color:aquamarine}grid-tab-panel>header .tabs .tab:hover>div,grid-tab-panel>header .tabs .tab.selected>div{visibility:visible}grid-tab-panel>header .tabs .tab>div{padding:5px;display:flex;visibility:hidden;align-items:center;justify-content:center;margin-left:10px}grid-tab-panel>header .tabs .tab>div:hover{background-color:rgba(255,255,255,0.3)}grid-tab-panel>.content>.container{width:100%;height:100%}grid-tab-panel>.content>.container .object{width:100%;height:100%}grid-tab-panel>.content>.container .hover{display:none;position:absolute;transition-duration:0.1s;background:rgba(127,255,212,0.3);pointer-events:none}grid-tab-panel>.content>.container .hover.left{left:0;top:0;width:50%;height:100%}grid-tab-panel>.content>.container .hover.right{left:50%;top:0;width:50%;height:100%}grid-tab-panel>.content>.container .hover.top{left:0;top:0;width:100%;height:50%}grid-tab-panel>.content>.container .hover.bottom{left:0;top:50%;width:100%;height:50%}grid-tab-panel>.content>.container .hover.full{left:0;top:0;width:100%;height:100%}grid-tab-panel>.content>.container .hover.visible{display:block}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 7644:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "ui-root{width:100%;height:100%}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 3337:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "mo-dal{display:none;border:1px solid #e1e1e1;background-color:#fff;min-height:200px;min-width:350px;padding:15px}mo-dal>header{position:relative;display:flex;flex-direction:row;align-items:center;height:30px}mo-dal>header .title{display:block;font-size:23px;flex:1}mo-dal .actions{position:absolute;top:0;right:0}mo-dal .actions div{display:flex;flex-direction:column;align-items:center;justify-content:center;width:30px;height:30px;cursor:pointer}mo-dal .actions div:hover{background-color:#e1e1e1}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 164:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "modal-container{position:absolute;width:100%;height:100%;top:0;left:0;display:none;flex-direction:column;align-items:center;justify-content:center}modal-container.has-modal{display:flex;background-color:rgba(128,128,128,0.5)}modal-container mo-dal{display:block !important}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 6519:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "short-cut{cursor:pointer;padding:7px 10px;font-size:15px;width:100%;display:flex;flex-direction:row;align-items:center}short-cut:hover{background-color:#e1e1e1}short-cut .key-container{flex:1}short-cut .key-container .key{width:fit-content;display:flex;flex-direction:row;align-items:center;justify-content:center;background-color:#e1e1e1;padding:5px 10px;text-transform:uppercase;outline:2px outset #b1b1b1;font-weight:700;font-size:16px}short-cut .transclude{margin-left:10px;text-transform:uppercase;font-weight:600}short-cut:not(:last-child){border-bottom:1px solid #e1e1e1}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 4200:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "body.shortcut short-cuts{display:flex}short-cuts{display:none;flex-direction:column;align-items:start;position:absolute;border:1px solid #e1e1e1;top:0;left:calc(100% + 10px);background-color:#fff;z-index:11}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 3821:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, ".model-card{position:relative;display:flex;flex-direction:column;width:250px;height:150px;align-items:stretch;cursor:pointer;transform-style:preserve-3d}.model-card.selected header{background-color:aquamarine}.model-card header{flex:0 0 auto;display:flex;flex-direction:row;align-items:center;width:100%;padding:5px 10px;background-color:rgba(255,255,255,0.3)}.model-card header label{text-transform:uppercase;font-weight:500}.model-card .content{width:100%;height:121px;transform-style:preserve-3d}.model-card .content img{width:100%;height:100%;object-fit:cover;background-color:black}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 5162:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "model-filters-any{width:fit-content;display:block;min-width:150px;border:1px solid #e1e1e1;height:100%}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 2935:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "model-filters{display:block}model-filters>.input{background-color:#fff;height:40px;padding:5px}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 8148:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "model-search{display:block}model-search input{width:100%}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 6361:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, ".model-row{cursor:pointer;padding:7px;padding-left:5px;display:flex;flex-direction:row;align-items:center;min-height:30px;border-radius:2px;font-size:12px;font-weight:600;text-transform:uppercase;height:30px;width:fit-content;min-width:150px}.model-row img,.model-row svg,.model-row .icon{margin-right:7px}.model-row img,.model-row svg{height:100%}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 2244:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "search-bar{position:relative;display:block;width:fit-content}search-bar .search-bar{display:flex;flex-direction:row;align-items:stretch;width:fit-content;cursor:pointer}search-bar .search-bar .search-icon,search-bar .search-bar .informations{display:flex;align-items:center}search-bar .search-bar .search-icon{padding:5px 10px;background-color:#b1b1b1}search-bar .search-bar input{font-size:18px;border:none;padding:2px;min-width:300px}search-bar .search-bar input:hover{border-color:#55c}search-bar .search-bar .x{display:flex;align-items:center;padding:5px 7px}search-bar .search-bar .x.empty svg{visibility:hidden}search-bar .search-bar .x:not(.empty):hover{background-color:#c55;color:#fff}search-bar .search-bar .x svg{width:20px;height:20px}search-bar .search-bar .informations{padding:0 14px;background-color:#55c}search-bar .search-bar .informations svg{color:#fff}search-bar .search-bar:hover .search-icon svg{color:#55c}search-bar .searchables{display:none;z-index:10;position:absolute;top:100%;min-width:100%;transform-style:preserve-3d}search-bar .searchables>.background{position:absolute;left:0;top:0;width:100%;height:100%;transform:translateZ(-10px);background-color:rgba(0,0,0,0.5)}search-bar .searchables .list{display:flex;flex-direction:column;flex-wrap:wrap;width:100%;max-height:500px}search-bar .searchables .list .searchable{width:100%}search-bar .searchables .list .searchable.hide{display:none}search-bar .searchables .list .searchable.error header{background-color:rgba(204,85,85,0.5)}search-bar .searchables .list .searchable.error header .icon{display:block}search-bar .searchables .list .searchable header{padding:3px 5px;display:flex;flex-direction:row;align-items:center}search-bar .searchables .list .searchable header label{font-size:18px;text-transform:capitalize;flex:1}search-bar .searchables .list .searchable header .icon{position:relative;display:none;color:#c55;margin-right:15px;cursor:pointer}search-bar .searchables .list .searchable .results>a>*{width:100%}search-bar .searchables .list .searchable .results>*{display:block;margin:2px}search-bar.open .searchables{display:flex}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 9276:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 9472:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 7412:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, ".field.disabled{display:none}.field.hidden{display:none}.field>header{display:flex;flex-direction:row;align-items:center}.field>header>label{display:block;font-size:18px;font-weight:500;text-transform:uppercase}.field.hidden{display:none}.field.required>header{display:flex;flex-direction:row;align-items:center}.field.required>header>label::after{margin-left:5px;content:\"*\";color:red}.field>.errors .error{background-color:rgba(204,85,85,0.3);color:#c55;padding:5px;border-radius:5px;margin-top:5px}.field>.messages .message{background-color:rgba(85,85,204,0.3);color:#55c;padding:5px;border-radius:5px;margin-top:5px;cursor:pointer}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 6183:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "markdown-field{flex:100% !important}markdown-field textarea{width:100%;height:400px}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 8767:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "number-field input{width:100%}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 5073:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "text-field input{width:100%}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 6608:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "child-model-form{width:100%}child-model-form>form>.bottom{display:flex;flex-direction:row;width:fit-content;margin-left:auto;margin-right:0}child-model-form>form>.bottom .submit{display:block}child-model-form>form>.bottom .edit{display:none}child-model-form>form>.bottom .cancel{display:none}child-model-form>form>.bottom .delete{display:none}child-model-form>form>.bottom button{font-size:26px;padding:5px;margin-left:5px}child-model-form.read>form>.bottom .submit{display:none}child-model-form.editable.read>form>.bottom .edit{display:block}child-model-form.editable.edit>form>.bottom .cancel{display:block}child-model-form.deletable>form>.bottom .delete{display:block}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 8126:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "model-field{display:block}model-field .inner{position:relative;display:flex;flex-direction:row;align-items:center;height:40px}model-field .inner .input{display:flex;flex:1;flex-direction:row;align-items:center;border:1px solid #e1e1e1;background-color:#fff;height:100%;padding:5px}model-field .inner .input .value{width:100%}model-field .inner .input .value .model-row{width:100%}model-field .inner .input input{display:none;border:none;height:100%;width:100%}model-field .inner .input .close{margin:2px;cursor:pointer;padding:4px 7px}model-field .inner .input .close:hover{background-color:rgba(204,85,85,0.4)}model-field .inner .create{padding:4px 12px;height:100%;font-size:19px}model-field .suggestions{position:absolute;top:100%;width:100%;background-color:#fff;border:1px solid #e1e1e1;z-index:9999}model-field .suggestions .suggestion{margin:5px}model-field.empty .inner .input .value,model-field.edit .inner .input .value{display:none}model-field.empty .inner .input input,model-field.edit .inner .input input{display:block}model-field.empty .inner .input .close,model-field.edit .inner .input .close{display:none}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 8088:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "model-form{width:100%}model-form.disable-nested .breadcrumb{display:none}model-form .breadcrumb{display:flex;flex-direction:row;align-items:center}model-form .breadcrumb div label{display:inline-block;cursor:pointer;padding:5px}model-form .breadcrumb div:not(:last-child)::after{font-size:22px;font-weight:bold;content:\">\";margin:5px}model-form .forms child-model-form:not(:last-child){display:none}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 6390:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "object-fieldset{display:block;width:100% !important;flex:100% !important}object-fieldset:not(.empty)>header select{display:block}object-fieldset:not(.empty)>header .create{display:none}object-fieldset:not(.empty)>header .delete{display:block}object-fieldset:not(.empty)>.main>fieldset{display:flex}object-fieldset.required>header .delete{display:none}object-fieldset.one-option.required>header select{display:none}object-fieldset>header select{display:none;margin-left:10px;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;border:none;padding:5px;background:none;font-size:17px;border:1px solid transparent}object-fieldset>header select:hover,object-fieldset>header select:focus{border-color:#e1e1e1;background-color:#fff;-webkit-appearance:menulist;-moz-appearance:menulist}object-fieldset>header .create,object-fieldset>header .delete{margin-left:5px;display:flex;cursor:pointer;align-items:center;justify-content:center;padding:5px;background-color:#fff;border:1px solid #e1e1e1}object-fieldset>header .create:hover,object-fieldset>header .delete:hover{background-color:rgba(127,255,212,0.3)}object-fieldset>header .delete{display:none}object-fieldset>.main>fieldset{display:none;margin-top:5px;padding:15px;flex-direction:row;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:12px}object-fieldset>.main>fieldset>*{flex:1 1 450px}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 776:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(935);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, ".object-form{display:block;width:100%}.object-form>form{width:100%}.object-form>form>.bottom{display:flex;flex-direction:row;width:fit-content;margin-left:auto;margin-right:0}.object-form>form>.bottom .submit{display:block}.object-form.read>form>.bottom .submit{display:none}.object-form.editable.read>form>.bottom .edit{display:block}.object-form.editable.edit>form>.bottom .cancel{display:block}.object-form.deletable>form>.bottom .delete{display:block}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 935:
/***/ (function(module) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ 2560:
/***/ (function(module) {

// Module
var code = "<self> <div as=\"container\" class=\"container\"></div> <notifications-list></notifications-list> <modal-container></modal-container> </self> ";
// Exports
module.exports = code;

/***/ }),

/***/ 8695:
/***/ (function(module) {

// Module
var code = "<self :class=\"`app-interface start`\" :v-projection> <div class=\"projection-background\"></div> <div slot class=\"content\"> </div> </self>";
// Exports
module.exports = code;

/***/ }),

/***/ 1199:
/***/ (function(module) {

// Module
var code = "<self> <div class=\"loader\" :style.width=\"this.@size\" :style.height=\"this.@size\"> </div> </self>";
// Exports
module.exports = code;

/***/ }),

/***/ 3934:
/***/ (function(module) {

// Module
var code = "<self> <div class=\"container\" as=\"container\"> </div> </self>";
// Exports
module.exports = code;

/***/ }),

/***/ 1052:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Imports
var ___HTML_LOADER_GET_SOURCE_FROM_IMPORT___ = __webpack_require__(372);
var ___HTML_LOADER_IMPORT_0___ = __webpack_require__(5145);
// Module
var ___HTML_LOADER_REPLACEMENT_0___ = ___HTML_LOADER_GET_SOURCE_FROM_IMPORT___(___HTML_LOADER_IMPORT_0___);
var code = "<self> <div class=\"top-bar\"> <div class=\"left\"> <a :v-link=\"'/'\"> <app-interface class=\"logo\"> <img :v-projection=\"0\" src=\"" + ___HTML_LOADER_REPLACEMENT_0___ + "\"> </app-interface> <app-interface class=\"title\"> <h3>Starbor</h3> </app-interface> </a> <search-bar></search-bar> </div> <user-menu></user-menu> </div> <div class=\"row\"> <div class=\"left-bar\"> <div class=\"menu widget projection-root\"> <widget-projections></widget-projections> <div class=\"menu\" :v-for=\"link of menu.links\"> <app-interface class=\"interactable clickable activable\" :v-link=\"link.url\"> <div class=\"image\"> <i :class=\"link.class\"></i> </div> <label>{{ link.label }}</label> </app-interface> </div> </div> </div> <div class=\"outer-container\"> <widget-projections></widget-projections> <div class=\"container\" as=\"container\"> </div> </div> </div></self>";
// Exports
module.exports = code;

/***/ }),

/***/ 8704:
/***/ (function(module) {

// Module
var code = "<super :class=\"`${context.@user ? 'has-user' : ''}`\"> <div :class=\"`logged-in ${this.@isOpen ? 'is-open' : '' }`\"> <header :on-click=\"this.isOpen = !this.isOpen\"> <label>{{context.@user?.@username}}</label> </header> <div class=\"list\"> <a :v-link=\"`/user/${context.@user?.username}`\">My profile</a> <a :v-link=\"'/logout'\">Logout</a> </div> </div> <div class=\"logged-out\"> <a :v-link=\"'/login'\"> Login </a> </div> </super> ";
// Exports
module.exports = code;

/***/ }),

/***/ 6059:
/***/ (function(module) {

// Module
var code = "<super> <i class=\"fa-solid fa-user\"></i> <label>{{this.model?.@username || ''}}</label> </super>";
// Exports
module.exports = code;

/***/ }),

/***/ 2755:
/***/ (function(module) {

// Module
var code = "<self :class=\"`${this.@show ? 'show' : ''}`\" slot> </self>";
// Exports
module.exports = code;

/***/ }),

/***/ 4679:
/***/ (function(module) {

// Module
var code = "<self slot :class=\"`${this.@open && 'open'}`\" :v-exit=\"this.open = false\" :style.left=\"`${this.@left}px`\" :style.top=\"`${this.@top}px`\" :v-selectable-root> </self>";
// Exports
module.exports = code;

/***/ }),

/***/ 3114:
/***/ (function(module) {

// Module
var code = "<self :on-click=\"this.onSelected()\" :v-selectable=\"this.click()\" slot> </self>";
// Exports
module.exports = code;

/***/ }),

/***/ 7225:
/***/ (function(module) {

// Module
var code = "<self :class=\"`${this.@dragInfos && 'hover'}`\"> <div as=\"initSlot\" slot></div> <template as=\"columnTemplate\"> <div class=\"column\" :v-for=\"row of column\"> <div :class=\"`row ${ this.@hoverRow === node && 'hover'} ${this.@hoverMode}`\" :v-for=\"cell of row\" :on-dragover=\"this.onRowDragOver(row, node, event)\" :on-drop=\"this.onRowDrop(row)\"> <div class=\"cell\"> {{= this.cell(cell, scope) }} </div> </div> </div> </template> <div class=\"root\"> {{= this.cell(this.column, scope) }} </div> </self>";
// Exports
module.exports = code;

/***/ }),

/***/ 6105:
/***/ (function(module) {

// Module
var code = "<self :class=\"'grid-panel'\"> <header slot=\"header\"> </header> <div slot class=\"content\"> </div> </self> ";
// Exports
module.exports = code;

/***/ }),

/***/ 584:
/***/ (function(module) {

// Module
var code = "<super :class=\"`${this.grid.@dragInfos && 'hover'}`\" :on-click=\"this.grid.focusPanel = this\"> <slot name=\"header\"> <div class=\"tabs\" :v-for=\"object of this.objects\"> <div draggable=\"true\" :class=\"`tab ${object === this.@currentObject && 'current'} ${this.grid.@focusPanel === this && 'selected'}`\" :on-dragstart=\"this.drag(object)\" :on-dragend=\"this.dragEnd()\" :on-click=\"this.currentObject = object\"> <label>{{ object.data.name }}</label> <div :on-click.stop=\"this.removeObject(object)\"> <i class=\"fa-solid fa-xmark\"></i> </div> </div> </div> </slot> <slot> <div class=\"container\" :on-dragleave=\"this.hover = null\" :on-drop=\"this.onDrop()\" :on-dragover=\"this.onDragOver(node, event)\"> <div class=\"object\"> {{= this.@currentObject.element }} </div> <div :class=\"`hover ${this.@hover && 'visible'} ${this.@hover}`\"> </div> </div> </slot> </super> ";
// Exports
module.exports = code;

/***/ }),

/***/ 9171:
/***/ (function(module) {

// Module
var code = "<self :v-exit=\"this.close() when this.@isOpened\"> <header> <h3 class=\"title\">{{this.@title}}</h3> <div class=\"actions\"> <div :on-click=\"this.close()\"> <i class=\"fa-solid fa-xmark\"></i> </div> </div> </header> <div class=\"transclude\" slot></div> </self> ";
// Exports
module.exports = code;

/***/ }),

/***/ 2956:
/***/ (function(module) {

// Module
var code = "<self :class=\"`${this.@modal ? 'has-modal' : ''}`\"> {{= this.@modal }} </self> ";
// Exports
module.exports = code;

/***/ }),

/***/ 3742:
/***/ (function(module) {

// Module
var code = "<self :on-click=\"this.trigger()\"> <div class=\"key-container\"> <div class=\"key\" :inner-html=\"this.@keyHtml\"> </div> </div> <div slot class=\"transclude\"></div> </self>";
// Exports
module.exports = code;

/***/ }),

/***/ 6128:
/***/ (function(module) {

// Module
var code = "<self slot></self>";
// Exports
module.exports = code;

/***/ }),

/***/ 6547:
/***/ (function(module) {

// Module
var code = "<super> <div class=\"model-card\"> <header slot=\"header\"> <label> {{this.model?.@name}} </label> </header> <div class=\"content\" slot> </div> <context-menu slot=\"context-menu\"> <div :v-if=\"mixer.is(this.model, Pageable)\"> <context-menu-item :on-selected=\"navigator.navigate(this.model.url)\"> Open </context-menu-item> <context-menu-item :on-selected=\"console.log(this.model, '_blank')\"> Open in a new tab </context-menu-item> <context-menu-item :on-selected=\"navigator.navigate(this.model.url + '/edit')\"> Edit </context-menu-item> </div> <context-menu-item :on-selected=\"this.delete()\" :v-if=\"this.model.canDelete()\"> Delete </context-menu-item> </context-menu> </div> </super>";
// Exports
module.exports = code;

/***/ }),

/***/ 7126:
/***/ (function(module) {

// Module
var code = "<self> </self>";
// Exports
module.exports = code;

/***/ }),

/***/ 2141:
/***/ (function(module) {

// Module
var code = "<self> <div class=\"input\" :v-for=\"any of this.@anys with (a) => a\"></div> </self>";
// Exports
module.exports = code;

/***/ }),

/***/ 2900:
/***/ (function(module) {

// Module
var code = "<self> <div class=\"search-bar\"> <input as=\"input\" :on-change=\"this.onChange()\"/> </div> <div class=\"models\" :v-for=\"model of this.models with (m) => this.template(m)\"> </div> </self>";
// Exports
module.exports = code;

/***/ }),

/***/ 1567:
/***/ (function(module) {

// Module
var code = "<super> <div :class=\"`model-row`\" slot> <label>{{this.model.@name}}</label> </div> </super>";
// Exports
module.exports = code;

/***/ }),

/***/ 8968:
/***/ (function(module) {

// Module
var code = "<super :class=\"`${this.@open ? 'open' : ''}`\" :v-exit=\"this.stop()\" :v-selectable-root> <div class=\"search-bar\"> <div class=\"search-icon\"> <i class=\"fa-solid fa-magnifying-glass\"></i> </div> <input as=\"input\" placeholder=\"Search ...\" :on-input=\"this.length = this.input.value.length\" :v-input-delay=\"this.search()\" :on-focus=\"this.start()\"> <div class=\"x\" :class=\"`${this.@length ? '' : 'empty'}`\" :on-click=\"this.empty()\"> <i class=\"fa-solid fa-xmark\"></i> </div> <div class=\"informations\"> <i class=\"fa-solid fa-info\"></i> <tool-tip> <span><a href=\"https://en.wikipedia.org/wiki/Regular_expression\">Regex</a> are supported</span> </tool-tip> </div> </div> <div class=\"searchables\" :v-projection> <div class=\"background\"></div> <div class=\"list\" :v-for=\"searchable of this.searchables\"> <div class=\"searchable\" :class=\"`${searchable.@error ? 'error' : ''} ${searchable.@results?.length ? '' : 'hide'}`\"> <header> <label>{{searchable.type.definition.pluralName}}</label> <div class=\"icon\"> <i class=\"fa-solid fa-triangle-exclamation\"></i> <tool-tip> {{ searchable.@error || '' }} </tool-tip> </div> </header> <div class=\"results\" :v-for=\"result of searchable.@results\"> <a :on-click=\"this.stop()\" :v-link=\"result.@url\"> <model-component :model=\"result\" :type=\"'row'\" :v-selectable=\"node.click()\"> </model-component> </a> </div> </div> </div> <short-cuts> <short-cut :key=\"'ArrowUp'\">Previous</short-cut> <short-cut :key=\"'ArrowDown'\">Next</short-cut> <short-cut :key=\"'shift+tab'\">Previous</short-cut> <short-cut :key=\"'tab'\">Next</short-cut> </short-cuts> </div> <short-cuts> <short-cut :key=\"'alt+x'\" :callback=\"() => this.empty()\" :target=\"this.input\">Erase</short-cut> <short-cut :key=\"'alt+f'\" :callback=\"() => this.input.focus()\" :target=\"window\">Focus</short-cut> </short-cuts> </super>";
// Exports
module.exports = code;

/***/ }),

/***/ 7548:
/***/ (function(module) {

// Module
var code = "<super> <input :name=\"this.@name\" :type=\"this.@type || 'text'\" :value=\"this.@value\" :required=\"this.@required\" :on-change=\"console.log('ok')\">  </super>";
// Exports
module.exports = code;

/***/ }),

/***/ 5476:
/***/ (function(module) {

// Module
var code = "<super> <input :name=\"this.@name\" type=\"date\" :value=\"this.@value\" :required=\"this.@required\" :on-change=\"this.value = node.value\">  </super>";
// Exports
module.exports = code;

/***/ }),

/***/ 2520:
/***/ (function(module) {

// Module
var code = "<super :class=\"`field ${this.state.@required && 'required'} ${!this.state.@value && 'empty'} ${this.state.@disabled && 'disabled'} ${this.state.@hidden && 'hidden'}`\"> <header slot=\"header\"> <label :style.display=\"this.state.property.name ? null : 'none'\"> {{this.state.property.name || ''}} </label> </header> <div class=\"main\" slot=\"main\"></div> <div class=\"errors\" :v-for=\"error of this.state.@errors\" :style.display=\"this.@touched === true ? null : 'none'\"> <div class=\"error\">{{error}}</div> </div> <div class=\"messages\" :v-for=\"message of this.state.@messages\"> <div class=\"message\" :on-click=\"this.state.messages.tryRemove(message)\"> {{message.text}} </div> </div> </super> ";
// Exports
module.exports = code;

/***/ }),

/***/ 8385:
/***/ (function(module) {

// Module
var code = "<super> <textarea :name=\"this.state.property.name\" :value=\"this.state.@value || ''\" :on-change=\"this.setValue(node.value)\">\n  </textarea> </super>";
// Exports
module.exports = code;

/***/ }),

/***/ 9225:
/***/ (function(module) {

// Module
var code = "<super> <input :name=\"this.state.property.name\" type=\"number\" :value=\"this.state.@value\" :step=\"this.state.@step || 1\" :on-change=\"this.setValue(parseFloat(node.value))\">  </super>";
// Exports
module.exports = code;

/***/ }),

/***/ 7271:
/***/ (function(module) {

// Module
var code = "<super> <input :name=\"this.state.property.name\" :type=\"this.type\" :value=\"this.state.@value || ''\" :disabled=\"this.state.@readOnly\" :on-change=\"this.setValue(node.value)\">  </super>";
// Exports
module.exports = code;

/***/ }),

/***/ 1660:
/***/ (function(module) {

// Module
var code = "<super :class=\"`${this.@mode} ${this.@editable ? 'editable' : ''}  ${this.@deletable && this.model ? 'deletable' : ''}`\"> <slot name=\"bottom\"> <button :on-click=\"this.mode = 'read'\" class=\"cancel\" type=\"button\"> Cancel </button> <super-slot></super-slot> <button :on-click=\"this.mode = 'edit'\" class=\"edit\" type=\"button\"> Edit </button> <button :on-click=\"this.delete()\" class=\"delete\" type=\"button\"> Delete </button> </slot> </super> ";
// Exports
module.exports = code;

/***/ }),

/***/ 2246:
/***/ (function(module) {

// Module
var code = "<super :class=\"`${this.@mode}`\" :v-selectable-root> <div class=\"inner\" :v-exit=\"this.default(true)\"> <div class=\"input\"> <div class=\"value\" :on-click=\"this.edit()\"> {{= this.templateSuggestion(this.state.@value) }} </div> <input as=\"input\" :on-focus=\"this.onFocus()\" :v-input-delay=\"this.search(node.value)\"/> <div class=\"close\" :on-click=\"this.selectSuggestion(null)\"> <i class=\"fa-solid fa-xmark\"></i> </div> </div> <button class=\"create\" type=\"button\" :on-click=\"this.create()\"> <i class=\"fa-solid fa-plus\"></i> </button> <div class=\"suggestions\" :style.display=\"!this.@suggestionsOpen && 'none' || null\" :v-for=\"suggestion of this.@suggestions\"> <div class=\"suggestion\" :on-click=\"this.selectSuggestion(suggestion)\"> <model-component :type=\"'row'\" :model=\"suggestion\" :v-selectable=\"node.click()\"> </model-component> </div> </div> </div>  </super>";
// Exports
module.exports = code;

/***/ }),

/***/ 3884:
/***/ (function(module) {

// Module
var code = "<self :class=\"`${this.disableNested ? 'disable-nested' : ''}`\"> <div class=\"breadcrumb\" :v-for=\"form of this.forms\"> <div> <label :on-click=\"this.target(form)\">{{ form.label || form.@type?.definition.name }}</label> </div> </div> <child-model-form :form=\"this\" in=\"forms\" :type=\"this.@type\" :label=\"this.@model?.@title\" :on-saved=\"this.onSaved(event)\" :mode=\"this.@mode\" :editable=\"this.@editable\" :deletable=\"this.@deletable\" :disable-nested=\"this.@disableNested\" :states=\"this.@states\" :object=\"this.@model\"> </child-model-form> <div class=\"forms\" :v-for=\"form of this.forms with (f) => f\"></div> </self> ";
// Exports
module.exports = code;

/***/ }),

/***/ 6006:
/***/ (function(module) {

// Module
var code = "<super :class=\"`${this.@types.length === 1 ? 'one-option' : ''}`\"> <slot name=\"header\"> <super-slot></super-slot> <select :v-for=\"option of this.@types\"> <option :option-value=\"option\" :selected=\"this.@types.find((t)=> this.value === t.value || (t.value && this.state.@value instanceof t.value))\"> {{ option.definition.name }} </option> </select> <div class=\"create\" :on-click=\"this.create()\"> <i class=\"fa-solid fa-plus\"></i> </div> <div class=\"delete\" :on-click=\"this.state.value = null\"> <i class=\"fa-solid fa-xmark\"></i> </div> </slot> <slot> <fieldset :v-for=\"field of Object.values(this.@fields) with (f) => f\"> </fieldset> </slot>  </super>";
// Exports
module.exports = code;

/***/ }),

/***/ 1244:
/***/ (function(module) {

// Module
var code = "<self :class=\"`object-form ${this.@mode} ${this.@editable ? 'editable' : ''}  ${this.@deletable && this.model ? 'deletable' : ''}`\"> <form :on-submit=\"this.onSubmit(event)\"> <object-fieldset as=\"fieldset\" :child-form=\"this\" :form=\"this.@form\" :state=\"this.state\" :on-changed=\"this.onFieldsetChanged()\"> </object-fieldset> <div class=\"bottom\" slot=\"bottom\"> <button class=\"submit\" type=\"submit\"> Save </button> </div> </form> </self> ";
// Exports
module.exports = code;

/***/ }),

/***/ 372:
/***/ (function(module) {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== 'string') {
    return url;
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  }

  if (options.maybeNeedQuotes && /[\t\n\f\r "'=<>`]/.test(url)) {
    return "\"".concat(url, "\"");
  }

  return url;
};

/***/ }),

/***/ 3738:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(4212);

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

/***/ 6007:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(4057);

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

/***/ 8255:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(1397);

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

/***/ 5771:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(2014);

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

/***/ 2478:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(7244);

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

/***/ 2234:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(7984);

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

/***/ 5882:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(5236);

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

/***/ 5051:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(2377);

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

/***/ 9900:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(9004);

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

/***/ 4435:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(4989);

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

/***/ 7807:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(3301);

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

/***/ 428:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(5058);

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

/***/ 7041:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(8347);

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

/***/ 7913:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(2359);

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

/***/ 4730:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(4800);

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

/***/ 6038:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(7644);

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

/***/ 6131:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(3337);

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

/***/ 6326:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(164);

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

/***/ 9777:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(6519);

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

/***/ 2250:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(4200);

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

/***/ 9851:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(3821);

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

/***/ 720:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(5162);

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

/***/ 3613:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(2935);

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

/***/ 5702:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(8148);

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

/***/ 47:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(6361);

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

/***/ 6218:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(2244);

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

/***/ 6318:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(9276);

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

/***/ 7910:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(9472);

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

/***/ 8922:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(7412);

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

/***/ 8857:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(6183);

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

/***/ 41:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(8767);

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

/***/ 5319:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(5073);

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

/***/ 3766:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(6608);

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

/***/ 4272:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(8126);

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

/***/ 3470:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(8088);

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

/***/ 240:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(6390);

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

/***/ 8422:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(2591);
            var content = __webpack_require__(776);

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

/***/ 2591:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 8297:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Collection = __webpack_require__(4711)

module.exports = class UserCollection extends Collection {
  async getMe() {
    const me = await this.apiRequest('/me', [])
    if (!me) { return null }

    const instance = this.type.parse(me, { singleInstance: true })
    instance.setLoadState(true)
    return instance
  }
}

/***/ }),

/***/ 3157:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const { collectionsTypesMap } = __webpack_require__(999)
const UserCollection = __webpack_require__(8297)
const { User } = __webpack_require__(8550)

collectionsTypesMap.unshift([User, UserCollection])
const LOGIN_POPUP_NAME = 'loginPopup'
const openLoginPopup = () => {
  if (window.name === LOGIN_POPUP_NAME) {
    throw new Error('Already in login popup')
  }
  const width = 400;
  const height = 700;
  const left = (screen.width / 2) - (width / 2)
  const top = (screen.height / 2) - (height / 2)
  window.open(
    '/login',
    LOGIN_POPUP_NAME,
    `width=${width},height=${height},top=${top},left=${left},resizable=false,scrollbars=yes`
  )
}

module.exports = {
  openLoginPopup
}


/***/ }),

/***/ 335:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const axios = __webpack_require__(6660)
const Service = __webpack_require__(2762)
const { User } = __webpack_require__(8550)
const context = __webpack_require__(8152)
const { defaultLoad } = __webpack_require__(7591)
module.exports = class AuthService extends Service {
  constructor(url) {
    super()
    this.url = url
    this.me = null
    this.on('propertyChanged:me', this.b(this.onMeChanged))
  }

  onMeChanged() {
    context.user = this.me
  }

  parseUser(json) {
    const user = User.parse(json, { singleInstance: true })
    user.setLoadState(defaultLoad)
    return user
  }

  async request(action, payload) {
    const url = `${this.url}/auth${action}`
    const response = await axios({
      url,
      method: 'POST',
      data: payload,
      withCredentials: true,
    })

    return response.data
  }

  async getMe() {
    this.me = await User.collection.getMe()
  }

  async login(user) {
    const { me } = await this.request('/login', user)
    this.me = this.parseUser(me)
  }

  async changePassword(user) {
    const response = await this.request('/change-password', user)
    return response
  }

  async signup(user) {
    const { me } = await this.request('/signup', user)
    this.me = this.parseUser(me)
  }

  async logout() {
    await this.request('/logout')
    this.me = null
  }
}
  .define()
  .properties({
    me: 'any',
  })



/***/ }),

/***/ 9176:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const template = __webpack_require__(8704)
const { components: { Interface } } = __webpack_require__(4934)
const context = __webpack_require__(8152)
__webpack_require__(5882)

module.exports = class UserMenu extends Interface {
  constructor() {
    super()
    this.isOpen = false
  }
}
  .define({
    name: 'user-menu',
    template,
  })
  .properties({
    isOpen: 'any',
  })
  .variables({
    context,
  })

/***/ }),

/***/ 2085:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Row = __webpack_require__(2253)
const template = __webpack_require__(6059)
const { User } = __webpack_require__(8550)
__webpack_require__(5051)

module.exports = class UserRow extends Row {

}
  .define({
    name: 'user-row',
    template,
  })
  .register(User, 'row')

/***/ }),

/***/ 7511:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(9176)
__webpack_require__(2085)

/***/ }),

/***/ 9486:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

const context = __webpack_require__(8152)
context.defineProperty({
  name: 'user',
})
__webpack_require__(7511)


/***/ }),

/***/ 2349:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Router = __webpack_require__(9240)
const context = __webpack_require__(8152)
const { auth } = __webpack_require__(4934)

const router = new Router()

const notConnected = (req, res, next) => {
  if (context.me) {
    return res.navigate('/')
  }
  return next()
}

router.route('/login', notConnected, (req, res) => {
  res.page(__webpack_require__.e(/* import() */ 543).then(__webpack_require__.t.bind(__webpack_require__, 6543, 23)))
})

router.route('/signup', notConnected, (req, res) => {
  res.page(__webpack_require__.e(/* import() */ 234).then(__webpack_require__.t.bind(__webpack_require__, 9853, 23)))
})

router.route('/logout', (req, res) => {
  auth.logout()
  return res.navigate('/')
})

module.exports = router

/***/ }),

/***/ 1351:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(3157)

/***/ }),

/***/ 3874:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const { Model, String } = __webpack_require__(5079)
const mixer = __webpack_require__(5964)

module.exports = class Identity extends mixer.extends(Model, []) {

}
  .define({
    name: 'identity',
    pluralName: 'identities',
    root: true,
  })
  .indexes({
    username: {
      properties: ['username'],
      unique: true,
    }
  })
  .properties({
    provider: {
      type: String,
      state: {
        required: true,
      }
    },
  })


/***/ }),

/***/ 6963:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const { Model, String } = __webpack_require__(5079)
const mixer = __webpack_require__(5964)
const Pageable = __webpack_require__(8421)
const Wikiable = __webpack_require__(8399)
const setup = __webpack_require__(9215)

module.exports = class User extends mixer.extends(Model, [Pageable, Wikiable, ...setup.user]) {
  toString() {
    return this.username
  }
}
  .define({
    name: 'user',
    pluralName: 'users',
    root: true,
    codeField: 'username',
    searchField: 'username',
    titleField: 'username',
  })
  .indexes({
    username: {
      properties: ['username'],
      unique: true,
    },
    email: {
      properties: ['email'],
      unique: true,
    }
  })
  .properties({
    username: {
      type: String,
      state: {
        required: true,
      }
    },
    email: {
      type: String,
      state: {
        required: true,
      }
    },
  })

/***/ }),

/***/ 8550:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const { HasMany } = __webpack_require__(5079)
const User = __webpack_require__(6963)
const Identity = __webpack_require__(3874)


Identity.properties({
  user: {
    type: User,
  }
})

User.properties({
  identities: {
    type: HasMany.of(Identity)
  }
})

module.exports = {
  User,
  Identity,
}

/***/ }),

/***/ 9215:
/***/ (function(module) {


module.exports = {
  user: [],
  group: [],
}

/***/ }),

/***/ 7591:
/***/ (function(module) {


const defaultLoad = {
  groups: true
}

module.exports = {
  defaultLoad
}

/***/ }),

/***/ 8152:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(5964)
const Propertiable = __webpack_require__(9196)

class Context extends mixer.extends([Propertiable]) {
  constructor(values = {}) {
    super()
    Object.assign(this, values)
  }
}
const context = new Context()

module.exports = context

/***/ }),

/***/ 2659:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Service = __webpack_require__(2762)
const Array = __webpack_require__(5092)

module.exports = class MenuService extends Service {
  constructor() {
    super()
    this.links = new Array()
  }
}
  .define()

/***/ }),

/***/ 8394:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(8062)
const Definitions = __webpack_require__(805)

module.exports = mixer.mixin((base) => {
  return class Base extends base {

    static hasMixin(mixin) {
      return this.allDependencies.some((d) => d === (mixin.mixin || mixin))
    }


    static define(definition = {}) {
      if (this.definition?.owner === this) {
        throw new Error(`Class ${this.name} already defined`)
      }

      if (!this.dependenciesOwner) {
        this.dependenciesOwner = this
      } else {
        this.dependencies = []
      }
      const parent = this.definition?.owner
      const parents = [parent, ...(this.dependencies || [])]
        .filter((p) => p?.definition)
      parents.forEach((parent) => {
        parent.definition.childs.push(this)
      })
      this.definition = {
        ...definition,
        childs: [],
        parent,
        parents,
        owner: this,
      }

      this.definitions = new Definitions(this)

      return this
    }

    static set(values) {
      Object.assign(this, values)
      return this
    }

    static findChild(check) {
      if (check(this)) {
        return this
      }
      for (const child of this.definition.childs) {
        const subChild = child.findChild(check)
        if (subChild) {
          return subChild
        }
      }
      return null
    }

    static getAllChilds() {
      const childs = [this]
      for (const child of this.definition.childs) {
        childs.push(...child.getAllChilds())
      }
      return childs
    }

  }
})


/***/ }),

/***/ 805:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Tree = __webpack_require__(3797)

module.exports = class Definitions extends Tree {
  constructor(owner) {
    super()
    this.push(owner.definition)
    this.owner = owner
    owner.definition.parents
      .filter((o) => o.definitions)
      .forEach((parent) => {
        this.push(parent.definitions)
      })
  }
}

/***/ }),

/***/ 6246:
/***/ (function(module) {

module.exports = class Mixin {
  constructor() {
    throw new Error('Cannot instanciante mixin')
  }
}

/***/ }),

/***/ 8062:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Mixin = __webpack_require__(6246)
const getMixin = (dependency) => {
  return dependency.mixin || dependency
}

const processDependency = (allDependencies, dependency) => {
  const index = allDependencies.indexOf(dependency)
  if (index !== -1) {
    return null
  }
  allDependencies.push(dependency)
  const dependencies = processDependencies(allDependencies, dependency.mixinDependencies)
  return [
    ...dependencies,
    dependency,
  ]
}

const processDependencies = (allDependencies, dependenciesTree) => {
  return dependenciesTree
    .flatMap((dependency) => processDependency(allDependencies, dependency))
    .filter((o) => o)
}

const buildBase = (base, dependenciesTree) => {
  const allDependencies = [...(base.allDependencies || [])]
  const dependencies = processDependencies(allDependencies, dependenciesTree)
  let currentClass = base
  for (const dependency of dependencies) {

    currentClass = dependency.fn(currentClass)
  }
  Object.assign(currentClass, {
    allDependencies,
    dependencies,
    dependenciesOwner: null,
  })

  return currentClass
}

const getDependencies = (dependencies = []) => {
  const baseType = mixer.Base
  if (!baseType) {
    return dependencies
  }

  return [baseType, ...dependencies]
}

const mixer = {
  base: null,
  proxy(...args) {
    const mixin = this.mixin(...args)
    const type = this.extends([mixin]);
    type.mixin = mixin;

    return new Proxy(type, {
      apply: (target, thisArg, args) => {
        //fallback for babel ?
        if (thisArg) {
          return target.apply(thisArg, args);
        }
        return fn.apply(null, args);
      }
    })
  },
  mixin(...args) {
    const fn = args.find((arg) => typeof arg === 'function')
    const mixinDependencies = getDependencies(args.find((arg) => Array.isArray(arg)))
    const base = mixer.extends(Mixin, mixinDependencies)

    const mixin = fn(base)

    Object.assign(mixin, {
      mixinDependencies,
      fn,
      base,
    })
    return mixin
  },
  extends(arg1, arg2) {
    let base
    let dependencies
    if (typeof arg1 === 'function') {
      base = arg1
      dependencies = getDependencies(arg2)
    } else {
      base = class { }
      dependencies = getDependencies(arg1)
    }
    return buildBase(base, dependencies)
  },
  is(object, mixinOrClass) {
    if (object.constructor === mixinOrClass) { return true }
    const dependencies = object.constructor?.allDependencies

    if (dependencies) {
      const hasMixin = dependencies.find((d) => d === getMixin(mixinOrClass))
      if (hasMixin) {
        return true
      }
    }
    if (typeof mixinOrClass !== 'function') {
      return false
    }

    if (object instanceof mixinOrClass) {
      return true
    }

    return false
  },
}

module.exports = mixer

/***/ }),

/***/ 6888:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(8062)
const symbol = Symbol("BindedFunctions")
const Destroyable = __webpack_require__(3992)

module.exports = mixer.mixin([Destroyable], (baseClass) => {

  return class Bindeable extends baseClass {
    constructor(...args) {
      super(...args)
      this[symbol] = []
    }

    b(fn) {
      const existing = this[symbol].find((bf) => {
        return bf.initialFunction == fn;
      })
      if (existing)
        return existing.fn
      const bindedFunction = fn.bind(this)
      this[symbol].push({
        initialFunction: fn,
        fn: bindedFunction
      });
      return bindedFunction
    }

  }
})

/***/ }),

/***/ 3992:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(8062)

const Destroyable = mixer.mixin((base) => {
  return class Destroyable extends base {

    constructor(...args) {
      super(...args)
      Object.defineProperty(this, 'destroyed', {
        enumerable: false,
        writable: true,
        value: false
      })
    }

    onAlreadyDestroyed() {
      throw new Error('Already destroyed')
    }

    destroy() {
      if (this.destroyed) {
        this.onAlreadyDestroyed()
      }
      this.destroyed = true
    }
  }
})


module.exports = Destroyable

/***/ }),

/***/ 4302:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(8062)
const Destroyable = __webpack_require__(3992)
const events = Symbol("events")
const otherEvents = Symbol("otherEvents")

class Listener {
  constructor(options) {
    Object.assign(this, options)
  }

  remove() {
    this.eventable.off(this)
  }
}


const Eventable = mixer.mixin([Destroyable], (baseClass) => {
  return class Eventable extends baseClass {
    constructor(...args) {
      super(...args)
      Object.defineProperties(this, {
        [events]: {
          enumerable: false,
          writable: true,
          value: []
        },
        [otherEvents]: {
          enumerable: false,
          writable: true,
          value: []
        }
      })
    }

    on(...args) {
      if (args.length === 3) {
        const [source, eventName, callback] = args
        const listener = source.on(eventName, callback)
        this[otherEvents].push(listener)
        return listener
      } else {
        const [eventName, callback] = args
        const listener = new Listener({
          eventable: this,
          eventName,
          callback,
        })
        let event = this[events][eventName]
        if (!event) {
          event = {
            listeners: []
          }
          this[events][eventName] = event
        }

        this[events][eventName].listeners.push(listener)

        return listener
      }
    }

    async emit(eventName, args = [], options = {}) {
      let event = this[events][eventName]
      if (!event) {
        event = {
          listeners: [],
        }
        this[events][eventName] = event
      }
      const listeners = [...event.listeners]
      await Promise.all(listeners.map((l) => l.callback(...args)))
    }

    off(eventName, callback) {
      if (eventName instanceof Listener) {
        callback = eventName.callback
        eventName = eventName.eventName
      }

      const event = this[events][eventName]
      if (!event) { return }
      const index = event.listeners.findIndex((listener) => listener.eventName === eventName && listener.callback === callback)

      if (index === -1) { return }
      event.listeners.splice(index, 1)
    }

    destroy() {
      super.destroy()
      Object.values(events)
        .forEach((event) => {
          event.listeners.forEach((listener) => {
            listener.remove()
          })
        })

      this[otherEvents].forEach((listener) => listener.remove())
      this[otherEvents] = null
      this.emit('destroyed')
    }
  }
})

Object.assign(Eventable, {
  events,
  otherEvents
})

module.exports = Eventable

/***/ }),

/***/ 4978:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

Error.stackTraceLimit = 50
const Base = __webpack_require__(8394)
const mixer = __webpack_require__(8062)

mixer.Base = Base




/***/ }),

/***/ 5092:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(8062)
const Bindeable = __webpack_require__(6888)
const Destroyable = __webpack_require__(3992)
const Eventable = __webpack_require__(4302)

module.exports = class IntermediateArray extends mixer.extends(Array, [Eventable, Destroyable, Bindeable]) {

  push(...args) {
    const result = super.push(...args)
    this.pushed(args)
    this.changed()
    return result
  }

  pushed(objects) {
    this.emit('pushed', objects)
    this.changed()
  }

  pop(...args) {
    const result = super.pop(...args)
    this.changed()
    return result
  }

  unshift(...args) {
    const result = super.unshift(...args)
    this.changed()
    return result
  }

  shift(...args) {
    const result = super.shift(...args)
    this.changed()
    return result
  }

  splice(...args) {
    const result = super.splice(...args)
    this.changed()
    return result
  }

  /*
  sort(...args) {
    const result = super.sort(...args)
    this.changed()
    return result
  }
  */

  async changed() {
    await Promise.all([
      this.emit('changed'),
      this.emit('propertyChanged:length')
    ])
  }

  remove(object) {
    var result = this.tryRemove(object)
    if (!result)
      throw new RangeError()
  }

  tryRemove(object) {
    var index = this.indexOf(object);
    if (index != -1) {
      this.splice(index, 1)
      return true
    } else
      return false
  }

  has(object) {
    return this.indexOf(object) !== -1
  }

  onLinkUpdated() {
    const { source, fn, args } = this.linkOptions
    this.splice(0, this.length)
    const result = source[fn](...args)
    this.push(...result)
  }

  link(source, fn, ...args) {
    this.linkOptions = {
      source,
      fn,
      args,
    }
    this.on(source, 'changed', this.b(this.onLinkUpdated))
  }

  filterLink(fn) {
    const array = new IntermediateArray()
    array.link(this, 'filter', fn)
    const result = this.filter(fn)
    array.push(...result)
    return array
  }

  sortLink(fn) {
    const array = new IntermediateArray()
    array.link(this, 'sort', fn)
    const result = this.sort(fn)
    array.push(...result)
    return array
  }
}

/***/ }),

/***/ 2748:
/***/ (function(module) {

module.exports = class ExtensibleFunction extends Function {
  constructor(f) {
    return Object.setPrototypeOf(f, new.target.prototype);
  }
}

/***/ }),

/***/ 3797:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Mixin = __webpack_require__(6246)
const ExtensibleFunction = __webpack_require__(2748)

let id = 0
class Tree extends ExtensibleFunction {

  constructor(...values) {
    super((...args) => this.call(...args))
    this.content = values
  }

  call(...args) {
    this.push(...args)
    return this
  }

  push(...objs) {
    this.content.push(...objs)
  }

  get count() {
    let count = 0;
    for (let obj of this.content) {

      if (obj instanceof this.constructor) {
        count += obj.count
      } else {
        count++
      }
    }
    return count
  }

  forEach(fn) {
    for (var object of this) {
      fn(object);
    }
  }

  find(fn) {
    for (var obj of this) {
      if (fn(obj))
        return obj;
    }
    return null;
  }

  filter(fn) {
    var result = [];
    for (var obj of this) {
      if (fn(obj)) {
        result.push(obj);
      }
    }
    return result;
  }

  map(fn) {
    var result = [];
    for (var obj of this) {
      result.push(fn(obj));
    }
    return result;
  }

  reduce(fn, acc) {
    this.forEach((value) => {
      acc = fn(acc, value)
    })
    return acc
  }

  beautify() {
    return this.content.map((object) => {
      if (object instanceof this.constructor) {
        return object.beautify()
      }
      return object
    })
  }

  iterate(it) {
    if (it.index > this.content.length) {
      return {
        done: true
      }
    }
    let value = this.content[it.index]

    if (value instanceof this.constructor) {
      if (!this.shouldIterateTree(it, value)) {
        it.index++
        return this.iterate(it)
      }
      if (!it.it)
        it.it = value[Symbol.iterator](this)
      let result = it.it.next()
      if (result.done) {
        it.index++
        it.it = null
        return this.iterate(it)
      }
      value = result.value
    } else {
      it.index++
    }

    return {
      value,
      done: it.index > this.content.length
    }
  }

  shouldIterateTree(it, tree) {
    return true
  }

  [Symbol.iterator](from) {
    const it = {
      id: id++,
      index: 0,
      it: null,
      from
    }
    return {
      next: () => {
        return this.iterate(it)
      }
    }
  }

}

module.exports = Tree

/***/ }),

/***/ 6980:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(9900)
__webpack_require__(4978)

/***/ }),

/***/ 9000:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Definitions = __webpack_require__(2587)

module.exports = (base) => {
  return class Base extends base {

    static hasMixin(mixin) {
      return this.allDependencies.some((d) => d === (mixin.mixin || mixin))
    }


    static define(definition = {}) {
      if (this.definition?.owner === this) {
        throw new Error(`Class ${this.name} already defined`)
      }

      if (!this.dependenciesOwner) {
        this.dependenciesOwner = this
      } else {
        this.dependencies = []
      }
      const parent = this.definition?.owner
      const parents = [parent, ...(this.dependencies || [])]
        .filter((p) => p?.definition)
      parents.forEach((parent) => {
        parent.definition.childs.push(this)
      })
      this.definition = {
        ...definition,
        childs: [],
        parent,
        parents,
        owner: this,
      }

      this.definitions = new Definitions(this)

      return this
    }

    static set(values) {
      Object.assign(this, values)
      return this
    }

    static findChild(check) {
      if (check(this)) {
        return this
      }
      for (const child of this.definition.childs) {
        const subChild = child.findChild(check)
        if (subChild) {
          return subChild
        }
      }
      return null
    }

    static getAllChilds() {
      const childs = [this]
      for (const child of this.definition.childs) {
        childs.push(...child.getAllChilds())
      }
      return childs
    }

  }
}

/***/ }),

/***/ 2587:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Tree = __webpack_require__(1399)

module.exports = class Definitions extends Tree {
  constructor(owner) {
    super()
    this.push(owner.definition)
    this.owner = owner
    owner.definition.parents
      .filter((o) => o.definitions)
      .forEach((parent) => {
        this.push(parent.definitions)
      })
  }
}

/***/ }),

/***/ 9252:
/***/ (function(module) {

module.exports = class Mixin {
  constructor() {
    throw new Error('Cannot instanciante mixin')
  }
}

/***/ }),

/***/ 5964:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Mixin = __webpack_require__(9252)
const Base = __webpack_require__(9000)
const getMixin = (dependency) => {
  return dependency.mixin || dependency
}

const processDependency = (allDependencies, dependency) => {
  const index = allDependencies.indexOf(dependency)
  if (index !== -1) {
    return null
  }
  allDependencies.push(dependency)
  const dependencies = processDependencies(allDependencies, dependency.mixinDependencies)
  return [
    ...dependencies,
    dependency,
  ]
}

const processDependencies = (allDependencies, dependenciesTree) => {
  return dependenciesTree
    .flatMap((dependency) => processDependency(allDependencies, dependency))
    .filter((o) => o)
}

const buildBase = (base, dependenciesTree) => {
  const allDependencies = [...(base.allDependencies || [])]
  const dependencies = processDependencies(allDependencies, dependenciesTree)
  let currentClass = base
  for (const dependency of dependencies) {

    currentClass = dependency.fn(currentClass)
  }
  Object.assign(currentClass, {
    allDependencies,
    dependencies,
    dependenciesOwner: null,
  })

  return currentClass
}

const getDependencies = (dependencies = []) => {
  if (!mixer.base) {
    return dependencies
  }
  return [mixer.base, ...dependencies]
}

const mixer = {
  proxy(...args) {
    const mixin = this.mixin(...args)
    const type = this.extends([mixin]);
    type.mixin = mixin;

    return new Proxy(type, {
      apply: (target, thisArg, args) => {
        //fallback for babel ?
        if (thisArg) {
          return target.apply(thisArg, args);
        }
        return fn.apply(null, args);
      }
    })
  },
  mixin(...args) {
    const fn = args.find((arg) => typeof arg === 'function')
    const mixinDependencies = getDependencies(args.find((arg) => Array.isArray(arg)))
    const base = mixer.extends(Mixin, mixinDependencies)

    const mixin = fn(base)

    Object.assign(mixin, {
      mixinDependencies,
      fn,
      base,
    })
    return mixin
  },
  extends(arg1, arg2) {
    let base
    let dependencies
    if (typeof arg1 === 'function') {
      base = arg1
      dependencies = getDependencies(arg2)
    } else {
      base = class { }
      dependencies = getDependencies(arg1)
    }
    return buildBase(base, dependencies)
  },
  is(object, mixinOrClass) {
    if (object.constructor === mixinOrClass) { return true }
    const dependencies = object.constructor?.allDependencies

    if (dependencies) {
      const hasMixin = dependencies.find((d) => d === getMixin(mixinOrClass))
      if (hasMixin) {
        return true
      }
    }
    if (typeof mixinOrClass !== 'function') {
      return false
    }

    if (object instanceof mixinOrClass) {
      return true
    }

    return false
  },
}

mixer.base = mixer.mixin(Base)

module.exports = mixer

/***/ }),

/***/ 6976:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(5964)

module.exports = mixer.mixin([], (baseClass) => {

  return class Abstractable extends baseClass {
    constructor(...args) {
      super(...args)
      if (this.constructor.definition.abstract) {
        throw new Error(`Cannot instanciate abstract type ${this.constructor.definition.name}`)
      }
    }
  }
})

/***/ }),

/***/ 1646:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(5964)
const symbol = Symbol("BindedFunctions")
const Destroyable = __webpack_require__(5722)

module.exports = mixer.mixin([Destroyable], (baseClass) => {

  return class Bindeable extends baseClass {
    constructor(...args) {
      super(...args)
      this[symbol] = []
    }

    b(fn) {
      const existing = this[symbol].find((bf) => {
        return bf.initialFunction == fn;
      })
      if (existing)
        return existing.fn
      const bindedFunction = fn.bind(this)
      this[symbol].push({
        initialFunction: fn,
        fn: bindedFunction
      });
      return bindedFunction
    }

  }
})

/***/ }),

/***/ 5722:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(5964)

const Destroyable = mixer.mixin((base) => {
  return class Destroyable extends base {

    constructor(...args) {
      super(...args)
      Object.defineProperty(this, 'destroyed', {
        enumerable: false,
        writable: true,
        value: false
      })
    }

    onAlreadyDestroyed() {
      throw new Error('Already destroyed')
    }

    destroy() {
      if (this.destroyed) {
        this.onAlreadyDestroyed()
      }
      this.destroyed = true
    }
  }
})


module.exports = Destroyable

/***/ }),

/***/ 2884:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(5964)

module.exports = mixer.mixin((baseClass) => {

  return class Equalable extends baseClass {
    static equals(value1, value2) {
      throw new Error('Compare not implemented')
    }
  }
})

/***/ }),

/***/ 5524:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(5964)
const Destroyable = __webpack_require__(5722)
const events = Symbol("events")
const otherEvents = Symbol("otherEvents")

class Listener {
  constructor(options) {
    Object.assign(this, options)
  }

  remove() {
    this.eventable.off(this)
  }
}


const Eventable = mixer.mixin([Destroyable], (baseClass) => {
  return class Eventable extends baseClass {
    constructor(...args) {
      super(...args)
      Object.defineProperties(this, {
        [events]: {
          enumerable: false,
          writable: true,
          value: []
        },
        [otherEvents]: {
          enumerable: false,
          writable: true,
          value: []
        }
      })
    }

    on(...args) {
      if (args.length === 3) {
        const [source, eventName, callback] = args
        const listener = source.on(eventName, callback)
        this[otherEvents].push(listener)
        return listener
      } else {
        const [eventName, callback] = args
        const listener = new Listener({
          eventable: this,
          eventName,
          callback,
        })
        let event = this[events][eventName]
        if (!event) {
          event = {
            listeners: []
          }
          this[events][eventName] = event
        }

        this[events][eventName].listeners.push(listener)

        return listener
      }
    }

    async emit(eventName, args = [], options = {}) {
      let event = this[events][eventName]
      if (!event) {
        event = {
          listeners: [],
        }
        this[events][eventName] = event
      }
      const listeners = [...event.listeners]
      await Promise.all(listeners.map((l) => l.callback(...args)))
    }

    off(eventName, callback) {
      if (eventName instanceof Listener) {
        callback = eventName.callback
        eventName = eventName.eventName
      }

      const event = this[events][eventName]
      if (!event) { return }
      const index = event.listeners.findIndex((listener) => listener.eventName === eventName && listener.callback === callback)

      if (index === -1) { return }
      event.listeners.splice(index, 1)
    }

    destroy() {
      super.destroy()
      Object.values(events)
        .forEach((event) => {
          event.listeners.forEach((listener) => {
            listener.remove()
          })
        })

      this[otherEvents].forEach((listener) => listener.remove())
      this[otherEvents] = null
      this.emit('destroyed')
    }
  }
})

Object.assign(Eventable, {
  events,
  otherEvents
})

module.exports = Eventable

/***/ }),

/***/ 4975:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Tree = __webpack_require__(1399)
const Mixin = __webpack_require__(9252)
module.exports = class Properties extends Tree {
  constructor(owner) {
    super()
    this.owner = owner
    owner.definition.parents
      .filter((p) => p.properties)
      .forEach((parent) => {
        this.push(parent.properties)
      })
  }

  call(...args) {
    super.call(...args)
    return this.owner
  }

  shouldIterateTree(it, tree) {
    const shouldIterateTree = !(this.owner.prototype instanceof Mixin) || !it.from || !(tree instanceof Properties)
    return shouldIterateTree
  }

  push(...args) {
    args.forEach((arg) => {
      if (arg instanceof Properties) {
        super.push(arg)
        return
      }
      if (typeof arg === 'object') {
        Object.entries(arg)
          .forEach(([name, property]) => {
            if (typeof property !== 'object') {
              property = {
                type: property,
              }
            }
            property.name = name
            super.push(property)
            this.owner.sanitizeProperty(property)
          })
        return
      }
      throw new Error(`Property type not recognized`)
    })
  }
}

/***/ }),

/***/ 9196:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(5964);
const Destroyable = __webpack_require__(5722)
const Eventable = __webpack_require__(5524)
const Properties = __webpack_require__(4975)

const mixin = mixer.mixin([Eventable, Destroyable], (base) => {
  return class Propertiable extends base {
    static sanitizeProperty(property) {

    }

    defineProperty(property) {
      Object.defineProperty(this, property.name, {
        get: function () {
          return this.values[property.name]
        },
        set: async function (newValue) {
          if (this.destroyed) { return }
          if (newValue === this[property.name]) { return }
          await this.setPropertyValue(property, newValue)
        },
        enumerable: true,
      })
    }

    static define(definition) {
      super.define(definition)
      this.properties = new Properties(this)
      return this
    }

    constructor(...args) {
      super(...args)
      const properties = this.constructor.properties
      if (properties) {
        try {
          properties.forEach((p) => this.defineProperty(p))
        } catch (err) {
          console.error(this, [...properties])
          throw err
        }
      }

      Object.defineProperty(this, 'values', { enumerable: false, writable: true, value: {} })
    }

    async set(values, options) {
      await Promise.all(Object.entries(values).map(async ([k, v]) => {
        const property = this.constructor.properties.find((p) => p.name === k)
        if (!property) { return }
        await this.setPropertyValue(property, v, options)
      }))
    }

    async propertyChanged(property, value, oldValue) {
      await Promise.all([
        this.emit('propertyChanged', [property, value, oldValue]),
        this.emit(`propertyChanged:${property.name}`, [value, oldValue])
      ])
    }

    async setPropertyValue(property, value, options) {
      if (!this.values) {
        this.values = {}
      }
      const oldValue = this.values[property.name]
      this.values[property.name] = value
      await this.propertyChanged(property, value, oldValue, options)
    }

    destroy() {
      // we set null before super.destroy as we want it to trigger the events
      this.constructor.properties.forEach((p) => {
        this[p.name] = null
      })
      super.destroy()
    }
  }
})
  .define()

module.exports = mixin

/***/ }),

/***/ 6014:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(5964)
const Bindeable = __webpack_require__(1646)
const Destroyable = __webpack_require__(5722)
const Eventable = __webpack_require__(5524)

module.exports = class IntermediateArray extends mixer.extends(Array, [Eventable, Destroyable, Bindeable]) {

  push(...args) {
    const result = super.push(...args)
    this.pushed(args)
    this.changed()
    return result
  }

  pushed(objects) {
    this.emit('pushed', objects)
    this.changed()
  }

  pop(...args) {
    const result = super.pop(...args)
    this.changed()
    return result
  }

  unshift(...args) {
    const result = super.unshift(...args)
    this.changed()
    return result
  }

  shift(...args) {
    const result = super.shift(...args)
    this.changed()
    return result
  }

  splice(...args) {
    const result = super.splice(...args)
    this.changed()
    return result
  }

  /*
  sort(...args) {
    const result = super.sort(...args)
    this.changed()
    return result
  }
  */

  async changed() {
    await Promise.all([
      this.emit('changed'),
      this.emit('propertyChanged:length')
    ])
  }

  remove(object) {
    var result = this.tryRemove(object)
    if (!result)
      throw new RangeError()
  }

  tryRemove(object) {
    var index = this.indexOf(object);
    if (index != -1) {
      this.splice(index, 1)
      return true
    } else
      return false
  }

  has(object) {
    return this.indexOf(object) !== -1
  }

  onLinkUpdated() {
    const { source, fn, args } = this.linkOptions
    this.splice(0, this.length)
    const result = source[fn](...args)
    this.push(...result)
  }

  link(source, fn, ...args) {
    this.linkOptions = {
      source,
      fn,
      args,
    }
    this.on(source, 'changed', this.b(this.onLinkUpdated))
  }

  filterLink(fn) {
    const array = new IntermediateArray()
    array.link(this, 'filter', fn)
    const result = this.filter(fn)
    array.push(...result)
    return array
  }

  sortLink(fn) {
    const array = new IntermediateArray()
    array.link(this, 'sort', fn)
    const result = this.sort(fn)
    array.push(...result)
    return array
  }
}

/***/ }),

/***/ 1231:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const ExtensibleFunction = __webpack_require__(3970)
module.exports = class Event extends ExtensibleFunction {
  constructor(options = {}) {
    super((...args) => this.listen(...args))
    this.options = options
    this.listeners = []
  }

  listen(listener) {
    this.listeners.push(listener)
  }

  async trigger(...args) {
    if (this.options.timeout) {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.timeout = setTimeout(async () => {
        for (const listener of this.listeners) {
          await listener(...args)
        }
      }, this.options.timeout)
    } else {
      for (const listener of this.listeners) {
        await listener(...args)
      }
    }
  }
}


/***/ }),

/***/ 3970:
/***/ (function(module) {

module.exports = class ExtensibleFunction extends Function {
  constructor(f) {
    return Object.setPrototypeOf(f, new.target.prototype);
  }
}

/***/ }),

/***/ 1399:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Mixin = __webpack_require__(9252)
const ExtensibleFunction = __webpack_require__(3970)

let id = 0
class Tree extends ExtensibleFunction {

  constructor(...values) {
    super((...args) => this.call(...args))
    this.content = values
  }

  call(...args) {
    this.push(...args)
    return this
  }

  push(...objs) {
    this.content.push(...objs)
  }

  get count() {
    let count = 0;
    for (let obj of this.content) {

      if (obj instanceof this.constructor) {
        count += obj.count
      } else {
        count++
      }
    }
    return count
  }

  forEach(fn) {
    for (var object of this) {
      fn(object);
    }
  }

  find(fn) {
    for (var obj of this) {
      if (fn(obj))
        return obj;
    }
    return null;
  }

  filter(fn) {
    var result = [];
    for (var obj of this) {
      if (fn(obj)) {
        result.push(obj);
      }
    }
    return result;
  }

  map(fn) {
    var result = [];
    for (var obj of this) {
      result.push(fn(obj));
    }
    return result;
  }

  reduce(fn, acc) {
    this.forEach((value) => {
      acc = fn(acc, value)
    })
    return acc
  }

  beautify() {
    return this.content.map((object) => {
      if (object instanceof this.constructor) {
        return object.beautify()
      }
      return object
    })
  }

  iterate(it) {
    if (it.index > this.content.length) {
      return {
        done: true
      }
    }
    let value = this.content[it.index]

    if (value instanceof this.constructor) {
      if (!this.shouldIterateTree(it, value)) {
        it.index++
        return this.iterate(it)
      }
      if (!it.it)
        it.it = value[Symbol.iterator](this)
      let result = it.it.next()
      if (result.done) {
        it.index++
        it.it = null
        return this.iterate(it)
      }
      value = result.value
    } else {
      it.index++
    }

    return {
      value,
      done: it.index > this.content.length
    }
  }

  shouldIterateTree(it, tree) {
    return true
  }

  [Symbol.iterator](from) {
    const it = {
      id: id++,
      index: 0,
      it: null,
      from
    }
    return {
      next: () => {
        return this.iterate(it)
      }
    }
  }

}

module.exports = Tree

/***/ }),

/***/ 5530:
/***/ (function(module) {

const chain = (array, fn, final) => {
  let index = 0
  const inner = () => {
    if (index === array.length) {
      return final()
    }

    const object = array[index++]
    return fn(object, inner)
  }
  return inner()
}

module.exports = {
  chain,
}

/***/ }),

/***/ 2704:
/***/ (function(module) {

const set = (object, path, value) => {
  const split = path.split('.')
  const name = split.pop()
  for (const segment of split) {
    object = object[segment]
  }
  object[name] = value
}

/**
 * it should throw an error if the path is invalid
 * @param {*} object 
 * @param {*} path 
 * @returns 
 */
const get = (object, path) => {
  const split = path.split('.')
  for (const segment of split) {

    object = object[segment]
  }

  return object
}

const pathsCopy = (paths) => {
  const copy = Object.entries(paths)
    .reduce((acc, [k, v]) => {
      if (typeof v === 'object') {
        v = pathsCopy(v)
      }
      acc[k] = v
      return acc
    }, {})
  return copy
}

/**
 * 
 * @param {*} paths1 
 * @param {*} paths2 
 * @returns a - b 
 */
const pathsDiff = (paths1, paths2) => {
  const diff = Object.entries(paths1)
    .reduce((acc, [propertyName, value1]) => {
      let value2 = paths2[propertyName]
      if (!value2) {
        if (value1) {
          acc[propertyName] = value1
        }
      } else {
        if (value2 === true) {
          value2 = {}
        }
        if (value1 === true) {
          value1 = {}
        }
        const subDiff = pathsDiff(value1, value2)
        if (Object.keys(subDiff).length) {
          acc[propertyName] = subDiff
        }
      }
      return acc
    }, {})

  return diff
}


module.exports = {
  set,
  get,
  pathsDiff,
  pathsCopy,
}

/***/ }),

/***/ 5149:
/***/ (function(module) {


const forEach = (type, fn) => {
  while (type.prototype.__proto__) {
    const stop = fn(type)
    if (stop) {
      return
    }
    type = type.prototype.__proto__.constructor
  }
}

const get = (type) => {
  const result = []
  forEach(type, (t) => {
    result.push(t)
  })
  return result
}

const getParent = (type) => {
  return type.prototype.__proto__.constructor
}

const filter = (type, fn) => {
  const result = []
  forEach(type, (parent) => {
    const match = fn(parent)
    if (match) {
      result.push(parent)
    }
  })
  return result
}

const find = (type, fn) => {
  let result = null
  forEach(type, (parent) => {
    const match = fn(parent)
    if (match) {
      result = parent
      return true
    }
  })
  return result
}

const getCommonAncestor = (...types) => {
  let target = types[0]
  while (target) {
    let good = true
    for (const type of types) {
      if (type !== target && !(type.prototype instanceof target) && !(target.prototype instanceof type)) {
        good = false
      }
    }
    if (good) {
      return target
    }
    target = target.prototype.__proto__.constructor
  }
  return null
}

module.exports = {
  get,
  forEach,
  filter,
  find,
  getParent,
  getCommonAncestor,
}

/***/ }),

/***/ 9516:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Bindeable = __webpack_require__(1646)
const Propertiable = __webpack_require__(9196)
const Listening = __webpack_require__(2965)
const mixer = __webpack_require__(5964)
const { base } = __webpack_require__(9924)
const Destroyable = __webpack_require__(5722)
const BindingFunction = __webpack_require__(6151)

const Base = mixer.mixin([Destroyable, Bindeable, Propertiable, Listening], (base) => {
  return class Base extends base {

    static variables(variables) {
      this._variables = {
        ...(this._variables || {}),
        ...variables
      }
      return this
    }

    constructor() {
      super()
      this.isInitialized = false
      this.bindings = []
    }

    getVariables() {
      return this.variables
    }

    async bind(name, value) {
      const variables = this.getVariables()
      const binding = new BindingFunction(value, variables, (value) => {
        this[name] = value
      })
      await binding.update()
      this.bindings.push(binding)
    }

    async initialize() {
      if (this.isInitialized) {
        throw new Error('Already initialized')
      }
      await this.onInit()
      this.isInitialized = true
    }

    async onInit() { }

    propertyChanged(...args) {
      if (!this.isInitialized) {
        return
      }

      return super.propertyChanged(...args)
    }

    destroy() {
      this.bindings.forEach((b) => b.destroy())
      super.destroy()
    }

  }

})
  .define()


module.exports = mixer.mixin([Base, ...base], (base) => class extends base { })
  .define()
  .properties({
    isInitialized: { type: 'any' }
  })


/***/ }),

/***/ 722:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(5964)
const Base = __webpack_require__(9516)
class temp extends HTMLElement {

}

module.exports = class Component extends mixer.extends(temp, [Base]) {
  static define(definition) {
    if (definition?.name) {
      customElements.define(definition.name, this)
    }
    return super.define(definition)
  }

  constructor() {
    super()
    this.scope = null
  }

  attach(scope) {
    //this.upScope = scope
    this.scope = scope.child({
      source: this,
      variables: this.constructor._variables
    })
    return this
  }

  async initialize() {
    this.scope.type = this.constructor
    await super.initialize()
    this.initialContent = [...this.childNodes]
    await this.initializeTemplate()
    this.event('ready')
    Promise.resolve(this.onReady())
      .catch((err) => {
        console.error(err)
      })
  }

  onReady() { }

  async initializeTemplate() {
    const definition = this.constructor.definitions.find((d) => d.template)
    if (definition) {
      this.innerHTML = definition.template
      await this.scope.renderContent(this)
    }

    await this.scope.renderSlots(this.initialContent, this.scope.parent)
  }

  async awaitConnect() {
    if (this.isConnected) { return }

    return new Promise((resolve) => {
      const listener = this.on('connected', () => {
        resolve()
        listener.remove()
      })
    })
  }

  connectedCallback() {
    this.emit('connected')
  }

  event(name, arg) {
    const event = new CustomEvent(name, {
      bubbles: false,
    })
    Object.assign(event, arg)
    return this.dispatchEvent(event)
  }
}
  .define()

/***/ }),

/***/ 1093:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Virtual = __webpack_require__(1297)
const BindingFunction = __webpack_require__(6151)

module.exports = class If extends Virtual {
  async onInit() {
    await this.bind('condition', this.initialValue)
    this.on('propertyChanged:condition', this.b(this.onConditionChanged))
    this.parent = this.el.parentElement
    this.position = [...this.parent.childNodes].indexOf(this.el)
    await this.onConditionChanged()
  }

  async onConditionChanged() {
    const condition = await this.condition
    if (condition) {
      // already in the dom
      await this.scope.initialize(this.el)
      if (this.el.parentElement) { return }
      this.parent.insertBefore(this.el, this.parent.childNodes[this.position])
    } else {
      this.el.remove()
    }
  }

  async preventInitialize() {
    const condition = await this.condition
    return !condition
  }
}
  .define({
    name: 'if'
  })
  .properties({
    condition: 'any',
  })


/***/ }),

/***/ 5473:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(5964)
const { workers } = __webpack_require__(4934)
const Destroyable = __webpack_require__(5722)
const Eventable = __webpack_require__(5524)
const Vars = __webpack_require__(6811)
const { moveAttributes } = __webpack_require__(6475)
const BindingFunction = __webpack_require__(6151)
const { getElementFromTemplate } = __webpack_require__(5381)

workers.push({
  process(scope, { node }) {
    if (node.nodeType !== Node.ELEMENT_NODE) { return }
    if (!node.hasAttribute('slot')) { return }
    const slotName = node.getAttribute('slot') || 'main'
    node.removeAttribute('slot')

    scope.slots[slotName] = {
      node,
      children: [...node.childNodes]
    }
  }
})


const processors = [
  async (scope, node) => {
    if (node.nodeName !== 'SELF') {
      return false
    }

    // move self content
    const parent = node.parentElement
    node.remove()
    while (node.childNodes.length) {
      parent.appendChild(node.childNodes[0])
    }

    // move attributes
    const component = scope.variables.this
    moveAttributes(node, component)
    const state = await scope.process(component)
    await scope.readyVirtuals(state)

    // process
    await scope.renderContent(parent)
    return true
  },
  async (scope, node) => {
    if (node.nodeName !== 'SUPER') {
      return false
    }
    // process super attributes
    const component = scope.variables.this
    moveAttributes(node, component)
    await scope.process(component)

    // process super template
    const nextDefinition = scope.type.definitions.filter((d) => d.template)[1]
    if (!nextDefinition) {
      throw new Error(`Cannot invoke 'super' as there is no parent with a template`)
    }
    const initialContent = [...node.childNodes]

    // create a temp div and set inner-html, and use child nodes to replace super node
    const container = document.createElement('div')
    container.innerHTML = nextDefinition.template
    const superNodes = [...container.childNodes]
    node.replaceWith(...superNodes)

    // render new child nodes
    const childScope = scope.child()
    childScope.type = nextDefinition.owner
    childScope.slots = {}
    scope.slots.__proto__ = childScope.slots
    for (const node of superNodes) {
      await childScope.render(node)
    }

    // process super content
    await childScope.renderSlots(initialContent)
    return true
  },
  async (scope, node) => {
    if (node.nodeName !== 'SUPER-SLOT') {
      return false
    }

    node.replaceWith(...scope.currentSlot.children)
    return true
  },
  async (scope, node) => {
    if (node.nodeName !== 'VARS') {
      return false
    }
    const vars = scope.variables.$
    for (const attribute of node.attributes) {
      const propertyName = attribute.name.replace(':', '')
      if (!vars.hasOwnProperty(propertyName)) {
        vars.defineProperty({
          name: propertyName
        })
      }


      const bindingFunction = new BindingFunction(attribute.value, scope.variables, (value) => {
        vars[propertyName] = value
      })

      await bindingFunction.update()

      vars.bindingFunctions.push(bindingFunction)
    }
    node.remove()
    return true
  },
]

const findFirstNode = (nodes) => {
  for (node of nodes) {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === '') {
      continue
    }
    return node
  }
  return null
}

module.exports = class Scope extends mixer.extends([Destroyable, Eventable]) {
  constructor({ source, parent, variables }) {
    super()
    this.parent = parent
    this.states = []
    this.variables = {
      ...(this.parent?.variables || {}),
      ...(variables || {}),
      scope: this,
    }
    if (source) {
      this.variables.this = source
    }
    this.level = (parent?.level || 0) + 1
    this.variables.$ = new Vars()
    this.slots = {}
    this.childs = []
  }

  child(options = {}) {
    const child = new Scope({
      parent: this,
      ...options
    })
    this.childs.push(child)
    return child
  }

  async renderSlots(nodes, renderScope) {
    if (this.destroyed) { return }
    if (!nodes.length) { return }
    if (!renderScope) {
      renderScope = this
    }
    const renderSlot = async (slotName, nodes) => {
      const slot = this.slots[slotName]
      if (!slot) {
        console.log(this)
        throw new Error(`Slot ${slotName} not found`)
      }
      this.currentSlot = slot

      const { node } = slot
      node.replaceChildren(...nodes)
      for (const node of nodes) {
        await renderScope.render(node)
      }

    }
    const firstNode = findFirstNode(nodes)
    if (!firstNode) {
      return
    }
    if (firstNode.nodeName !== 'SLOT') {
      await renderSlot('main', nodes)
    } else {
      const slots = [...nodes].filter((n) => n.nodeType === Node.ELEMENT_NODE)
      for (const slot of slots) {
        const slotName = slot.getAttribute('name') || 'main'
        slot.removeAttribute('name')
        await renderSlot(slotName, [...slot.childNodes])
      }
    }

  }

  async process(node) {
    if (this.destroyed) { return }
    const state = { node, scope: this }
    if (!node.hederaStates) {
      node.hederaStates = []
    }
    node.hederaStates.push(state)
    this.states.push(state)
    this.variables.node = node
    for (const worker of workers) {
      await worker.process(this, state)
    }
    await this.initializeVirtuals(state)
    this.variables.node = null
    return state
  }

  async renderTemplate(template, variables) {
    const node = getElementFromTemplate(template)
    return this.render(node, variables)
  }

  getState(node) {
    const state = this.states.find((state) => state.node === node)
    if (state) { return state }

    return this.parent.getState(node)
  }

  async renderContent(node) {
    for (const n of node.childNodes) {
      await this.render(n)
    }
  }

  async render(node, variables = {}) {
    if (this.destroyed) { return }
    Object.assign(this.variables, variables)
    for (const processor of processors) {
      if (await processor(this, node)) {
        return null
      }
    }
    if (node.rendered) { return node }
    node.rendered = true
    if (node.attach) {
      node = await node.attach(this)
    }
    if (!node) { return null }

    const state = await this.process(node)
    await this.initialize(state)
    return node
  }

  async initialize(state) {
    if (this.destroyed) { return }
    if (!state.node) {
      state = this.states.find(({ node }) => node === state)
    }
    const { node } = state
    if (node.isInitialized) {
      //console.warn('Already initialized', node)
      return
    }
    if (state.virtuals) {
      for (const virtual of state.virtuals) {
        if (await virtual.preventInitialize()) {
          return
        }
      }
    }
    if (node.initialize) {
      await node.initialize()
    } else {
      await this.renderContent(node)
      node.isInitialized = true
    }

  }

  async readyVirtuals(state) {
    if (state.virtuals) {
      for (const virtual of state.virtuals) {
        //await virtual.onReady()

        Promise.resolve(virtual.onReady())
          .catch((err) => {
            console.error(err)
          })
        /**/
      }
    }
  }

  async initializeVirtuals(state) {
    if (this.destroyed) { return }
    if (!state.virtuals) { return }

    for (const virtual of state.virtuals) {
      if (!virtual.isInitialized) {
        await virtual.initialize()
      }
    }
  }

  release(node) {
    const index = this.states.findIndex((state) => state.node === node)
    if (index === -1) {
      throw new Error()
    }
    const state = this.states[index]
    workers.forEach((w) => w.destroy && w.destroy(state))
    this.states.splice(index, 1)
  }

  destroy() {
    super.destroy()
    while (this.childs.length) {
      this.childs[0].destroy()
    }
    while (this.states.length) {
      this.release(this.states[0].node)
    }
    if (this.parent) {
      this.parent.childs.splice(this.parent.childs.indexOf(this), 1)
    }

    this.parent = null
    this.childs = null
    this.nodes = null
  }
}


/***/ }),

/***/ 2762:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Propertiable = __webpack_require__(9196)
const mixer = __webpack_require__(5964)
const Bindeable = __webpack_require__(1646)

module.exports = class Service extends mixer.extends([Propertiable, Bindeable]) {
  constructor(...args) {
    super(...args)
    if (this.instance) { throw new Error('Already instanciated') }
    this.constructor.instance = this
  }
}
  .define()

/***/ }),

/***/ 6201:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Component = __webpack_require__(722)
const template = __webpack_require__(2755)
__webpack_require__(4435)

const OFFSET = 50

module.exports = class Tooltip extends Component {
  constructor() {
    super()
    this.show = false

  }

  onInit() {
    this.listen(this.parentElement, 'mouseenter', this.onMouseEnter)
    this.listen(this.parentElement, 'mouseleave', this.onMouseLeave)
  }

  onMouseEnter() {
    this.show = true
  }

  onMouseLeave() {
    this.show = false
  }
}
  .define({
    name: 'tool-tip',
    template,
  })
  .properties({
    show: 'any',
  })


/***/ }),

/***/ 6811:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const ViewModel = __webpack_require__(4567)

module.exports = class Vars extends ViewModel {
  constructor() {
    super()
    this.bindingFunctions = []
  }
  destroy() {
    this.bindingFunctions.forEach((b) => b.destroy())
    super.destroy()
  }
}
  .define()

/***/ }),

/***/ 4567:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Propertiable = __webpack_require__(9196)
const mixer = __webpack_require__(5964)

module.exports = class ViewModel extends mixer.extends([Propertiable]) {
  constructor(values = {}) {
    super()
    Object.assign(this, values)
  }
}

/***/ }),

/***/ 1297:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Base = __webpack_require__(9516)
const { virtuals } = __webpack_require__(4763)
const mixer = __webpack_require__(5964)

module.exports = class Virtual extends mixer.extends([Base]) {

  static define(definition) {
    if (definition?.name) {
      virtuals.push(this)
    }
    return super.define(definition)
  }

  constructor(scope, variables, el, initialValue) {
    super()
    this.scope = scope
    this.variables = variables
    this.el = el
    this.initialValue = initialValue
  }

  getVariables() {
    return this.variables
  }

  preventInitialize() {
    return false
  }

  onReady() { }
}
  .define()


/***/ }),

/***/ 4763:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const { workers } = __webpack_require__(4934)
const { dashToCamel } = __webpack_require__(6475)

const virtuals = []

workers.push({
  process(scope, state) {
    const { node } = state
    if (!node.attributes) { return }

    state.virtuals = [];
    ([...node.attributes])
      .filter((attr) => attr.name.startsWith(':v-'))
      .forEach((attr) => {
        const [virtualName, ...args] = dashToCamel(attr.name.replace(':v-', '')).split('.')
        const virtualClass = virtuals.find((v) => v.definition.name === virtualName)
        if (!virtualClass) { return }
        const params = args.reduce((acc, arg) => {
          acc[arg] = true
          return acc
        }, {})
        const virtual = new virtualClass(scope, {...scope.variables}, node, attr.value, params)
        state.virtuals.push(virtual)
        node.removeAttribute(attr.name)
      })
  },
  destroy(state) {
    if (!state.virtuals) { return }
    state.virtuals.forEach((virtual) => {
      virtual.destroy()
    })
    state.virtuals = null
  }
})

module.exports = {
  virtuals,
}

/***/ }),

/***/ 6383:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


const worker = __webpack_require__(7701)
const { workers } = __webpack_require__(4934)

workers.push(worker)

/***/ }),

/***/ 7701:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const { set } = __webpack_require__(2704)

const as = (scope, node) => {
  const as = node.getAttribute('as')
  if (!as) { return }
  //console.log('as',thisArg, as, node)
  node.removeAttribute('as')
  set(scope.variables.this, as, node)
}

const attach = (scope, node) => {
  if (!node.getAttribute('attach') || !node.id) { return }

  set(scope.variables.this, node.id, node)
}

const _in = (scope, node) => {
  const attr = node.getAttribute('in')
  if (!attr) { return }
  const thisArg = scope.variables.this
  if (!thisArg[attr]) {
    thisArg[attr] = []
  }
  thisArg[attr].push(node)
}

module.exports = {
  process(scope, { node }) {
    if (node.nodeType !== Node.ELEMENT_NODE) { return }

    as(scope, node)
    attach(scope, node)
    _in(scope, node)
  }
}

/***/ }),

/***/ 2385:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const template = __webpack_require__(4679)
const Component = __webpack_require__(722)
__webpack_require__(7807)

module.exports = class ContextMenu extends Component {
  onInit() {
    this.listen(this.parentElement, 'contextmenu', this.b(this.onContextMenu))
  }

  onContextMenu(e) {
    if (this.contains(e.target)) { return }
    this.left = e.offsetX
    this.top = e.offsetY
    e.preventDefault()
    this.open = true
    this.focus()
  }
}
  .define({
    name: 'context-menu',
    template,
  })
  .properties({
    open: 'any',
    left: 'any',
    top: 'any',
  })

/***/ }),

/***/ 262:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const template = __webpack_require__(3114)
const Component = __webpack_require__(722)
__webpack_require__(428)

module.exports = class ContextMenu extends Component {
  onInit() {
    this.contextMenu = this.closest('context-menu')
  }

  onSelected(){
    console.log('on selected')
    this.event('selected')
    this.contextMenu.open = false
  }
}
  .define({
    name: 'context-menu-item',
    template,
  })

/***/ }),

/***/ 5718:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(2385)
__webpack_require__(262)

/***/ }),

/***/ 3434:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

const { workers } = __webpack_require__(4934)
const { createFunction, dashToCamel } = __webpack_require__(6475)

const prefix = ':on-'

const suffixes = {
  stop: {
    onEvent(event) {
      event.stopPropagation()
    }
  },
  prevent: {
    onEvent(event) {
      console.log('prevent', event)
      event.preventDefault()
    }
  },
  'no-capture': {
    onListen(options) {
      options.capture = false
    }
  },
  capture: {
    onListen(options) {
      options.capture = true
    }
  }
}

workers.push({
  process(scope, state) {
    const { node } = state
    if (!node.attributes) { return }
    state.listeners = [];
    ([...node.attributes])
      .filter((attr) => attr.name.startsWith(prefix))
      .forEach((attr) => {
        const options = {}
        let [eventName, ...suffixeNames] = attr.name.replace(prefix, '').split('.')
        suffixeNames.forEach((s) => {
          const suffix = suffixes[s]
          suffix.onListen && suffix.onListen(options)
        })
        eventName = dashToCamel(eventName)
        const vars = { ...scope.variables }
        delete vars.this
        const callback = (event) => {
          suffixeNames.forEach((s) => {
            const suffix = suffixes[s]
            suffix.onEvent && suffix.onEvent(event)
          })
          suffixeNames.forEach((s) => {
            const suffix = suffixes[s]
            suffix.onEvent && suffix.onEvent(event)
          })
          const eventVars = { ...vars, event }

          const fn = createFunction(attr.nodeValue, eventVars)
          fn.call(scope.variables.this)
        }
        node.addEventListener(eventName, callback, options)
        node.removeAttribute(attr.name)
        state.listeners.push({ eventName, callback })
      })
  },
  destroy(state) {
    if (!state.listeners) { return }
    state.listeners.forEach(({ eventName, callback }) => {
      state.node.removeEventListener(eventName, callback)
    })
  }
})


/***/ }),

/***/ 2044:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(5964)
const Propertiable = __webpack_require__(9196)

module.exports = class It extends mixer.extends([Propertiable]) {
  constructor(values) {
    super()
    Object.assign(this, values)
  }

  destroy() {
    this.scope.destroy()
    this.element.remove()
  }
}
  .define()
  .properties({
    index: 'number',
  })


/***/ }),

/***/ 8665:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(5964)
const Bindeable = __webpack_require__(1646)

const Array = __webpack_require__(6014)
const Eventable = __webpack_require__(5524)

module.exports = class ObservableArrayHandler extends mixer.extends([Bindeable, Eventable]) {
  static handle(source) {
    return source instanceof Array
  }

  constructor(repeater) {
    super()
    this.repeater = repeater
    this.source = this.repeater.source
    this.on(this.source, 'changed', this.b(this.onSourceChanged))
    this.timeout = null
  }


  insertIt(itToInsert) {
    const { index, element } = itToInsert
    const parent = this.repeater.el
    if (element === parent.children[index]) { return }
    if (index >= parent.children.length) {
      parent.appendChild(element)
    } else {
      parent.insertBefore(element, parent.children[index])
    }
  }

  onSourceChanged() {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
    this.timeout = setTimeout(() => this.updateIterations())
  }

  async updateIterations() {
    if (this.destroyed) { return }
    const processedIts = []
    for (const object of this.source) {
      const index = this.source.indexOf(object)
      let it = this.repeater.iterations.find((it) => it.object === object)
      if (it) {
        it.index = index
        this.insertIt(it)
      } else {
        it = this.repeater.iteration(object, index)
        this.insertIt(it)
        it.element = await it.scope.render(it.element)
      }
      processedIts.push(it)
    }

    const its = [...this.repeater.iterations]
    for (const it of its) {
      const index = processedIts.indexOf(it)
      if (index === -1) {
        it.destroy()
        const i = this.repeater.iterations.indexOf(it)
        this.repeater.iterations.splice(i, 1)
      }
    }
  }

}



/***/ }),

/***/ 8223:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = [
  __webpack_require__(8665)
]

/***/ }),

/***/ 8745:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Virtual = __webpack_require__(1297)
const It = __webpack_require__(2044)
const { getElementFromTemplate, getElementFromObject } = __webpack_require__(5381)
const handlers = __webpack_require__(8223)

module.exports = class For extends Virtual {
  async onInit() {
    this.iterations = null
    this.on('propertyChanged:source', this.b(this.onSourceChanged))
    const value = this.initialValue
    const [name, remaining] = value.split(/ of /)
    const [source, template] = remaining.split(/ with /)
    await this.bind('name', `'${name}'`)
    await this.bind('source', source)
    if (template) {
      await this.bind('template', template)
    } else {
      this.template = [...this.el.childNodes].find((child) => child.nodeType === Node.ELEMENT_NODE)
      this.el.innerHTML = ''
    }
    await this.onSourceChanged()
  }

  iteration(object, index) {
    const scope = this.scope.child()
    scope.variables[this.name] = object
    scope.variables.index = index
    let element
    if (typeof this.template === 'function') {
      const result = this.template(object, scope)
      if (result instanceof HTMLTemplateElement) {
        element = getElementFromTemplate(result)
      } else {
        element = result
      }
    } else {
      element = getElementFromObject(this.template)
    }

    const it = new It({ index, object, element, scope })


    this.iterations.push(it)
    return it
  }

  reset() {
    if (this.handler) {
      this.handler.destroy()
      this.handler = null
    }
    if (this.iterations) {
      this.iterations.forEach((it) => {
        it.destroy()
      })
    }
    this.iterations = []
  }

  async onSourceChanged() {
    this.reset()
    if (!this.source) { return }

    const handler = handlers.find((handler) => handler.handle(this.source))
    if (handler) {
      this.handler = new handler(this)
    } else {
      this.handler = null
    }

    let i = 0
    setTimeout(async () => {
      const source = this.source
      while (i < source.length && source === this.source) {
        await new Promise(async (resolve) => {
          setTimeout(async () => {
            const it = this.iteration(this.source[i], i)
            this.el.appendChild(it.element)
            it.element = await it.scope.render(it.element)
            i++
            resolve()
          }, 0)
        })
      }
    })

  }

  preventInitialize() {
    return true
  }

  /**
   * no need to destroy iterations as their scopes will be destroyed as the current local scope will be destroyed
   */
  destroy() {
    if (this.handler) {
      this.handler.destroy()
    }
    super.destroy()
  }
}
  .define({
    name: 'for'
  })
  .properties({
    source: 'any',
    name: 'any',
  })


/***/ }),

/***/ 4934:
/***/ (function(module) {

module.exports = {
  components: {},
  workers: []
}

/***/ }),

/***/ 9487:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const template = __webpack_require__(7225)
const Component = __webpack_require__(722)
const Array = __webpack_require__(6014)
const Panel = __webpack_require__(2675)
const { getElementFromTemplate } = __webpack_require__(5381)
const TabPanel = __webpack_require__(3836)
const { getHoverState } = __webpack_require__(8031)

__webpack_require__(7041)

module.exports = class EditableGrid extends Component {
  constructor() {
    super()
    this.maxDeepth = 2
    this.size = [3, 2]
  }

  onInit() {
    this.column = new Array()
    this.addRow(this.column, new Array())
  }

  onReady() {
    for (const element of this.initSlot.children) {
      this.add(element)
    }
  }

  findFirstPanel(array) {
    if (!array) {
      array = this.column
    }
    for (const object of array) {
      if (object instanceof Panel) {
        return object
      }
      const panel = this.findFirstPanel(object)
      if (panel) {
        return panel
      }
    }
    return null
  }

  addRowItem(row, item, position) {
    if (position === undefined) {
      position = row.length
    }
    item.row = row
    item.grid = this
    row.splice(position, 0, item)
    return item
  }

  addRow(column, row, position) {
    if (position === undefined) {
      position = column.length
    }
    column.splice(position, 0, row)
    row.column = column
    return row
  }

  async add(object) {
    if (object instanceof Panel) {
      object.grid = this
      this.column[0].push(object)
      return
    }
    const objectInfos = await this.templateObject(object)
    if (!this.focusPanel) {
      const panel = await this.createTabPanel(objectInfos)
      const row = this.column[0]
      this.addRowItem(row, panel, row.length)
      this.focusPanel = panel
    } else {
      this.focusPanel.objects.push(objectInfos)
      this.focusPanel.currentObject = objectInfos
    }
  }

  repositionColumn(column) {
    if (column.length !== 1 || !column.row) { return }

    const columnIndex = column.row.indexOf(column)

    column.row.splice(columnIndex, 1)
    for (const object of column[0].reverse()) {
      this.addRowItem(column.row, object, columnIndex)
    }
  }

  async createTabPanel(...args) {
    const panel = new TabPanel(...args)
    panel.grid = this
    return this.scope.render(panel)
  }

  async cell(object, scope) {
    if (object instanceof Panel) {
      return object
    }
    const child = scope.child()
    let element = getElementFromTemplate(this.columnTemplate)
    child.variables.column = object
    element = await child.render(element)
    return element
  }


  removeRowIfEmpty(row) {
    if (row.length || (!row.column.row && row.column.length === 1)) {
      //this.repositionRow(row)
      return
    }
    row.column.remove(row)
    this.removeColumnIfEmpty(row.column)
  }

  removeColumnIfEmpty(column) {
    if (column.length || !column.row) {
      this.repositionColumn(column)
      return false
    }
    column.row.remove(column)
    this.removeRowIfEmpty(column.row)
    return true
  }

  async templateObject(data) {
    const template = this.templates.find((t) => data instanceof t.for)
    let element = getElementFromTemplate(template)
    const child = this.scope.parent.child()
    child.variables[template.as || 'data'] = data
    element = await child.render(element)
    return {
      data,
      element,
      scope: child,
    }
  }

  onRowDragOver(row, node, e) {
    if (row.column.length === 1) { return }
    e.preventDefault()
    this.hoverRow = node
    this.hoverMode = getHoverState(node, e)
  }

  onRowDrop(row) {

  }

  dragEnd(){
    this.dragInfos = null
    this.hoverMode = null
    this.hoverMode = null
  }
}
  .define({
    name: 'editable-grid',
    template,
  })
  .variables({
    Panel,
  })
  .properties({
    dragInfos: 'any',
    focusPanel: 'any',
    hoverRow: 'any',
    hoverMode: 'any',
  })

/***/ }),

/***/ 2675:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const template = __webpack_require__(6105)
const Component = __webpack_require__(722)
__webpack_require__(7913)



module.exports = class Panel extends Component {

}
  .define({
    name: 'grid-panel',
    template,
  })

/***/ }),

/***/ 3836:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const template = __webpack_require__(584)
const Array = __webpack_require__(6014)
const Panel = __webpack_require__(2675)
const { getHoverState } = __webpack_require__(8031)
__webpack_require__(4730)




module.exports = class TabPanel extends Panel {

  constructor(...values) {
    super()
    this.objects = new Array(...values)
    this.currentObject = values[0]
  }

  drag(object) {
    this.grid.dragInfos = {
      panel: this,
      object,
    }
  }

  dragEnd(){
    this.grid.dragEnd()
  }

  removeObject(object) {
    this.objects.remove(object)
    object.scope.destroy(object.element)
    if (!this.removeIfEmpty()) {
      this.currentObject = this.objects[0]
    }
  }

  removeIfEmpty() {
    if (this.objects.length) {
      return false
    }
    this.row.remove(this)
    this.grid.removeRowIfEmpty(this.row)

    if (this.grid.focusPanel === this) {
      this.grid.focusPanel = null
    }
    this.destroy()
    return true
  }

  async onDrop() {
    if (!this.grid.dragInfos) { return }
    if (!this.hover) { return }

    const { panel, object } = this.grid.dragInfos
    panel.objects.remove(object)

    const panelPosition = this.row.indexOf(this)

    if (['left', 'right'].indexOf(this.hover) !== -1) {
      const newPanel = await this.grid.createTabPanel(object)
      const position = panelPosition + (this.hover === 'right' ? 1 : 0)
      console.log(this.hover, position)
      this.grid.addRowItem(this.row, newPanel, position)
    } else if (['top', 'bottom'].indexOf(this.hover) !== -1) {
      const newPanel = await this.grid.createTabPanel(object)
      if (this.row.length === 1) {
        const rowPosition = this.row.column.indexOf(this.row)
        const position = rowPosition + (this.hover === 'bottom' ? 1 : 0)
        const column = this.row.column
        const row = this.grid.addRow(column, new Array(), position)
        this.grid.addRowItem(row, newPanel)
      } else {
        const rootRow = this.row
        rootRow.remove(this)
        const column = new Array()
        let panels = [newPanel, this]
        if (this.hover === 'bottom') {
          panels = panels.reverse()
        }
        for (const panel of panels) {
          panel.grid = this.grid
          const row = this.grid.addRow(column, new Array())
          this.grid.addRowItem(row, panel)
        }

        this.grid.addRowItem(rootRow, column, panelPosition)
      }
    } else if (this.hover === 'full') {
      this.objects.push(object)
    }

    if (this !== panel) {
      this.removeIfEmpty()
    }

    if(!panel.removeIfEmpty()){
      panel.currentObject = panel.objects[0]
    }
    
    this.hover = null
  }

  onDragOver(node, e) {
    if (!this.grid.dragInfos) { return }
    const { panel, object } = this.grid.dragInfos
    if (this === panel && panel.objects.length === 1) {
      panel.hover = null
      return
    }
    e.preventDefault()
    this.hover = getHoverState(node, e)
  }

  destroy() {
    super.destroy()
    this.objects.forEach(({ scope }) => scope.destroy())
  }
}
  .define({
    name: 'grid-tab-panel',
    template,
  })
  .properties({
    currentObject: 'any',
    hover: 'any',
  })

/***/ }),

/***/ 558:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(9487)
__webpack_require__(2675)
__webpack_require__(3836)

/***/ }),

/***/ 8031:
/***/ (function(module) {

const getHoverState = (node, e) => {
  const percent = 5
  if (e.offsetX < node.offsetWidth / percent) {
    return 'left'
  } else if (e.offsetX > node.offsetWidth - node.offsetWidth / percent) {
    return 'right'
  } else if (e.offsetY < node.offsetHeight / percent) {
    return 'top'
  } else if (e.offsetY > node.offsetHeight - node.offsetHeight / percent) {
    return 'bottom'
  } else {
    return 'full'
  }
}

module.exports = {
  getHoverState
}

/***/ }),

/***/ 6985:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(1297)
__webpack_require__(2338)
__webpack_require__(6383)
__webpack_require__(3434)
__webpack_require__(5470)
__webpack_require__(8745)
__webpack_require__(4346)
__webpack_require__(4193)
__webpack_require__(2772)
__webpack_require__(1201)
__webpack_require__(1214)
__webpack_require__(8722)
__webpack_require__(1093)
__webpack_require__(558)
__webpack_require__(6038)
__webpack_require__(5718)
__webpack_require__(1298)
__webpack_require__(487)
__webpack_require__(6201)

/***/ }),

/***/ 5480:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Virtual = __webpack_require__(1297)
const SelectableRoot = __webpack_require__(3524)

class Selectable extends Virtual {
  async onInit() {
    await this.bind('callback', `()=>${this.initialValue}`)
    const rootEl = this.el.closest('[selectable-root]')
    if (!rootEl) {
      throw new Error('Root not found')
    }

    const state = rootEl.hederaStates.find((s) => s.virtuals?.find((v) => v instanceof SelectableRoot))
    const root = state.virtuals.find((v) => v instanceof SelectableRoot)
    this.root = root
    this.el.setAttribute('selectable', '')

    this.listen(this.el, 'click', (e) => {
      root.select(this.el)
    })

    this.listen(this.el, 'dblclick', (e) => {
      this.callback()
    })

    root.focus()
  }
}
Selectable
  .define({
    name: 'selectable'
  })
  .properties({
    callback: 'any',
    mode: 'any',
    within: 'any',
  })

SelectableRoot.Selectable = Selectable
module.exports = Selectable


/***/ }),

/***/ 3524:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Virtual = __webpack_require__(1297)
const Selectable = __webpack_require__(5480)

const keys = [
  [(e) => e.key === 'ArrowUp', -1],
  [(e) => e.key === 'ArrowDown', 1],
  [(e) => e.key === 'ArrowRight', 1],
  [(e) => e.key === 'ArrowLeft', -1],
  [(e) => e.key === 'Tab' && !e.shiftKey, 1],
  [(e) => e.key === 'Tab' && e.shiftKey, -1],
]

const modes = {
  horizontal: ['ArrowRight', 'ArrowLeft', 'Tab'],
  vertical: ['ArrowUp', 'ArrowDown', 'Tab']
}

module.exports = class SelectableRoot extends Virtual {
  async onInit() {
    this.mode = 'vertical'
    if (this.initialValue) {
      await this.bind('mode', this.initialValue)
    }
    this.el.setAttribute('selectable-root', '')
    this.el.setAttribute('tabindex', '0')
    this.listen(this.el, 'keydown', this.b(this.onKeyDown), true)
  }

  focus() {
    const current = this.getSelected()
    if (!current) {
      this.selectFirst()
    }
  }

  getSelectable(node) {
    return node.hederaStates.find((s) => s.virtuals?.find((v) => v instanceof SelectableRoot.Selectable)?.root === this)
  }


  getSelectables(selector = '') {
    return [...this.el.querySelectorAll(`[selectable]${selector}`)]
      .filter((n) => this.getSelectable(n))
  }

  getSelected() {
    return this.getSelectables('.selected')[0]
  }

  selectFirst() {
    const first = this.getSelectables()[0]
    first.classList.add('selected')
  }

  select(selectable) {
    const current = this.getSelected()
    if (current) {
      current.classList.remove('selected')
    }
    selectable.classList.add('selected')
  }

  async onKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      const selected = this.getSelected()
      await this.getSelectable(selected).callback()
      return
    }
    const mode = this.mode
    if (modes[mode].indexOf(e.key) === -1) { return }

    const key = keys.find(([check]) => check(e))
    if (!key) { return }

    e.preventDefault()
    const current = this.getSelected()
    if (!current) {
      this.selectFirst()
    } else {
      const selectables = this.getSelectables()
      const currentIndex = selectables.indexOf(current)
      let nextIndex = currentIndex + key[1]

      if (nextIndex >= selectables.length) {
        nextIndex = 0
      } else if (nextIndex < 0) {
        nextIndex = selectables.length - 1
      }
      const next = selectables[nextIndex]
      if (next) {
        current.classList.remove('selected')
        next.classList.add('selected')
      }
    }
  }
}
  .define({
    name: 'selectableRoot'
  })
  .properties({
    mode: 'any',
  })


/***/ }),

/***/ 1214:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(5480)
__webpack_require__(3524)

/***/ }),

/***/ 4193:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Virtual = __webpack_require__(1297)
const { navigator } = __webpack_require__(4934)

module.exports = class Link extends Virtual {
  async onInit() {
    await this.bind('href', this.initialValue)

    this.el.addEventListener('click', async (event) => {
      event.preventDefault()
      if (this.href) {
        this.el.classList.add('loading')
        const start = new Date()
        await navigator.navigate(this.href)
        this.el.classList.remove('loading')
        console.log(new Date() - start)
      }
    })

    this.on('propertyChanged:href', () => {
      this.updateHref()
    })
    navigator.on('change', () => {
      this.updateActive()
    })

    this.updateActive()
    this.updateHref()
  }

  updateHref() {
    this.el.href = this.href || ''
  }

  updateActive() {
    const isActive = this.href === navigator.currentUrl
    this.el.classList[isActive ? 'add' : 'remove']('active')
  }
}
  .define({
    name: 'link'
  })
  .properties({
    href: 'any',
  })


/***/ }),

/***/ 5146:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Component = __webpack_require__(722)

module.exports = class BaseLoader extends Component {

}
  .define()
  .properties({
    size: 'any',
  })


/***/ }),

/***/ 6968:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const { components: { Loader } } = __webpack_require__(4934)
const Virtual = __webpack_require__(1297)

module.exports = class LoaderVirtual extends Virtual {
  async onInit() {
    this.on('propertyChanged', this.b(this.update))
    this.loader = new Loader()
    const [isLoading, size] = this.initialValue.split(/ size /)
    await this.bind('isLoading', isLoading)
    await this.bind('size', size)
    await this.scope.render(this.loader)
    this.update()
  }

  update() {
    this.loader.size = this.size
    if (this.isLoading) {
      this.el.appendChild(this.loader)
    } else if (this.loader.parentElement === this.el) {
      this.el.removeChild(this.loader)
    }
  }
}
  .define({
    name: 'loader'
  })
  .properties({
    isLoading: 'any',
    size: 'any',
  })


/***/ }),

/***/ 8722:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(6968)

/***/ }),

/***/ 2965:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(5964)
const Bindeable = __webpack_require__(1646)
const Destroyable = __webpack_require__(5722)

module.exports = mixer.mixin([Bindeable, Destroyable], (base) => {
  return class Interactable extends base {
    constructor(...args) {
      super(...args)
      this.listeners = []
    }

    listen(el, event, callback, options) {
      el.addEventListener(event, this.b(callback), options)
      this.listeners.push({ el, event, callback })
    }

    stopListen(el, event, callback) {
      const index = this.listeners.findIndex((l) => {
        return l.el === el && l.event === event && l.callback === callback
      })
      if (index === -1) { return }

      el.removeEventListener(event, this.b(callback))
      this.listeners.splice(index, 1)
    }

    destroy() {
      this.listeners.forEach(({ el, event, callback }) => {
        el.removeEventListener(event, this.b(callback))
      })
      super.destroy()
    }
  }
})

/***/ }),

/***/ 1338:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Propertiable = __webpack_require__(9196)
const mixer = __webpack_require__(5964)

module.exports = mixer.mixin([Propertiable], (base) => {
  return class LocalStorageable extends base {
    static localStorage(options) {
      this.localStorageOptions = options
      return this
    }

    constructor(...args) {
      super(...args)
      const options = this.constructor.localStorageOptions
      if (!options) { return }

      let initialValues = localStorage.getItem(options.name)
      if (initialValues) {
        initialValues = JSON.parse(initialValues)
        Object.assign(this, initialValues)
      }

      this.on('propertyChanged', () => {
        const values = this.values
        const valuesToSave = Object.entries(values)
          .filter(([name]) => options.properties.indexOf(name) !== -1)
          .reduce((acc, [name, value]) => {
            acc[name] = value
            return acc
          }, {})

        localStorage.setItem(options.name, JSON.stringify(valuesToSave))
      })
    }
  }
})

/***/ }),

/***/ 3237:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Component = __webpack_require__(722)
const template = __webpack_require__(9171)
const ModalContainer = __webpack_require__(2960)
__webpack_require__(6131);


module.exports = class Modal extends Component {
  constructor() {
    super()
    this.isOpened = false
  }

  show() {
    console.log('show', this)
    ModalContainer.instance.show(this)
    this.isOpened = true
  }

  close() {
    console.log('closing', this)
    this.isOpened = false
    ModalContainer.instance.close()
  }
}
  .define({
    name: "mo-dal",
    template,
  })
  .properties({
    title: 'any',
    isOpened: 'any',
  })


/***/ }),

/***/ 2960:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Component = __webpack_require__(722)
const template = __webpack_require__(2956)

__webpack_require__(6326)


module.exports = class ModalContainer extends Component {
  constructor() {
    super()
    if (this.constructor.instance) { throw new Error('ModalContainer already instanciated') }
    this.constructor.instance = this
  }

  removeListener() {
    if (this.modal) {
      this.modal.off('destroyed', this.b(this.onModalDestroyed))
    }
  }

  show(modal) {
    this.removeListener()
    this.modal = modal
    if (this.modal) {
      this.modal.on('destroyed', this.b(this.onModalDestroyed))
    }
  }

  onModalDestroyed() {
    this.removeListener()
    this.modal = null
  }

  close() {
    this.modal = null
  }
}
  .define({
    name: 'modal-container',
    template,
  })
  .properties({
    modal: 'any',
  })


/***/ }),

/***/ 487:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(2960)
__webpack_require__(3237)

/***/ }),

/***/ 555:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(5964)
const Propertiable = __webpack_require__(9196)

module.exports = class Notification extends mixer.extends([Propertiable]) {
  constructor(values) {
    super()
    Object.assign(this, values)
  }
  close() {
    if (this.isClosed) {
      return
    }
    this.isClosed = true
    setTimeout(() => {
      const index = service.notifications.indexOf(this)
      if (index === -1) {
        return
      }
      service.notifications.splice(index, 1)
    }, 500);
  }
}
  .define()
  .properties({
    isClosed: 'any',
    message: 'any'
  })


/***/ }),

/***/ 5203:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Service = __webpack_require__(2762)
const Array = __webpack_require__(6014)
const Notification = __webpack_require__(555)

const types = {
  info: {
    icon: '<i class="fa-solid fa-circle-info"></i>',
  },
  success: {
    icon: '<i class="fa-solid fa-check"></i>',
  },
  error: {
    icon: '<i class="fa-solid fa-exclamation"></i>',
  },
};

Object.entries(types).forEach(([name, type]) => {
  type.name = name;
})

module.exports = class NotificationService extends Service {
  constructor() {
    super()
    this.notifications = new Array()
  }
  notify(notification) {
    notification.type = types[notification.type] || types.info
    notification = new Notification(notification)
    this.notifications.push(notification)
  }
}
  .define()
  .properties({
    notifications: "any",
  })


/***/ }),

/***/ 1298:
/***/ (function() {



/***/ }),

/***/ 5624:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Component = __webpack_require__(722)
const LocalStorageable = __webpack_require__(1338)
const mixer = __webpack_require__(5964)

module.exports = class Layout extends mixer.extends(Component, [LocalStorageable]) {



  onReady() {
    if (!this.container)
      throw new Error("Layout '" + this.constructor.name + "' must implement a container");
  }

  async setContent(content) {
    const oldContent = this.content

    this.content = content
    this.contentReady = false
    await this.scope.render(this.content)
    if (oldContent) {
      this.scope.release(oldContent)
      oldContent.remove()
    }
    this.container.appendChild(this.content)
    this.contentReady = true

  }
}
  .define()
  .properties({
    contentReady: 'any',
  })


/***/ }),

/***/ 8917:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Router = __webpack_require__(9240)

module.exports = class Navigator extends Router {
  constructor() {
    super()
    this.use((req, res, next) => {
      res.navigate = (...args) => this.navigate(...args)
      return next()
    })
  }

  async start() {
    window.addEventListener('popstate', async () => {
      await this.processCurrent()
    })

    await this.processCurrent()
  }

  async processCurrent() {
    this.currentUrl = window.location.pathname
    const req = {
      url: this.currentUrl,
    }

    const res = {}
    await this.process(req, res)
    await this.emit('change')
  }

  async navigate(url, replaceState) {
    history[replaceState ? "replaceState" : "pushState"]({}, '', url)
    await this.processCurrent()
  }
}


/***/ }),

/***/ 2338:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Scope = __webpack_require__(5473)
const Layout = __webpack_require__(5624)
const RootRouter = __webpack_require__(5452)

module.exports = class Root extends Layout {
  constructor() {
    super()
    this.router = new RootRouter(this)
    this.router.on('match', this.b(this.onMatch))
  }

  async start(variables) {
    const scope = new Scope({ source: this, variables })
    await scope.render(this)
  }

  onMatch() {
    document.body.classList.add('sools-app-ready')
  }

  async loadLayouts(req, layoutsTypes) {
    let current = this
    const layouts = []
    for (let layoutType of layoutsTypes) {
      let args = {}
      if (!(layoutType.prototype instanceof Layout)) {
        layoutType = layoutType(req)
      }
      if (layoutType instanceof Array) {
        args = layoutType[1]
        layoutType = layoutType[0]
      }
      layoutType = await layoutType
      if (layoutType.default) {
        layoutType = layoutType.default
      }
      if (!(current.content instanceof layoutType)) {
        const layout = new layoutType()
        Object.assign(layout, args)
        await current.setContent(layout)
      } else {
        Object.assign(current.content, args)
      }
      current = current.content
      layouts.push(current)
    }
    return layouts
  }

  async setPage(req, layoutsTypes, pageImport, args) {
    const layouts = await this.loadLayouts(req, layoutsTypes)
    const bottomLayout = layouts[layouts.length - 1]
    const pageModule = await pageImport
    const pageType = pageModule.default
    const page = new pageType(...args)
    await bottomLayout.setContent(page)
    await this.emit('pageLoaded', [layouts, page])
  }
}.define()

/***/ }),

/***/ 9954:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Router = __webpack_require__(9240)

module.exports = class LayoutRouter extends Router {
  async onMatch(req, res, next) {
    res.layouts = [...res.layouts, this.layout]
    return super.onMatch(req, res, next)
  }
}
  .define()

/***/ }),

/***/ 5452:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Router = __webpack_require__(9240)

module.exports = class RootRoute extends Router {
  constructor(root) {
    super()
    this.root = root
  }

  async onMatch(req, res, next) {
    res.layouts = []
    const self = this
    res.page = async function (pageImport, ...args) {
      await self.root.setPage(this.req, this.layouts, pageImport, args)
    }

    await super.onMatch(req, res, next)
  }
}
  .define()

/***/ }),

/***/ 9240:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Eventable = __webpack_require__(5524)
const mixer = __webpack_require__(5964)
const { chain } = __webpack_require__(5530)

const functionToProcessable = (fn) => {
  return {
    async process(req, res, next) { await fn(req, res, next) }
  }
}

class Router extends mixer.extends([Eventable]) {

  constructor(values = {}) {
    super()
    Object.assign(this, {
      processables: [],
      ...values,
    })
  }

  route(url, ...middlewares) {
    const route = new Router({
      url,
      processables: middlewares.map(functionToProcessable),
    })
    this.processables.push(route)
  }

  use(...args) {
    let router
    if (args.length === 1 && args[0] instanceof Router) {
      router = args[0]
      this.processables.push(router)
    } else {
      this.processables.push(...args.map(functionToProcessable))
    }
  }

  async onMatch(req, res, next) {
    await chain(this.processables, (p, subNext) => {
      return p.process(req, res, subNext)
    }, next)
    await this.emit('match')
  }

  async process(req, res, next = () => { }) {
    let match
    if (this.url != undefined) {
      let urlToMatch = this.url
      if (urlToMatch === '') {
        urlToMatch = /^$/
      }
      match = req.url.match(urlToMatch)
      if (!match) {
        return next()
      }
    }

    const routerReq = {
      __proto__: req,
    }

    if (this.url) {
      const url = req.url.replace(match[0], '')
      Object.assign(routerReq, {
        match,
        url
      })
    }

    const routerRes = {
      __proto__: res,
      req,
    }

    await this.onMatch(routerReq, routerRes, next)
  }
}


module.exports = Router
  .define()

/***/ }),

/***/ 5429:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const BindingFunction = __webpack_require__(6151)

const expressionRegex = /{{.*?}}/g

module.exports = class BindingExpression {
  constructor(expression, variables, callback) {
    this.expression = expression
    this.variables = variables
    this.callback = callback
    this.functions = []
  }

  async update() {
    let value = this.expression
    this.destroy()
    this.functions = []
    for (const path of this.expression.match(expressionRegex)) {
      const sanitizePath = path.replace('{{', '').replace('}}', '')
      const bindingFunction = new BindingFunction(sanitizePath, this.variables, async () => {
        await this.update()
      })

      bindingFunction.update(false)
      const initialValue = await bindingFunction.getValue()
      value = value.replace(path, initialValue)
      this.functions.push(bindingFunction)
    }

    this.expression.match(expressionRegex)
    await this.callback(value)
  }

  destroy() {
    this.functions.forEach((p) => p.destroy())
  }
}


/***/ }),

/***/ 6151:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Event = __webpack_require__(1231)

const { createFunction } = __webpack_require__(6475)

const processFunctionString = (string) => {
  let sanitized = string
  const paths = string.match(/((?:[\w|$|?]+\.@?[\w|$|.|@|?]+))/g) || []
  //.filter((p) => p.indexOf('@') !== -1)
  paths
    .forEach((p) => {
      sanitized = sanitized.replace(p, p.replace(/@/g, ''))
    })

  return {
    sanitized,
    paths,
  }
}


const onBindingGetProperty = new Event()
const onBindingDestroyed = new Event()


module.exports = class BindingFunction {

  static onBindingGetProperty = onBindingGetProperty
  static onBindingDestroyed = onBindingDestroyed
  constructor(functionString, variables, callback) {
    this.functionString = functionString
    this.variables = variables
    this.callback = callback
    this.listeners = []
    this.holdables = []
    const { sanitized, paths } = processFunctionString(functionString)
    this.paths = paths
    const vars = {
      ...variables
    }
    delete vars.this
    this.sanitizedFunctionString = sanitized
    this.function = createFunction('return ' + sanitized, vars)
  }

  async getValue() {
    const thisArg = this.variables.this
    const value = await this.function.call(thisArg)
    return value
  }

  async update(trigger = true) {
    this.destroy()
    this.listeners = []
    this.paths.forEach((path) => {
      const segments = path.split('.')
      let value = this.variables
      segments.forEach((segment) => {
        if (!value) { return }

        const propertyName = segment.replace(/[@?]+/g, '')
        if (segment.startsWith('@')) {
          if (!value.on) {
            console.log(path, { value })
            throw new Error()
          }
          const listener = value.on(`propertyChanged:${propertyName}`, async () => {
            await this.update()
          })
          this.listeners.push(listener)
        }
        value = value[propertyName]
        if (value) {
          onBindingGetProperty.trigger(this, value)
        }
      })
    })
    if (trigger) {
      const value = await this.getValue()
      await this.callback(value)
      return value
    }
  }

  destroy() {
    this.listeners.forEach((l) => l.remove())
    onBindingDestroyed.trigger(this)
  }
}

/***/ }),

/***/ 5470:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

const { workers } = __webpack_require__(4934)
const { set } = __webpack_require__(2704)
const { dashToCamel } = __webpack_require__(6475)
const BindingFunction = __webpack_require__(6151)
const BindingExpression = __webpack_require__(5429)

const attributes = {
  class: (() => {
    const caches = []
    return (node, value, key) => {
      if (!value) {
        value = ''
      }
      const classes = value.split(' ').filter((o) => o && ['undefined', 'false', 'null'].indexOf(o) === -1)
      let cache = caches.find((c) => c.node === node && c.key === key)
      if (cache) {
        for (const cssClass of cache.classes) {
          node.classList.remove(cssClass)
        }
      } else {
        cache = {
          node,
          classes,
          key
        }
        caches.push(cache)
      }
      classes.forEach((c) => node.classList.add(c))
      cache.classes = classes
    }
  })(),
  innerHtml(node, value, key) {
    node.innerHTML = value
  }
}

const setAttr = (node, path, value, key) => {
  const attr = attributes[path]
  if (attr) {
    attr(node, value, key)
    return
  }
  set(node, path, value)
}

const PREFIX = ':'

const initBindings = (state) => {
  if (!state.bindings) {
    state.bindings = []
  }
}

const destroy = (state) => {
  if (!state.bindings) { return }
  state.bindings.forEach((b) => b.destroy())
  state.bindings = null
}

workers.push({
  async process(scope, state) {
    const { node } = state
    if (node.nodeType !== Node.TEXT_NODE) { return }
    if (node.textContent.indexOf('{{=') === -1) { return }
    initBindings(state)
    const functionContent = node.textContent.replace('{{=', '').replace('}}', '').trim()
    let child
    const parent = node.parentElement
    const binding = new BindingFunction(functionContent, { ...scope.variables }, async (value) => {
      if (child) {
        child.destroy()
        parent.innerHTML = ''
        child = null
      }
      if (!value) { return }
      if (typeof value === 'string') {
        parent.innerHTML = value
      } else {
        parent.appendChild(value)

      }

      child = scope.child()
      await child.renderContent(parent)
    })
    await binding.update()
    node.remove()
    state.bindings.push(binding)
  },
  destroy
}, {
  async process(scope, state) {
    const { node } = state
    if (node.nodeType !== Node.TEXT_NODE) { return }
    if (node.textContent.search('{{[^=]') === -1) { return }
    initBindings(state)
    const bindingExpression = new BindingExpression(node.textContent, { ...scope.variables }, (value) => {
      node.textContent = value
    })
    await bindingExpression.update()
    state.bindings.push(bindingExpression)
  },
  destroy
}, {
  async process(scope, state) {
    const { node } = state
    if (!node.attributes) { return }
    initBindings(state)
    const attributes = [...node.attributes]
      .filter((attr) => attr.name.startsWith(PREFIX))
    for (const attr of attributes) {
      const path = dashToCamel(attr.name.replace(PREFIX, ''))
      const bindingFunction = new BindingFunction(attr.nodeValue, { ...scope.variables }, (value) => {
        setAttr(node, path, value, attr.nodeValue)
      })
      await bindingFunction.update()
      state.bindings.push(bindingFunction)
      node.removeAttribute(attr.name)
    }
  },
  destroy
})



/***/ }),

/***/ 9924:
/***/ (function(module) {


module.exports = {
  base: []
}

/***/ }),

/***/ 8755:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Component = __webpack_require__(722)
const template = __webpack_require__(3742)
__webpack_require__(9777)

const MAX = 1000

const staticKeys = {
  ctrl: (e) => e.ctrlKey,
  alt: (e) => e.altKey
}

const getKeys = (keysString) => {
  const keysArray = keysString.split('+')
  const keys = {}
  for (let key of keysArray) {
    key = key.toUpperCase()
    const existing = keys[key]
    keys[key] = existing ? existing + 1 : 1
  }
  return keys
}

const matchKeys = (keys1, keys2) => {
  const entries = Object.entries(keys1)
  for (const [k, v] of entries) {
    if (v !== keys2[k]) {
      return false
    }
  }
  return true
}

const keysHtml = {
  ARROWDOWN: '<i class="fa-solid fa-arrow-down"></i>',
  ARROWUP: '<i class="fa-solid fa-arrow-up"></i>'
}

module.exports = class ShortCut extends Component {
  constructor() {
    super()
    this.target = this.parentElement
    this.on('propertyChanged:key', this.b(this.updateKeys))

  }

  onInit() {
    this.updateKeys()
    if (!this.callback) { return }
    this.target.addEventListener('keydown', this.b(this.onKeyDown))
  }

  updateKeys() {
    this.keys = getKeys(this.key)
    this.keyHtml = Object.keys(this.keys).map((key) => {
      let keyHtml = keysHtml[key]
      if (keyHtml) { return keyHtml }
      return key
    }).join('+')
  }

  start() {
    this.reset()
    this.startDate = new Date()
  }

  stackKey(key) {
    key = key.toUpperCase()
    if (!this.keys[key]) { return }
    const existing = this.keysPressed[key]
    this.keysPressed[key] = Math.min(this.keys[key], existing ? existing + 1 : 1)
  }

  reset() {
    this.keysPressed = {}
    this.startDate = null
  }

  trigger() {
    this.reset()
    if (this.callback) {
      setTimeout(() => this.callback())
    }
  }

  stack(e) {
    const pressedStaticKeys = Object.entries(staticKeys).filter(([k, c]) => c(e))
    pressedStaticKeys.forEach(([k]) => this.stackKey(k))
    this.stackKey(e.key)
    if (matchKeys(this.keys, this.keysPressed)) {
      this.trigger()
    }
  }


  onKeyDown(e) {
    if (this.startDate) {
      if (new Date() - this.startDate > MAX) {
        this.start()
      }
    } else {
      this.start()
    }

    this.stack(e)
  }
}
  .define({
    name: 'short-cut',
    template,
  })
  .properties({
    callback: 'any',
    keyHtml: 'any',
    key: 'any',
  })


/***/ }),

/***/ 7164:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Component = __webpack_require__(722)
const template = __webpack_require__(6128)
__webpack_require__(2250)

module.exports = class ShortCuts extends Component { }
  .define({
    name: 'short-cuts',
    template
  })


/***/ }),

/***/ 2772:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(7919)
__webpack_require__(7164)
__webpack_require__(8755)

/***/ }),

/***/ 7919:
/***/ (function() {


let displayed = false
const className = 'shortcut'
const check = (e) => e.altKey



window.addEventListener('keydown', (e) => {
  if (e.altKey) { e.preventDefault() }
  if (!check(e)) { return }

  document.body.classList.add(className)
})

window.addEventListener('keyup', (e) => {
  if (check(e)) { return }

  document.body.classList.remove(className)
})


/***/ }),

/***/ 7908:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Virtual = __webpack_require__(1297)
const utils = __webpack_require__(3532)

module.exports = class TabLoop extends Virtual {
  constructor(el) {
    super(el)
    let current = null
    window.addEventListener('focusin', (e) => {
      const target = document.activeElement
      if (this.el.contains(target)) {
        current = target
      } else if (current) {
        utils.focusFirst(this.el)
      }
    })
  }
}
  .define({
    name: 'tabLoop'
  })



/***/ }),

/***/ 1201:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(7908)

/***/ }),

/***/ 3532:
/***/ (function(module) {

const focusable = 'button, input,href, select, textarea, [tabindex]:not([tabindex="-1"])'


const getFocusables = () => {
  return [...document.querySelectorAll(focusable)]
    .filter((el) => {
      return el.offsetParent
    })
}

const focusFromCurrent = (increment) => {
  const focusables = getFocusables()
  let index = focusables.indexOf(document.activeElement)
  if (index === -1) {
    index = 0
  } else {
    index = index + increment
    if (index > focusables.length) {
      index = 0
    } else if (index < 0) {
      index = focusables.length - 1
    }
  }
  const next = focusables[index]
  next.focus()
}

const next = () => {
  focusFromCurrent(+1)
}
const previous = () => {
  focusFromCurrent(-1)
}

const focusFirst = (el) => {
  const first = el.querySelector(focusable)
  if (first) {
    first.focus()
  }
}

const tab = {
  next,
  previous,
  focusFirst
}


module.exports = tab

/***/ }),

/***/ 6475:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {




const isCustomElement = (node) => {
  return node.tagName && typeof customElements.get(node.tagName.toLowerCase()) != "undefined";
}

const createFunction = (stringFunction, variables = {}) => {
  const functionArgs = []
  const variablesArgs = []

  for (var [name, value] of Object.entries(variables)) {
    functionArgs.push(name)
    variablesArgs.push(value)
  }
  functionArgs.push(stringFunction)
  return function () {

    const fn = Function.apply(null, functionArgs)
    return fn.apply(this, variablesArgs)
  }
}


const dashToCamel = (string) => string.replace(/-([a-z])/g, (g) => g[1].toUpperCase())

const attributes = {
  class(node, value) {
    value.split(' ').forEach((cssClass) => {
      node.classList.add(cssClass)
    })
  },
}

const moveAttributes = (from, to, exclude = []) => {
  [...from.attributes]
    .forEach((attr) => {
      if (exclude.indexOf(attr.name) !== -1) { return }
      from.removeAttribute(attr.name)
      const attrType = attributes[attr.name]
      if (attrType) {
        attrType(from, attr.value)
      } else {
        to.setAttribute(attr.name, attr.nodeValue)
      }

    })
}

module.exports = {
  dashToCamel,
  createFunction,
  isCustomElement,
  template: __webpack_require__(5381),
  moveAttributes
}

/***/ }),

/***/ 5381:
/***/ (function(module) {

const wrapMap = {
  option: [1, "<select multiple='multiple'>", "</select>"],
  legend: [1, "<fieldset>", "</fieldset>"],
  area: [1, "<map>", "</map>"],
  param: [1, "<object>", "</object>"],
  thead: [1, "<table>", "</table>"],
  tr: [2, "<table><tbody>", "</tbody></table>"],
  col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
  td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
  body: [0, "", ""],
  _default: [1, "<div>", "</div>"]
};
wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;
const str2DOMElement = (html) => {

  var match = /<\s*\w.*?>/g.exec(html);
  var element = document.createElement('div');
  if (match != null) {
    var tag = match[0].replace(/</g, '').replace(/>/g, '').split(' ')[0];
    if (tag.toLowerCase() === 'body') {
      var dom = document.implementation.createDocument('http://www.w3.org/1999/xhtml', 'html', null);
      var body = document.createElement("body");
      // keeping the attributes
      element.innerHTML = html.replace(/<body/g, '<div').replace(/<\/body>/g, '</div>');
      var attrs = element.firstChild.attributes;
      body.innerHTML = html;
      for (var i = 0; i < attrs.length; i++) {
        body.setAttribute(attrs[i].name, attrs[i].value);
      }
      return body;
    } else {
      var map = wrapMap[tag] || wrapMap._default,
        element;
      html = map[1] + html + map[2];
      element.innerHTML = html;
      // Descend through wrappers to the right content
      var j = map[0] + 1;
      while (j--) {
        element = element.lastChild;
      }
    }
  } else {
    element.innerHTML = html;
    element = element.lastChild;
  }
  return element;
}

const isTemplate = (template) => {
  return (template instanceof HTMLScriptElement || template instanceof HTMLTemplateElement || typeof template === "string");
}

const getElementFromTemplate = (template) => {
  const clone = document.importNode(template.content, true)
  return [...clone.childNodes].find((child) => child.nodeType === Node.ELEMENT_NODE)
}

const getElementFromObject = (template) => {
  if (template instanceof HTMLTemplateElement) {
    return getElementFromTemplate(template)
  } else if (typeof template === "string") {
    return str2DOMElement(template)
  } else if (template instanceof HTMLElement || template instanceof SVGElement) {
    return template.cloneNode(true)
  } else {
    throw new Error()
  }
}

module.exports = {
  isTemplate,
  getElementFromTemplate,
  getElementFromObject,
}

/***/ }),

/***/ 1024:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Destroyable = __webpack_require__(5722)
const Virtual = __webpack_require__(1297)

module.exports = class Exit extends Virtual {
  async onInit() {
    const [callback, when] = this.initialValue.split(/ when /)
    await this.bind('callback', `()=>${callback}`)
    if(when){
      await this.bind('when', when)
    }
    
    this.listen(window, 'click', this.onWindowClicked, true)
    this.listen(window, 'keydown', this.onWindowKeyDown, true)
    if (this.when === undefined) {
      this.when = true
    }
  }

  onWindowKeyDown(e) {
    if (e.key === "Escape") {
      this.trigger()
    }
  }

  onWindowClicked(e) {
    if (!this.el.contains(e.target)) {
      this.trigger()
    }
  }

  trigger() {
    if (this.destroyed) { return }
    if (!this.when) { return }
    this.callback()
  }
}
  .define({
    name: 'exit'
  })
  .properties({
    callback: 'any',
  })


/***/ }),

/***/ 4275:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Virtual = __webpack_require__(1297)

module.exports = class InputDelay extends Virtual {
  async onInit(){
    this.timeout = null
    await this.bind('callback', `()=>${this.initialValue}`)
    this.listen(this.el, 'input', this.onChange)
  }

  onChange() {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }

    this.timeout = setTimeout(() => {
      this.callback()
    }, 500)
  }
}
  .define({
    name: 'inputDelay'
  })
  .properties({
    callback: 'any',
  })


/***/ }),

/***/ 4346:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(4275)
__webpack_require__(1024)

/***/ }),

/***/ 4711:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const axios = __webpack_require__(6660)
const context = __webpack_require__(8152)
const QueryResult = __webpack_require__(8898)
const Models = __webpack_require__(1361)
const mixer = __webpack_require__(5964)
const Bindeable = __webpack_require__(1646)
const { objectToFilter } = __webpack_require__(572)


const getArgs = (args) => {
  return args.filter((arg) => arg !== context)
}

module.exports = class Collection extends mixer.extends([Bindeable]) {
  constructor(values) {
    super()
    Object.assign(this, values)
  }

  async request(options) {
    try {
      let headers = options.headers
      if (this.headersBuilder) {
        const additionalHeaders = await this.headersBuilder()
        Object.assign(headers, additionalHeaders)
      }

      const axiosOptions = {
        ...options,
        ...this.axiosOptions,
        method: 'post',
        withCredentials: true,
        headers,
      }
      
      const response = await axios(axiosOptions)
      const result = response.data
      //console.log(action, ...args, result)
      return result
    } catch (err) {
      if (err.cause) {
        console.error(err.cause)
        throw err
      }
      if (err.response) {
        throw new Error(`API error on url ${options.url}: ${JSON.stringify(err.response.data, null, ' ')} `,)
      }
      throw err
    }
  }

  async apiRequest(action, body, options = {}) {
    const url = `${this.url}/collections/${this.type.definition.pluralName}${action}`
    //console.log(action, JSON.stringify(body, null, ' '), JSON.stringify(options, null, ' '))

    const { result } = await this.request({
      url,
      data: body,
      headers: {
        'Content-Type': 'application/json'
      },
    })

    return result
  }

  async findByUniqueIndex(index, options) {
    const model = this.instances.find((m) => m.anyUniqueIndexMatch(index))
    if (model) { return model }

    return this.findOne(objectToFilter(index), options)
  }

  async findOne(...args) {
    const [filter, options] = getArgs(args)
    const [result] = await this.find(filter, {
      ...options,
      limit: 1,
    })

    return result
  }

  async find(...args) {
    const [filter, options] = getArgs(args)
    const result = await this.query([{
      filter
    }], options)

    return result
  }

  async query(...args) {
    const [stages, options = {}] = getArgs(args)
    const modelsJson = await this.apiRequest('/query', [stages, options])
    const modelsArray = modelsJson.map((modelJson) => {
      const model = this.type.parse(modelJson, { singleInstance: true })
      model.setLoadState(options.load || {})
      return model
    })
    const models = new (QueryResult.of(this.type))(modelsArray, { stages, options })
    return models
  }

  async create(modelJson) {
    if (modelJson.toJSON) {
      modelJson = modelJson.toJSON()
    }
    const json = await this.apiRequest('/create', [modelJson])
    const instance = this.type.parse(json, { singleInstance: true })
    instance.setLoadState(true)
    await this.onModelCreated(instance)
    return instance
  }

  async findOrCreate(modelJson) {
    if (modelJson.toJSON) {
      modelJson = modelJson.toJSON()
    }
    const { created, model } = await this.apiRequest('/findOrCreate', [modelJson])
    const instance = this.type.parse(model, { singleInstance: true })
    instance.setLoadState(true)
    if (created) {
      await this.onModelCreated(instance)
    }
    return instance
  }

  async onModelCreated(model) {
    for (const ref of Models.references) {
      if (ref.onModelCreated) {
        await ref.onModelCreated(model)
      }
    }
  }

  async onModelUpdated(model) {
    for (const ref of Models.references) {
      await ref.onModelUpdated(model)
    }
  }

  async update(query, patches) {
    const json = await this.apiRequest('/update', [query, patches])
    const instance = this.type.parse(json, { singleInstance: true })
    await this.onModelUpdated(instance)
    return instance
  }

  async createOrUpdate(...args) {
    let modelJson
    let query
    if (args.length === 2) {
      [query, modelJson] = args
    } else {
      const [model] = args
      const index = model.getFirstUniqueIndex()
      if (!index) {
        console.log(JSON.stringify(model.toJSON(), null, ' '))
        throw new Error()
      }

      modelJson = model
      query = [index]
    }
    if (modelJson.toJSON) {
      modelJson = modelJson.toJSON()
    }
    const json = await this.apiRequest('/create-or-update', [query, modelJson])
    const resultModel = this.type.parse(json)
    resultModel.setLoadState(true)
    this.hold(resultModel)
    return resultModel
  }
}


/***/ }),

/***/ 3979:
/***/ (function(module) {

const singleInstanceOptions = { singleInstance: true }
const arrayInstances = []

const loop = () => {
  for (const instances of arrayInstances) {
    instances.checkDuplicates()
  }
  //setTimeout(loop, 1000)
}

loop()


module.exports = class Instances extends Array {
  constructor(type) {
    super()
    this.type = type
  }

  checkDuplicates() {
    for (const i of this) {
      for (const j of this) {
        if (i === j) { continue }
        if (i.equals(j)) {
          console.log('equals', i.toJSON(), j.toJSON())
          Object.assign(i, j)
          j.tranform(i)
          console.info('Transformation completed', i, j)
        }
      }
    }
  }

  getInstance(json) {
    let model = this.find((m) => m._id === json._id)
    if (!model) {
      model = this.type.parse({
        '@type': json['@type']
      })
      model.set(json, singleInstanceOptions)
      model.on('destroyed', () => this.onInstanceDestroyed(model))
      this.push(model)
      //this.checkDuplicates()
    } else {
      model.set(json, singleInstanceOptions)
    }

    return model
  }

  onInstanceDestroyed(instance) {
    const index = this.indexOf(instance)
    if (index !== -1) {
      this.splice(index, 1)
    }
  }
}

/***/ }),

/***/ 999:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const { Model } = __webpack_require__(5079)
const Collection = __webpack_require__(4711)
const Instances = __webpack_require__(3979)

const collectionsTypesMap = [
  [Model, Collection]
]

const buildCollections = (url, options = {}) => {
  const rootModelTypes = Model
    .getAllChilds()
    .filter((t) => t.definition.root)
  const collections = rootModelTypes.reduce((acc, type) => {
    const collectionTypePair = collectionsTypesMap.find(([t]) => t === type || type.prototype instanceof t)
    if (!collectionTypePair) {
      throw new Error(`Collection type not find for type '${type.definition.name}'`)
    }
    const collectionType = collectionTypePair[1]
    const instances = new Instances(type)
    const collection = new collectionType({ type, url, instances, ...options })
    acc[type.definition.pluralName] = collection
    Object.assign(type,{
      collection,
      instances
    })
    return acc
  }, {})
  return collections
}

module.exports = {
  collectionsTypesMap,
  buildCollections,
}

/***/ }),

/***/ 5700:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(5964);


module.exports = mixer.mixin((base) => {
  return class extends base {
    async onModelCreated(model) {
      const { template } = this.constructor.definitions.find((d) => d.template)
      const isInsanceOfTemplate = model instanceof template
      if (!isInsanceOfTemplate) { return }
      if(model[this.property.on] === this.owner){
        this.push(model)
      }
    }
  }
})

/***/ }),

/***/ 4910:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(5964)

module.exports = mixer.mixin((base) => {
  return class ClientModelMixin extends base {
    
  }
})

/***/ }),

/***/ 7206:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(5964)


module.exports = mixer.mixin((base) => {
  return class extends base {
    async onModelCreated(model) {
      await this.checkModel(model)
    }

    async onModelUpdated(model) {
      await this.checkModel(model)
    }
  }
})

/***/ }),

/***/ 8387:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(5964)
const Destroyable = __webpack_require__(5722)

module.exports = mixer.mixin([Destroyable], (base) => {
  const references = []
  return class Referenceable extends base {
    static references = references
    constructor(...args) {
      super(...args)
      references.push(this)
    }

    destroy() {
      const index = references.indexOf(this)
      references.splice(index, 1)
      return super.destroy()
    }
  }

})
  .define()



/***/ }),

/***/ 5147:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Destroyable = __webpack_require__(5722)
const mixer = __webpack_require__(5964)
const Equalable = __webpack_require__(2884);
//const Transformable = require('./Transformable')

const SingleInstance = mixer.mixin([Destroyable, Equalable], (base) => {
  return class SingleInstance extends base {
    static parse(object, options = {}, context) {
      if(object == null){
        return object
      }
      if (!options.singleInstance) {
        return super.parse(object, options, context)
      }

      const instance = this.instances.getInstance(object)
      instance.set(object, options)
      return instance
    }
  }
})

module.exports = SingleInstance

/***/ }),

/***/ 5029:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(5964)
const BaseHoldable = __webpack_require__(7828)

module.exports = mixer.mixin((base) => {
  return class ArrayHolder extends base {
    changed() {
      if (this.copy) {
        this.copy.forEach((o) => {
          if (mixer.is(o, BaseHoldable)) {
            o.release(this)
          }
        })
      }
      this.copy = [...this]
      this.copy.forEach((o) => {
        if (mixer.is(o, BaseHoldable)) {
          o.hold(this)
        }
      })
      return super.changed()
    }
  }
})


/***/ }),

/***/ 7828:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(5964)

module.exports = mixer.mixin((base) => {
  return class Holdable extends base {
    hold(reference) {
      throw new Error('Not implemented')
    }
    
    release(reference) {
      throw new Error('Not implemented')
    }
  }
})


/***/ }),

/***/ 9829:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(5964)
const Destroyable = __webpack_require__(5722)
const BaseHoldable = __webpack_require__(7828)

const state = '@holdState'
const instances = []

const HOLD_DURATION = 5

let circulars

const countCirculars = (references, limits) => {
  return references
    .filter((instance) => {
      if (limits.indexOf(instance) !== -1) {
        return true
      }
      return isCircular(instance, limits)
    })
    .length
}

const isCircular = (instance, limits = []) => {
  if (circulars.indexOf(instance) !== -1) { return true }
  limits = [...limits, instance]
  const references = instance[state]
    .references
    .filter((reference) => reference[state])
  if (references.length !== instance[state].references.length) {
    return false
  }
  const count = countCirculars(references, limits)
  const circular = count === references.length
  if (circular) {
    //console.log('---CIRCULAR', instance)
    circulars.push(circular)
  }
  return circular
}

const shouldDestroy = (instance) => {
  const currentDate = new Date()
  const instanceState = instance[state]
  if (currentDate - instanceState.lastDate < HOLD_DURATION * 1000) { return false }
  if (!instanceState.references.length) { return true }

  const circular = isCircular(instance)
  return circular
}

const log = () => {
  const objectToLog = instances.reduce((acc, h) => {
    acc[h.toString()] = h
    return acc
  }, {})
  //console.log(instances.length, objectToLog)
}

//loop()

const loop = () => {
  log()
  circulars = []
  instances
    .filter(shouldDestroy)
    .forEach((i) => {
      i.destroy()
    })
  setTimeout(loop, HOLD_DURATION / 3 * 1000)
}

const mixin = mixer.mixin([Destroyable, BaseHoldable], (base) => {
  return class Holdable extends base {
    constructor(...args) {
      super(...args)
      Object.defineProperty(this, state, {
        enumerable: true,
        writable: true,
        value: {
          references: [],
          lastDate: new Date()
        }
      })
      instances.push(this)
    }

    hold(reference) {
      if (reference === this) {
        return
        console.error({ ...reference })
        throw new Error('A object cannot hold itself')
      }
      const existing = this[state].references.indexOf(reference)
      if (existing !== -1) {
        //throw new Error('Could not hold')
        return
      }
      this[state].references.push(reference)
      this[state].lastDate = new Date()
    }

    async holdWhile(fn) {
      const id = {}
      this.hold(id)
      await fn()
      this.release(id)
    }

    release(reference) {
      const referenceIndex = this[state].references.indexOf(reference)
      if (referenceIndex === -1) {
        //throw new Error('Could not release')
        return
      }

      this[state].references.splice(referenceIndex, 1)
      this[state].lastDate = new Date()
    }

    destroy() {
      const index = instances.indexOf(this)
      if (index !== -1) {
        instances.splice(index, 1)
      }
      return super.destroy()
    }
  }
})
mixin.state = state
module.exports = mixin


/***/ }),

/***/ 8405:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(5964)
const BaseHoldable = __webpack_require__(7828)

module.exports = mixer.mixin([BaseHoldable], (base) => {
  return class HoldableFragment extends base {
    hold(reference) {
      this.owner.hold(reference)
    }

    release(reference) {
      this.owner.release(reference)
    }
  }
})
  .define()


/***/ }),

/***/ 5466:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(5964)
const Propertiable = __webpack_require__(9196)
const BaseHoldable  = __webpack_require__(7828)

module.exports = mixer.mixin([Propertiable], (base) => {
  return class Holder extends base {
    propertyChanged(property, value, oldValue) {
      if (oldValue && mixer.is(oldValue, BaseHoldable )) {
        oldValue.release(this)
      }
      if (value && mixer.is(value, BaseHoldable)) {
        value.hold(this)
      }
      return super.propertyChanged(property, value, oldValue)
    }
  }
})


/***/ }),

/***/ 1267:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(5964)
const Eventable = __webpack_require__(5524)
const Destroyable = __webpack_require__(5722)

module.exports = mixer.mixin([Destroyable, Eventable], (base) => {
  return class Transformable extends base {
    transform(to) {
      this.emit('transformed', [to])
      this.destroy()
    }
  }
})



/***/ }),

/***/ 5138:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


const Holdable = __webpack_require__(9829)
const HoldableFragment = __webpack_require__(8405)
const Holder = __webpack_require__(5466)
const ArrayHolder = __webpack_require__(5029)
const Transformable = __webpack_require__(1267)
const Referenceable = __webpack_require__(8387)
const ClientHasMany = __webpack_require__(5700)
const SingleInstance = __webpack_require__(5147)
const ClientQueryResult = __webpack_require__(7206)
const context = __webpack_require__(8152)
const ClientModel = __webpack_require__(4910)
const setup = __webpack_require__(5676)

const { object, model, arrayAssociation, baseModels, models, hasMany, queryResult } = setup


model.before.push(Holdable, Holder, Transformable, SingleInstance)

baseModels.before.push(ArrayHolder, Referenceable)
models.before.push(Holdable, ClientModel)
arrayAssociation.before.push(HoldableFragment)
hasMany.before.push(ClientHasMany)
queryResult.before.push(ClientQueryResult)

setup.getArgs = (args) => {
  if (args[0] !== context) {
    args.unshift(context)
  }
  return args
}

/***/ }),

/***/ 2375:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(5964)
const Propertiable = __webpack_require__(9196)

module.exports = mixer.mixin([Propertiable], (base) => {
  return class extends base {

    reset(){
      super.reset()
      this.readOnly = false
      this.hidden = false
    }
  }
})
  .define()
  .properties({
    hidden: 'any',
    readOnly: 'any',
  })

/***/ }),

/***/ 1985:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const { Model } = __webpack_require__(5079)
const ModelComponent = __webpack_require__(7055)
const template = __webpack_require__(6547)
const Pageable = __webpack_require__(8421)
const { navigator } = __webpack_require__(4934)
const mixer = __webpack_require__(5964)
__webpack_require__(9851)

module.exports = class Card extends ModelComponent {

}
  .define({
    name: 'model-card',
    template,
    type: 'card',
  })
  .variables({
    Pageable,
    navigator,
    mixer,
  })
  .register(Model, 'card')

/***/ }),

/***/ 7055:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const { components: { Interface } } = __webpack_require__(4934)
const componentsService = __webpack_require__(1234)
const { moveAttributes } = __webpack_require__(6475)
const { getParent } = __webpack_require__(5149)

module.exports = class ModelComponent extends Interface {
  constructor(model, type) {
    super()
    this.classList.add('interactable')
    Object.assign(this, {
      model,
      type
    })
  }

  async replace(scope) {
    if (this.constructor !== ModelComponent) { return null }

    let infos = this
    if (!infos.model || !infos.type) {
      const div = document.createElement('div')
      for (const attributeName of ['model', 'type']) {
        const attribute = this.getAttribute(`:${attributeName}`)
        if (!attribute) {
          throw new Error('Cannot replace')
        }
        div.setAttribute(`:${attributeName}`, attribute)
      }

      await scope.process(div)
      infos = div
    }
    if (!infos.model || !infos.type) {
      return null
    }
    const type = componentsService.get(infos.model.constructor, infos.type)
    const replace = new type()
    moveAttributes(this, replace, ['type'])
    this.destroy()
    return replace
  }

  static register(type, name) {
    componentsService.register(type, name, this)
    return this
  }

  async attach(scope) {
    let replace = await this.replace(scope)
    if (replace) {
      if (!this.parentElement) {
        throw new Error('Cannot replace')
      }
      this.replaceWith(replace)
      return replace.attach(scope)
    }

    return super.attach(scope)
  }

  async onReady() {
    await super.onReady()
    await this.update()
  }

  async update() {
    if (!this.model) { return }
    await this.model.load()
  }
}
  .define({
    name: 'model-component',
  })
  .properties({
    model: 'any',
  })


/***/ }),

/***/ 5742:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Component = __webpack_require__(722)
const template = __webpack_require__(7126)
__webpack_require__(720)

module.exports = class ModelFiltersAny extends Component {

  onReady() {
    this.root = this.closest('model-filters')
  }
}
  .define({
    name: 'model-filters-any',
    template,
  })

/***/ }),

/***/ 4603:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Component = __webpack_require__(722)
const template = __webpack_require__(2141)
const componentsService = __webpack_require__(1234)
const Array = __webpack_require__(6014)
const Any = __webpack_require__(5742)
__webpack_require__(3613)

module.exports = class ModelFilters extends Component {

  onReady() {
    this.on('propertyChanged:type', this.b(this.onTypeChanged))
    this.refresh()
  }

  onTypeChanged() {
    this.refresh()
  }

  refresh() {
    this.anys = new Array(new Any())
  }

}
  .define({
    name: 'model-filters',
    template,
  })
  .properties({
    anys: 'any',
    type: 'any',
  })


/***/ }),

/***/ 4920:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Component = __webpack_require__(722)
const template = __webpack_require__(2900)
const componentsService = __webpack_require__(1234)
__webpack_require__(5702)

module.exports = class ModelSearch extends Component {
  constructor() {
    super()
  }

  onChange() {
    try {
      const query = eval(this.input.value)

    } catch (err) {
       
    }
  }

  template(result) {
    const componentType = componentsService.get(result.constructor, 'card')
    return new componentType(result)
  }
}
  .define({
    name: 'model-search',
    template,
  })
  .properties({
    results: 'any',
    open: 'any',
    length: 'any',
    type: 'any',
  })


/***/ }),

/***/ 2253:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const { Model } = __webpack_require__(5079)
const ModelComponent = __webpack_require__(7055)
const template = __webpack_require__(1567)

__webpack_require__(47)


module.exports = class Row extends ModelComponent {

}
  .define({
    name: 'model-row',
    type: 'row',
    template
  })
  .register(Model, 'row')


/***/ }),

/***/ 9408:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const { components: { Interface } } = __webpack_require__(4934)
const template = __webpack_require__(8968)
const Propertiable = __webpack_require__(9196)
const mixer = __webpack_require__(5964)
const Pageable = __webpack_require__(8421)
const Mixin = __webpack_require__(9252)

__webpack_require__(6218)

class SearchableResults extends mixer.extends([Propertiable]) {
  constructor(type) {
    super()
    this.type = type
  }

  async search(key) {
    this.error = false
    this.loading = true
    const { searchField } = this.type.definitions.find((d) => d.searchField)
    try {
      this.results = await this.type.collection.find([{
        $match: [`$${searchField}`, key]
      }], {
        type: this.type.definition.name,
        limit: 3
      })
    } catch (e) {
      console.error(e)
      this.error = e.message
    } finally {
      this.loading = false
    }
  }
}

SearchableResults
  .define()
  .properties({
    loading: 'bool',
    results: 'any',
    error: 'bool',
  })

const childs = Pageable
  .getAllChilds()
  .filter((c) => !c.definition.abstract && !(c.prototype instanceof Mixin))

module.exports = class Search extends Interface {
  constructor() {
    super()
    this.searchables = childs.map((type) => {
      return new SearchableResults(type)
    })
    this.first = true
  }

  start() {
    this.open = true
    if (this.first) {
      this.search()
      this.first = false
    }

  }

  stop() {
    this.open = false
    this.input.blur()
  }

  async search() {
    const promises = this.searchables.map(async (searchable) => {
      await searchable.search(this.input.value)
    })
    await Promise.all(promises)
  }

  selectSuggestion(suggestion) {
    suggestion.click()
    this.stop()
  }

  empty() {
    this.input.value = ''
    this.search()
  }
}
  .define({
    name: 'search-bar',
    template,
  })
  .properties({
    results: 'any',
    open: 'any',
    length: 'any',
  })


/***/ }),

/***/ 6654:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

//require('./TypeFilter')
__webpack_require__(4920)
__webpack_require__(1985)
__webpack_require__(4603)

/***/ }),

/***/ 1234:
/***/ (function(module) {


const registries = {

}

const register = (type, name, component, load) => {
  if (!registries[name]) {
    registries[name] = []
  }
  registries[name].push({
    type,
    component,
    load
  })
}

const get = (type, name) => {
  const registry = registries[name]
  const find = registry.find((r) => r.type === type)
  if (find) {
    return find.component
  }

  const parents = type.definition?.parents
  if (!parents) { return null }
  for (const parent of parents) {
    const parentFind = get(parent, name)
    if (parentFind) {
      return parentFind
    }
  }
  return null
}

module.exports = {
  register,
  get,
}

/***/ }),

/***/ 5664:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Field = __webpack_require__(3712)
const template = __webpack_require__(7548)
__webpack_require__(6318)

module.exports = class BoolField extends Field {

}
  .define({
    name: 'bool-field',
    template,
  })

/***/ }),

/***/ 8820:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Field = __webpack_require__(3712)
const template = __webpack_require__(5476)
__webpack_require__(7910)

module.exports = class DateField extends Field {
  constructor() {
    super()
    this.value = ''
  }



}
  .define({
    name: 'date-field',
    template,
  })


/***/ }),

/***/ 3712:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const { components: { Interface } } = __webpack_require__(4934)
const Array = __webpack_require__(6014)
const template = __webpack_require__(2520)
__webpack_require__(8922)

module.exports = class Field extends Interface {
  constructor(values = {}) {
    super()
    Object.assign(this, values)
  }

  onInit() {
    this.on(this.state, 'propertyChanged:value', this.b(this.onValueChanged))
    this.onValueChanged()
  }

  onValueChanged() {

  }

  message(text) {
    const msg = {
      text,
      start: new Date()
    }
    this.state.messages.push(msg)
    setTimeout(() => {
      this.state.messages.tryRemove(msg)
    }, 5000)
  }

  getValue() {
    return this.value
  }

  setValue(value) {
    this.state.value = value
    this.touched = -1
    this.event('changed', { field: this })
  }
}
  .define({
    template,
  })
  .properties({
    header: 'any',
    state: 'any',
    touched: 'any',
  })

/***/ }),

/***/ 3019:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Field = __webpack_require__(3712)
const template = __webpack_require__(8385)
__webpack_require__(8857)

module.exports = class MarkdownField extends Field {

}
  .define({
    name: 'markdown-field',
    template,
  })

/***/ }),

/***/ 2155:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Field = __webpack_require__(3712)
const template = __webpack_require__(9225)
__webpack_require__(41)

module.exports = class NumberField extends Field {

}
  .define({
    name: 'number-field',
    template,
  })
  .properties({
    step: 'any',
  })


/***/ }),

/***/ 4837:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const { Password, String } = __webpack_require__(5079)
const Field = __webpack_require__(3712)
const template = __webpack_require__(7271)
__webpack_require__(5319)

const map = [
  [Password, 'password'],
  [String, 'text']
]

module.exports = class TextField extends Field {
  onInit() {
    

    this.type = map.find(([t]) => {
      const type = this.state.property.type
      return type === t || type.prototype instanceof t
    })[1]
  }
}
  .define({
    name: 'text-field',
    template,
  })

/***/ }),

/***/ 8839:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = {
  TextField: __webpack_require__(4837),
  BoolField: __webpack_require__(5664),
  DateField: __webpack_require__(8820),
  NumberField: __webpack_require__(2155),
  MarkdownField:__webpack_require__(3019)
}


/***/ }),

/***/ 668:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const template = __webpack_require__(1660)
const context = __webpack_require__(8152)
const RootModelState = __webpack_require__(4448)
const ObjectForm = __webpack_require__(2308)
__webpack_require__(3766)

const applyStates = (targetStates, statesPatch) => {
  Object.entries(statesPatch)
    .forEach(([k, patch]) => {
      const target = targetStates[k]
      Object.assign(target, patch)
      if (patch.states) {
        applyStates(target.states, patch.states)
      }
    })
}

const propagate = (state, patch) => {
  Object.values(state.states)
    .forEach((childState) => {
      Object.assign(childState, patch)
      if (childState.states) {
        propagate(childState, patch)
      }
    })
}

module.exports = class ChildModelForm extends ObjectForm {

  buildState(value) {
    return new RootModelState({
      property: {
        type: value.constructor,
      },
      value,
      isEdit: !!this.model,
      required: true,
      context,
    })
  }

  async onSubmitSuccess(value) {
    try {
      let model
      if (this.model) {
        model = await this.type.collection.update({
          _id: this.model._id,
        }, {
          $set: value
        })
      } else {
        model = await this.type.collection.create(value)
      }

      this.event('saved', { model })
    } catch (error) {
      console.log('error', error)
      this.event('error', { error })
      throw error
    }
  }

  isCreate() { return !this.model }

  async updateStates() {
    await this.state.applyLogics()

    if (this.states) {
      applyStates(this.state.states, this.states)
    }
    await this.state.validate()
  }

  async onFieldsetChanged() {
    await this.updateStates()
  }
}
  .define({
    name: 'child-model-form',
    template,
  })



/***/ }),

/***/ 6434:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const template = __webpack_require__(2246)
const componentsService = __webpack_require__(1234)
const Field = __webpack_require__(3712)
const ChildModelForm = __webpack_require__(668)
__webpack_require__(4272)

module.exports = class ModelField extends Field {
  constructor(values) {
    super(values)
    this.default()
    //this.on('propertyChanged:value', this.b(this.update))
  }

  select(model) {
    this.value = model
    this.panel.close()
  }

  default() {
    this.mode = 'default'
    this.suggestionsOpen = false
  }

  edit() {
    this.mode = 'edit'
    this.suggestionsOpen = true
    this.input.focus()
  }

  selectSuggestion(suggestion) {
    this.default()
    this.setValue(suggestion)
  }

  async onFocus() {
    await this.search()
  }

  templateSuggestion(suggestion) {
    if (!suggestion) { return null }
    const componentType = componentsService.get(suggestion.constructor, 'row')
    return new componentType(suggestion)
  }

  async search() {
    const value = this.input.value
    if (value == this.lastValue) { return }
    this.lastValue = value
    const type = this.state.property.type
    const searchField = type.definition.searchField || 'name'
    this.suggestions = await type.collection.find([
      ...(this.state.filters || []),
      {
        $match: [`$${searchField}`, value]
      }
    ], {
      limit: 3,
    })
    this.suggestionsOpen = true
  }

  async create() {
    this.mode = 'create'
    const form = new ChildModelForm({
      type: this.state.type,
      object: null,
      label: this.label,
    })

    form.addEventListener('saved', ({ model }) => {
      this.value = model
    })
    this.form.show(form)
  }

  onSaved({ model }) {
    this.setValue(model)
  }
}
  .define({
    name: 'model-field',
    template,
  })
  .properties({
    panelModel: 'any',
    mode: 'any',
    suggestions: 'any',
    suggestionsOpen: 'any',
  })


/***/ }),

/***/ 7180:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Component = __webpack_require__(722)
const template = __webpack_require__(3884)
const Array = __webpack_require__(6014)

__webpack_require__(3470)

module.exports = class ModelForm extends Component {
  constructor() {
    super()
    this.forms = new Array()
  }

  target(form) {
    const index = this.forms.indexOf(form)
    if (index === -1) { throw new Error() }

    this.forms.splice(index + 1, this.forms.length - index + 1)
  }

  show(form) {
    this.forms.push(form)
    form.addEventListener('saved', () => {
      this.forms.remove(form)
    })
  }

  onSaved({ model }) {
    console.log('model saved', model)
    this.event('saved', { model })
  }
}
  .define({
    name: 'model-form',
    template,
  })
  .properties({
    model: 'any',
    type: 'any',
    states: 'any',
  })




/***/ }),

/***/ 9386:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const template = __webpack_require__(6006)
const { String, Bool, Model, Object: ObjectType, Number } = __webpack_require__(5079)
const { TextField, BoolField, DateField, NumberField, MarkdownField } = __webpack_require__(8839)
const ModelField = __webpack_require__(6434)
const Field = __webpack_require__(3712)
const Markdown = __webpack_require__(8110)
const ignore = ['@type']
__webpack_require__(240)

const typesFieldmapping = [
  [Markdown, MarkdownField],
  [String, TextField],
  [Bool, BoolField],
  [Number, NumberField],
  [Model, ModelField],
]

const getMapping = (type) => {
  return typesFieldmapping.find(([t]) => type === t || type.prototype instanceof t)
}

class ObjectFieldset extends Field {
  static typesFieldmapping = typesFieldmapping

  onInit() {
    this.updateTypes()
    if (!this.state.value && this.state.required) {
      this.create()
    }
    super.onInit()
  }

  create() {
    this.setValue(new (this.types[0])())
  }

  onSelectedTypeChanged(type) {
    if (this.value?.constructor === type) { return }
    let value
    if (type) {
      const oldValue = this.value
      value = new type()
      Object.assign(value, oldValue)
    } else {
      value = null
    }

    this.setValue(value)
  }

  async updateTypes() {
    this.types = this.state.property.type
      .getAllChilds()
      .filter((c) => !c.definition.abstract)
  }

  onValueChanged() {
    if (!this.state.value) {
      this.fields = []
      return
    }
    const type = this.state.property.type
    const properties = type.properties
    this.fields = Object.entries(this.state.states)
      .filter(([p]) => ignore.indexOf(p) === -1)
      .reduce((acc, [propertyName, state]) => {
        const property = properties.find((p) => p.name === propertyName)
        const mapping = getMapping(property.type)
        const fieldType = mapping[1]
        const field = new fieldType({
          state,
          childForm: this.childForm,
          fieldset: this,
          form: this.form,
        })
        acc[property.name] = field
        field.addEventListener('changed', this.b(this.onFieldChanged))
        return acc
      }, {})
  }

  onFieldChanged() {
    this.touched = true
    this.event('changed', { field: this })
  }

  showErrors() {
    this.touched = true
    Object.values(this.fields)
      .forEach((field) => {
        if (field.showErrors) {
          field.showErrors()
        } else {
          field.touched = true
        }
      })
  }

}

typesFieldmapping.push([ObjectType, ObjectFieldset])

ObjectFieldset
  .define({
    name: 'object-fieldset',
    template,
  })
  .properties({
    types: 'any',
    fields: 'any',
  })

module.exports = ObjectFieldset

/***/ }),

/***/ 2308:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Component = __webpack_require__(722)
const template = __webpack_require__(1244)
const context = __webpack_require__(8152)
const RootObjectState = __webpack_require__(5280)
__webpack_require__(8422)

const applyStates = (targetStates, statesPatch) => {
  Object.entries(statesPatch)
    .forEach(([k, patch]) => {
      const target = targetStates[k]
      Object.assign(target, patch)
      if (patch.states) {
        applyStates(target.states, patch.states)
      }
    })
}

const propagate = (state, patch) => {
  Object.values(state.states)
    .forEach((childState) => {
      Object.assign(childState, patch)
      if (childState.states) {
        propagate(childState, patch)
      }
    })
}

module.exports = class ObjectForm extends Component {
  constructor(values = {}) {
    super()
    Object.assign(this, values)
    this.mode = 'edit'
    this.on('propertyChanged:mode', this.b(this.onModeChanged))
    this.on('propertyChanged:states', this.b(this.updateStates))
  }

  buildState(value) {
    return new RootObjectState({
      property: {
        type: value.constructor,
      },
      value,
      isEdit: !!this.object,
      required: true,
      context,
    })
  }

  async onInit() {
    let value
    if (!this.object) {
      value = new this.type()
    } else {
      value = this.object.shadowClone()
    }
    this.state = this.buildState(value)
  }

  async onReady() {
    if (this.mode === 'read') {
      await this.updateStates()
    }

    await this.onModeChanged()
  }

  async onModeChanged() {
    if (this.mode === 'read') {
      propagate(this.state, { readOnly: this.mode === 'read', required: false })
    } else {
      await this.updateStates()
    }
  }

  handleFieldError() {
    const state = this.state.findFirstStateWithError()
    if (!state) { return false }
    const field = this.fieldset.fields[state.property.name]
    field.focus()
    field.scrollTo()
    return true
  }

  onSubmitSuccess() {

  }

  async onSubmit(e) {
    console.log('submit', e)
    e.stopPropagation()
    e.preventDefault()
    await this.updateStates()
    this.fieldset.showErrors()
    if (this.handleFieldError()) { return }

    const object = this.state.value
    this.event('submit', { object })
    await this.onSubmitSuccess(object)
  }

  async updateStates() {
    await this.state.applyLogics()

    if (this.states) {
      applyStates(this.state.states, this.states)
    }
    await this.state.validate()
  }

  async onFieldsetChanged() {
    await this.updateStates()
  }
}
  .define({
    name: 'object-form',
    template,
  })
  .properties({
    object: 'any',
    type: 'any',
    clone: 'any',
    mode: 'any',
    states: 'any',
  })




/***/ }),

/***/ 7544:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(7180)
__webpack_require__(668)
__webpack_require__(9386)
__webpack_require__(2308)

/***/ }),

/***/ 6533:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(6654)
__webpack_require__(7544)
const mixer = __webpack_require__(5964)
const { onBindingDestroyed, onBindingGetProperty } = __webpack_require__(6151)
const BaseHoldable = __webpack_require__(7828)

onBindingGetProperty((binding, value) => {
  if (!mixer.is(value, BaseHoldable)) { return }
  if (!binding.holdables) {
    binding.holdables = []
  }
  binding.holdables.push(value)
  value.hold(binding)
})

onBindingDestroyed((binding) => {
  binding.holdables?.forEach((h) => h.release(binding))
})

/***/ }),

/***/ 3683:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(5964)
const Pageable = __webpack_require__(8421)
const { Model } = __webpack_require__(5079)
const LayoutRouter = __webpack_require__(9954)
const { actions } = __webpack_require__(7177)

const types = Model.getAllChilds()
  .filter((t) => mixer.is(t.prototype, Pageable))
  .filter((t) => !t.definition.abstract)

const url = new RegExp(`/(${types.map((t) => t.definition.name).join('|')})/([\\d|\\w|-]*)`)

module.exports = class ModelingRouter extends LayoutRouter {
  constructor(options) {
    super({
      url,
      layout: (req) => [options.layout || __webpack_require__.e(/* import() */ 724).then(__webpack_require__.t.bind(__webpack_require__, 5724, 23)), { model: req.model }],
    })

    this.registerActions()
  }

  async onMatch(req, res, next) {
    const typeName = req.match[1]
    const code = req.match[2]
    const type = types.find((t) => t.definition.name === typeName)
    const { codeField } = type.definitions.find((d) => d.codeField)
    const model = await type.collection.findByUniqueIndex({
      [codeField]: code,
      '@type': typeName,
    }, {
      type: type.definition.name,
    })
    if (!model) {
      return res.notFound()
    }
    Object.assign(req, {
      type,
      model
    })
    return super.onMatch(req, res, next)
  }

  registerActions() {
    actions
      .filter((action) => action.url !== undefined)
      .forEach((action) => {
        this.route(action.url, async (req, res, next) => {
          await action.check(req.model)
          await action.execute(req, res, next)
          document.title = `${req.model.constructor.definition.name} ${req.model.toString()} - ${action.name}`
        })
      })
  }
}

/***/ }),

/***/ 7177:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


const setup = {
  layout: {
    header: {
      before: []
    }
  },
  types: [],
  actions: [
    {
      name: 'explorer',
      url: '/explorer',
      content: '<i class="fa-solid fa-list"></i>',
      async execute(req, res, next) {
        await res.page(__webpack_require__.e(/* import() */ 379).then(__webpack_require__.t.bind(__webpack_require__, 2379, 23)), req.model)
      }
    },
    {
      name: 'edit',
      url: '/edit',
      content: '<i class="fa-solid fa-pen"></i>',
      async check(model) {
        await model.canUpdate()
        return true
      },
      async execute(req, res, next) {
        await res.page(__webpack_require__.e(/* import() */ 444).then(__webpack_require__.t.bind(__webpack_require__, 444, 23)), req.model)
      }
    },
    {
      name: 'delete',
      content: '<i class="red fa-solid fa-trash"></i>',
      class: 'warning',
      async check(model) {
        await model.canDelete()
        return true
      },
      async execute(model) {
        await model.delete()
      }
    }
  ]
}

module.exports = setup

/***/ }),

/***/ 9840:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(5138)
const hederaSetup = __webpack_require__(9924)
const Holder = __webpack_require__(5466)
const setup = __webpack_require__(5676)
const StateMixin = __webpack_require__(2375)
setup.state.push(StateMixin)

hederaSetup.base.push(Holder)

module.exports = {
  routing: __webpack_require__(7177)
}

/***/ }),

/***/ 6257:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(5964);
const Controllers = __webpack_require__(9666)
const ControllerError = __webpack_require__(1809)
const setup = __webpack_require__(5676)

module.exports = mixer.mixin((base) => {
  return class Controlleable extends base {
    static define(definition) {
      super.define(definition)
      this.controllers = new Controllers(this)
      return this
    }

    static async canCreate(context) {
      for (const controller of this.controllers) {
        const check = controller.create?.check
        if (check) {
          await check.call(this, context)
        }
      }
      return true
    }

    async canUpdate(...args) {
      const [context] = setup.getArgs(args)
      for (const controller of this.constructor.controllers) {
        if (controller.update?.check) {
          const result = await controller.update.check.call(this, context, this)
          if (!result) {
            return false
          }
        }
      }
      return true
    }

    async canDelete(...args) {
      const [context] = setup.getArgs(args)
      for (const controller of this.constructor.controllers) {
        if (controller.delete?.check) {
          try {
            await controller.delete.check.call(this, context, this)
          } catch (err) {
            if (err instanceof ControllerError) {
              return false
            }
            throw err
          }
        }
      }
      return true
    }
  }
})



/***/ }),

/***/ 1809:
/***/ (function(module) {


module.exports = class ControllerError extends Error {
  
}

/***/ }),

/***/ 9666:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Tree = __webpack_require__(1399)

module.exports = class Controllers extends Tree {
  constructor(owner) {
    super()
    this.owner = owner
    owner.definition.parents
      .filter((p) => p.controllers)
      .forEach((parent) => {
        this.push(parent.controllers)
      })
  }

  call(...args) {
    super.call(...args)
    return this.owner
  }
}

/***/ }),

/***/ 9284:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Destroyable = __webpack_require__(5722)
const mixer = __webpack_require__(5964)
const Propertiable = __webpack_require__(9196)
const Equalable = __webpack_require__(2884)
const typeKey = '@type'

const ignore = {}

const Buildable = mixer.mixin([Destroyable, Propertiable, Equalable], (base) => {
  return class extends base {

    constructor(values = {}, ...args) {
      super(...args)
      // disable the possibility to assign @type on buildables
      // we don't want to throw an error
      const undefinedValues = this.constructor.properties.reduce((acc, property) => {
        acc[property.name] = undefined
        return acc
      }, {})
      this.set({
        ...undefinedValues,
        ...values,
        '@type': this.constructor.definition.name,
      })
    }


    static parse(object, options, context) {
      if (object == null || object instanceof this) { return object }
      if (object.constructor?.hasMixin && object.constructor.hasMixin(this)) {
        return object
      }
      const typeName = object[typeKey]
      let type = this
      if (typeName && this.definition.name !== typeName) {
        type = this.findChild((c) => c.definition.name === typeName)
        if (!type) {
          throw new Error(`Type ${typeName} not find from ${this.definition.name}`)
        }
      }

      const instance = new type()
      instance.set(object, options)

      return instance
    }

    equals(object) {
      return this.constructor.equals(this, object)
    }

    static toJSON(value, paths, context) {
      return value && value.toJSON(paths, context)
    }

    setPropertyValue(property, value, options) {
      const parsedValue = property.type.parse(value, options, { owner: this, property })
      if (parsedValue === ignore) { return }

      super.setPropertyValue(property, parsedValue)
    }



    toJSON(paths = {}, context = null) {
      const values = Object.entries(this)
        .reduce((acc, [k, v]) => {
          const property = this.constructor.properties.find((p) => p.name === k)
          if (!property || (property.context !== undefined && property.context !== context)) {
            return acc
          }

          const result = property.type.toJSON(v, paths && paths[property.name] || null, context)
          if (result !== undefined) {
            acc[property.name] = result
          }
          return acc
        }, {})

      return values
    }
  }
})

Buildable.ignore = ignore

module.exports = Buildable

/***/ }),

/***/ 6863:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Tree = __webpack_require__(1399)

module.exports = class Indexes extends Tree {
  constructor(owner) {
    super()
    this.owner = owner
    owner.definition.parents
      .filter((p) => p.indexes)
      .forEach((parent) => {
        this.push(parent.indexes)
      })
  }

  call(...args) {
    super.call(...args)
    return this.owner
  }

  push(...args) {
    args.forEach((arg) => {
      if (arg instanceof Indexes) {
        super.push(arg)
        return
      }
      if (typeof arg === 'object') {
        Object.entries(arg)
          .forEach(([name, index]) => {
            if (Array.isArray(index)) {
              index = {
                properties: index,
              }
            }
            index.name = name
            index.owner = this.owner
            super.push(index)
          })
        return
      }
      console.error(arg)
      throw new Error('Index type not recognized')
    })
  }
}

/***/ }),

/***/ 643:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(5964)
const Equalable = __webpack_require__(2884)
const Indexes = __webpack_require__(6863)

module.exports = mixer.mixin([Equalable], (base) => {
  return class Indexable extends base {
    static define(definition) {
      super.define(definition)
      this.indexes = new Indexes(this)
      return this
    }

    static equals(value1, value2) {
      if (value1.constructor !== value2.constructor) { return false }
      const doesEquals = value1.anyUniqueIndexMatch(value2)
      return doesEquals
    }

    anyUniqueIndexMatch(object) {
      return this.constructor.indexes
        .filter((index) => index.unique)
        .some((index) => {
          const hasUndefinedProperties = index.properties.some((p) => [this[p], object[p]].indexOf(undefined) !== -1)
          if (hasUndefinedProperties) { return false }

          const matchingProperties = index.properties.filter((p) => {
            const property = this.constructor.properties.find((_p) => _p.name === p)
            return property.type.equals(this[p], object[p])
          })
          return matchingProperties.length === index.properties.length
        })
    }

    getFirstUniqueIndex() {
      const indexes = this.constructor.indexes.filter((i) => i.unique)
      for (const index of indexes) {
        const values = this.getIndex(index)
        if (values) {
          return values
        }
      }
      return null
    }

    getIndex(index) {
      if (typeof index === 'string') {
        index = this.constructor.indexes.find((i) => i.name === index)
      }

      if (!index) {
        throw new Error('Index not found')
      }

      const values = index.properties.reduce((acc, p) => {
        const value = this[p]
        if (value !== undefined) {
          acc[p] = this[p]
        }
        return acc
      }, {})

      if (Object.keys(values).length !== index.properties.length) {
        return null
      }
      return values
    }
  }
})



/***/ }),

/***/ 2757:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(5964)
const loadingQueue = '@loadingQueue'
const stateKey = '@loadState'
const Propertiable = __webpack_require__(9196)
const Bool = __webpack_require__(9920)
const setup = __webpack_require__(5676)

const Loadable = mixer.mixin([Propertiable], (base) => {
  return class extends base {
    constructor(...args) {
      super(...args)

      Object.defineProperties(this, {
        [stateKey]: {
          enumerable: false,
          writable: true,
          value: 'empty'
        },
        [loadingQueue]: {
          enumerable: false,
          writable: true,
          value: []
        }
      })
    }

    setPathsState(state, paths, err) {
      throw new Error('Not implemented')
    }

    setState(state, paths, err, fromSelf, result) {
      this.setPathsState(state, paths, err, fromSelf)


      if (state === this[stateKey] || this[stateKey] === 'loaded') {
        return false
      }
      this.loaded = state === 'loaded'
      this[stateKey] = state
      if (state === 'error') {
        //console.error(err)
        this[loadingQueue].forEach(({ reject }) => reject(err))
        this[loadingQueue] = null
      } else if (state === 'loaded') {
        this[loadingQueue].forEach(({ resolve }) => resolve(result))
        this[loadingQueue] = null
      }

      return true
    }

    setLoadState(...args) {
      this.setState('loaded', ...args)
    }

    innerLoad() {
      throw new Error(`innerLoad not implemented on ${this.constructor.definition.name}`)
    }

    async loadAssociation(context, propertyName, paths) {
      throw new Error('Load association not implemented')
    }

    async load(...args) {
      const [context, paths = {}] = setup.getArgs(args)
      const state = this[stateKey]
      if (state === 'error') {
        this.state = 'empty'
      }
      //console.warn('load', this, state, paths )
      if (state === 'loaded') {
        if (paths === true) { return }
        for (const [propertyName, subPaths] of Object.entries(paths)) {
          await this.loadAssociation(context, propertyName, subPaths)
        }
        return
      }
      else if (state === 'loading') {
        const promise = new Promise((resolve, reject) => {
          this[loadingQueue].push({ resolve, reject })
        })
        await promise
        // make sure the paths are loaded
        await this.load(context, paths)
      } else if (state === 'empty') {
        this.setState('loading', paths, null, true)
        try {
          const result = await this.innerLoad(context, paths)
          //console.log(this, 'loaded')
          this.setState('loaded', paths, null, true, result)
          return result
        } catch (err) {
          this.setState('error', paths, err, null, true)
          throw err
        }
      } else {
        throw new Error(`Unknown state ${state} on ${this.toString()}`)
      }
    }

    unload() {
      this.setState('empty')
    }
  }
})
  .define()
  .properties({
    loaded: {
      type: Bool,
      context: false,
    }
  })

Loadable.stateSymbol = stateKey
Object.assign(Loadable, {
  loadingQueue,
  stateKey,
})
module.exports = Loadable

/***/ }),

/***/ 3602:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Tree = __webpack_require__(1399)
module.exports = class Methods extends Tree {
  constructor(owner) {
    super()
    this.owner = owner
    owner.definition.parents
      .filter((p) => p.methods)
      .forEach((parent) => {
        this.push(parent.methods)
      })
  }

  call(...args) {
    super.call(...args)
    return this.owner
  }

  push(...args) {
    args.forEach((arg) => {
      if (arg instanceof Methods) {
        super.push(arg)
        return
      }
      if (typeof arg === 'object') {
        Object.entries(arg)
          .forEach(([name, method]) => {
            if (Array.isArray(method)) {
              method = {
                args: method[0],
                returnType: method[1],
              }
            }
            method.args = method.args.map((arg) => {
              if (arg.type) {
                return arg
              }
              return {
                type: arg,
              }
            })
            method.name = name
            super.push(method)
          })
        return
      }
      throw new Error('Method type not recognized')
    })
  }
}

/***/ }),

/***/ 992:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(5964)
const Methods = __webpack_require__(3602)

module.exports = mixer.mixin((base) => {
  return class Methodable extends base {
    static define(definition) {
      super.define(definition)
      this.methods = new Methods(this)
      return this
    }
  }
})



/***/ }),

/***/ 8421:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Propertiable = __webpack_require__(9196)
const mixer = __webpack_require__(5964)
const { String } = __webpack_require__(5079)
const proto = __webpack_require__(5149)


module.exports = mixer.mixin([Propertiable], (baseClass) => {
  return class Pageable extends baseClass {

    updateUrl(codeField) {
      const { name } = this.constructor.definition
      const code = this[codeField]
      this.url = code ? `/${name}/${code}` : null
    }

    updateTitle(titleField){
      this.title = this[titleField]
    }

    propertyChanged(property, ...args) {
      const { codeField } = this.constructor.definitions.find((d) => d.codeField)
      const { titleField } = this.constructor.definitions.find((d) => d.titleField)
      if (property.name === codeField) {
        this.updateUrl(codeField)
      }
      if (property.name === titleField) {
        this.updateTitle(titleField)
      }
      return super.propertyChanged(property, ...args)
    }

  }
})
  .define({
    codeField: 'code',
    searchField: 'name',
    titleField: 'name',
  })
  .properties({
    url: {
      type: String,
      context: false,
      state: {
        disabled: true,
      }
    },
    title: {
      type: String,
      context: false,
      state: {
        disabled: true,
      }
    }
  })

/***/ }),

/***/ 492:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(5964)
const caches = []

const mixin = mixer.mixin((base) => {
  return class Templateable extends base {
    static getLastTemplate() {
      let type = this
      while (type) {
        const template = type.definition.template
        if (template) {
          return template
        }
        type = type.definition.parent
      }
      return null
    }

    static define(definition) {
      super.define(definition)
      if (definition?.template && !(this.prototype instanceof mixin.Template)) {
        const lastTemplate = this.definition.parent?.getLastTemplate()
        const template = definition.template
        if (mixer.is(template.prototype, mixin.Template)) {
          if (lastTemplate) {
            throw new Error('Invalid template')
          }
        }
        else {
          if (
            !lastTemplate
            || !mixer.is(lastTemplate.prototype, mixin.Template)
            || !mixer.is(template.prototype, lastTemplate.definition.template)
          ) {
            //console.log(lastTemplate, template, template instanceof lastTemplate, template.prototype instanceof lastTemplate.definition.template)
            console.error(lastTemplate.name, template.name)
            throw new Error('Invalid template')
          }
        }
      }
      return this
    }

    static of(template) {
      let cache = caches.find((c) => c.template === template && c.base === this)
      if (!cache) {
        const name = `${this.name}<${template.definition.name}>`
        const c = class extends this { }
        Object.defineProperty(c, 'name', { value: name })
        c.define({
          name: c.name,
          template,
        })
        cache = {
          template,
          base: this,
          class: c,
        }
        caches.push(cache)
      }

      return cache.class
    }

  }
})

module.exports = mixin

/***/ }),

/***/ 2697:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


const proto = __webpack_require__(5149)
const mixer = __webpack_require__(5964)
const Global = __webpack_require__(5160)
const Any = __webpack_require__(49)


module.exports = class Scope {
  constructor(values) {
    Object.assign(this, values)
    this.variables = {
      __proto__: (this.parent?.variables || {})
    }
  }

  get root() {
    return this.parent?.root || this
  }

  getHandlers(type) {
    const typeHandlers = proto.get(type)
      .flatMap((t) => {
        const tHandlers = this.root.handlers.filter((h) => {
          return h.for === t || t.dependencies && t.dependencies?.indexOf(h.for) !== -1
        })
        return tHandlers
      })
    return typeHandlers
  }

  child() {
    const child = new this.constructor({
      parent: this,
    })
    return child
  }

  async process(body) {
    const source = await this.processFunctionCall({
      $and: body
    })
    return source.value
  }

  async processFunctionCall(functionCall) {

    let methodName = Object.keys(functionCall)[0]
    if (!methodName.startsWith('$')) {
      throw new Error()
    }

    const callObject = functionCall[methodName]
    methodName = methodName.substring(1)

    let source
    let argsObjects
    const globalMethod = Global.methods.find((m) => m.name === methodName)
    if (globalMethod) {
      source = {
        type: Global,
      }
      argsObjects = callObject
    } else {
      const [sourceObject, ...temp] = callObject
      argsObjects = temp
      source = await this.processObject(sourceObject)
    }

    const method = source.type.methods.find((m) => m.name === methodName)
    if (!method) {
      console.error(source.type)
      throw new Error(`Method '${methodName}' on type ${source.type.definition.name} not found`)
    }

    const args = await this.getArgs(source, method, argsObjects)
    if ((method.args.length < args.length - (globalMethod ? 0 : 1))) {
      throw new Error('Too many args')
    }

    const value = await this.callFunction(source, method, args.map((a) => a.value))
    if (value === undefined) {
      throw new Error('Value not found')
    }

    if (!method.returnType.getType) {
      console.error(method)
      throw new Error('returnType.getType missing')
    }

    const returnType = method.returnType.getType(source.type, args)
    if (!returnType) {
      console.log(method.name, args, returnType)
      throw new Error('Return type missing')
    }

    return {
      sourceType: 'functionCall',
      owner: source,
      method,
      value,
      scope: this,
      args,
      type: returnType
    }
  }

  async getArgs(source, method, argsObjects) {
    const args = []
    for (let i = 0; i < argsObjects.length; i++) {
      const definition = method.args[i]
      if (!definition) {
        throw new Error(`Cannot parse arg from method ${method.name} at index ${i}`)
      }
      let object = argsObjects[i]
      if (definition.spread) {

        object = argsObjects.slice(i)
        i = argsObjects.length
      }
      const arg = await this.processObject(object, {
        source,
        definition,
      })
      args.push(arg)
    }
    return args
  }

  async parse(object, context) {
    const type = context.definition.type.getType(context.source.type)
    const handler = this.getParseHandler(object, type)
    if (!handler) {
      console.log(object)
      throw new Error(`Could not find handler for parse on type ${type.definition.name} ${object}`)
    }
    const result = await handler.parse(this, object, context)
    return result
  }

  async callFunction(source, method, args = []) {
    const handlers = this.getHandlers(source.type)
    const handler = handlers.find((h) => h.methods[method.name])
    if (!handler) {
      throw new Error(`No handler found for method '${method.name}' on type ${source.type.definition.name}`)
    }
    //console.log('calling', source.value, method.name, handlers.map((h) => h.methods))
    args = [source.type === Global ? this : source, ...args]
    const result = await handler.methods[method.name](...args)
    return result
  }

  getParseHandler(object, type) {
    const typeHandlers = this.getHandlers(type)
    const typeHandler = typeHandlers.find((h) => h.parse)
    if (typeHandler) {
      return typeHandler
    }

    for (const handler of this.root.handlers) {
      if (mixer.is(handler.for.prototype, type) && handler.check && handler.check(object)) {
        const typeHandlers = this.getHandlers(handler.for)
        const typeHandler = typeHandlers.find((h) => h.parse)
        return typeHandler
      }
    }

    return null
  }

  async processObject(object, context) {
    if (object === null) {
      return {
        type: Any,
        value: null,
      }
    }
    //console.log("processObject", JSON.stringify(object, null, ' '))
    if (typeof object === 'string' && object.startsWith('$')) {
      const path = object.substring(1)
      const [sourceName, ...propertiesNames] = path.split('.')
      //console.log('getting variable', sourceName, propertiesNames, scope)
      let source = this.variables[sourceName]

      if (!source) {
        source = await this.getProperty(this.variables.this, sourceName)
      }

      if (!source) {
        throw new Error(`Source ${sourceName} not found`)
      }

      for (const propertyName of propertiesNames) {
        source = await this.getProperty(source, propertyName)
      }

      return source
    }

    if (typeof object === 'object' && !Array.isArray(object)) {
      const keys = Object.keys(object)
      if (keys.length === 1 && keys[0].startsWith('$')) {
        return await this.processFunctionCall(object)
      }
    }

    if (context) {
      const source = await this.parse(object, context)
      if (source) {
        return source
      }
    }

    console.error(object, context)
    throw new Error('Could not process object')
  }


  async getProperty(source, propertyName) {
    const property = source.type.properties.find((p) => p.name === propertyName)

    if (!property) {
      console.log(source.type)
      throw new Error(`Property ${propertyName} on type ${source.type.definition.name} not found`)
    }
    if (property.context && property.context !== 'mongo') {
      throw new Error(`Property ${property.name} can only be used in context ${property.context}`)
    }

    const value = await this.innerGetProperty(property, source)
    const any = {
      sourceType: 'property',
      owner: source,
      scope: this,
      name: propertyName,
      value,
      type: property.type,
    }

    await this.onGetProperty(property, any)
    return any
  }

  async innerGetProperty(property, source) {
    throw new Error('Not implemented')
  }

  onGetProperty() { }

  clone() {
    return new this.constructor({
      ...this,
      parent: null,
    })
  }
}

/***/ }),

/***/ 8241:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const MemoryScope = __webpack_require__(7524)

const map = {
  filter: async (scope, filter) => {
    const match = await scope.process(filter)
    return match
  }
}

const match = async (context, object, stages) => {
  if (object.load) {
    await object.load()
  }
  const scope = new MemoryScope({
    context,
  })

  scope.variables = {
    this: {
      sourceType: 'var',
      name: 'this',
      value: object,
      type: object.constructor,
    }
  }

  for (const stage of stages) {
    const stageType = Object.keys(stage)[0]
    const stageMatch = await map[stageType](scope, stage[stageType])
    if (!stageMatch) {
      return false
    }
  }
  return true
}

module.exports = {
  match
}

/***/ }),

/***/ 7524:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Scope = __webpack_require__(2697)
const handlers = __webpack_require__(1459)
const mixer = __webpack_require__(5964)
const Loadable = __webpack_require__(2757)

class MemoryScope extends Scope {
  constructor(...args) {
    super(...args)
    this.handlers = handlers
  }
  async load(path) {
    await this.variables.this.value.load(path)
  }

  async innerGetProperty(property, source) {
    const value = source.value[property.name]
    if (mixer.is(property.type.prototype, Loadable)) {
      await source.value.load()
    }
    return value
  }
}

module.exports = MemoryScope

/***/ }),

/***/ 9974:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Array = __webpack_require__(8738)
const mixer = __webpack_require__(5964)

module.exports = {
  for: Array,
  async parse(scope, objects, context) {
    const template = context.definition.type.getLastTemplate()
    const values = await Promise.all(
      objects.map(async (object) => {
        const result = await scope.processObject(object)
        if (!mixer.is(result.type.prototype, template)) {
          throw new Error()
        }
        return result.value
      })
    )
    return {
      value: values,
    }
  },
  methods: {
    async find(source, fn) {
      for (const object of objects) {
        if (await fn(object)) {
          return object
        }
      }
      return null
    },
    async some(source, fn) {
      const object = await this.find(source, fn)
      return !!object
    }
  }
}

/***/ }),

/***/ 8455:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Bool = __webpack_require__(9920)

module.exports = {
  for: Bool,
  check(value) {
    return typeof value === 'boolean'
  },
}

/***/ }),

/***/ 5415:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Branch = __webpack_require__(6278)

module.exports = {
  for: Branch,
  methods: {},
  getType: (type) => type.template,
}


/***/ }),

/***/ 7879:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Function = __webpack_require__(1451)

module.exports = {
  for: Function,
  async parse(scope, object, context) {
    if (!Array.isArray(object)) {
      throw new Error('not ok')
    }
    let [args, body] = object
    const fn = {
      scope,
      source: context.source,
      value: null,
    }

    fn.value = async (...argsValues) => {
      const child = scope.child()
      args.forEach((arg, i) => {
        const type = context.definition.args[i].getType(context.source.type)
        const argObject = {
          value: argsValues[i],
          name: arg,
          sourceType: 'arg',
          function: fn,
          type,
        }
        child.variables[arg] = argObject
        return argObject
      })

      const value = await child.process(body)
      return value
    }
   
    return fn
  }
}

/***/ }),

/***/ 2340:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Global = __webpack_require__(5160)

module.exports = {
  for: Global,
  methods: {
    and(scope, args = []) {
      for (const arg of args) {
        if (!arg) { return false }
      }
      return true
    },
    or(scope, args = []) {
      for (const arg of args) {
        if (arg) { return true }
      }
      return false
    },
    if(scope, $if, $then, $else) {
      if ($if) {
        return $then
      } else {
        return $else
      }
    }
  }
}

/***/ }),

/***/ 9044:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const HasMany = __webpack_require__(6656)

module.exports = {
  for: HasMany,
  methods: {},
  getType: (type) => type.template,
}


/***/ }),

/***/ 1459:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


module.exports = [
  __webpack_require__(2340),
  __webpack_require__(9411),
  __webpack_require__(1570),
  __webpack_require__(8455),
  __webpack_require__(1290),
  __webpack_require__(5388),
  __webpack_require__(7879),
  __webpack_require__(9974),
  __webpack_require__(5415),
  __webpack_require__(6574),
  __webpack_require__(2759),
  __webpack_require__(9044),
]


/***/ }),

/***/ 6574:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Model = __webpack_require__(6145)

module.exports = {
  for: Model,
  methods: {
    eq({ value }, other) {
      return value.equals(other)
    },
  },
  parse(scope, value, context) {
    let model
    if (typeof value === 'string') {
      model = {
        _id: value,
      }
    } else {
      model = value
    }

    const type = context.definition.type.getType(context.source.type)
    if (!(model instanceof type)) {
      model = new type(model)
    }

    return {
      scope,
      value: model,
    }
  },
  getType: (type) => type,
}


/***/ }),

/***/ 5388:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Object = __webpack_require__(4632)

module.exports = {
  for: Object,
  methods: {
    is(source, type) {
      return source.value instanceof type
    },
  }
}

/***/ }),

/***/ 1570:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Primitive = __webpack_require__(3451)

module.exports = {
  for: Primitive,
  methods: {
    eq({ value }, other) {
      return value === other
    },
    neq({ value }, other) {
      return value !== other
    },
  },
  parse(scope, value) {
    return {
      scope,
      value,
    }
  }
}

/***/ }),

/***/ 9411:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const { Real } = __webpack_require__(5079)

module.exports = {
  for: Real,
  methods: {
    not({ value }) {
      return !value
    }
  }
}

/***/ }),

/***/ 1290:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const { String } = __webpack_require__(5079)

module.exports = {
  for: String,
  methods: {
    match({ value }, regex) {
      const regExp = new RegExp(regex.toUpperCase())
      return value.toUpperCase().match(regExp)
    },
    toUpperCase({ value }) {
      return value.toUpperCase()
    },
  },
  parse(scope, value) {
    if (typeof value !== 'string') {
      throw new Error()
    }
    return {
      scope,
      value,
    }
  }
}

/***/ }),

/***/ 2759:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const { Object, Type } = __webpack_require__(5079)

const authorizedTypes = [Object]

const findType = (typeName) => {
  for (const type of authorizedTypes) {
    const types = type.getAllChilds()
    const childType = types.find((t) => t.definition.name === typeName)
    if (childType) {
      return childType
    }
  }
  return null
}

module.exports = {
  for: Type,
  parse(scope, value) {
    const type = findType(value)

    if (!type) {
      throw new Error()
    }


    return {
      scope,
      value: type,
    }
  }
}

/***/ }),

/***/ 572:
/***/ (function(module) {

const objectToFilter = (object) => {
  return Object.entries(object)
    .map(([k, v]) => {
      return {
        $eq: [`$${k}`, v]
      }
    })
}

module.exports = {
  objectToFilter,
}

/***/ }),

/***/ 5676:
/***/ (function(module) {

const setup = {
  object: {
    before: [],
  },
  baseModels: {
    before: []
  },
  model: {
    before: [],
    after: []
  },
  arrayAssociation: {
    before: [],
    after: [],
  },
  models: {
    before: []
  },
  hasMany: {
    before: [],
  },
  ownMany: {
    before: []
  },
  queryResult: {
    before: [],
  },
  state: [],
  getArgs: (args) => args
}

module.exports = setup


/***/ }),

/***/ 3984:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const State = __webpack_require__(1685)
const { match } = __webpack_require__(8241)

module.exports = class ModelState extends State {

  reset() {
    super.reset()
    this.filters = []
  }

  async validate() {
    super.validate()
    if (!this.value || !this.filters.length) { return }
    await this.value.load()
    const doesMatch = await match(this.root.context, this.value, [{ filter: this.filters }])
    if (!doesMatch) {
      this.errors.push('Value is not matching filters')
    }
  }
}
  .define()

/***/ }),

/***/ 544:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const State = __webpack_require__(1685)
const { ArrayAssociation, Model, Primitive } = __webpack_require__(5079)
const ModelState = __webpack_require__(3984)
const ignore = ['_id']

const getState = (context, property) => {
  return (typeof property.state === 'function') ? property.state(context, property) : property.state || {}
}

const mapping = [
  [Primitive, State],
  [Model, ModelState],
]

const getStateType = (type) => {
  const pair = mapping.find(([t]) => t === type || type.prototype instanceof t)
  if (!pair) { return null }
  return pair[1]
}

class ObjectState extends State {
  constructor(values) {
    super(values)
    this.on('propertyChanged:value', this.b(this.onValueChanged))
    this.onValueChanged()
    this.updateStates()
  }

  onValueChanged() {
    if (!this.value) { return }
    this.on(this.value, 'propertyChanged', this.b(this.onChildValueChanged))
  }

  reset() {
    super.reset()

    Object.values(this.states).forEach((s) => {
      s.reset()
      const state = getState({ property: this.property }, s.property)
      Object.assign(s, state)
    })
  }

  async onChildValueChanged(property, value) {
    const state = this.states[property.name]
    if (!state) { return }
    await state.valueChanged()
  }

  updateStates() {
    this.states = this.property.type.properties
      .filter((p) => {
        const shouldIgnore = ignore.indexOf(p.name) !== -1
        if (shouldIgnore) { return false }
        if (p.context === false) { return false }
        if (p.type.prototype instanceof ArrayAssociation) { return false }
        return true
      })
      .reduce((acc, property) => {
        const stateType = getStateType(property.type)
        acc[property.name] = new stateType({
          objectState: this,
          property,
          root: this.root || this,
        })
        return acc
      }, {})
  }

  async validate() {
    await super.validate()
    for (const state of Object.values(this.states)) {
      await state.validate()
    }
  }

  findFirstStateWithError() {
    for (const state of Object.values(this.states)) {
      if (state.errors.length) { return state }
      if (state.states) {
        const subState = state.findFirstStateWithError()
        if (subState) { return subState }
      }
    }
    return null
  }


}
ObjectState
  .define()

mapping.push([Object, ObjectState])

module.exports = ObjectState

/***/ }),

/***/ 4448:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const RootObjectState = __webpack_require__(5280)

module.exports = class RootModelState extends RootObjectState {

  async validate() {
    await super.validate()
    const type = this.property.type
    for (const index of type.indexes) {
      if (index.build === false || !index.unique) { continue }

      const values = index.properties.reduce((acc, propertyName) => {
        acc[propertyName] = this.states[propertyName].value
        return acc
      }, {})

      const filledValues = Object.values(values).filter((v) => v != null)
      if (filledValues.length !== index.properties.length) {
        continue
      }
      const filters = Object.entries(values)
        .map(([k, v]) => ({
          $eq: [`$${k}`, v]
        }))

      if (this.value._id) {
        filters.push({
          $neq: ['$_id', this.value._id]
        })
      }

      const existingModel = await type.collection.findOne(this.context, filters, {
        type: index.owner.definition.name,
      })

      if (!existingModel) { continue }

      if (index.properties.length > 1) {
        this.errors.push(`Values combinaison on fields '${index.properties.join(', ')}' is not available`)
      } else {
        const state = this.states[index.properties[0]]
        state.errors.push('This value is already taken')
      }
    }
  }
}
  .define()

/***/ }),

/***/ 5280:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const ObjectState = __webpack_require__(544)

module.exports = class RootObjectState extends ObjectState {
  reset() {
    super.reset()
    this.required = true
  }

  async applyLogics() {
    this.reset()
    for (const controller of this.property.type.controllers) {
      const logic = !this.isEdit ? controller.create?.logic : controller.update?.logic
      if (logic) {
        await logic(this.context, this.states, this.oldValue)
      }
    }
  }
}
  .define()

/***/ }),

/***/ 1685:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Array = __webpack_require__(6014)
const Propertiable = __webpack_require__(9196)
const mixer = __webpack_require__(5964)
const Bindeable = __webpack_require__(1646)
const setup = __webpack_require__(5676)

class BaseState extends mixer.extends([Propertiable, Bindeable]) {
  constructor(values) {
    super()
    Object.assign(this, values)
  }

  reset() {
    this.errors = new Array()
    this.message = new Array()
    this.disabled = false
    this.required = false
  }

  async valueChanged() {
    await this.propertyChanged({
      name: 'value',
    }, this.value)
  }

  set value(value) {
    if (this.objectState) {
      this.objectState.value[this.property.name] = value
    } else {
      this._value = value
      this.valueChanged()
    }
  }

  get value() {
    if (this.objectState) {
      const parent = this.objectState.value
      return parent && parent[this.property.name]
    } else {
      return this._value
    }
  }

  validate() {
    if (this.disabled) {
      this.value = undefined
      return
    }
    if (this.required && !this.value) {
      this.errors.push('This field is required')
    }
  }
}

BaseState
  .define()
  .properties({
    disabled: 'any',
    required: 'any',
    messages: 'any',
    errors: 'any',
  })

module.exports = class State extends mixer.extends(BaseState, setup.state) { }
  .define()


/***/ }),

/***/ 49:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(5964)
const Propertiable = __webpack_require__(9196)

const Buildable = __webpack_require__(9284)
const Templateable = __webpack_require__(492)
const Methodable = __webpack_require__(992)
const utils = __webpack_require__(7932)

module.exports = mixer.mixin([Propertiable, Methodable, Buildable, Templateable], (base) => {
  return class Any extends base {
    static getType(type) {
      return this
    }


    static sanitizeProperty(property) {
      utils.propertySanitizers.forEach((sanitizer) => sanitizer(property))
    }
  }
})
  .define({
    name: 'any',
  })


/***/ }),

/***/ 8738:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const BaseArray = __webpack_require__(6014)
const mixer = __webpack_require__(5964)
const utils = __webpack_require__(7932)
const Any = __webpack_require__(49)
const Function = __webpack_require__(1451)
const Template = __webpack_require__(3393)

const template = Template.of(Any)

const fnArg = { type: Function, args: [template] }

class Array extends mixer.extends(BaseArray, [Any]) {

  static template = template
  static fnArg = fnArg

  constructor(...values) {
    super({}, ...values)
  }

  static parse(object, owner, property) {
    if (!object) {
      return object
    }
    let array
    if (object instanceof this) {
      array = object
    } else {
      array = new this()
      array.push(...object)
    }

    return array
  }

  static equals(a1, a2) {
    if (a1.constructor !== a2.constructor) { return false }
    if (a1.length !== a2.length) { return false }

    const type = this.definition.template
    for (let i = 0; i < a1.length; i++) {
      if (!type.equals(a1[i], a2[i])) {
        return false
      }
    }
    return true
  }

  toJSON(paths, context) {
    const result = [...this].map((object) => {
      return this.constructor.definition.template.toJSON(object, paths, context)
    })
    return result
  }

  destroy() {
    this.splice(0, this.length)
    super.destroy()
  }
}

Array
  .define({
    name: 'array',
    template,
  })
  .methods({
    find: [[fnArg], template],
  })


utils.propertySanitizers.push((property) => {
  if (!Array.isArray(property.type)) { return }
  property.type = Array.of(property.type[0])
})

module.exports = Array



/***/ }),

/***/ 5551:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Loadable = __webpack_require__(2757)
const mixer = __webpack_require__(5964)
const Bindeable = __webpack_require__(1646)
const Abstractable = __webpack_require__(6976)
const setup = __webpack_require__(5676)
const BaseModels = __webpack_require__(9124)
const config = setup.arrayAssociation

class BaseArrayAssociation extends mixer.extends(BaseModels, [Abstractable, Loadable, Bindeable, ...config.before]) {
  constructor(owner, property) {
    /*
  * when using native array functions like map, filter etc, it will return an instance of the current array class, which branch in this case
  * So we add this check to return a native array if the required parameters are not passed
*/
    if (!owner || !property) {
      return []
    }
    super()
    this.owner = owner
    this.property = property
    this.owner.on('destroyed', this.b(this.destroy))
  }

  toString() {
    return `${this.property.name} of ${this.owner.toString()}`
  }

  static parse(array, options, { owner, property }) {
    let instance = owner[property.name]
    if (!instance) {
      instance = new this(owner, property)
    }

    if (array) {
      instance.splice(0, instance.length)
      instance.push(...array.map((o) =>
        this.definition.template.parse(o, options, { property: this.property, owner: this }))
      )
    }

    return instance
  }

  setPathsState(state, paths, err) {
    for (const object of this) {
      object.setState(state, paths, err)
    }
  }

  async loadAssociation(context, property, paths) {
    for (const model of this) {
      await model[property].load(context, paths)
    }
  }

  unload() {
    instance.splice(0, instance.length)
    super.unload()
  }
}

BaseArrayAssociation.define()

module.exports = class ArrayAssociation extends mixer.extends(BaseArrayAssociation, config.after) {

}
  .define({
    name: 'hasMany',
    abstract: true,
  })

/***/ }),

/***/ 9124:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Array = __webpack_require__(8738)
const setup = __webpack_require__(5676)
const mixer = __webpack_require__(5964)
const Destroyable = __webpack_require__(5722)

module.exports = class BaseModels extends mixer.extends(Array, [Destroyable, ...setup.baseModels.before]) {

}
  .define()


/***/ }),

/***/ 9550:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Virtual = __webpack_require__(8180)

module.exports = class Dynamic extends Virtual {
  static getType(sourceType, args) {
    return this.fn(args)
  }

  static with(fn) {
    const type = class extends this { }
    type.fn = fn
    return type
  }
}
  .define({
    name: 'Dynamic',
  })




/***/ }),

/***/ 1451:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Virtual = __webpack_require__(8180)

module.exports = class Function extends Virtual {

}
  .define({
    name: 'function',
  }) 

/***/ }),

/***/ 5160:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Virtual = __webpack_require__(8180)
const Bool = __webpack_require__(9920)
const Any = __webpack_require__(49)
const Array = __webpack_require__(8738)
const Dynamic = __webpack_require__(9550)
const Map = __webpack_require__(2117)
const Scope = __webpack_require__(3535)
const { getCommonAncestor } = __webpack_require__(5149)

class Global extends Virtual {
  getType() {
    return this
  }
}

Global
  .define({
    name: 'Global',
  })
  .methods({
    and: [[{ type: Array.of(Any), spread: true }], Bool],
    or: [[{ type: Array.of(Any), spread: true }], Bool],
    if: [[Any, Any, Any], Dynamic.with((args) => getCommonAncestor(args[1].type, args[2].type))],
    let: [[Map.of(Any), Scope], Dynamic.with((args) => args[1].type)]
  })

module.exports = Global

/***/ }),

/***/ 6656:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(5964)
const { hasMany } = __webpack_require__(5676)
const VirtualArrayAssociation = __webpack_require__(4128)
module.exports = class HasMany extends mixer.extends(VirtualArrayAssociation, hasMany.before) {

  async innerLoad(context, paths = {}) {
    await this.owner.load(context)
    const type = this.constructor.definition.template
    const { on } = this.property
    const targetProperty = type.properties.find((p) => p.name === on)
    let filter
    if (targetProperty.type.prototype instanceof Array) {
      filter = [
        {
          $some: [`$${on}`, [['model'], [{
            $eq: ['$model', this.owner._id]
          }]]]
        }
      ]
    } else {
      const path = `$${on}._id`
      filter = [{
        $eq: [path, this.owner._id]
      }]
    }
    const models = await type.collection.find(context, filter, {
      load: paths,
    })
    this.push(...models)
  }
}
  .define({
    name: 'hasMany',
  })

/***/ }),

/***/ 2117:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Real = __webpack_require__(7095)
const Template = __webpack_require__(3393)
const Any = __webpack_require__(49)
const template = Template.of(Any)

module.exports = class Map extends Real {

}
  .define({
    name: 'Map',
    template,
  })


/***/ }),

/***/ 8110:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const String = __webpack_require__(9709)

module.exports = class Markdown extends String {

}
  .define({
    name: 'markdown',
  })

/***/ }),

/***/ 7504:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(5964)
const Bool = __webpack_require__(9920)
const String = __webpack_require__(9709)
const This = __webpack_require__(991)
const Any = __webpack_require__(49)
const Indexable = __webpack_require__(643)

module.exports = mixer.mixin([Any, Indexable], (base) => {
  return class ModelMixin extends base { }
})
  .define({
    name: 'modelMixin',
  })
  .indexes({
    id: {
      properties: ['_id'],
      unique: true,
      build: false,
    }
  })
  .properties({
    _id: {
      type: String,
      state: {
        disabled: true,
      }
    },
  })
  .methods({
    eq: [[This], Bool]
  })

/***/ }),

/***/ 6145:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(5964)
const ObjectType = __webpack_require__(4632)
const Loadable = __webpack_require__(2757)
const setup = __webpack_require__(5676)
const ModelMixin = __webpack_require__(7504)
const { objectToFilter } = __webpack_require__(572)
const config = setup.model


class BaseModel extends mixer.extends(ObjectType, [ModelMixin, Loadable, ...config.before]) {

  setPathsState(state, paths, err) {
    for (const [propertyName, value] of Object.entries(paths)) {
      if (value && this[propertyName]) {
        this[propertyName].setState(state, value, err)
      }
    }
  }

  handleLoadResult(model) {
    if (model) {
      Object.assign(this, model)
    } else {
      console.warn(`Model ${this.constructor.definition.name} not found`, this._id)
    }
  }

  async loadAssociation(context, propertyName, paths) {
    if (!this[propertyName]) {
      return
    }

    await this[propertyName].load(context, paths)
  }

  async innerLoad(context, paths) {
    const index = this.getFirstUniqueIndex()
    if (!index) {
      console.error(this)
      throw new Error('Could not load')
    }

    const result = await this.constructor.collection.findOne(
      context,
      objectToFilter(index)
      , {
        type: this.constructor.definition.name,
        load: paths,
      })

    return this.handleLoadResult(result)
  }

  // we do nothing ..
  unload() {

  }

  toJSON(paths = {}, context) {
    if (paths) {
      return super.toJSON(paths, context)
    }
    const index = this.getIndex('id')
    if (!index) {
      console.error(this.toJSON())
      throw new Error('Could not toJSON')
    }
    return {
      '@type': this.constructor.definition.name,
      ...index,
    }
  }

  async apply(...args) {
    const [context, $set] = setup.getArgs(args)
    return this.constructor.collection.update(context, [{
      $eq: ['$_id', this._id],
    }], {
      $set
    })
  }

  toString() {
    return this._id
  }
}

BaseModel.define()

class Model extends mixer.extends(BaseModel, [ModelMixin, ...config.after]) {

}

module.exports = Model
  .define({
    name: 'model',
    abstract: true,
  })

/***/ }),

/***/ 1361:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const setup = __webpack_require__(5676)
const mixer = __webpack_require__(5964)
const Destroyable = __webpack_require__(5722)
const BaseModels = __webpack_require__(9124)

module.exports = class Models extends mixer.extends(BaseModels, [Destroyable, ...setup.models.before]) {

}
  .define()


/***/ }),

/***/ 4632:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(5964)
const Type = __webpack_require__(3179)
const Bool = __webpack_require__(9920)
const Real = __webpack_require__(7095)
const NativeObject = Object

const setup = __webpack_require__(5676)
const Controlleable = __webpack_require__(6257)
const config = setup.object


module.exports = class Object extends mixer.extends(Real, [Controlleable, ...config.before]) {
  static equals(o1, o2) {
    if (o1.constructor !== o2.constructor) {
      return false
    }
    /*
    if (o1.constructor !== this) {
      return o1.constructor.equals(o1, o2)
    }
    */
    for (const p of o1.constructor.properties) {
      if (!p.type.equals(o1[p.name], o2[p.name])) {
        return false
      }
    }
    return true
  }

  shadowClone() {
    const json = this.toJSON()
    const shadowClone = new this.constructor()
    NativeObject.assign(shadowClone, json)
    return shadowClone
  }
}
  .define({
    name: 'object',
    abstract: true,
  })
  .methods({
    is: [[Type], Bool]
  })



/***/ }),

/***/ 1624:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(5964)
const ArrayAssociation = __webpack_require__(5551)
const { ownMany } = __webpack_require__(5676)

module.exports = class OwnMany extends mixer.extends(ArrayAssociation, ownMany.before) {

  async innerLoad(context, paths = {}) {
    for (const model of this) {
      await model.load(context, paths)
    }
  }

  setPathsState(state, paths, err) {
   
  }
}
  .define({
    name: 'ownMany',
  })

/***/ }),

/***/ 2518:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const String = __webpack_require__(9709)

module.exports = class Password extends String {

}

  .define({
    name: 'password',
  })


/***/ }),

/***/ 8898:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const { match } = __webpack_require__(8241)
const Models = __webpack_require__(1361)
const mixer = __webpack_require__(5964)
const setup = __webpack_require__(5676)

module.exports = class QueryResult extends mixer.extends(Models,[...setup.queryResult.before]) {
  constructor(values, queryParams) {
    if (!queryParams) {
      return []
    }
    super(...values)
    this.queryParams = queryParams
  }

  async checkModel(...args) {
    const [context, model] = setup.getArgs(args)
    const isInsanceOfTemplate = model instanceof this.constructor.definition.template
    if (!isInsanceOfTemplate) { return }
    let index = this.indexOf(model)
    if (await match(context, model, this.queryParams.stages)) {
      if (index === -1) {
        this.push(model)
      }
    } else {
      if (index !== -1) {
        this.splice(index, 1)
      }
    }
  }

  toJSON(paths, context) {
    if(paths === undefined){
      paths = this.queryParams.options.load
    }
    return super.toJSON(paths, context)
  }
}
  .define()


/***/ }),

/***/ 7095:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(5964)
const Abstractable = __webpack_require__(6976)
const Equalable = __webpack_require__(2884)
const Any = __webpack_require__(49)

module.exports = class Real extends mixer.extends([Any, Abstractable, Equalable]) {

}
  .define({
    name: 'real',
    abstract: true,
  })



/***/ }),

/***/ 3535:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Virtual = __webpack_require__(8180)

module.exports = class Scope extends Virtual {

}
  .define({
    name: 'Scope',
  }) 

/***/ }),

/***/ 3393:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Virtual = __webpack_require__(8180)
const Templateable = __webpack_require__(492)

class Template extends Virtual {
  static getType(ownerType) {
    if (!ownerType.prototype instanceof this.definition.template) {
      throw new Error('Types not matching')
    }

    const lastTemplate = ownerType.getLastTemplate()
    if (lastTemplate) {
      return lastTemplate
    }
    else {
      //return this.definition.template
    }

  }

}

Template.define({
  name: 'template',
})

Templateable.Template = Template

module.exports = Template


/***/ }),

/***/ 991:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


const Virtual = __webpack_require__(8180)

module.exports = class This extends Virtual {
  static getType(ownerType) {
    return ownerType
  }
}
  .define({
    name: 'This',
  })




/***/ }),

/***/ 3179:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Virtual = __webpack_require__(8180)

module.exports = class Type extends Virtual {
  static build(value) {
    return value
  }

  static toJSON(value) {
    return value
  }
}
  .define({
    name: 'type',
  })



/***/ }),

/***/ 8180:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Any = __webpack_require__(49)

module.exports = class Virtual extends Any {

}

/***/ }),

/***/ 4128:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(5964)
const ArrayAssociation = __webpack_require__(5551)
const { hasMany } = __webpack_require__(5676)


module.exports = class VirtualArrayAssociation extends ArrayAssociation {
  toJSON(paths, context) {
    if (!paths) { return undefined }
    return super.toJSON(paths, context)
  }
}
  .define()

/***/ }),

/***/ 5079:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = {
  // This always on top
  Any: __webpack_require__(49),
  Virtual: __webpack_require__(8180),
  This: __webpack_require__(991),
  Type: __webpack_require__(3179),
  Global: __webpack_require__(5160),
  Real: __webpack_require__(7095),
  ...__webpack_require__(4654),
  Object: __webpack_require__(4632),
  Model: __webpack_require__(6145),
  Template: __webpack_require__(3393),
  Array: __webpack_require__(8738),
  HasMany: __webpack_require__(6656),
  ArrayAssociation: __webpack_require__(5551),
  Markdown: __webpack_require__(8110),
  Password: __webpack_require__(2518),
  OwnMany: __webpack_require__(1624),
}



/***/ }),

/***/ 9920:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Primitive = __webpack_require__(3451)
const Real = __webpack_require__(7095)
const This = __webpack_require__(991)
const Array = __webpack_require__(8738)

class Bool extends Primitive {
  static parse(value, owner, property) {
    if (value == null) { return value }
    if (typeof value !== 'boolean') {
      throw new Error(`Property ${property.name} has to be a bool, received ${value}`)
    }
    return super.parse(value, owner, property)
  }
}

Bool.define({
  name: 'bool',
})

Real.methods({
  not: [[], Bool]
})

Primitive.methods({
  eq: [[This], Bool],
  neq: [[This], Bool],
  in: [[Array.of(This)], Bool]
})

Array.methods({
  has: [[Array.template], Bool],
  some: [[Array.fnArg], Bool],
})


module.exports = Bool

/***/ }),

/***/ 7857:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Primitive = __webpack_require__(3451)

class Number extends Primitive {
  static parse(value, owner, property) {
    if (value == null) { return value }
    if (typeof value !== 'number') {
      throw new Error(`Property ${property.name} has to be a number, received ${value}`)
    }
    return super.parse(value, owner, property)
  }
}

module.exports = Number

/***/ }),

/***/ 3451:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(5964)
const Real = __webpack_require__(7095)

module.exports = class Primitive extends mixer.extends(Real) {
  constructor() {
    throw new Error('Cannot instenciate')
  }

  static equals(value1, value2) {
    return value1 === value2
  }

  static parse(value) {
    return value
  }

  static toJSON(value) {
    return value
  }
}
  .define({
    name: 'primitive',
  })

/***/ }),

/***/ 9709:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Primitive = __webpack_require__(3451)
const Bool = __webpack_require__(9920)
const Object = __webpack_require__(4632)

class String extends Primitive {
  static parse(value, owner, property) {
    if (value == null) { return value }

    if (typeof value !== 'string') {
      throw new Error(`Property ${property.name} has to be a string, received ${value}`)
    }
    if (property.values && property.values.indexOf(value) === -1) {
      throw new Error(`Property ${property.name} with value ${value} does not match values: ${property.values.join(',')}`)
    }
    return super.parse(value, owner, property)
  }
}

String
  .define({
    name: 'string',
  })
  .methods({
    match: [[String], Bool],
    toUpperCase: [[], String]
  })

Object.properties({
  '@type': String
})


module.exports = String

/***/ }),

/***/ 4654:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


module.exports = {
  Bool: __webpack_require__(9920),
  Number: __webpack_require__(7857),
  Primitive: __webpack_require__(3451),
  String: __webpack_require__(9709),
}

/***/ }),

/***/ 7932:
/***/ (function(module) {

const propertySanitizers = []


module.exports = {
  propertySanitizers,
}

/***/ }),

/***/ 6278:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(8711)
const VirtualArrayAssociation = __webpack_require__(4128)

module.exports = class Branch extends VirtualArrayAssociation {
  async innerLoad(context, paths) {
    await this.owner.load(context)
    await this.update(context, paths)
  }

  resetListeners() {
    if (this.listeners) {
      this.listeners.forEach((l) => l.remove())
    }
    this.listeners = []
  }

  setPathsState(state, paths, err, fromSelf = false) {
    if (fromSelf) { return }
    //console.warn('branch set state', this, state, paths, fromSelf)
    const { name, on } = this.property
    const parent = this.owner[on]
    if (parent) {
      parent.setState(state, {
        ...paths,
        [name]: paths
      }, err)
    }
  }


  async update(context, paths = true) {
    this.resetListeners()
    const {
      on,
      name
    } = this.property
    let current = this.owner[on]
    if (!current) {
      return
    }

    await current.load({
      ...paths,
      [name]: paths
    })


    this.splice(0, this.length)
    while (current) {
      this.push(current)
      current = current[on]
    }

    this.listeners = this.map((object) => object.on(`propertyChanged:${on}`, async () => {
      await this.update(context, paths)
    }))
  }

  onModelUpdated() {

  }

  destroy() {
    super.destroy()
    this.resetListeners()
  }
}
  .define({
    name: 'branch',
  })

/***/ }),

/***/ 7159:
/***/ (function(module) {

module.exports = class Mixin {
  constructor() {
    throw new Error('Cannot instanciante mixin')
  }
}

/***/ }),

/***/ 8711:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Mixin = __webpack_require__(7159)
const getMixin = (dependency) => {
  return dependency.mixin || dependency
}

const processDependency = (allDependencies, dependency) => {
  const index = allDependencies.indexOf(dependency)
  if (index !== -1) {
    return null
  }
  allDependencies.push(dependency)
  const dependencies = processDependencies(allDependencies, dependency.mixinDependencies)
  return [
    ...dependencies,
    dependency,
  ]
}

const processDependencies = (allDependencies, dependenciesTree) => {
  return dependenciesTree
    .flatMap((dependency) => processDependency(allDependencies, dependency))
    .filter((o) => o)
}

const buildBase = (base, dependenciesTree) => {
  const allDependencies = [...(base.allDependencies || [])]
  const dependencies = processDependencies(allDependencies, dependenciesTree)
  let currentClass = base
  for (const dependency of dependencies) {

    currentClass = dependency.fn(currentClass)
  }
  Object.assign(currentClass, {
    allDependencies,
    dependencies,
    dependenciesOwner: null,
  })

  return currentClass
}

const getDependencies = (dependencies = []) => {
  const baseType = mixer.Base
  if (!baseType) {
    return dependencies
  }

  return [baseType, ...dependencies]
}

const mixer = {
  base: null,
  proxy(...args) {
    const mixin = this.mixin(...args)
    const type = this.extends([mixin]);
    type.mixin = mixin;

    return new Proxy(type, {
      apply: (target, thisArg, args) => {
        //fallback for babel ?
        if (thisArg) {
          return target.apply(thisArg, args);
        }
        return fn.apply(null, args);
      }
    })
  },
  mixin(...args) {
    const fn = args.find((arg) => typeof arg === 'function')
    const mixinDependencies = getDependencies(args.find((arg) => Array.isArray(arg)))
    const base = mixer.extends(Mixin, mixinDependencies)

    const mixin = fn(base)

    Object.assign(mixin, {
      mixinDependencies,
      fn,
      base,
    })
    return mixin
  },
  extends(arg1, arg2) {
    let base
    let dependencies
    if (typeof arg1 === 'function') {
      base = arg1
      dependencies = getDependencies(arg2)
    } else {
      base = class { }
      dependencies = getDependencies(arg1)
    }
    return buildBase(base, dependencies)
  },
  is(object, mixinOrClass) {
    if (object.constructor === mixinOrClass) { return true }
    const dependencies = object.constructor?.allDependencies

    if (dependencies) {
      const hasMixin = dependencies.find((d) => d === getMixin(mixinOrClass))
      if (hasMixin) {
        return true
      }
    }
    if (typeof mixinOrClass !== 'function') {
      return false
    }

    if (object instanceof mixinOrClass) {
      return true
    }

    return false
  },
}

module.exports = mixer

/***/ }),

/***/ 8399:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const mixer = __webpack_require__(5964)
const Propertiable = __webpack_require__(9196)
const Markdown = __webpack_require__(8110)

module.exports = mixer.mixin([Propertiable], (base) => {
  return class Wikiable extends base {

  }
})
  .define()
  .properties({
    wiki: {
      type: Markdown,
    }
  })

/***/ }),

/***/ 7597:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
module.exports = __webpack_require__.p + "bb00ffe9dc99bc8d70f3.webm";

/***/ }),

/***/ 5145:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
module.exports = __webpack_require__.p + "ffb290320a23e1067759.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	!function() {
/******/ 		var getProto = Object.getPrototypeOf ? function(obj) { return Object.getPrototypeOf(obj); } : function(obj) { return obj.__proto__; };
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach(function(key) { def[key] = function() { return value[key]; }; });
/******/ 			}
/******/ 			def['default'] = function() { return value; };
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	!function() {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = function(chunkId) {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce(function(promises, key) {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	!function() {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = function(chunkId) {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".bundle.js";
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	!function() {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "geptyro.io-client:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = function(url, done, key, chunkId) {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = function(prev, event) {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach(function(fn) { return fn(event); });
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			792: 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = function(chunkId, promises) {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise(function(resolve, reject) { installedChunkData = installedChunks[chunkId] = [resolve, reject]; });
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = function(event) {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkgeptyro_io_client"] = self["webpackChunkgeptyro_io_client"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	!function() {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
const App = __webpack_require__(4264)
const app = new App()
app.start()
/******/ })()
;
//# sourceMappingURL=main.bundle.js.map