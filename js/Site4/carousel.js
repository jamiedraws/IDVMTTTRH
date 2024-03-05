/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../node_modules/@vimeo/player/dist/player.es.js":
/*!**********************************************************!*\
  !*** ../../node_modules/@vimeo/player/dist/player.es.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/*! @vimeo/player v2.15.3 | (c) 2021 Vimeo | MIT License | https://github.com/vimeo/player.js */
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

/**
 * @module lib/functions
 */

/**
 * Check to see this is a node environment.
 * @type {Boolean}
 */

/* global global */
var isNode = typeof __webpack_require__.g !== 'undefined' && {}.toString.call(__webpack_require__.g) === '[object global]';
/**
 * Get the name of the method for a given getter or setter.
 *
 * @param {string} prop The name of the property.
 * @param {string} type Either “get” or “set”.
 * @return {string}
 */

function getMethodName(prop, type) {
  if (prop.indexOf(type.toLowerCase()) === 0) {
    return prop;
  }

  return "".concat(type.toLowerCase()).concat(prop.substr(0, 1).toUpperCase()).concat(prop.substr(1));
}
/**
 * Check to see if the object is a DOM Element.
 *
 * @param {*} element The object to check.
 * @return {boolean}
 */

function isDomElement(element) {
  return Boolean(element && element.nodeType === 1 && 'nodeName' in element && element.ownerDocument && element.ownerDocument.defaultView);
}
/**
 * Check to see whether the value is a number.
 *
 * @see http://dl.dropboxusercontent.com/u/35146/js/tests/isNumber.html
 * @param {*} value The value to check.
 * @param {boolean} integer Check if the value is an integer.
 * @return {boolean}
 */

function isInteger(value) {
  // eslint-disable-next-line eqeqeq
  return !isNaN(parseFloat(value)) && isFinite(value) && Math.floor(value) == value;
}
/**
 * Check to see if the URL is a Vimeo url.
 *
 * @param {string} url The url string.
 * @return {boolean}
 */

function isVimeoUrl(url) {
  return /^(https?:)?\/\/((player|www)\.)?vimeo\.com(?=$|\/)/.test(url);
}
/**
 * Get the Vimeo URL from an element.
 * The element must have either a data-vimeo-id or data-vimeo-url attribute.
 *
 * @param {object} oEmbedParameters The oEmbed parameters.
 * @return {string}
 */

function getVimeoUrl() {
  var oEmbedParameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var id = oEmbedParameters.id;
  var url = oEmbedParameters.url;
  var idOrUrl = id || url;

  if (!idOrUrl) {
    throw new Error('An id or url must be passed, either in an options object or as a data-vimeo-id or data-vimeo-url attribute.');
  }

  if (isInteger(idOrUrl)) {
    return "https://vimeo.com/".concat(idOrUrl);
  }

  if (isVimeoUrl(idOrUrl)) {
    return idOrUrl.replace('http:', 'https:');
  }

  if (id) {
    throw new TypeError("\u201C".concat(id, "\u201D is not a valid video id."));
  }

  throw new TypeError("\u201C".concat(idOrUrl, "\u201D is not a vimeo.com url."));
}

var arrayIndexOfSupport = typeof Array.prototype.indexOf !== 'undefined';
var postMessageSupport = typeof window !== 'undefined' && typeof window.postMessage !== 'undefined';

if (!isNode && (!arrayIndexOfSupport || !postMessageSupport)) {
  throw new Error('Sorry, the Vimeo Player API is not available in this browser.');
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof __webpack_require__.g !== 'undefined' ? __webpack_require__.g : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/*!
 * weakmap-polyfill v2.0.1 - ECMAScript6 WeakMap polyfill
 * https://github.com/polygonplanet/weakmap-polyfill
 * Copyright (c) 2015-2020 Polygon Planet <polygon.planet.aqua@gmail.com>
 * @license MIT
 */
(function (self) {

  if (self.WeakMap) {
    return;
  }

  var hasOwnProperty = Object.prototype.hasOwnProperty;

  var defineProperty = function (object, name, value) {
    if (Object.defineProperty) {
      Object.defineProperty(object, name, {
        configurable: true,
        writable: true,
        value: value
      });
    } else {
      object[name] = value;
    }
  };

  self.WeakMap = function () {
    // ECMA-262 23.3 WeakMap Objects
    function WeakMap() {
      if (this === void 0) {
        throw new TypeError("Constructor WeakMap requires 'new'");
      }

      defineProperty(this, '_id', genId('_WeakMap')); // ECMA-262 23.3.1.1 WeakMap([iterable])

      if (arguments.length > 0) {
        // Currently, WeakMap `iterable` argument is not supported
        throw new TypeError('WeakMap iterable is not supported');
      }
    } // ECMA-262 23.3.3.2 WeakMap.prototype.delete(key)


    defineProperty(WeakMap.prototype, 'delete', function (key) {
      checkInstance(this, 'delete');

      if (!isObject(key)) {
        return false;
      }

      var entry = key[this._id];

      if (entry && entry[0] === key) {
        delete key[this._id];
        return true;
      }

      return false;
    }); // ECMA-262 23.3.3.3 WeakMap.prototype.get(key)

    defineProperty(WeakMap.prototype, 'get', function (key) {
      checkInstance(this, 'get');

      if (!isObject(key)) {
        return void 0;
      }

      var entry = key[this._id];

      if (entry && entry[0] === key) {
        return entry[1];
      }

      return void 0;
    }); // ECMA-262 23.3.3.4 WeakMap.prototype.has(key)

    defineProperty(WeakMap.prototype, 'has', function (key) {
      checkInstance(this, 'has');

      if (!isObject(key)) {
        return false;
      }

      var entry = key[this._id];

      if (entry && entry[0] === key) {
        return true;
      }

      return false;
    }); // ECMA-262 23.3.3.5 WeakMap.prototype.set(key, value)

    defineProperty(WeakMap.prototype, 'set', function (key, value) {
      checkInstance(this, 'set');

      if (!isObject(key)) {
        throw new TypeError('Invalid value used as weak map key');
      }

      var entry = key[this._id];

      if (entry && entry[0] === key) {
        entry[1] = value;
        return this;
      }

      defineProperty(key, this._id, [key, value]);
      return this;
    });

    function checkInstance(x, methodName) {
      if (!isObject(x) || !hasOwnProperty.call(x, '_id')) {
        throw new TypeError(methodName + ' method called on incompatible receiver ' + typeof x);
      }
    }

    function genId(prefix) {
      return prefix + '_' + rand() + '.' + rand();
    }

    function rand() {
      return Math.random().toString().substring(2);
    }

    defineProperty(WeakMap, '_polyfill', true);
    return WeakMap;
  }();

  function isObject(x) {
    return Object(x) === x;
  }
})(typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : commonjsGlobal);

var npo_src = createCommonjsModule(function (module) {
/*! Native Promise Only
    v0.8.1 (c) Kyle Simpson
    MIT License: http://getify.mit-license.org
*/
(function UMD(name, context, definition) {
  // special form of UMD for polyfilling across evironments
  context[name] = context[name] || definition();

  if ( module.exports) {
    module.exports = context[name];
  }
})("Promise", typeof commonjsGlobal != "undefined" ? commonjsGlobal : commonjsGlobal, function DEF() {

  var builtInProp,
      cycle,
      scheduling_queue,
      ToString = Object.prototype.toString,
      timer = typeof setImmediate != "undefined" ? function timer(fn) {
    return setImmediate(fn);
  } : setTimeout; // dammit, IE8.

  try {
    Object.defineProperty({}, "x", {});

    builtInProp = function builtInProp(obj, name, val, config) {
      return Object.defineProperty(obj, name, {
        value: val,
        writable: true,
        configurable: config !== false
      });
    };
  } catch (err) {
    builtInProp = function builtInProp(obj, name, val) {
      obj[name] = val;
      return obj;
    };
  } // Note: using a queue instead of array for efficiency


  scheduling_queue = function Queue() {
    var first, last, item;

    function Item(fn, self) {
      this.fn = fn;
      this.self = self;
      this.next = void 0;
    }

    return {
      add: function add(fn, self) {
        item = new Item(fn, self);

        if (last) {
          last.next = item;
        } else {
          first = item;
        }

        last = item;
        item = void 0;
      },
      drain: function drain() {
        var f = first;
        first = last = cycle = void 0;

        while (f) {
          f.fn.call(f.self);
          f = f.next;
        }
      }
    };
  }();

  function schedule(fn, self) {
    scheduling_queue.add(fn, self);

    if (!cycle) {
      cycle = timer(scheduling_queue.drain);
    }
  } // promise duck typing


  function isThenable(o) {
    var _then,
        o_type = typeof o;

    if (o != null && (o_type == "object" || o_type == "function")) {
      _then = o.then;
    }

    return typeof _then == "function" ? _then : false;
  }

  function notify() {
    for (var i = 0; i < this.chain.length; i++) {
      notifyIsolated(this, this.state === 1 ? this.chain[i].success : this.chain[i].failure, this.chain[i]);
    }

    this.chain.length = 0;
  } // NOTE: This is a separate function to isolate
  // the `try..catch` so that other code can be
  // optimized better


  function notifyIsolated(self, cb, chain) {
    var ret, _then;

    try {
      if (cb === false) {
        chain.reject(self.msg);
      } else {
        if (cb === true) {
          ret = self.msg;
        } else {
          ret = cb.call(void 0, self.msg);
        }

        if (ret === chain.promise) {
          chain.reject(TypeError("Promise-chain cycle"));
        } else if (_then = isThenable(ret)) {
          _then.call(ret, chain.resolve, chain.reject);
        } else {
          chain.resolve(ret);
        }
      }
    } catch (err) {
      chain.reject(err);
    }
  }

  function resolve(msg) {
    var _then,
        self = this; // already triggered?


    if (self.triggered) {
      return;
    }

    self.triggered = true; // unwrap

    if (self.def) {
      self = self.def;
    }

    try {
      if (_then = isThenable(msg)) {
        schedule(function () {
          var def_wrapper = new MakeDefWrapper(self);

          try {
            _then.call(msg, function $resolve$() {
              resolve.apply(def_wrapper, arguments);
            }, function $reject$() {
              reject.apply(def_wrapper, arguments);
            });
          } catch (err) {
            reject.call(def_wrapper, err);
          }
        });
      } else {
        self.msg = msg;
        self.state = 1;

        if (self.chain.length > 0) {
          schedule(notify, self);
        }
      }
    } catch (err) {
      reject.call(new MakeDefWrapper(self), err);
    }
  }

  function reject(msg) {
    var self = this; // already triggered?

    if (self.triggered) {
      return;
    }

    self.triggered = true; // unwrap

    if (self.def) {
      self = self.def;
    }

    self.msg = msg;
    self.state = 2;

    if (self.chain.length > 0) {
      schedule(notify, self);
    }
  }

  function iteratePromises(Constructor, arr, resolver, rejecter) {
    for (var idx = 0; idx < arr.length; idx++) {
      (function IIFE(idx) {
        Constructor.resolve(arr[idx]).then(function $resolver$(msg) {
          resolver(idx, msg);
        }, rejecter);
      })(idx);
    }
  }

  function MakeDefWrapper(self) {
    this.def = self;
    this.triggered = false;
  }

  function MakeDef(self) {
    this.promise = self;
    this.state = 0;
    this.triggered = false;
    this.chain = [];
    this.msg = void 0;
  }

  function Promise(executor) {
    if (typeof executor != "function") {
      throw TypeError("Not a function");
    }

    if (this.__NPO__ !== 0) {
      throw TypeError("Not a promise");
    } // instance shadowing the inherited "brand"
    // to signal an already "initialized" promise


    this.__NPO__ = 1;
    var def = new MakeDef(this);

    this["then"] = function then(success, failure) {
      var o = {
        success: typeof success == "function" ? success : true,
        failure: typeof failure == "function" ? failure : false
      }; // Note: `then(..)` itself can be borrowed to be used against
      // a different promise constructor for making the chained promise,
      // by substituting a different `this` binding.

      o.promise = new this.constructor(function extractChain(resolve, reject) {
        if (typeof resolve != "function" || typeof reject != "function") {
          throw TypeError("Not a function");
        }

        o.resolve = resolve;
        o.reject = reject;
      });
      def.chain.push(o);

      if (def.state !== 0) {
        schedule(notify, def);
      }

      return o.promise;
    };

    this["catch"] = function $catch$(failure) {
      return this.then(void 0, failure);
    };

    try {
      executor.call(void 0, function publicResolve(msg) {
        resolve.call(def, msg);
      }, function publicReject(msg) {
        reject.call(def, msg);
      });
    } catch (err) {
      reject.call(def, err);
    }
  }

  var PromisePrototype = builtInProp({}, "constructor", Promise,
  /*configurable=*/
  false); // Note: Android 4 cannot use `Object.defineProperty(..)` here

  Promise.prototype = PromisePrototype; // built-in "brand" to signal an "uninitialized" promise

  builtInProp(PromisePrototype, "__NPO__", 0,
  /*configurable=*/
  false);
  builtInProp(Promise, "resolve", function Promise$resolve(msg) {
    var Constructor = this; // spec mandated checks
    // note: best "isPromise" check that's practical for now

    if (msg && typeof msg == "object" && msg.__NPO__ === 1) {
      return msg;
    }

    return new Constructor(function executor(resolve, reject) {
      if (typeof resolve != "function" || typeof reject != "function") {
        throw TypeError("Not a function");
      }

      resolve(msg);
    });
  });
  builtInProp(Promise, "reject", function Promise$reject(msg) {
    return new this(function executor(resolve, reject) {
      if (typeof resolve != "function" || typeof reject != "function") {
        throw TypeError("Not a function");
      }

      reject(msg);
    });
  });
  builtInProp(Promise, "all", function Promise$all(arr) {
    var Constructor = this; // spec mandated checks

    if (ToString.call(arr) != "[object Array]") {
      return Constructor.reject(TypeError("Not an array"));
    }

    if (arr.length === 0) {
      return Constructor.resolve([]);
    }

    return new Constructor(function executor(resolve, reject) {
      if (typeof resolve != "function" || typeof reject != "function") {
        throw TypeError("Not a function");
      }

      var len = arr.length,
          msgs = Array(len),
          count = 0;
      iteratePromises(Constructor, arr, function resolver(idx, msg) {
        msgs[idx] = msg;

        if (++count === len) {
          resolve(msgs);
        }
      }, reject);
    });
  });
  builtInProp(Promise, "race", function Promise$race(arr) {
    var Constructor = this; // spec mandated checks

    if (ToString.call(arr) != "[object Array]") {
      return Constructor.reject(TypeError("Not an array"));
    }

    return new Constructor(function executor(resolve, reject) {
      if (typeof resolve != "function" || typeof reject != "function") {
        throw TypeError("Not a function");
      }

      iteratePromises(Constructor, arr, function resolver(idx, msg) {
        resolve(msg);
      }, reject);
    });
  });
  return Promise;
});
});

/**
 * @module lib/callbacks
 */
var callbackMap = new WeakMap();
/**
 * Store a callback for a method or event for a player.
 *
 * @param {Player} player The player object.
 * @param {string} name The method or event name.
 * @param {(function(this:Player, *): void|{resolve: function, reject: function})} callback
 *        The callback to call or an object with resolve and reject functions for a promise.
 * @return {void}
 */

function storeCallback(player, name, callback) {
  var playerCallbacks = callbackMap.get(player.element) || {};

  if (!(name in playerCallbacks)) {
    playerCallbacks[name] = [];
  }

  playerCallbacks[name].push(callback);
  callbackMap.set(player.element, playerCallbacks);
}
/**
 * Get the callbacks for a player and event or method.
 *
 * @param {Player} player The player object.
 * @param {string} name The method or event name
 * @return {function[]}
 */

function getCallbacks(player, name) {
  var playerCallbacks = callbackMap.get(player.element) || {};
  return playerCallbacks[name] || [];
}
/**
 * Remove a stored callback for a method or event for a player.
 *
 * @param {Player} player The player object.
 * @param {string} name The method or event name
 * @param {function} [callback] The specific callback to remove.
 * @return {boolean} Was this the last callback?
 */

function removeCallback(player, name, callback) {
  var playerCallbacks = callbackMap.get(player.element) || {};

  if (!playerCallbacks[name]) {
    return true;
  } // If no callback is passed, remove all callbacks for the event


  if (!callback) {
    playerCallbacks[name] = [];
    callbackMap.set(player.element, playerCallbacks);
    return true;
  }

  var index = playerCallbacks[name].indexOf(callback);

  if (index !== -1) {
    playerCallbacks[name].splice(index, 1);
  }

  callbackMap.set(player.element, playerCallbacks);
  return playerCallbacks[name] && playerCallbacks[name].length === 0;
}
/**
 * Return the first stored callback for a player and event or method.
 *
 * @param {Player} player The player object.
 * @param {string} name The method or event name.
 * @return {function} The callback, or false if there were none
 */

function shiftCallbacks(player, name) {
  var playerCallbacks = getCallbacks(player, name);

  if (playerCallbacks.length < 1) {
    return false;
  }

  var callback = playerCallbacks.shift();
  removeCallback(player, name, callback);
  return callback;
}
/**
 * Move callbacks associated with an element to another element.
 *
 * @param {HTMLElement} oldElement The old element.
 * @param {HTMLElement} newElement The new element.
 * @return {void}
 */

function swapCallbacks(oldElement, newElement) {
  var playerCallbacks = callbackMap.get(oldElement);
  callbackMap.set(newElement, playerCallbacks);
  callbackMap.delete(oldElement);
}

/**
 * @module lib/embed
 */
var oEmbedParameters = ['autopause', 'autoplay', 'background', 'byline', 'color', 'controls', 'dnt', 'height', 'id', 'loop', 'maxheight', 'maxwidth', 'muted', 'playsinline', 'portrait', 'responsive', 'speed', 'texttrack', 'title', 'transparent', 'url', 'width'];
/**
 * Get the 'data-vimeo'-prefixed attributes from an element as an object.
 *
 * @param {HTMLElement} element The element.
 * @param {Object} [defaults={}] The default values to use.
 * @return {Object<string, string>}
 */

function getOEmbedParameters(element) {
  var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return oEmbedParameters.reduce(function (params, param) {
    var value = element.getAttribute("data-vimeo-".concat(param));

    if (value || value === '') {
      params[param] = value === '' ? 1 : value;
    }

    return params;
  }, defaults);
}
/**
 * Create an embed from oEmbed data inside an element.
 *
 * @param {object} data The oEmbed data.
 * @param {HTMLElement} element The element to put the iframe in.
 * @return {HTMLIFrameElement} The iframe embed.
 */

function createEmbed(_ref, element) {
  var html = _ref.html;

  if (!element) {
    throw new TypeError('An element must be provided');
  }

  if (element.getAttribute('data-vimeo-initialized') !== null) {
    return element.querySelector('iframe');
  }

  var div = document.createElement('div');
  div.innerHTML = html;
  element.appendChild(div.firstChild);
  element.setAttribute('data-vimeo-initialized', 'true');
  return element.querySelector('iframe');
}
/**
 * Make an oEmbed call for the specified URL.
 *
 * @param {string} videoUrl The vimeo.com url for the video.
 * @param {Object} [params] Parameters to pass to oEmbed.
 * @param {HTMLElement} element The element.
 * @return {Promise}
 */

function getOEmbedData(videoUrl) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var element = arguments.length > 2 ? arguments[2] : undefined;
  return new Promise(function (resolve, reject) {
    if (!isVimeoUrl(videoUrl)) {
      throw new TypeError("\u201C".concat(videoUrl, "\u201D is not a vimeo.com url."));
    }

    var url = "https://vimeo.com/api/oembed.json?url=".concat(encodeURIComponent(videoUrl));

    for (var param in params) {
      if (params.hasOwnProperty(param)) {
        url += "&".concat(param, "=").concat(encodeURIComponent(params[param]));
      }
    }

    var xhr = 'XDomainRequest' in window ? new XDomainRequest() : new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function () {
      if (xhr.status === 404) {
        reject(new Error("\u201C".concat(videoUrl, "\u201D was not found.")));
        return;
      }

      if (xhr.status === 403) {
        reject(new Error("\u201C".concat(videoUrl, "\u201D is not embeddable.")));
        return;
      }

      try {
        var json = JSON.parse(xhr.responseText); // Check api response for 403 on oembed

        if (json.domain_status_code === 403) {
          // We still want to create the embed to give users visual feedback
          createEmbed(json, element);
          reject(new Error("\u201C".concat(videoUrl, "\u201D is not embeddable.")));
          return;
        }

        resolve(json);
      } catch (error) {
        reject(error);
      }
    };

    xhr.onerror = function () {
      var status = xhr.status ? " (".concat(xhr.status, ")") : '';
      reject(new Error("There was an error fetching the embed code from Vimeo".concat(status, ".")));
    };

    xhr.send();
  });
}
/**
 * Initialize all embeds within a specific element
 *
 * @param {HTMLElement} [parent=document] The parent element.
 * @return {void}
 */

function initializeEmbeds() {
  var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  var elements = [].slice.call(parent.querySelectorAll('[data-vimeo-id], [data-vimeo-url]'));

  var handleError = function handleError(error) {
    if ('console' in window && console.error) {
      console.error("There was an error creating an embed: ".concat(error));
    }
  };

  elements.forEach(function (element) {
    try {
      // Skip any that have data-vimeo-defer
      if (element.getAttribute('data-vimeo-defer') !== null) {
        return;
      }

      var params = getOEmbedParameters(element);
      var url = getVimeoUrl(params);
      getOEmbedData(url, params, element).then(function (data) {
        return createEmbed(data, element);
      }).catch(handleError);
    } catch (error) {
      handleError(error);
    }
  });
}
/**
 * Resize embeds when messaged by the player.
 *
 * @param {HTMLElement} [parent=document] The parent element.
 * @return {void}
 */

function resizeEmbeds() {
  var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

  // Prevent execution if users include the player.js script multiple times.
  if (window.VimeoPlayerResizeEmbeds_) {
    return;
  }

  window.VimeoPlayerResizeEmbeds_ = true;

  var onMessage = function onMessage(event) {
    if (!isVimeoUrl(event.origin)) {
      return;
    } // 'spacechange' is fired only on embeds with cards


    if (!event.data || event.data.event !== 'spacechange') {
      return;
    }

    var iframes = parent.querySelectorAll('iframe');

    for (var i = 0; i < iframes.length; i++) {
      if (iframes[i].contentWindow !== event.source) {
        continue;
      } // Change padding-bottom of the enclosing div to accommodate
      // card carousel without distorting aspect ratio


      var space = iframes[i].parentElement;
      space.style.paddingBottom = "".concat(event.data.data[0].bottom, "px");
      break;
    }
  };

  window.addEventListener('message', onMessage);
}

/**
 * @module lib/postmessage
 */
/**
 * Parse a message received from postMessage.
 *
 * @param {*} data The data received from postMessage.
 * @return {object}
 */

function parseMessageData(data) {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch (error) {
      // If the message cannot be parsed, throw the error as a warning
      console.warn(error);
      return {};
    }
  }

  return data;
}
/**
 * Post a message to the specified target.
 *
 * @param {Player} player The player object to use.
 * @param {string} method The API method to call.
 * @param {object} params The parameters to send to the player.
 * @return {void}
 */

function postMessage(player, method, params) {
  if (!player.element.contentWindow || !player.element.contentWindow.postMessage) {
    return;
  }

  var message = {
    method: method
  };

  if (params !== undefined) {
    message.value = params;
  } // IE 8 and 9 do not support passing messages, so stringify them


  var ieVersion = parseFloat(navigator.userAgent.toLowerCase().replace(/^.*msie (\d+).*$/, '$1'));

  if (ieVersion >= 8 && ieVersion < 10) {
    message = JSON.stringify(message);
  }

  player.element.contentWindow.postMessage(message, player.origin);
}
/**
 * Parse the data received from a message event.
 *
 * @param {Player} player The player that received the message.
 * @param {(Object|string)} data The message data. Strings will be parsed into JSON.
 * @return {void}
 */

function processData(player, data) {
  data = parseMessageData(data);
  var callbacks = [];
  var param;

  if (data.event) {
    if (data.event === 'error') {
      var promises = getCallbacks(player, data.data.method);
      promises.forEach(function (promise) {
        var error = new Error(data.data.message);
        error.name = data.data.name;
        promise.reject(error);
        removeCallback(player, data.data.method, promise);
      });
    }

    callbacks = getCallbacks(player, "event:".concat(data.event));
    param = data.data;
  } else if (data.method) {
    var callback = shiftCallbacks(player, data.method);

    if (callback) {
      callbacks.push(callback);
      param = data.value;
    }
  }

  callbacks.forEach(function (callback) {
    try {
      if (typeof callback === 'function') {
        callback.call(player, param);
        return;
      }

      callback.resolve(param);
    } catch (e) {// empty
    }
  });
}

/* MIT License

Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
Terms */
function initializeScreenfull() {
  var fn = function () {
    var val;
    var fnMap = [['requestFullscreen', 'exitFullscreen', 'fullscreenElement', 'fullscreenEnabled', 'fullscreenchange', 'fullscreenerror'], // New WebKit
    ['webkitRequestFullscreen', 'webkitExitFullscreen', 'webkitFullscreenElement', 'webkitFullscreenEnabled', 'webkitfullscreenchange', 'webkitfullscreenerror'], // Old WebKit
    ['webkitRequestFullScreen', 'webkitCancelFullScreen', 'webkitCurrentFullScreenElement', 'webkitCancelFullScreen', 'webkitfullscreenchange', 'webkitfullscreenerror'], ['mozRequestFullScreen', 'mozCancelFullScreen', 'mozFullScreenElement', 'mozFullScreenEnabled', 'mozfullscreenchange', 'mozfullscreenerror'], ['msRequestFullscreen', 'msExitFullscreen', 'msFullscreenElement', 'msFullscreenEnabled', 'MSFullscreenChange', 'MSFullscreenError']];
    var i = 0;
    var l = fnMap.length;
    var ret = {};

    for (; i < l; i++) {
      val = fnMap[i];

      if (val && val[1] in document) {
        for (i = 0; i < val.length; i++) {
          ret[fnMap[0][i]] = val[i];
        }

        return ret;
      }
    }

    return false;
  }();

  var eventNameMap = {
    fullscreenchange: fn.fullscreenchange,
    fullscreenerror: fn.fullscreenerror
  };
  var screenfull = {
    request: function request(element) {
      return new Promise(function (resolve, reject) {
        var onFullScreenEntered = function onFullScreenEntered() {
          screenfull.off('fullscreenchange', onFullScreenEntered);
          resolve();
        };

        screenfull.on('fullscreenchange', onFullScreenEntered);
        element = element || document.documentElement;
        var returnPromise = element[fn.requestFullscreen]();

        if (returnPromise instanceof Promise) {
          returnPromise.then(onFullScreenEntered).catch(reject);
        }
      });
    },
    exit: function exit() {
      return new Promise(function (resolve, reject) {
        if (!screenfull.isFullscreen) {
          resolve();
          return;
        }

        var onFullScreenExit = function onFullScreenExit() {
          screenfull.off('fullscreenchange', onFullScreenExit);
          resolve();
        };

        screenfull.on('fullscreenchange', onFullScreenExit);
        var returnPromise = document[fn.exitFullscreen]();

        if (returnPromise instanceof Promise) {
          returnPromise.then(onFullScreenExit).catch(reject);
        }
      });
    },
    on: function on(event, callback) {
      var eventName = eventNameMap[event];

      if (eventName) {
        document.addEventListener(eventName, callback);
      }
    },
    off: function off(event, callback) {
      var eventName = eventNameMap[event];

      if (eventName) {
        document.removeEventListener(eventName, callback);
      }
    }
  };
  Object.defineProperties(screenfull, {
    isFullscreen: {
      get: function get() {
        return Boolean(document[fn.fullscreenElement]);
      }
    },
    element: {
      enumerable: true,
      get: function get() {
        return document[fn.fullscreenElement];
      }
    },
    isEnabled: {
      enumerable: true,
      get: function get() {
        // Coerce to boolean in case of old WebKit
        return Boolean(document[fn.fullscreenEnabled]);
      }
    }
  });
  return screenfull;
}

var playerMap = new WeakMap();
var readyMap = new WeakMap();
var screenfull = {};

var Player = /*#__PURE__*/function () {
  /**
   * Create a Player.
   *
   * @param {(HTMLIFrameElement|HTMLElement|string|jQuery)} element A reference to the Vimeo
   *        player iframe, and id, or a jQuery object.
   * @param {object} [options] oEmbed parameters to use when creating an embed in the element.
   * @return {Player}
   */
  function Player(element) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Player);

    /* global jQuery */
    if (window.jQuery && element instanceof jQuery) {
      if (element.length > 1 && window.console && console.warn) {
        console.warn('A jQuery object with multiple elements was passed, using the first element.');
      }

      element = element[0];
    } // Find an element by ID


    if (typeof document !== 'undefined' && typeof element === 'string') {
      element = document.getElementById(element);
    } // Not an element!


    if (!isDomElement(element)) {
      throw new TypeError('You must pass either a valid element or a valid id.');
    } // Already initialized an embed in this div, so grab the iframe


    if (element.nodeName !== 'IFRAME') {
      var iframe = element.querySelector('iframe');

      if (iframe) {
        element = iframe;
      }
    } // iframe url is not a Vimeo url


    if (element.nodeName === 'IFRAME' && !isVimeoUrl(element.getAttribute('src') || '')) {
      throw new Error('The player element passed isn’t a Vimeo embed.');
    } // If there is already a player object in the map, return that


    if (playerMap.has(element)) {
      return playerMap.get(element);
    }

    this._window = element.ownerDocument.defaultView;
    this.element = element;
    this.origin = '*';
    var readyPromise = new npo_src(function (resolve, reject) {
      _this._onMessage = function (event) {
        if (!isVimeoUrl(event.origin) || _this.element.contentWindow !== event.source) {
          return;
        }

        if (_this.origin === '*') {
          _this.origin = event.origin;
        }

        var data = parseMessageData(event.data);
        var isError = data && data.event === 'error';
        var isReadyError = isError && data.data && data.data.method === 'ready';

        if (isReadyError) {
          var error = new Error(data.data.message);
          error.name = data.data.name;
          reject(error);
          return;
        }

        var isReadyEvent = data && data.event === 'ready';
        var isPingResponse = data && data.method === 'ping';

        if (isReadyEvent || isPingResponse) {
          _this.element.setAttribute('data-ready', 'true');

          resolve();
          return;
        }

        processData(_this, data);
      };

      _this._window.addEventListener('message', _this._onMessage);

      if (_this.element.nodeName !== 'IFRAME') {
        var params = getOEmbedParameters(element, options);
        var url = getVimeoUrl(params);
        getOEmbedData(url, params, element).then(function (data) {
          var iframe = createEmbed(data, element); // Overwrite element with the new iframe,
          // but store reference to the original element

          _this.element = iframe;
          _this._originalElement = element;
          swapCallbacks(element, iframe);
          playerMap.set(_this.element, _this);
          return data;
        }).catch(reject);
      }
    }); // Store a copy of this Player in the map

    readyMap.set(this, readyPromise);
    playerMap.set(this.element, this); // Send a ping to the iframe so the ready promise will be resolved if
    // the player is already ready.

    if (this.element.nodeName === 'IFRAME') {
      postMessage(this, 'ping');
    }

    if (screenfull.isEnabled) {
      var exitFullscreen = function exitFullscreen() {
        return screenfull.exit();
      };

      screenfull.on('fullscreenchange', function () {
        if (screenfull.isFullscreen) {
          storeCallback(_this, 'event:exitFullscreen', exitFullscreen);
        } else {
          removeCallback(_this, 'event:exitFullscreen', exitFullscreen);
        } // eslint-disable-next-line


        _this.ready().then(function () {
          postMessage(_this, 'fullscreenchange', screenfull.isFullscreen);
        });
      });
    }

    return this;
  }
  /**
   * Get a promise for a method.
   *
   * @param {string} name The API method to call.
   * @param {Object} [args={}] Arguments to send via postMessage.
   * @return {Promise}
   */


  _createClass(Player, [{
    key: "callMethod",
    value: function callMethod(name) {
      var _this2 = this;

      var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return new npo_src(function (resolve, reject) {
        // We are storing the resolve/reject handlers to call later, so we
        // can’t return here.
        // eslint-disable-next-line promise/always-return
        return _this2.ready().then(function () {
          storeCallback(_this2, name, {
            resolve: resolve,
            reject: reject
          });
          postMessage(_this2, name, args);
        }).catch(reject);
      });
    }
    /**
     * Get a promise for the value of a player property.
     *
     * @param {string} name The property name
     * @return {Promise}
     */

  }, {
    key: "get",
    value: function get(name) {
      var _this3 = this;

      return new npo_src(function (resolve, reject) {
        name = getMethodName(name, 'get'); // We are storing the resolve/reject handlers to call later, so we
        // can’t return here.
        // eslint-disable-next-line promise/always-return

        return _this3.ready().then(function () {
          storeCallback(_this3, name, {
            resolve: resolve,
            reject: reject
          });
          postMessage(_this3, name);
        }).catch(reject);
      });
    }
    /**
     * Get a promise for setting the value of a player property.
     *
     * @param {string} name The API method to call.
     * @param {mixed} value The value to set.
     * @return {Promise}
     */

  }, {
    key: "set",
    value: function set(name, value) {
      var _this4 = this;

      return new npo_src(function (resolve, reject) {
        name = getMethodName(name, 'set');

        if (value === undefined || value === null) {
          throw new TypeError('There must be a value to set.');
        } // We are storing the resolve/reject handlers to call later, so we
        // can’t return here.
        // eslint-disable-next-line promise/always-return


        return _this4.ready().then(function () {
          storeCallback(_this4, name, {
            resolve: resolve,
            reject: reject
          });
          postMessage(_this4, name, value);
        }).catch(reject);
      });
    }
    /**
     * Add an event listener for the specified event. Will call the
     * callback with a single parameter, `data`, that contains the data for
     * that event.
     *
     * @param {string} eventName The name of the event.
     * @param {function(*)} callback The function to call when the event fires.
     * @return {void}
     */

  }, {
    key: "on",
    value: function on(eventName, callback) {
      if (!eventName) {
        throw new TypeError('You must pass an event name.');
      }

      if (!callback) {
        throw new TypeError('You must pass a callback function.');
      }

      if (typeof callback !== 'function') {
        throw new TypeError('The callback must be a function.');
      }

      var callbacks = getCallbacks(this, "event:".concat(eventName));

      if (callbacks.length === 0) {
        this.callMethod('addEventListener', eventName).catch(function () {// Ignore the error. There will be an error event fired that
          // will trigger the error callback if they are listening.
        });
      }

      storeCallback(this, "event:".concat(eventName), callback);
    }
    /**
     * Remove an event listener for the specified event. Will remove all
     * listeners for that event if a `callback` isn’t passed, or only that
     * specific callback if it is passed.
     *
     * @param {string} eventName The name of the event.
     * @param {function} [callback] The specific callback to remove.
     * @return {void}
     */

  }, {
    key: "off",
    value: function off(eventName, callback) {
      if (!eventName) {
        throw new TypeError('You must pass an event name.');
      }

      if (callback && typeof callback !== 'function') {
        throw new TypeError('The callback must be a function.');
      }

      var lastCallback = removeCallback(this, "event:".concat(eventName), callback); // If there are no callbacks left, remove the listener

      if (lastCallback) {
        this.callMethod('removeEventListener', eventName).catch(function (e) {// Ignore the error. There will be an error event fired that
          // will trigger the error callback if they are listening.
        });
      }
    }
    /**
     * A promise to load a new video.
     *
     * @promise LoadVideoPromise
     * @fulfill {number} The video with this id successfully loaded.
     * @reject {TypeError} The id was not a number.
     */

    /**
     * Load a new video into this embed. The promise will be resolved if
     * the video is successfully loaded, or it will be rejected if it could
     * not be loaded.
     *
     * @param {number|object} options The id of the video or an object with embed options.
     * @return {LoadVideoPromise}
     */

  }, {
    key: "loadVideo",
    value: function loadVideo(options) {
      return this.callMethod('loadVideo', options);
    }
    /**
     * A promise to perform an action when the Player is ready.
     *
     * @todo document errors
     * @promise LoadVideoPromise
     * @fulfill {void}
     */

    /**
     * Trigger a function when the player iframe has initialized. You do not
     * need to wait for `ready` to trigger to begin adding event listeners
     * or calling other methods.
     *
     * @return {ReadyPromise}
     */

  }, {
    key: "ready",
    value: function ready() {
      var readyPromise = readyMap.get(this) || new npo_src(function (resolve, reject) {
        reject(new Error('Unknown player. Probably unloaded.'));
      });
      return npo_src.resolve(readyPromise);
    }
    /**
     * A promise to add a cue point to the player.
     *
     * @promise AddCuePointPromise
     * @fulfill {string} The id of the cue point to use for removeCuePoint.
     * @reject {RangeError} the time was less than 0 or greater than the
     *         video’s duration.
     * @reject {UnsupportedError} Cue points are not supported with the current
     *         player or browser.
     */

    /**
     * Add a cue point to the player.
     *
     * @param {number} time The time for the cue point.
     * @param {object} [data] Arbitrary data to be returned with the cue point.
     * @return {AddCuePointPromise}
     */

  }, {
    key: "addCuePoint",
    value: function addCuePoint(time) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.callMethod('addCuePoint', {
        time: time,
        data: data
      });
    }
    /**
     * A promise to remove a cue point from the player.
     *
     * @promise AddCuePointPromise
     * @fulfill {string} The id of the cue point that was removed.
     * @reject {InvalidCuePoint} The cue point with the specified id was not
     *         found.
     * @reject {UnsupportedError} Cue points are not supported with the current
     *         player or browser.
     */

    /**
     * Remove a cue point from the video.
     *
     * @param {string} id The id of the cue point to remove.
     * @return {RemoveCuePointPromise}
     */

  }, {
    key: "removeCuePoint",
    value: function removeCuePoint(id) {
      return this.callMethod('removeCuePoint', id);
    }
    /**
     * A representation of a text track on a video.
     *
     * @typedef {Object} VimeoTextTrack
     * @property {string} language The ISO language code.
     * @property {string} kind The kind of track it is (captions or subtitles).
     * @property {string} label The human‐readable label for the track.
     */

    /**
     * A promise to enable a text track.
     *
     * @promise EnableTextTrackPromise
     * @fulfill {VimeoTextTrack} The text track that was enabled.
     * @reject {InvalidTrackLanguageError} No track was available with the
     *         specified language.
     * @reject {InvalidTrackError} No track was available with the specified
     *         language and kind.
     */

    /**
     * Enable the text track with the specified language, and optionally the
     * specified kind (captions or subtitles).
     *
     * When set via the API, the track language will not change the viewer’s
     * stored preference.
     *
     * @param {string} language The two‐letter language code.
     * @param {string} [kind] The kind of track to enable (captions or subtitles).
     * @return {EnableTextTrackPromise}
     */

  }, {
    key: "enableTextTrack",
    value: function enableTextTrack(language, kind) {
      if (!language) {
        throw new TypeError('You must pass a language.');
      }

      return this.callMethod('enableTextTrack', {
        language: language,
        kind: kind
      });
    }
    /**
     * A promise to disable the active text track.
     *
     * @promise DisableTextTrackPromise
     * @fulfill {void} The track was disabled.
     */

    /**
     * Disable the currently-active text track.
     *
     * @return {DisableTextTrackPromise}
     */

  }, {
    key: "disableTextTrack",
    value: function disableTextTrack() {
      return this.callMethod('disableTextTrack');
    }
    /**
     * A promise to pause the video.
     *
     * @promise PausePromise
     * @fulfill {void} The video was paused.
     */

    /**
     * Pause the video if it’s playing.
     *
     * @return {PausePromise}
     */

  }, {
    key: "pause",
    value: function pause() {
      return this.callMethod('pause');
    }
    /**
     * A promise to play the video.
     *
     * @promise PlayPromise
     * @fulfill {void} The video was played.
     */

    /**
     * Play the video if it’s paused. **Note:** on iOS and some other
     * mobile devices, you cannot programmatically trigger play. Once the
     * viewer has tapped on the play button in the player, however, you
     * will be able to use this function.
     *
     * @return {PlayPromise}
     */

  }, {
    key: "play",
    value: function play() {
      return this.callMethod('play');
    }
    /**
     * Request that the player enters fullscreen.
     * @return {Promise}
     */

  }, {
    key: "requestFullscreen",
    value: function requestFullscreen() {
      if (screenfull.isEnabled) {
        return screenfull.request(this.element);
      }

      return this.callMethod('requestFullscreen');
    }
    /**
     * Request that the player exits fullscreen.
     * @return {Promise}
     */

  }, {
    key: "exitFullscreen",
    value: function exitFullscreen() {
      if (screenfull.isEnabled) {
        return screenfull.exit();
      }

      return this.callMethod('exitFullscreen');
    }
    /**
     * Returns true if the player is currently fullscreen.
     * @return {Promise}
     */

  }, {
    key: "getFullscreen",
    value: function getFullscreen() {
      if (screenfull.isEnabled) {
        return npo_src.resolve(screenfull.isFullscreen);
      }

      return this.get('fullscreen');
    }
    /**
     * Request that the player enters picture-in-picture.
     * @return {Promise}
     */

  }, {
    key: "requestPictureInPicture",
    value: function requestPictureInPicture() {
      return this.callMethod('requestPictureInPicture');
    }
    /**
     * Request that the player exits picture-in-picture.
     * @return {Promise}
     */

  }, {
    key: "exitPictureInPicture",
    value: function exitPictureInPicture() {
      return this.callMethod('exitPictureInPicture');
    }
    /**
     * Returns true if the player is currently picture-in-picture.
     * @return {Promise}
     */

  }, {
    key: "getPictureInPicture",
    value: function getPictureInPicture() {
      return this.get('pictureInPicture');
    }
    /**
     * A promise to unload the video.
     *
     * @promise UnloadPromise
     * @fulfill {void} The video was unloaded.
     */

    /**
     * Return the player to its initial state.
     *
     * @return {UnloadPromise}
     */

  }, {
    key: "unload",
    value: function unload() {
      return this.callMethod('unload');
    }
    /**
     * Cleanup the player and remove it from the DOM
     *
     * It won't be usable and a new one should be constructed
     *  in order to do any operations.
     *
     * @return {Promise}
     */

  }, {
    key: "destroy",
    value: function destroy() {
      var _this5 = this;

      return new npo_src(function (resolve) {
        readyMap.delete(_this5);
        playerMap.delete(_this5.element);

        if (_this5._originalElement) {
          playerMap.delete(_this5._originalElement);

          _this5._originalElement.removeAttribute('data-vimeo-initialized');
        }

        if (_this5.element && _this5.element.nodeName === 'IFRAME' && _this5.element.parentNode) {
          // If we've added an additional wrapper div, remove that from the DOM.
          // If not, just remove the iframe element.
          if (_this5.element.parentNode.parentNode && _this5._originalElement && _this5._originalElement !== _this5.element.parentNode) {
            _this5.element.parentNode.parentNode.removeChild(_this5.element.parentNode);
          } else {
            _this5.element.parentNode.removeChild(_this5.element);
          }
        } // If the clip is private there is a case where the element stays the
        // div element. Destroy should reset the div and remove the iframe child.


        if (_this5.element && _this5.element.nodeName === 'DIV' && _this5.element.parentNode) {
          _this5.element.removeAttribute('data-vimeo-initialized');

          var iframe = _this5.element.querySelector('iframe');

          if (iframe && iframe.parentNode) {
            // If we've added an additional wrapper div, remove that from the DOM.
            // If not, just remove the iframe element.
            if (iframe.parentNode.parentNode && _this5._originalElement && _this5._originalElement !== iframe.parentNode) {
              iframe.parentNode.parentNode.removeChild(iframe.parentNode);
            } else {
              iframe.parentNode.removeChild(iframe);
            }
          }
        }

        _this5._window.removeEventListener('message', _this5._onMessage);

        resolve();
      });
    }
    /**
     * A promise to get the autopause behavior of the video.
     *
     * @promise GetAutopausePromise
     * @fulfill {boolean} Whether autopause is turned on or off.
     * @reject {UnsupportedError} Autopause is not supported with the current
     *         player or browser.
     */

    /**
     * Get the autopause behavior for this player.
     *
     * @return {GetAutopausePromise}
     */

  }, {
    key: "getAutopause",
    value: function getAutopause() {
      return this.get('autopause');
    }
    /**
     * A promise to set the autopause behavior of the video.
     *
     * @promise SetAutopausePromise
     * @fulfill {boolean} Whether autopause is turned on or off.
     * @reject {UnsupportedError} Autopause is not supported with the current
     *         player or browser.
     */

    /**
     * Enable or disable the autopause behavior of this player.
     *
     * By default, when another video is played in the same browser, this
     * player will automatically pause. Unless you have a specific reason
     * for doing so, we recommend that you leave autopause set to the
     * default (`true`).
     *
     * @param {boolean} autopause
     * @return {SetAutopausePromise}
     */

  }, {
    key: "setAutopause",
    value: function setAutopause(autopause) {
      return this.set('autopause', autopause);
    }
    /**
     * A promise to get the buffered property of the video.
     *
     * @promise GetBufferedPromise
     * @fulfill {Array} Buffered Timeranges converted to an Array.
     */

    /**
     * Get the buffered property of the video.
     *
     * @return {GetBufferedPromise}
     */

  }, {
    key: "getBuffered",
    value: function getBuffered() {
      return this.get('buffered');
    }
    /**
     * @typedef {Object} CameraProperties
     * @prop {number} props.yaw - Number between 0 and 360.
     * @prop {number} props.pitch - Number between -90 and 90.
     * @prop {number} props.roll - Number between -180 and 180.
     * @prop {number} props.fov - The field of view in degrees.
     */

    /**
     * A promise to get the camera properties of the player.
     *
     * @promise GetCameraPromise
     * @fulfill {CameraProperties} The camera properties.
     */

    /**
     * For 360° videos get the camera properties for this player.
     *
     * @return {GetCameraPromise}
     */

  }, {
    key: "getCameraProps",
    value: function getCameraProps() {
      return this.get('cameraProps');
    }
    /**
     * A promise to set the camera properties of the player.
     *
     * @promise SetCameraPromise
     * @fulfill {Object} The camera was successfully set.
     * @reject {RangeError} The range was out of bounds.
     */

    /**
     * For 360° videos set the camera properties for this player.
     *
     * @param {CameraProperties} camera The camera properties
     * @return {SetCameraPromise}
     */

  }, {
    key: "setCameraProps",
    value: function setCameraProps(camera) {
      return this.set('cameraProps', camera);
    }
    /**
     * A representation of a chapter.
     *
     * @typedef {Object} VimeoChapter
     * @property {number} startTime The start time of the chapter.
     * @property {object} title The title of the chapter.
     * @property {number} index The place in the order of Chapters. Starts at 1.
     */

    /**
     * A promise to get chapters for the video.
     *
     * @promise GetChaptersPromise
     * @fulfill {VimeoChapter[]} The chapters for the video.
     */

    /**
     * Get an array of all the chapters for the video.
     *
     * @return {GetChaptersPromise}
     */

  }, {
    key: "getChapters",
    value: function getChapters() {
      return this.get('chapters');
    }
    /**
     * A promise to get the currently active chapter.
     *
     * @promise GetCurrentChaptersPromise
     * @fulfill {VimeoChapter|undefined} The current chapter for the video.
     */

    /**
     * Get the currently active chapter for the video.
     *
     * @return {GetCurrentChaptersPromise}
     */

  }, {
    key: "getCurrentChapter",
    value: function getCurrentChapter() {
      return this.get('currentChapter');
    }
    /**
     * A promise to get the color of the player.
     *
     * @promise GetColorPromise
     * @fulfill {string} The hex color of the player.
     */

    /**
     * Get the color for this player.
     *
     * @return {GetColorPromise}
     */

  }, {
    key: "getColor",
    value: function getColor() {
      return this.get('color');
    }
    /**
     * A promise to set the color of the player.
     *
     * @promise SetColorPromise
     * @fulfill {string} The color was successfully set.
     * @reject {TypeError} The string was not a valid hex or rgb color.
     * @reject {ContrastError} The color was set, but the contrast is
     *         outside of the acceptable range.
     * @reject {EmbedSettingsError} The owner of the player has chosen to
     *         use a specific color.
     */

    /**
     * Set the color of this player to a hex or rgb string. Setting the
     * color may fail if the owner of the video has set their embed
     * preferences to force a specific color.
     *
     * @param {string} color The hex or rgb color string to set.
     * @return {SetColorPromise}
     */

  }, {
    key: "setColor",
    value: function setColor(color) {
      return this.set('color', color);
    }
    /**
     * A representation of a cue point.
     *
     * @typedef {Object} VimeoCuePoint
     * @property {number} time The time of the cue point.
     * @property {object} data The data passed when adding the cue point.
     * @property {string} id The unique id for use with removeCuePoint.
     */

    /**
     * A promise to get the cue points of a video.
     *
     * @promise GetCuePointsPromise
     * @fulfill {VimeoCuePoint[]} The cue points added to the video.
     * @reject {UnsupportedError} Cue points are not supported with the current
     *         player or browser.
     */

    /**
     * Get an array of the cue points added to the video.
     *
     * @return {GetCuePointsPromise}
     */

  }, {
    key: "getCuePoints",
    value: function getCuePoints() {
      return this.get('cuePoints');
    }
    /**
     * A promise to get the current time of the video.
     *
     * @promise GetCurrentTimePromise
     * @fulfill {number} The current time in seconds.
     */

    /**
     * Get the current playback position in seconds.
     *
     * @return {GetCurrentTimePromise}
     */

  }, {
    key: "getCurrentTime",
    value: function getCurrentTime() {
      return this.get('currentTime');
    }
    /**
     * A promise to set the current time of the video.
     *
     * @promise SetCurrentTimePromise
     * @fulfill {number} The actual current time that was set.
     * @reject {RangeError} the time was less than 0 or greater than the
     *         video’s duration.
     */

    /**
     * Set the current playback position in seconds. If the player was
     * paused, it will remain paused. Likewise, if the player was playing,
     * it will resume playing once the video has buffered.
     *
     * You can provide an accurate time and the player will attempt to seek
     * to as close to that time as possible. The exact time will be the
     * fulfilled value of the promise.
     *
     * @param {number} currentTime
     * @return {SetCurrentTimePromise}
     */

  }, {
    key: "setCurrentTime",
    value: function setCurrentTime(currentTime) {
      return this.set('currentTime', currentTime);
    }
    /**
     * A promise to get the duration of the video.
     *
     * @promise GetDurationPromise
     * @fulfill {number} The duration in seconds.
     */

    /**
     * Get the duration of the video in seconds. It will be rounded to the
     * nearest second before playback begins, and to the nearest thousandth
     * of a second after playback begins.
     *
     * @return {GetDurationPromise}
     */

  }, {
    key: "getDuration",
    value: function getDuration() {
      return this.get('duration');
    }
    /**
     * A promise to get the ended state of the video.
     *
     * @promise GetEndedPromise
     * @fulfill {boolean} Whether or not the video has ended.
     */

    /**
     * Get the ended state of the video. The video has ended if
     * `currentTime === duration`.
     *
     * @return {GetEndedPromise}
     */

  }, {
    key: "getEnded",
    value: function getEnded() {
      return this.get('ended');
    }
    /**
     * A promise to get the loop state of the player.
     *
     * @promise GetLoopPromise
     * @fulfill {boolean} Whether or not the player is set to loop.
     */

    /**
     * Get the loop state of the player.
     *
     * @return {GetLoopPromise}
     */

  }, {
    key: "getLoop",
    value: function getLoop() {
      return this.get('loop');
    }
    /**
     * A promise to set the loop state of the player.
     *
     * @promise SetLoopPromise
     * @fulfill {boolean} The loop state that was set.
     */

    /**
     * Set the loop state of the player. When set to `true`, the player
     * will start over immediately once playback ends.
     *
     * @param {boolean} loop
     * @return {SetLoopPromise}
     */

  }, {
    key: "setLoop",
    value: function setLoop(loop) {
      return this.set('loop', loop);
    }
    /**
     * A promise to set the muted state of the player.
     *
     * @promise SetMutedPromise
     * @fulfill {boolean} The muted state that was set.
     */

    /**
     * Set the muted state of the player. When set to `true`, the player
     * volume will be muted.
     *
     * @param {boolean} muted
     * @return {SetMutedPromise}
     */

  }, {
    key: "setMuted",
    value: function setMuted(muted) {
      return this.set('muted', muted);
    }
    /**
     * A promise to get the muted state of the player.
     *
     * @promise GetMutedPromise
     * @fulfill {boolean} Whether or not the player is muted.
     */

    /**
     * Get the muted state of the player.
     *
     * @return {GetMutedPromise}
     */

  }, {
    key: "getMuted",
    value: function getMuted() {
      return this.get('muted');
    }
    /**
     * A promise to get the paused state of the player.
     *
     * @promise GetLoopPromise
     * @fulfill {boolean} Whether or not the video is paused.
     */

    /**
     * Get the paused state of the player.
     *
     * @return {GetLoopPromise}
     */

  }, {
    key: "getPaused",
    value: function getPaused() {
      return this.get('paused');
    }
    /**
     * A promise to get the playback rate of the player.
     *
     * @promise GetPlaybackRatePromise
     * @fulfill {number} The playback rate of the player on a scale from 0.5 to 2.
     */

    /**
     * Get the playback rate of the player on a scale from `0.5` to `2`.
     *
     * @return {GetPlaybackRatePromise}
     */

  }, {
    key: "getPlaybackRate",
    value: function getPlaybackRate() {
      return this.get('playbackRate');
    }
    /**
     * A promise to set the playbackrate of the player.
     *
     * @promise SetPlaybackRatePromise
     * @fulfill {number} The playback rate was set.
     * @reject {RangeError} The playback rate was less than 0.5 or greater than 2.
     */

    /**
     * Set the playback rate of the player on a scale from `0.5` to `2`. When set
     * via the API, the playback rate will not be synchronized to other
     * players or stored as the viewer's preference.
     *
     * @param {number} playbackRate
     * @return {SetPlaybackRatePromise}
     */

  }, {
    key: "setPlaybackRate",
    value: function setPlaybackRate(playbackRate) {
      return this.set('playbackRate', playbackRate);
    }
    /**
     * A promise to get the played property of the video.
     *
     * @promise GetPlayedPromise
     * @fulfill {Array} Played Timeranges converted to an Array.
     */

    /**
     * Get the played property of the video.
     *
     * @return {GetPlayedPromise}
     */

  }, {
    key: "getPlayed",
    value: function getPlayed() {
      return this.get('played');
    }
    /**
     * A promise to get the qualities available of the current video.
     *
     * @promise GetQualitiesPromise
     * @fulfill {Array} The qualities of the video.
     */

    /**
     * Get the qualities of the current video.
     *
     * @return {GetQualitiesPromise}
     */

  }, {
    key: "getQualities",
    value: function getQualities() {
      return this.get('qualities');
    }
    /**
     * A promise to get the current set quality of the video.
     *
     * @promise GetQualityPromise
     * @fulfill {string} The current set quality.
     */

    /**
     * Get the current set quality of the video.
     *
     * @return {GetQualityPromise}
     */

  }, {
    key: "getQuality",
    value: function getQuality() {
      return this.get('quality');
    }
    /**
     * A promise to set the video quality.
     *
     * @promise SetQualityPromise
     * @fulfill {number} The quality was set.
     * @reject {RangeError} The quality is not available.
     */

    /**
     * Set a video quality.
     *
     * @param {string} quality
     * @return {SetQualityPromise}
     */

  }, {
    key: "setQuality",
    value: function setQuality(quality) {
      return this.set('quality', quality);
    }
    /**
     * A promise to get the seekable property of the video.
     *
     * @promise GetSeekablePromise
     * @fulfill {Array} Seekable Timeranges converted to an Array.
     */

    /**
     * Get the seekable property of the video.
     *
     * @return {GetSeekablePromise}
     */

  }, {
    key: "getSeekable",
    value: function getSeekable() {
      return this.get('seekable');
    }
    /**
     * A promise to get the seeking property of the player.
     *
     * @promise GetSeekingPromise
     * @fulfill {boolean} Whether or not the player is currently seeking.
     */

    /**
     * Get if the player is currently seeking.
     *
     * @return {GetSeekingPromise}
     */

  }, {
    key: "getSeeking",
    value: function getSeeking() {
      return this.get('seeking');
    }
    /**
     * A promise to get the text tracks of a video.
     *
     * @promise GetTextTracksPromise
     * @fulfill {VimeoTextTrack[]} The text tracks associated with the video.
     */

    /**
     * Get an array of the text tracks that exist for the video.
     *
     * @return {GetTextTracksPromise}
     */

  }, {
    key: "getTextTracks",
    value: function getTextTracks() {
      return this.get('textTracks');
    }
    /**
     * A promise to get the embed code for the video.
     *
     * @promise GetVideoEmbedCodePromise
     * @fulfill {string} The `<iframe>` embed code for the video.
     */

    /**
     * Get the `<iframe>` embed code for the video.
     *
     * @return {GetVideoEmbedCodePromise}
     */

  }, {
    key: "getVideoEmbedCode",
    value: function getVideoEmbedCode() {
      return this.get('videoEmbedCode');
    }
    /**
     * A promise to get the id of the video.
     *
     * @promise GetVideoIdPromise
     * @fulfill {number} The id of the video.
     */

    /**
     * Get the id of the video.
     *
     * @return {GetVideoIdPromise}
     */

  }, {
    key: "getVideoId",
    value: function getVideoId() {
      return this.get('videoId');
    }
    /**
     * A promise to get the title of the video.
     *
     * @promise GetVideoTitlePromise
     * @fulfill {number} The title of the video.
     */

    /**
     * Get the title of the video.
     *
     * @return {GetVideoTitlePromise}
     */

  }, {
    key: "getVideoTitle",
    value: function getVideoTitle() {
      return this.get('videoTitle');
    }
    /**
     * A promise to get the native width of the video.
     *
     * @promise GetVideoWidthPromise
     * @fulfill {number} The native width of the video.
     */

    /**
     * Get the native width of the currently‐playing video. The width of
     * the highest‐resolution available will be used before playback begins.
     *
     * @return {GetVideoWidthPromise}
     */

  }, {
    key: "getVideoWidth",
    value: function getVideoWidth() {
      return this.get('videoWidth');
    }
    /**
     * A promise to get the native height of the video.
     *
     * @promise GetVideoHeightPromise
     * @fulfill {number} The native height of the video.
     */

    /**
     * Get the native height of the currently‐playing video. The height of
     * the highest‐resolution available will be used before playback begins.
     *
     * @return {GetVideoHeightPromise}
     */

  }, {
    key: "getVideoHeight",
    value: function getVideoHeight() {
      return this.get('videoHeight');
    }
    /**
     * A promise to get the vimeo.com url for the video.
     *
     * @promise GetVideoUrlPromise
     * @fulfill {number} The vimeo.com url for the video.
     * @reject {PrivacyError} The url isn’t available because of the video’s privacy setting.
     */

    /**
     * Get the vimeo.com url for the video.
     *
     * @return {GetVideoUrlPromise}
     */

  }, {
    key: "getVideoUrl",
    value: function getVideoUrl() {
      return this.get('videoUrl');
    }
    /**
     * A promise to get the volume level of the player.
     *
     * @promise GetVolumePromise
     * @fulfill {number} The volume level of the player on a scale from 0 to 1.
     */

    /**
     * Get the current volume level of the player on a scale from `0` to `1`.
     *
     * Most mobile devices do not support an independent volume from the
     * system volume. In those cases, this method will always return `1`.
     *
     * @return {GetVolumePromise}
     */

  }, {
    key: "getVolume",
    value: function getVolume() {
      return this.get('volume');
    }
    /**
     * A promise to set the volume level of the player.
     *
     * @promise SetVolumePromise
     * @fulfill {number} The volume was set.
     * @reject {RangeError} The volume was less than 0 or greater than 1.
     */

    /**
     * Set the volume of the player on a scale from `0` to `1`. When set
     * via the API, the volume level will not be synchronized to other
     * players or stored as the viewer’s preference.
     *
     * Most mobile devices do not support setting the volume. An error will
     * *not* be triggered in that situation.
     *
     * @param {number} volume
     * @return {SetVolumePromise}
     */

  }, {
    key: "setVolume",
    value: function setVolume(volume) {
      return this.set('volume', volume);
    }
  }]);

  return Player;
}(); // Setup embed only if this is not a node environment


if (!isNode) {
  screenfull = initializeScreenfull();
  initializeEmbeds();
  resizeEmbeds();
}

/* harmony default export */ __webpack_exports__["default"] = (Player);


/***/ }),

/***/ "../../Shared-International/ts/api/carousel/slide/adapters/fade-slide-carousel.ts":
/*!****************************************************************************************!*\
  !*** ../../Shared-International/ts/api/carousel/slide/adapters/fade-slide-carousel.ts ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ FadeSlideCarouselAdapter; }
/* harmony export */ });
/* harmony import */ var Shared_ts_api_carousel_slide_adapters_slide_carousel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Shared/ts/api/carousel/slide/adapters/slide-carousel */ "../../Shared-International/ts/api/carousel/slide/adapters/slide-carousel.ts");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var FadeSlideCarouselAdapter = /*#__PURE__*/function (_SlideCarouselAdapter) {
  _inheritsLoose(FadeSlideCarouselAdapter, _SlideCarouselAdapter);

  /**
   * An adapter Api that implements the IFadeCarousel contract while communicating with the Slide Js Api
   * @param container Element
   */
  function FadeSlideCarouselAdapter(container) {
    return _SlideCarouselAdapter.call(this, container) || this;
  }
  /**
   * Disables the Carousel's auto-scroll rotation behavior and enables shim mode
   */


  var _proto = FadeSlideCarouselAdapter.prototype;

  _proto.initialize = function initialize() {
    this.api.setShim(true);
    this.api.handleRotation(false);
  };

  return FadeSlideCarouselAdapter;
}(Shared_ts_api_carousel_slide_adapters_slide_carousel__WEBPACK_IMPORTED_MODULE_0__.default);



/***/ }),

/***/ "../../Shared-International/ts/api/carousel/slide/adapters/responsive-slide-carousel.ts":
/*!**********************************************************************************************!*\
  !*** ../../Shared-International/ts/api/carousel/slide/adapters/responsive-slide-carousel.ts ***!
  \**********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ResponsiveSlideCarouselAdapter; }
/* harmony export */ });
/* harmony import */ var _slide_carousel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slide-carousel */ "../../Shared-International/ts/api/carousel/slide/adapters/slide-carousel.ts");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var ResponsiveSlideCarouselAdapter = /*#__PURE__*/function (_SlideCarouselAdapter) {
  _inheritsLoose(ResponsiveSlideCarouselAdapter, _SlideCarouselAdapter);

  /**
   * An adapter Api that implements the IResponsiveCarousel contract while communicating with the Slide Js Api
   * @param container Element
   */
  function ResponsiveSlideCarouselAdapter(container) {
    var _this;

    _this = _SlideCarouselAdapter.call(this, container) || this;
    _this.stepIndex = 0;
    _this.steps = 1;
    return _this;
  }

  return ResponsiveSlideCarouselAdapter;
}(_slide_carousel__WEBPACK_IMPORTED_MODULE_0__.default);



/***/ }),

/***/ "../../Shared-International/ts/api/carousel/slide/adapters/slide-carousel.ts":
/*!***********************************************************************************!*\
  !*** ../../Shared-International/ts/api/carousel/slide/adapters/slide-carousel.ts ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ SlideCarouselAdapter; }
/* harmony export */ });
/* harmony import */ var shared_ts_api_carousel_slide_slide__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! shared/ts/api/carousel/slide/slide */ "../../Shared-International/ts/api/carousel/slide/slide.ts");
/* harmony import */ var shared_ts_utils_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! shared/ts/utils/html */ "../../Shared-International/ts/utils/html.ts");



var SlideCarouselAdapter = /*#__PURE__*/function () {
  /**
   * An adapter Api that implements the ICarousel contract while communicating with the Slide Js Api
   * @param container Element
   */
  function SlideCarouselAdapter(container) {
    this.api = void 0;
    this.container = void 0;
    this.parent = void 0;
    this.children = void 0;
    this.container = container;
    this.api = this.create(container);
    this.parent = this.api.parent;
    this.children = this.api.children;
  }

  var _proto = SlideCarouselAdapter.prototype;

  _proto.create = function create(element) {
    var result;

    if ((0,shared_ts_utils_html__WEBPACK_IMPORTED_MODULE_1__.elementExists)(element)) {
      var id = element.querySelector('[id][class*="slide__into"]');

      if ((0,shared_ts_utils_html__WEBPACK_IMPORTED_MODULE_1__.elementExists)(id)) {
        result = shared_ts_api_carousel_slide_slide__WEBPACK_IMPORTED_MODULE_0__.default.into(id, {
          root: element
        }, function (api) {
          api.root.classList.add("slide--is-ready");
          return api;
        });
      }
    }

    return result;
  };

  _proto.isAuto = function isAuto() {
    return this.api.isAuto();
  };

  _proto.setAuto = function setAuto(status) {
    this.api.setAuto(status);
  };

  _proto.play = function play(persistCurrentIndex) {
    this.api.play(persistCurrentIndex);
  };

  _proto.pause = function pause() {
    this.api.pause();
  };

  _proto.prev = function prev() {
    this.api.prev();
  };

  _proto.next = function next() {
    this.api.next();
  };

  _proto.goto = function goto(index) {
    this.api.goto(index);
  };

  _proto.watch = function watch(task) {
    this.api.watch(task);
  };

  _proto.nextIndex = function nextIndex() {
    return this.api.nextIndex();
  };

  _proto.currentIndex = function currentIndex() {
    return this.api.currentIndex();
  };

  _proto.prevIndex = function prevIndex() {
    return this.api.prevIndex();
  };

  _proto.countChildren = function countChildren() {
    return this.api.countChildren();
  };

  _proto.getDelay = function getDelay() {
    return this.api.getDelay();
  };

  _proto.setDelay = function setDelay(delay) {
    return this.api.setDelay(delay);
  };

  _proto.getIndex = function getIndex(index) {
    return this.api.getIndex(index);
  };

  _proto.setIndex = function setIndex(index) {
    this.api.setIndex(index);
  };

  return SlideCarouselAdapter;
}();



/***/ }),

/***/ "../../Shared-International/ts/api/carousel/slide/adapters/vimeo-slide-carousel.ts":
/*!*****************************************************************************************!*\
  !*** ../../Shared-International/ts/api/carousel/slide/adapters/vimeo-slide-carousel.ts ***!
  \*****************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ VimeoSlideCarouselAdapter; }
/* harmony export */ });
/* harmony import */ var _slide_carousel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slide-carousel */ "../../Shared-International/ts/api/carousel/slide/adapters/slide-carousel.ts");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var VimeoSlideCarouselAdapter = /*#__PURE__*/function (_SlideCarouselAdapter) {
  _inheritsLoose(VimeoSlideCarouselAdapter, _SlideCarouselAdapter);

  /**
   * An adapter Api that implements the IVimeoCarousel contract while communicating with the Slide Js Api
   * @param container Element
   */
  function VimeoSlideCarouselAdapter(container) {
    return _SlideCarouselAdapter.call(this, container) || this;
  }

  return VimeoSlideCarouselAdapter;
}(_slide_carousel__WEBPACK_IMPORTED_MODULE_0__.default);



/***/ }),

/***/ "../../Shared-International/ts/api/carousel/slide/slide.ts":
/*!*****************************************************************!*\
  !*** ../../Shared-International/ts/api/carousel/slide/slide.ts ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Slide */
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "../../node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "../../node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "../../node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "../../node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_3__);





var generate = function generate(properties, o) {
  return Object.defineProperties(o || {}, properties);
};

var toArray = function toArray(collection) {
  if (collection !== null && typeof collection !== "undefined") {
    var store = [];
    var ar = store.slice.call(collection);
    return ar;
  }
};

var slide = generate({
  defaults: {
    value: generate({
      delay: {
        value: 3000
      },
      noScroll: {
        value: "slide__into--no-scroll"
      },
      error: {
        value: "The passed error code could not be found."
      }
    })
  },
  docs: {
    value: generate({
      error: {
        value: "https://github.com/jamiedraws/Slide/wiki/Slide.js#api-errors"
      }
    })
  },
  errors: {
    value: generate({
      "ERR-E": {
        value: "The passed 'element' must be an element."
      },
      "ERR-P": {
        value: "The passed 'element' could not be found."
      },
      "ERR-N": {
        value: "The passed 'element' is not a node element."
      },
      "ERR-X": {
        value: "The passed 'index' is not a number."
      },
      "ERR-M": {
        value: "The passed error 'code' or 'message' is not a string."
      },
      "ERR-C": {
        value: "The passed error 'code' is not a string."
      }
    })
  },
  team: {
    value: []
  },
  request: {
    value: function value(id) {
      return this.team[id];
    }
  },
  observer: {
    value: function value(parent, children, cb) {
      if (window.hasOwnProperty("IntersectionObserver")) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.intersectionRatio > 0 && entry.isIntersecting) {
              var items = toArray(children);
              var index = items.indexOf(entry.target);
              cb(index);
            }
          });
        }, {
          root: parent,
          rootMargin: "0px",
          threshold: 0.9
        });
        return function (children) {
          var items = toArray(children);
          items.forEach(function (item) {
            io.observe(item);
          });
        };
      } else {
        return function () {
          var noScroll = slide.defaults.noScroll;
          this.shim = true;
          this.parent.classList.add(noScroll);
        };
      }
    }
  },
  manager: {
    value: generate({
      config: {
        value: function value(options) {
          var self = this;

          if (typeof options === "object") {
            Object.keys(options).forEach(function (option) {
              Object.defineProperty(self, option, {
                enumerable: true,
                value: options[option]
              });
            });
          }
        }
      },
      create: {
        value: function value(api, id, parent, config) {
          var self = Object.create(api);
          Object.defineProperties(self, {
            name: {
              set: function set(parent) {
                this.parent = parent;
              },
              get: function get() {
                return this.parent.id;
              }
            },
            id: {
              value: id
            }
          });
          self.name = parent;
          this.config.call(self, config);
          return self;
        }
      },
      assign: {
        value: function value() {
          var self = Object.create(this);
          self.index = 0;
          self.shim = false;
          self.auto = false;
          self.handleRotation = true;
          self.timer = 0;
          self.delay = slide.defaults.delay;
          self.scrollIntoViewOptions = {
            block: "nearest",
            inline: "start"
          };
          return self;
        }
      },
      observer: {
        value: function value(parent, children) {
          var self = this;
          return slide.observer(parent, children, function (index) {
            self.setIndex(index);
            self.setCallback();
          });
        }
      },
      getIndex: {
        value: function value(index) {
          var result = this.index;
          var children = this.children.length;

          if (typeof index === "number") {
            result = index;
          }

          if (result === children) {
            result = 0;
          } else if (result < 0) {
            result = children - 1;
          }

          return result;
        }
      },
      setIndex: {
        value: function value(index) {
          this.index = this.getIndex(index);
        }
      },
      setRotation: {
        value: function value() {
          var item = this.children[this.index];
          item.scrollIntoView(this.scrollIntoViewOptions);
        }
      },
      isValidNumber: {
        value: function value(number) {
          return typeof number === "number" && !isNaN(number);
        }
      },
      setDelay: {
        value: function value(time) {
          var parseTime = parseInt(time);
          var illegal = !this.isValidNumber(parseTime) || parseTime < slide.defaults.delay;

          if (illegal) {
            parseTime = this.delay;
          }

          this.delay = parseTime;
        }
      },
      setCallback: {
        value: function value(cb) {
          if (typeof this.handleCallback === "function") {
            this.handleCallback(this.index, this.getIndex(this.index - 1), this.getIndex(this.index + 1));
          }
        }
      },
      setTimer: {
        value: function value(cb) {
          if (this.auto) {
            this.timer = setTimeout(cb, this.delay);
          } else {
            clearTimeout(this.timer);
          }
        }
      },
      routeCallback: {
        value: function value(cb) {
          if (this.shim) {
            this.setCallback(cb);
          }

          cb();
        }
      },
      setTask: {
        value: function value(index) {
          var self = this;
          self.setDelay();
          self.setIndex(index);

          if (this.handleRotation) {
            self.setRotation();
          }

          self.routeCallback(function () {
            self.setTimer(function () {
              self.setTask(self.index + 1);
            });
          });
        }
      }
    })
  },
  api: {
    value: generate({
      parent: {
        set: function set(parent) {
          this.validateNodeElement(parent);
          var worker = slide.request(this.id);
          worker.id = this.id;
          worker.parent = parent;
          worker.observe = worker.observer(worker.parent, parent.children);
          this.children = parent.children;
        },
        get: function get() {
          var worker = slide.request(this.id);
          return worker.parent;
        }
      },
      validateNodeElement: {
        value: function value(element) {
          if (typeof element !== "object") {
            this.getError("ERR-E");
          }

          if (element === null) {
            this.getError("ERR-P");
          }

          if (element.nodeType !== 1) {
            this.getError("ERR-N");
          }

          return true;
        }
      },
      toArray: {
        value: toArray
      },
      children: {
        set: function set() {
          var worker = slide.request(this.id);
          worker.children = worker.parent.children;
          worker.observe(worker.children);
        },
        get: function get() {
          var worker = slide.request(this.id);
          return worker.children;
        }
      },
      isAuto: {
        value: function value() {
          var worker = slide.request(this.id);
          return worker.auto;
        }
      },
      setAuto: {
        value: function value(status) {
          var worker = slide.request(this.id);

          if (typeof status === "boolean") {
            worker.auto = status;
          }
        }
      },
      setScrollIntoView: {
        value: function value(options) {
          var worker = slide.request(this.id);

          if (typeof options === "object" || typeof options === "boolean") {
            worker.scrollIntoViewOptions = options;
          }
        }
      },
      watch: {
        value: function value(task) {
          var worker = slide.request(this.id);
          worker.handleCallback = task.bind(this);

          if (!("IntersectionObserver" in window)) {
            worker.setCallback();
          }
        }
      },
      countChildren: {
        value: function value() {
          return this.children.length;
        }
      },
      getDelay: {
        value: function value() {
          var worker = slide.request(this.id);
          return worker.delay;
        }
      },
      setDelay: {
        value: function value(delay) {
          var worker = slide.request(this.id);
          worker.setDelay(delay);
        }
      },
      setError: {
        value: function value(code, message) {
          if (typeof code === "string" && typeof message === "string") {
            Object.defineProperty(slide.errors, code, {
              value: message
            });
          } else {
            this.getError("ERR-M");
          }
        }
      },
      getError: {
        value: function value(code) {
          if (typeof code !== "string") {
            code = "ERR-C";
          }

          var error = slide.errors[code] || slide.defaults.error;
          var help = slide.docs.error;
          var message = code + ": " + error + " / " + help;
          throw message;
        }
      },
      hasError: {
        value: function value(code) {
          return slide.errors.hasOwnProperty(code);
        }
      },
      config: {
        value: function value(options) {
          var worker = slide.request(this.id);
          worker.config.call(this, options);
        }
      },
      setShim: {
        enumerable: true,
        value: function value(status) {
          var worker = slide.request(this.id);

          if (typeof status === "boolean") {
            worker.shim = status;
          }
        }
      },
      play: {
        enumerable: true,
        value: function value(persistCurrentIndex) {
          var worker = slide.request(this.id);
          var index = typeof persistCurrentIndex === "boolean" && persistCurrentIndex ? worker.index : worker.index + 1;
          this.pause();
          worker.auto = true;
          worker.setTask(index);
        }
      },
      pause: {
        enumerable: true,
        value: function value() {
          var worker = slide.request(this.id);
          worker.auto = false;
          clearTimeout(worker.timer);
        }
      },
      prev: {
        enumerable: true,
        value: function value() {
          var worker = slide.request(this.id);
          this.pause();
          worker.setTask(worker.index - 1);
        }
      },
      next: {
        enumerable: true,
        value: function value() {
          var worker = slide.request(this.id);
          this.pause();
          worker.setTask(worker.index + 1);
        }
      },
      prevIndex: {
        value: function value() {
          var worker = slide.request(this.id);
          return worker.getIndex(worker.index - 1);
        }
      },
      nextIndex: {
        value: function value() {
          var worker = slide.request(this.id);
          return worker.getIndex(worker.index + 1);
        }
      },
      currentIndex: {
        value: function value() {
          var worker = slide.request(this.id);
          return worker.index;
        }
      },
      getIndex: {
        value: function value(index) {
          if (typeof index !== "number") {
            this.getError("ERR-X");
          }

          var worker = slide.request(this.id);
          return worker.getIndex(index);
        }
      },
      setIndex: {
        value: function value(index) {
          if (typeof index !== "number") {
            this.getError("ERR-X");
          }

          var worker = slide.request(this.id);
          return worker.setIndex(index);
        }
      },
      handleRotation: {
        value: function value(status) {
          var worker = slide.request(this.id);

          if (typeof status === "boolean") {
            worker.handleRotation = status;
          }
        }
      },
      goto: {
        enumerable: true,
        value: function value(index) {
          if (typeof index !== "number") {
            this.getError("ERR-X");
          }

          var worker = slide.request(this.id);
          this.pause();
          worker.setIndex(index);
          worker.setTask();
        }
      }
    })
  },
  interface: {
    value: generate({
      into: {
        value: function value(parent, init, app) {
          var worker = slide.manager.assign();
          var task = app;
          var options = {};
          slide.team.push(worker);

          if (typeof init === "function") {
            task = init;
          }

          if (typeof init === "object") {
            options = init;
          } else if (typeof app === "object") {
            options = app;
          }

          var ui = slide.manager.create(slide.api, slide.team.length - 1, parent, options);
          return task.call(ui, ui);
        }
      },
      proto: {
        value: function value(parameters) {
          if (typeof parameters === "object") {
            Object.create(slide.api, parameters);
            Object.keys(parameters).forEach(function (parameter) {
              Object.defineProperty(slide.api, parameter, {
                writable: false,
                configurable: false,
                enumerable: true,
                value: parameters[parameter]
              });
            });
          }
        }
      }
    })
  }
});
var Slide = slide.interface;
/* harmony default export */ __webpack_exports__["default"] = (Slide);

/***/ }),

/***/ "../../Shared-International/ts/components/carousel.ts":
/*!************************************************************!*\
  !*** ../../Shared-International/ts/components/carousel.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Carousel; }
/* harmony export */ });
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "../../node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ "../../node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "../../node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "../../node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "../../node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "../../node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "../../node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "../../node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_weak_map_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.weak-map.js */ "../../node_modules/core-js/modules/es.weak-map.js");
/* harmony import */ var core_js_modules_es_weak_map_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_weak_map_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var shared_ts_observers_intersection__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! shared/ts/observers/intersection */ "../../Shared-International/ts/observers/intersection.ts");
/* harmony import */ var _utils_html__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../utils/html */ "../../Shared-International/ts/utils/html.ts");













var Carousel = /*#__PURE__*/function () {
  /**
   * Represents the CSS class name for the selected thumbnail button
   */

  /**
   * Represents the relationship between the carousel's container element and it's connected Carousel interface
   */

  /**
   * Represents the relationship between the carousel's container element and it's connected event interface
   */

  /**
   * Represents the relationship between the carousel's container element and it's connected control interface
   */

  /**
   * Represents the element containing the carousel along with other user-interface components
   */

  /**
   * Takes a carousel interface and integrates it with basic play controls
   * @param context ICarousel
   */
  function Carousel(context) {
    this.container = void 0;
    this.container = context.container;
    Carousel.baseInitialize(context, this);
    Carousel.observeContainer(context, this);
  }
  /**
   * Takes the ICarousel interface and uses the container element as a key to establish a new context to the interface. Next, a new watch callback is established that will notify observers on each rotation.
   * @param context ICarousel
   */


  Carousel.baseInitialize = function baseInitialize(context, carousel) {
    Carousel.context.set(context.container, context);
    Carousel.events.set(context.container, []);
    context.watch(function () {
      Carousel.push(context, "rotation");
    });
  }
  /**
   * Filters through all events matching a specified name and invokes the handler callback function
   * @param context ICarousel
   * @param name string
   */
  ;

  Carousel.push = function push(context, name) {
    var events = Carousel.events.get(context.container);
    events.filter(function (event) {
      return event.name === name;
    }).forEach(function (event) {
      return event.handler(context.currentIndex(), context.prevIndex(), context.nextIndex());
    });
  }
  /**
   * Adds an event to be captured where a handler callback function can be invoked
   * @param name string
   * @param handler function
   */
  ;

  var _proto = Carousel.prototype;

  _proto.on = function on(name, handler) {
    var events = Carousel.events.get(this.container);
    events.push({
      name: name,
      handler: handler
    });
  }
  /**
   * Removes an event from being captured
   * @param name string
   * @param handler function
   */
  ;

  _proto.off = function off(name, handler) {
    var events = Carousel.events.get(this.container);
    var result = events.find(function (event) {
      return event.name === name && event.handler === handler;
    });
    var index = events.indexOf(result);
    events.splice(index, 1);
  }
  /**
   * Takes the carousel's container element as a key to look up it's connected carousel interface and returns the interface.
   * @param container Element
   * @returns ICarousel
   */
  ;

  Carousel.getContext = function getContext(container) {
    return this.context.get(container);
  }
  /**
   * Takes the ICarousel interface and reads in any available key-value pairs from the "data-carousel-config" HTML attribute into an attribute processor.
   * @param context ICarousel
   */
  ;

  Carousel.updateAttributes = function updateAttributes(context, carousel) {
    var config = context.container.getAttribute("data-carousel-config");

    if (config) {
      try {
        carousel.processAttributes(JSON.parse(config), context);
      } catch (error) {
        console.warn(error);
      }
    }
  }
  /**
   * Takes the ICarouselConfig interface and converts key-value pairs into a string representation of the carousel configuration. This configuration replaces the previous configuration on data-carousel-config attribute.
   * @param config ICarouselConfig
   */
  ;

  _proto.setAttributes = function setAttributes(config) {
    var container = this.container;

    try {
      container.dataset.carouselConfig = JSON.stringify(config);
    } catch (error) {
      console.warn(error);
    }
  }
  /**
   * Takes an ICarouselConfig interface along with an ICarousel interface and processes specific keys to operate using its values
   * @param config ICarouselConfig
   * @param context ICarousel
   */
  ;

  _proto.processAttributes = function processAttributes(config, context) {
    if (config.auto) {
      context.setAuto(config.auto);
    }

    if (config.delay) {
      context.setDelay(config.delay);
    }
  }
  /**
   * Takes the ICarousel interface, creates a new mutation observer on the container element and observes for attribute changes which will call the updateAttributes method
   * @param context ICarousel
   */
  ;

  Carousel.observeContainer = function observeContainer(context, carousel) {
    this.updateAttributes(context, carousel);
    var observer = new MutationObserver(function (mutationRecords) {
      Carousel.updateAttributes(context, carousel);
    });
    observer.observe(context.container, {
      attributes: true
    });
  }
  /**
   * Plays the carousel continuously.
   */
  ;

  _proto.play = function play(persistCurrentIndex) {
    var context = Carousel.getContext(this.container);
    context.play(persistCurrentIndex);
  }
  /**
   * Pauses the carousel
   */
  ;

  _proto.pause = function pause() {
    var context = Carousel.getContext(this.container);
    context.pause();
  }
  /**
   * Advances the carousel to the next slide
   */
  ;

  _proto.next = function next() {
    var context = Carousel.getContext(this.container);
    context.next();
  }
  /**
   * Advances the carousel to the previous slide
   */
  ;

  _proto.prev = function prev() {
    var context = Carousel.getContext(this.container);
    context.prev();
  }
  /**
   * Enables the carousel to play continuously when the carousel's container element intersects the viewport; otherwise, the carousel will automatically pause.
   */
  ;

  _proto.autoplay = function autoplay() {
    var self = this;
    var context = Carousel.getContext(this.container);
    var id = context.parent.id;
    var rangeControl = false;
    (0,shared_ts_observers_intersection__WEBPACK_IMPORTED_MODULE_10__.observer)("#" + id, {
      inRange: function inRange(record) {
        if (!rangeControl) {
          rangeControl = true;
          self.play(true);
        }
      },
      outRange: function outRange(record) {
        if (rangeControl) {
          rangeControl = false;
          self.pause();
        }
      },
      unObserve: false,
      options: {
        threshold: [0.75]
      }
    });
  }
  /**
   * Enables the carousel to activate the previous and next methods through user-interface components
   */
  ;

  _proto.enablePrevNextControls = function enablePrevNextControls() {
    var context = Carousel.getContext(this.container);
    var prevButton = context.container.querySelector(".slide__prev");
    var nextButton = context.container.querySelector(".slide__next");
    prevButton.addEventListener("click", this.prev.bind(context));
    nextButton.addEventListener("click", this.next.bind(context));
  }
  /**
   * Enables the carousel to activate the play and pause methods through user-interface components
   */
  ;

  _proto.enablePlayPauseControls = function enablePlayPauseControls() {
    var context = Carousel.getContext(this.container);
    var playButton = context.container.querySelector(".slide__play");
    var pauseButton = context.container.querySelector(".slide__pause");
    playButton.addEventListener("click", this.play.bind(context));
    pauseButton.addEventListener("click", this.pause.bind(context));
  }
  /**
   * Uses the array of thumbnail buttons to locate the previous button with the thumbnail CSS class name and removes it. Then, assigns the CSS class name to the current thumbnail button.
   * @param thumbnailButton Element
   * @param thumbnailButtons Element[]
   */
  ;

  Carousel.updateThumbnailNavigationMarker = function updateThumbnailNavigationMarker(thumbnailButton, thumbnailButtons) {
    var previousButton = thumbnailButtons.find(function (thumbnailButton) {
      return thumbnailButton.classList.contains(Carousel.currentThumbnailCSSClassName);
    });

    if (previousButton) {
      previousButton.classList.remove(Carousel.currentThumbnailCSSClassName);
    }

    if (thumbnailButton) {
      thumbnailButton.classList.add(Carousel.currentThumbnailCSSClassName);
    }
  }
  /**
   * Takes an thumbnailButton element and extracts the index value from it and navigates the carousel to the specified index
   * @param thumbnailButton Element
   * @param context ICarousel
   */
  ;

  Carousel.updateThumbnailNavigation = function updateThumbnailNavigation(thumbnailButton, context) {
    var index = parseInt(thumbnailButton.getAttribute("data-slide-index"));
    context.goto(index);
  }
  /**
   * Uses an index number to target a specific thumbnailButton element and then updates the thumbnail navigation marker with that element
   * @param index number
   * @param context ICarousel
   */
  ;

  Carousel.updateThumbnailNavigationMarkerByIndex = function updateThumbnailNavigationMarkerByIndex(index, context) {
    var hasThumbnailButtons = Carousel.thumbnails.has(context.container);

    if (hasThumbnailButtons) {
      var thumbnailButtons = Carousel.thumbnails.get(context.container);
      var currentButton = thumbnailButtons.find(function (thumbnailButton) {
        return parseInt(thumbnailButton.getAttribute("data-slide-index")) === index;
      });
      Carousel.updateThumbnailNavigationMarker(currentButton, thumbnailButtons);
    }
  }
  /**
   * Enables the carousel to activate thumbnail controls through user-interface components
   */
  ;

  _proto.enableThumbnailControls = function enableThumbnailControls() {
    var thumbnailButtons = (0,_utils_html__WEBPACK_IMPORTED_MODULE_11__.enumerateElements)(this.container.querySelectorAll(".slide__thumbnail"));
    Carousel.thumbnails.set(this.container, thumbnailButtons);
    thumbnailButtons.forEach(function (thumbnailButton) {
      thumbnailButton.addEventListener("click", function (event) {
        var currentButton = event.target;
        Carousel.updateThumbnailNavigation(currentButton, context);
        Carousel.updateThumbnailNavigationMarker(currentButton, thumbnailButtons);
      });
    });
    var context = Carousel.getContext(this.container);
    this.on("rotation", function (currentIndex) {
      return Carousel.updateThumbnailNavigationMarkerByIndex(currentIndex, context);
    });
  };

  return Carousel;
}();

Carousel.currentThumbnailCSSClassName = "slide__thumbnail--is-selected";
Carousel.context = new WeakMap();
Carousel.events = new WeakMap();
Carousel.controls = new WeakMap();
Carousel.thumbnails = new WeakMap();


/***/ }),

/***/ "../../Shared-International/ts/components/fade-carousel.ts":
/*!*****************************************************************!*\
  !*** ../../Shared-International/ts/components/fade-carousel.ts ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ FadeCarousel; }
/* harmony export */ });
/* harmony import */ var shared_ts_components_carousel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! shared/ts/components/carousel */ "../../Shared-International/ts/components/carousel.ts");
/* harmony import */ var shared_ts_utils_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! shared/ts/utils/html */ "../../Shared-International/ts/utils/html.ts");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var FadeCarousel = /*#__PURE__*/function (_Carousel) {
  _inheritsLoose(FadeCarousel, _Carousel);

  /**
   * Represents the current slide CSS class name
   */

  /**
   * Extends the Carousel's base functionality by visually animating it as a fader.
   * @param elements HTMLList
   */
  function FadeCarousel(context) {
    var _this;

    _this = _Carousel.call(this, context) || this;
    FadeCarousel.initialize(context);
    return _this;
  }
  /**
   * Takes in the FadeCarousel instance and iterates through each element. For each element, the first slide is set as the current slide and a new watch callback function is estabilished.
   * @param context IFadeCarousel
   */


  FadeCarousel.initialize = function initialize(context) {
    context.initialize();
    FadeCarousel.createWatch(context);
    FadeCarousel.setSlideToCurrent(context.children.item(0));
  }
  /**
   * Takes the Fade Carousel interface context and establishes a new watch callback function that will change on each rotation
   * @param context IFadeCarousel
   */
  ;

  FadeCarousel.createWatch = function createWatch(context) {
    var counter = 1;
    var children = context.countChildren();
    context.watch(function (currentIndex) {
      FadeCarousel.push(context, "rotation");

      if (counter > children) {
        FadeCarousel.updateCurrentSlide(context.parent, context.children.item(currentIndex));
      }

      if (counter === children) {
        context.setIndex(0);
        FadeCarousel.updateThumbnailNavigationMarkerByIndex(0, context);
      }

      if (counter <= children) {
        counter++;
      }
    });
  }
  /**
   * Takes the parent and attempts to locate the previous slide and remove the current slide CSS class from it and adds the current slide CSS class to the current slide element.
   * @param parent Element
   * @param slide Element
   */
  ;

  FadeCarousel.updateCurrentSlide = function updateCurrentSlide(parent, slide) {
    var previousSlide = parent.querySelector("." + this.currentSlideCSSClassName);

    if ((0,shared_ts_utils_html__WEBPACK_IMPORTED_MODULE_1__.elementExists)(previousSlide)) {
      previousSlide.classList.remove(this.currentSlideCSSClassName);
    }

    this.setSlideToCurrent(slide);
  }
  /**
   * Assigns the current slide CSS class name to the target slide element
   * @param slides Element
   */
  ;

  FadeCarousel.setSlideToCurrent = function setSlideToCurrent(slide) {
    slide.classList.add(this.currentSlideCSSClassName);
  };

  return FadeCarousel;
}(shared_ts_components_carousel__WEBPACK_IMPORTED_MODULE_0__.default);

FadeCarousel.currentSlideCSSClassName = "slide__item--current";


/***/ }),

/***/ "../../Shared-International/ts/components/responsive-carousel.ts":
/*!***********************************************************************!*\
  !*** ../../Shared-International/ts/components/responsive-carousel.ts ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ResponsiveCarousel; }
/* harmony export */ });
/* harmony import */ var _carousel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./carousel */ "../../Shared-International/ts/components/carousel.ts");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var ResponsiveCarousel = /*#__PURE__*/function (_Carousel) {
  _inheritsLoose(ResponsiveCarousel, _Carousel);

  /**
   * Extends base carousel's functionality by allowing carousel to advance by x-number of steps
   * @param context IResponsiveCarousel
   */
  function ResponsiveCarousel(context) {
    var _this;

    _this = _Carousel.call(this, context) || this;
    ResponsiveCarousel.initialize(context);
    return _this;
  }

  ResponsiveCarousel.initialize = function initialize(context) {
    context.watch(function (currentIndex) {
      ResponsiveCarousel.push(context, "rotation");

      if (context.steps === 1) {
        context.stepIndex = currentIndex;
      }
    });
  }
  /**
   * Takes an IResponsiveCarouselConfig interface and converts key-value pairs into a string representation of the carousel configuration. This configuration replaces the previous configuration on data-carousel-config attribute.
   * @param config IResponsiveCarouselConfig
   */
  ;

  var _proto = ResponsiveCarousel.prototype;

  _proto.setAttributes = function setAttributes(config) {
    var container = this.container;

    try {
      container.dataset.carouselConfig = JSON.stringify(config);
    } catch (error) {
      console.warn(error);
    }
  }
  /**
   * Takes an IResponsiveCarouselConfig interface along with an ICarousel interface and processes specific keys to operate using its values
   * @param config IResponsiveCarouselConfig
   * @param context ICarousel
   */
  ;

  _proto.processAttributes = function processAttributes(config, context) {
    if (config.steps) {
      context.steps = config.steps;
    }
  };

  _proto.play = function play() {
    var context = ResponsiveCarousel.getContext(this.container);
    context.play();
  };

  _proto.next = function next() {
    var context = ResponsiveCarousel.getContext(this.container);
    var sum = context.countChildren();
    context.stepIndex += context.steps;

    if (context.stepIndex >= sum) {
      context.stepIndex = 0;
    }

    context.goto(context.stepIndex);
  };

  _proto.prev = function prev() {
    var context = ResponsiveCarousel.getContext(this.container);
    var sum = context.countChildren();
    context.stepIndex -= context.steps;

    if (context.stepIndex < 0) {
      context.stepIndex = sum - context.steps;
    }

    context.goto(context.stepIndex);
  };

  return ResponsiveCarousel;
}(_carousel__WEBPACK_IMPORTED_MODULE_0__.default);



/***/ }),

/***/ "../../Shared-International/ts/components/vimeo-carousel.ts":
/*!******************************************************************!*\
  !*** ../../Shared-International/ts/components/vimeo-carousel.ts ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ VimeoCarousel; }
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "../../node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "../../node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "../../node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_weak_map_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.weak-map.js */ "../../node_modules/core-js/modules/es.weak-map.js");
/* harmony import */ var core_js_modules_es_weak_map_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_weak_map_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.promise.js */ "../../node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "../../node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_string_match_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.string.match.js */ "../../node_modules/core-js/modules/es.string.match.js");
/* harmony import */ var core_js_modules_es_string_match_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_match_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var shared_ts_utils_vimeo_manager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! shared/ts/utils/vimeo-manager */ "../../Shared-International/ts/utils/vimeo-manager.ts");
/* harmony import */ var shared_ts_components_carousel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! shared/ts/components/carousel */ "../../Shared-International/ts/components/carousel.ts");
/* harmony import */ var shared_ts_utils_html__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! shared/ts/utils/html */ "../../Shared-International/ts/utils/html.ts");









function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var VimeoCarousel = /*#__PURE__*/function (_Carousel) {
  _inheritsLoose(VimeoCarousel, _Carousel);

  /**
   * Represents the VimeoManager instance
   */

  /**
   * Represents the relationship between the IVimeoCarousel interface and it's connected IVimeoCarouselRepository interface
   */

  /**
   * Represents the endpoint URL for the Vimeo Player
   */

  /**
   * Extends the Carousel's base functionality by allowing Vimeo background video to automatically advance to the next slide once the video finishes.
   * @param elements HTMLList
   */
  function VimeoCarousel(context) {
    var _this;

    _this = _Carousel.call(this, context) || this;
    VimeoCarousel.initialize(context);
    return _this;
  }
  /**
   * Takes the IVimeoCarousel interface and creates a connection to a new Vimeo Repository interface and then establishes a watch operation for each rotation
   * @param context VimeoCarousel
   */


  VimeoCarousel.initialize = function initialize(context) {
    VimeoCarousel.connectCarouselApiToVimeoRepository(context);
    VimeoCarousel.createWatch(context);
  }
  /**
   * Takes the IVimeoCarousel interface and sets it as a key to create a new Vimeo Repository interface
   * @param context IVimeoCarousel
   */
  ;

  VimeoCarousel.connectCarouselApiToVimeoRepository = function connectCarouselApiToVimeoRepository(context) {
    this.vimeoRepository.set(context, {
      isInitialized: false,
      isIframeProcessed: new WeakMap(),
      isAutoplay: false
    });
  }
  /**
   * Takes the IVimeoCarousel interface context and establishes a watch callback for each rotation. For each rotation, the previous and next slide's Vimeo iframe should pause while the current slide should determine if there is a Vimeo iframe element that can be interacted with.
   * @param context IVimeoCarousel
   */
  ;

  VimeoCarousel.createWatch = function createWatch(context) {
    var repo = VimeoCarousel.vimeoRepository.get(context);
    context.watch(function (currentIndex, previousIndex, nextIndex) {
      VimeoCarousel.push(context, "rotation");
      var previousSlide = context.children.item(previousIndex);
      VimeoCarousel.pauseVimeo(previousSlide).catch(function (error) {
        return console.info(error);
      });
      var currentSlide = context.children.item(currentIndex);
      VimeoCarousel.processCurrentVimeoIframe(currentSlide, context, repo).catch(function () {
        return VimeoCarousel.initializeCarouselVimeoApi(context, repo);
      });
      var nextSlide = context.children.item(nextIndex);
      VimeoCarousel.pauseVimeo(nextSlide).catch(function (error) {
        return console.info(error);
      });
    });
  }
  /**
   * If the Vimeo iframe has not been processed yet, initialize the Vimeo iframe and determine if the Vimeo Carousel is initialized. Otherwise, access the current Vimeo iframe and process playback events. The IVimeoCarousel interface will be returned through the Promise resolve state.
   * @param slide Element
   * @param context IVimeoCarousel
   * @param repo IVimeoCarouselRepository
   * @returns Promise<IVimeoCarousel>
   */
  ;

  VimeoCarousel.processCurrentVimeoIframe = function processCurrentVimeoIframe(slide, context, repo) {
    return new Promise(function (resolve, reject) {
      if (!repo.isIframeProcessed.has(slide)) {
        repo.isIframeProcessed.set(slide, true);
        VimeoCarousel.initializeVimeoIframe(slide, context, repo).then(function (context) {
          VimeoCarousel.manageAutoPlayEvent(slide, context, repo);

          if (!repo.isInitialized) {
            VimeoCarousel.initializeCarouselVimeoApi(context, repo);
            resolve(context);
          }
        }).catch(function (error) {
          VimeoCarousel.fallbackAutoPlayEvent(context);
          reject(error);
        });
      } else {
        VimeoCarousel.getVimeoIframeOrCreate(slide).then(function (iframe) {
          VimeoCarousel.setVimeoAutoplayStatus(iframe, context, repo);
          VimeoCarousel.manageAutoPlayEvent(slide, context, repo);
        }).catch(function (error) {
          return reject(error);
        });
      }
    });
  }
  /**
   * Enables the autoplay status and attempts to play the current Vimeo iframe if the Vimeo iframe is a background video.
   * @param slide Element
   * @param context IVimeoCarousel
   * @param repo IVimeoCarouselRepository
   */
  ;

  VimeoCarousel.manageAutoPlayEvent = function manageAutoPlayEvent(slide, context, repo) {
    if (repo.isAutoplay) {
      context.setAuto(true);
      VimeoCarousel.playVimeo(slide).catch(function (error) {
        return VimeoCarousel.fallbackAutoPlayEvent(context);
      });
    }
  }
  /**
   * Determines if the Slide auto play mode is enabled and invokes the play method while persisting the current index.
   * @param context IVimeoCarousel
   */
  ;

  VimeoCarousel.fallbackAutoPlayEvent = function fallbackAutoPlayEvent(context) {
    if (context.isAuto()) {
      context.play(true);
    }
  }
  /**
   * Fetches the Vimeo iframe element along with the Vimeo Player and determines if the Vimeo iframe contains a background video; then, it processes the Vimeo Player event listeners. If a Vimeo iframe element could not be found, attempt to determine if a Vimeo iframe element will be available through the placeholder element. The IVimeoCarousel interface object will be returned through the Promise resolve state. Through the Promise reject state, an error response will be logged if the Vimeo iframe could not be loaded or if there is no placeholder for a Vimeo iframe element.
   * @param slide Element
   * @param context IVimeoCarousel
   * @returns Promise<IVimeoCarousel>
   */
  ;

  VimeoCarousel.initializeVimeoIframe = function initializeVimeoIframe(slide, context, repo) {
    return new Promise(function (resolve, reject) {
      VimeoCarousel.getVimeoIframeOrCreate(slide).then(function (iframe) {
        VimeoCarousel.getVimeoPlayer(iframe).then(function (player) {
          VimeoCarousel.setVimeoAutoplayStatus(iframe, context, repo);
          VimeoCarousel.processVimeoPlayerEvent(player, context, repo);
        });
        resolve(context);

        iframe.onerror = function () {
          return reject({
            message: "Vimeo iframe initialization failure",
            slide: slide
          });
        };
      }).catch(function (error) {
        VimeoCarousel.processPlaceholder(slide, context, repo);
        reject(error);
      });
    });
  }
  /**
   * Creates a new Vimeo Player instance using the placeholder element [data-vimeo-id] attribute along with the element id. Afterwards, processes the Vimeo autoplay status and events.
   * @param slide Element
   * @param context IVimeoCarousel
   * @param repo IVimeoCarouselRepository
   */
  ;

  VimeoCarousel.processPlaceholder = function processPlaceholder(slide, context, repo) {
    var placeholder = slide.querySelector("[data-vimeo-id]");

    if ((0,shared_ts_utils_html__WEBPACK_IMPORTED_MODULE_10__.elementExists)(placeholder)) {
      var elementId = placeholder.id;
      var vimeoId = parseInt(placeholder.getAttribute("data-vimeo-id"));
      var player = VimeoCarousel.vimeoManager.createPlayerById(elementId, vimeoId);
      VimeoCarousel.setVimeoAutoplayStatus(placeholder, context, repo);
      VimeoCarousel.processVimeoPlayerEvent(player, context, repo);
    }
  }
  /**
   * Takes an element, either a placeholder element or a Vimeo iframe element, and determines if the Vimeo Player is a background video.
   * @param element Element
   * @param context IVimeoCarousel
   * @param repo IVimeoCarouselRepository
   */
  ;

  VimeoCarousel.setVimeoAutoplayStatus = function setVimeoAutoplayStatus(element, context, repo) {
    if (element.hasAttribute("src")) {
      var src = element.getAttribute("src");
      repo.isAutoplay = src.match("background=1") ? true : false;
      return;
    }

    if (element.hasAttribute("data-vimeo-background")) {
      var attr = element.getAttribute("data-vimeo-background");
      repo.isAutoplay = attr.match("true") ? true : false;
      return;
    }

    repo.isAutoplay = false;
  }
  /**
   * Takes the Vimeo Player and adds the "ended" event listener. When this event fires, access the next slide through the IVimeoCarousel interface object and attempt to restart the Vimeo iframe element. If a Vimeo iframe element is within the next slide and the Slide is in autoplay mode, advance the Slide by one; otherwise, if the Slide is in autoplay mode, enable autoplay.
   * @param player Player
   * @param context IVimeoCarousel
   * @param repo IVimeoCarouselRepository
   */
  ;

  VimeoCarousel.processVimeoPlayerEvent = function processVimeoPlayerEvent(player, context, repo) {
    player.on("play", function (data) {
      if (context.isAuto()) {
        context.pause();
        context.setAuto(true);
      }
    });
    player.on("ended", function (data) {
      var nextSlide = context.children.item(context.nextIndex());
      VimeoCarousel.restartVimeo(nextSlide).then(function () {
        if (context.isAuto()) {
          context.play();
        }
      }).catch(function () {
        if (context.isAuto()) {
          context.play();
        }
      });
    });
  }
  /**
   * Takes the IVimeoCarousel interface object along with it's connected repository. The repository's initialization status is set to true and the slide's root element receives the "slide--ready-for-vimeo" CSS class name.
   * @param context IVimeoCarousel
   * @param repo IVimeoCarouselRepository
   */
  ;

  VimeoCarousel.initializeCarouselVimeoApi = function initializeCarouselVimeoApi(context, repo) {
    repo.isInitialized = true;
    context.container.classList.add("slide--ready-for-vimeo");
  }
  /**
   * Takes a slide element and returns the Vimeo iframe element. Either the existing Vimeo iframe element will be returned or a new Vimeo iframe element will be created. The Vimeo iframe element will be returned through the Promise resolve state. Through the Promise reject state, an error response will be logged either when the Vimeo iframe element could not be created or when the placeholder doesn't contain the [data-vimeo-carousel-id] attribute.
   * @param slide Element
   * @returns Promise<HTMLIFrameElement>
   */
  ;

  VimeoCarousel.getVimeoIframeOrCreate = function getVimeoIframeOrCreate(slide) {
    return new Promise(function (resolve, reject) {
      VimeoCarousel.getVimeoIframe(slide).then(function (iframe) {
        return resolve(iframe);
      }).catch(function (error) {
        var placeholder = slide.querySelector("[data-vimeo-carousel-id]");

        if ((0,shared_ts_utils_html__WEBPACK_IMPORTED_MODULE_10__.elementExists)(placeholder)) {
          VimeoCarousel.createIframe(placeholder).then(function (iframe) {
            VimeoCarousel.setIframeByPlaceholder(placeholder, iframe);
            resolve(iframe);
          }).catch(function (error) {
            return reject("A Vimeo iframe could not be created. Reason: " + error);
          });
        } else {
          reject({
            message: "[data-vimeo-carousel-id] was not found within the current slide",
            slide: slide
          });
        }
      });
    });
  }
  /**
   * Takes a slide element and returns a Vimeo iframe element if the element exists.
   * @param slide Element
   * @returns Promise<HTMLIFrameElement>
   */
  ;

  VimeoCarousel.getVimeoIframe = function getVimeoIframe(slide) {
    return new Promise(function (resolve, reject) {
      var iframe = slide.querySelector(VimeoCarousel.vimeoPlayerIframeEndpoint);
      (0,shared_ts_utils_html__WEBPACK_IMPORTED_MODULE_10__.elementExists)(iframe) ? resolve(iframe) : reject({
        message: "Vimeo iframe element was not found within the current slide",
        slide: slide
      });
    });
  }
  /**
   * Takes a Vimeo iframe element and returns it's connected player either from the Vimeo Player WeakMap repository or by new creation. The Vimeo Player is returned through the Promise resolve state. Through the Promise reject state, an error response, indicating the Vimeo Player could not be created, will be returned.
   * @param iframe HTMLIFrameElement
   * @returns Promise<Player>
   */
  ;

  VimeoCarousel.getVimeoPlayer = function getVimeoPlayer(iframe) {
    return new Promise(function (resolve, reject) {
      var _VimeoCarousel$vimeoM;

      var player = (_VimeoCarousel$vimeoM = VimeoCarousel.vimeoManager.getPlayerByIframe(iframe)) != null ? _VimeoCarousel$vimeoM : VimeoCarousel.vimeoManager.createPlayerByIframe(iframe);

      if (player) {
        resolve(player);
      } else {
        reject("A Vimeo Player instance could not be created.");
      }
    });
  }
  /**
   * Takes a slide element and attempts to play a Vimeo video. If the Vimeo iframe is found, the video will restart before it plays. The Player will be returned through the Promise resolve state. Through the Promise reject state, the error response will be returned either when the Vimeo video could not be restarted or when the Vimeo video could not play.
   * @param slide
   * @returns Promise<Player>
   */
  ;

  VimeoCarousel.playVimeo = function playVimeo(slide) {
    return new Promise(function (resolve, reject) {
      VimeoCarousel.restartVimeo(slide).then(function (player) {
        player.play().then(function () {
          return resolve(player);
        }).catch(function (error) {
          return reject(error);
        });
      }).catch(function (error) {
        return reject(error);
      });
    });
  }
  /**
   * Takes a slide element and attempts to restart a Vimeo video. The Player will be returned through the Promise resolve state. Through the Promise reject state, an error response will be returned either when the Vimeo iframe element could not be returned, when the Vimeo Player could not be returned or when the Vimeo video could not be restarted.
   * @param slide Element
   * @returns Promise<Player>
   */
  ;

  VimeoCarousel.restartVimeo = function restartVimeo(slide) {
    return new Promise(function (resolve, reject) {
      VimeoCarousel.getVimeoIframeOrCreate(slide).then(function (iframe) {
        VimeoCarousel.getVimeoPlayer(iframe).then(function (player) {
          player.setCurrentTime(0).catch(function (error) {
            return reject(error);
          });
          resolve(player);
        }).catch(function (error) {
          return reject(error);
        });
      }).catch(function (error) {
        return reject(error);
      });
    });
  }
  /**
   * Takes a slide element and attempts to pause a Vimeo video. If the Vimeo iframe is found, the video will restart before it pauses. The Player will be returned through the Promise resolve state. Through the Promise reject state, an error response will be returned either when the Vimeo video could not be restarted or when the Vimeo video could not be paused.
   * @param slide HTMLElement
   * @returns Promise<Player>
   */
  ;

  VimeoCarousel.pauseVimeo = function pauseVimeo(slide) {
    var _this2 = this;

    return new Promise(function (resolve, reject) {
      _this2.restartVimeo(slide).then(function (player) {
        player.pause().catch(function (error) {
          return reject(error);
        });
        resolve(player);
      }).catch(function (error) {
        return reject(error);
      });
    });
  }
  /**
   * Create a method that takes a placeholder element with the [data-vimeo-carousel-id] attribute and creates a new Vimeo iframe element and Vimeo Player object using an Vimeo Id number extraction. The Vimeo iframe element is returned through the Promise resolve state. Through the Promise reject state, an error response is logged when the Vimeo iframe element could not be created.
   * @param element HTMLElement
   * @returns Promise<HTMLIFrameElement>
   */
  ;

  VimeoCarousel.createIframe = function createIframe(element) {
    return new Promise(function (resolve, reject) {
      var id = element.getAttribute("data-vimeo-carousel-id");
      VimeoCarousel.vimeoManager.createIframeById(id).then(function (iframe) {
        VimeoCarousel.vimeoManager.createPlayerByIframe(iframe);
        resolve(iframe);
      }).catch(function (error) {
        return reject(error);
      });
    });
  }
  /**
   * Create a method that takes a Vimeo iframe element and appends it to the placeholder element. The same Vimeo iframe element is then returned.
   * @param element HTMLElement
   * @param iframe HTMLIFrameElement
   */
  ;

  VimeoCarousel.setIframeByPlaceholder = function setIframeByPlaceholder(element, iframe) {
    if ((0,shared_ts_utils_html__WEBPACK_IMPORTED_MODULE_10__.elementExists)(element)) {
      element.appendChild(iframe);
    }
  }
  /**
   * Resumes playing the Vimeo video and then advances to the next slide.
   */
  ;

  var _proto = VimeoCarousel.prototype;

  _proto.play = function play(persistCurrentIndex) {
    var context = VimeoCarousel.getContext(this.container);
    context.setAuto(true);
    var currentSlide = context.children.item(context.currentIndex());
    VimeoCarousel.getVimeoIframe(currentSlide).then(function (iframe) {
      VimeoCarousel.getVimeoPlayer(iframe).then(function (player) {
        player.play().catch(function (error) {
          return console.warn(error);
        });
      });
    }).catch(function (error) {
      context.play(persistCurrentIndex);
    });
  }
  /**
   * Pauses the Vimeo video and the carousel
   */
  ;

  _proto.pause = function pause() {
    var context = VimeoCarousel.getContext(this.container);
    context.pause();
    var currentSlide = context.children.item(context.currentIndex());
    VimeoCarousel.getVimeoIframeOrCreate(currentSlide).then(function (iframe) {
      VimeoCarousel.getVimeoPlayer(iframe).then(function (player) {
        player.pause().catch(function (error) {
          return console.warn(error);
        });
      });
    });
  };

  return VimeoCarousel;
}(shared_ts_components_carousel__WEBPACK_IMPORTED_MODULE_9__.default);

VimeoCarousel.vimeoManager = new shared_ts_utils_vimeo_manager__WEBPACK_IMPORTED_MODULE_8__.default();
VimeoCarousel.vimeoRepository = new WeakMap();
VimeoCarousel.vimeoPlayerIframeEndpoint = 'iframe[src^="https://player.vimeo.com/video/"]';


/***/ }),

/***/ "../../Shared-International/ts/observers/intersection.ts":
/*!***************************************************************!*\
  !*** ../../Shared-International/ts/observers/intersection.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "observer": function() { return /* binding */ observer; }
/* harmony export */ });
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "../../node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ "../../node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var shared_ts_utils_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! shared/ts/utils/html */ "../../Shared-International/ts/utils/html.ts");



/**
 * IntersectionObserverConfig allows an optional inRange callback function to execute when an element intersects inside the viewport, allows an optional outRange callback function to execute when an element intersects outside the viewport, an optional boolean to unobserve elements and an optional configuration object to customize the Intersection Observer API behavior.
 */

/**
 * Handles observation of load items through the bounding client rectangle interface. This process will be used if the current browser does not support the Intersection Observer Api.
 * @param loadItems Element[]
 * @param config IntersectionObserverConfig
 */
var observeByBoundingClientRect = function observeByBoundingClientRect(loadItems, config) {
  var active = false;

  var process = function process() {
    if (active === false) {
      active = true;
      setTimeout(function () {
        loadItems.forEach(function (loadItem) {
          if (inView(loadItem)) {
            var _config$unObserve;

            config == null ? void 0 : config.inRange == null ? void 0 : config.inRange(loadItem);

            if ((_config$unObserve = config == null ? void 0 : config.unObserve) != null ? _config$unObserve : true) {
              loadItems = loadItems.filter(function (image) {
                return image !== loadItem;
              });

              if (loadItems.length === 0) {
                document.removeEventListener("scroll", process);
                window.removeEventListener("resize", process);
                window.removeEventListener("orientationchange", process);
              }
            }
          } else {
            config == null ? void 0 : config.outRange == null ? void 0 : config.outRange(loadItem);
          }
        });
        active = false;
      }, 200);
    }
  };

  document.addEventListener("scroll", process);
  window.addEventListener("resize", process);
  window.addEventListener("orientationchange", process);
  window.addEventListener("DOMContentLoaded", process);
};
/**
 * Determines if the element is in the viewport and is visible based on it's display state and it's bounding client rectangle coordinates.
 * @param loadItem HTMLElement
 * @returns boolean
 */


var inView = function inView(loadItem) {
  return loadItem.getBoundingClientRect().top <= window.innerHeight && loadItem.getBoundingClientRect().bottom >= 0 && loadItem.style.display !== "none";
};
/**
 * Handles observeration of load item elements through the Intersection Observer Api
 * @param loadItems Element[]
 * @param config IntersectionObserverConfig
 */


var observeByApi = function observeByApi(loadItems, config) {
  var loadItemObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.intersectionRatio > 0 && entry.isIntersecting) {
        var _config$unObserve2;

        config == null ? void 0 : config.inRange == null ? void 0 : config.inRange(entry.target, entry);

        if ((_config$unObserve2 = config == null ? void 0 : config.unObserve) != null ? _config$unObserve2 : true) {
          loadItemObserver.unobserve(entry.target);
        }
      } else {
        config == null ? void 0 : config.outRange == null ? void 0 : config.outRange(entry.target, entry);
      }
    });
  }, config == null ? void 0 : config.options);
  loadItems.forEach(function (loadItem) {
    loadItemObserver.observe(loadItem);
  });
};
/**
 * Observer applies a string that represents a Document Element and observes when the element intersects in and out of the browser viewport. Optional configuration is provided through the IntersectionObserverConfig interface.
 * @param selector string = "[data-observe]"
 * @param config IntersectionObserverConfig
 */


var observer = function observer(selector, config) {
  if (selector === void 0) {
    selector = "[data-observe]";
  }

  var loadItems = (0,shared_ts_utils_html__WEBPACK_IMPORTED_MODULE_2__.enumerateElements)(document.querySelectorAll(selector));

  if ("IntersectionObserver" in window) {
    observeByApi(loadItems, config);
  } else {
    observeByBoundingClientRect(loadItems, config);
  }
};

/***/ }),

/***/ "../../Shared-International/ts/observers/media-query.ts":
/*!**************************************************************!*\
  !*** ../../Shared-International/ts/observers/media-query.ts ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ MediaQuery; }
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "../../node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "../../node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "../../node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "../../node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "../../node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_weak_map_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.weak-map.js */ "../../node_modules/core-js/modules/es.weak-map.js");
/* harmony import */ var core_js_modules_es_weak_map_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_weak_map_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_6__);








var MediaQuery = /*#__PURE__*/function () {
  function MediaQuery(mediaQuery) {
    this.mediaQueryList = void 0;
    this.mediaQueryList = matchMedia(mediaQuery);
    MediaQuery.initialize(this.mediaQueryList);
  }

  MediaQuery.initialize = function initialize(mediaQueryList) {
    this.controller.set(mediaQueryList, []);
    this.repository.set(mediaQueryList, {
      isEventsProcessed: false
    });
  };

  MediaQuery.getController = function getController(mediaQueryList) {
    return this.controller.get(mediaQueryList);
  };

  MediaQuery.getRepository = function getRepository(mediaQueryList) {
    return this.repository.get(mediaQueryList);
  };

  MediaQuery.processEvents = function processEvents(context) {
    var repository = this.getRepository(context.mediaQueryList);

    if (!repository.isEventsProcessed) {
      repository.isEventsProcessed = true;
      this.observe(context.mediaQueryList);
      context.mediaQueryList.addListener(function (event) {
        MediaQuery.observe(event.target);
      });
    }
  };

  MediaQuery.observe = function observe(mediaQueryList) {
    var controller = this.getController(mediaQueryList);

    if (mediaQueryList.matches) {
      var response = controller.find(function (control) {
        return control.name === "inbound";
      });
      response == null ? void 0 : response.task(mediaQueryList);
    } else {
      var _response = controller.find(function (control) {
        return control.name === "outbound";
      });

      _response == null ? void 0 : _response.task(mediaQueryList);
    }
  };

  MediaQuery.pushTask = function pushTask(name, task, context) {
    var controller = this.getController(context.mediaQueryList);
    controller.push({
      name: name,
      task: task
    });
    this.processEvents(context);
  };

  var _proto = MediaQuery.prototype;

  _proto.inbound = function inbound(task) {
    MediaQuery.pushTask("inbound", task, this);
    return this;
  };

  _proto.outbound = function outbound(task) {
    MediaQuery.pushTask("outbound", task, this);
    return this;
  };

  return MediaQuery;
}();

MediaQuery.controller = new WeakMap();
MediaQuery.repository = new WeakMap();


/***/ }),

/***/ "../../Shared-International/ts/utils/data.ts":
/*!***************************************************!*\
  !*** ../../Shared-International/ts/utils/data.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isObject": function() { return /* binding */ isObject; }
/* harmony export */ });
/* unused harmony exports isFunction, isString, isNumber, isArray, isNullOrUndefined */
var isFunction = function isFunction(type) {
  return typeof type === "function";
};
var isString = function isString(type) {
  return typeof type === "string";
};
var isNumber = function isNumber(type) {
  return typeof type === "number";
};
var isArray = function isArray(type) {
  return Array.isArray(type);
};
var isObject = function isObject(type) {
  return type === Object(type) && !isArray(type);
};
var isNullOrUndefined = function isNullOrUndefined(type) {
  return type !== null && typeof type !== "undefined";
};

/***/ }),

/***/ "../../Shared-International/ts/utils/html.ts":
/*!***************************************************!*\
  !*** ../../Shared-International/ts/utils/html.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createElement": function() { return /* binding */ createElement; },
/* harmony export */   "appendElement": function() { return /* binding */ appendElement; },
/* harmony export */   "elementExists": function() { return /* binding */ elementExists; },
/* harmony export */   "enumerateElements": function() { return /* binding */ enumerateElements; }
/* harmony export */ });
/* unused harmony export setElementAttributes */
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "../../node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "../../node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "../../node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var shared_ts_utils_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! shared/ts/utils/data */ "../../Shared-International/ts/utils/data.ts");





/**
 * createElement takes a string tag name along with an optional object of attributes and returns a new HTMLElement.
 * @param tag string
 * @param attributes object
 * @return HTMLElement
 */
var createElement = function createElement(tag, attributes) {
  var element = document.createElement(tag);
  return setElementAttributes(element, attributes);
};
/**
 * Takes an object representing an attribute key-value pair and assigns it to an HTMLElement. The HTMLElement will be returned.
 * @param element HTMLElement
 * @param attributes T
 * @returns HTMLElement
 */

var setElementAttributes = function setElementAttributes(element, attributes) {
  if (shared_ts_utils_data__WEBPACK_IMPORTED_MODULE_3__.isObject(attributes)) {
    Object.keys(attributes).forEach(function (attribute) {
      element.setAttribute(attribute, attributes[attribute]);
    });
  }

  return element;
};
/**
 * appendElement takes an HTMLElement and appends it to the document body. The same element is then returned.
 * @param element HTMLElement
 * @return HTMLElement
 */

var appendElement = function appendElement(element) {
  document.body.appendChild(element);
  return element;
};
/**
 * elementExists takes an HTMLItem and will return true if the item exists either in the document body or in the document head.
 * @param element HTMLItem
 * @return boolean
 */

var elementExists = function elementExists(element) {
  return document.body.contains(element) || document.head.contains(element);
};
/**
 * enumerateElements takes an HTMLList and returns an element array.
 * @param elements HTMLList
 * @return Element[]
 */

var enumerateElements = function enumerateElements(elements) {
  var ar = [].slice.call(elements);
  return ar;
};

/***/ }),

/***/ "../../Shared-International/ts/utils/resource.ts":
/*!*******************************************************!*\
  !*** ../../Shared-International/ts/utils/resource.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createAppendScript": function() { return /* binding */ createAppendScript; }
/* harmony export */ });
/* unused harmony exports createStylesheet, createScript, createAppendStylesheet */
/* harmony import */ var shared_ts_utils_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! shared/ts/utils/html */ "../../Shared-International/ts/utils/html.ts");

var createStylesheet = function createStylesheet(src) {
  return shared_ts_utils_html__WEBPACK_IMPORTED_MODULE_0__.createElement("link", {
    href: src
  });
};
var createScript = function createScript(src) {
  return shared_ts_utils_html__WEBPACK_IMPORTED_MODULE_0__.createElement("script", {
    src: src
  });
};
var createAppendStylesheet = function createAppendStylesheet(src) {
  var element = createStylesheet(src);
  return shared_ts_utils_html__WEBPACK_IMPORTED_MODULE_0__.appendElement(element);
};
var createAppendScript = function createAppendScript(src) {
  var element = createScript(src);
  return shared_ts_utils_html__WEBPACK_IMPORTED_MODULE_0__.appendElement(element);
};

/***/ }),

/***/ "../../Shared-International/ts/utils/vimeo-manager.ts":
/*!************************************************************!*\
  !*** ../../Shared-International/ts/utils/vimeo-manager.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ VimeoManager; }
/* harmony export */ });
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "../../node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.promise.js */ "../../node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "../../node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "../../node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "../../node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_string_match_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.string.match.js */ "../../node_modules/core-js/modules/es.string.match.js");
/* harmony import */ var core_js_modules_es_string_match_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_match_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "../../node_modules/core-js/modules/es.regexp.to-string.js");
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "../../node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "../../node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_weak_map_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.weak-map.js */ "../../node_modules/core-js/modules/es.weak-map.js");
/* harmony import */ var core_js_modules_es_weak_map_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_weak_map_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _vimeo_player__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @vimeo/player */ "../../node_modules/@vimeo/player/dist/player.es.js");
/* harmony import */ var _html__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./html */ "../../Shared-International/ts/utils/html.ts");
/* harmony import */ var _resource__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./resource */ "../../Shared-International/ts/utils/resource.ts");















var VimeoManager = /*#__PURE__*/function () {
  /**
   * Represents the network endpoint for the Vimeo Player SDK library
   */

  /**
   * Represents the relationship between the Vimeo iframe element and the XMLHttpRequest object that it is connected to
   */

  /**
   * Represents the relationship between the Vimeo iframe element and the Vimeo Player instance that it is connected to
   */

  /**
   * Represents the relationship between the Vimeo Player instance and the Vimeo iframe element that it is connected to
   */

  /**
   * Creates a manager interface providing the ability to create, set and get a Vimeo iframe, a Vimeo Player instance and a Vimeo oEmbed object.
   */
  function VimeoManager() {}
  /**
   * Uses the Vimeo video id to make an oEmbed request. A promise object is returned where the resolve contains the XMLHttpRequest object.
   * @param id number
   * @returns Promise<XMLHttpRequest>
   */


  VimeoManager.requestoEmbed = function requestoEmbed(id) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.addEventListener("load", function () {
        return resolve(xhr);
      });
      xhr.addEventListener("error", function () {
        return reject("The request could not be completed with " + id);
      });
      xhr.open("GET", "https://vimeo.com/api/oembed.json?url=https://vimeo.com/" + id);
      xhr.send();
    });
  }
  /**
   * Creates a new script element with a source pointing to the 3rd-party Vimeo Player SDK file
   * @returns Promise
   */
  ;

  var _proto = VimeoManager.prototype;

  _proto.requestPlayer = function requestPlayer() {
    var context = this;
    return new Promise(function (resolve, reject) {
      if (!context.hasPlayerInstalled()) {
        var player = (0,_resource__WEBPACK_IMPORTED_MODULE_13__.createAppendScript)(VimeoManager.vimeoPlayerSDKEndPoint);

        player.onload = function () {
          return resolve("success");
        };

        player.onerror = function () {
          return reject("The request to " + VimeoManager.vimeoPlayerSDKEndPoint + " could not be completed.");
        };
      }
    });
  }
  /**
   * Determines if the 3rd-party Vimeo Player SDK file exists in the document
   * @returns boolean
   */
  ;

  _proto.hasPlayerInstalled = function hasPlayerInstalled() {
    return (0,_html__WEBPACK_IMPORTED_MODULE_12__.elementExists)(document.querySelector("script[src^=\"" + VimeoManager.vimeoPlayerSDKEndPoint + "\"]"));
  }
  /**
   * Uses the Vimeo video id and an optional object of Vimeo parameters to create a Vimeo iframe element through an oEmbed request.
   * @param id number
   * @param options any
   * @returns Promise<HTMLIFrameElement>
   */
  ;

  _proto.createIframeById = function createIframeById(id) {
    var context = this;
    return new Promise(function (resolve, reject) {
      var element = document.createElement("div");
      context.createoEmbedById(id).then(function (xhr) {
        var response = JSON.parse(xhr.response);
        element.innerHTML = response.html;
        var iframe = element.firstChild;
        VimeoManager.oEmbedRepo.set(iframe, xhr);
        resolve(iframe);
      }).catch(function (error) {
        return reject(error);
      });
    });
  }
  /**
   * Uses the Vimeo video id to make an oEmbed request. A promise object is returned where the resolve state contains the oEmbed data stored in an XMLHttpRequest object.
   * @param id number
   * @returns Promise<XMLHttpRequest>
   */
  ;

  _proto.createoEmbedById = function createoEmbedById(id) {
    return new Promise(function (resolve, reject) {
      VimeoManager.requestoEmbed(id).then(function (xhr) {
        return resolve(xhr);
      }).catch(function (error) {
        return reject(error);
      });
    });
  }
  /**
   * Takes the Vimeo iframe element as a key to look up it's connected oEmbed data stored in an XMLHttpRequest object via the oEmbed WeakMap Repository.
   * @param iframe HTMLIFrameElement
   * @returns XMLHttpRequest
   */
  ;

  _proto.getoEmbedByIframe = function getoEmbedByIframe(iframe) {
    return VimeoManager.oEmbedRepo.get(iframe);
  }
  /**
   * Creates a new Vimeo Player instance by using the placeholder element id, the Vimeo video id and an optional object of Vimeo video parameters.
   * @param elementId string
   * @param id number
   * @param options any
   * @returns Player
   */
  ;

  _proto.createPlayerById = function createPlayerById(elementId, id, options) {
    var config = options != null ? options : {};
    config.id = id;
    var player = new _vimeo_player__WEBPACK_IMPORTED_MODULE_11__.default(elementId, config);
    VimeoManager.setIframePlayerRepo(id, elementId, player);
    return player;
  }
  /**
   * Takes the Vimeo video id, the placeholder element id and the Vimeo Player instance and captures when the Vimeo iframe element is inserted into the document. The captured Vimeo iframe element along with the Vimeo instance is the added into both the Vimeo Player WeakMap repository and the Vimeo iframe WeakMap repository.
   * @param id number
   * @param elementId string
   * @param player Player
   */
  ;

  VimeoManager.setIframePlayerRepo = function setIframePlayerRepo(id, elementId, player) {
    this.observePlaceholder(document.querySelector("#" + elementId), {
      childList: true
    }).then(function (records) {
      records.forEach(function (record) {
        var iframe = (0,_html__WEBPACK_IMPORTED_MODULE_12__.enumerateElements)(record.addedNodes).find(function (node) {
          return node.getAttribute("src").match(id.toString());
        });

        if (iframe) {
          VimeoManager.setPlayerByIframe(iframe, player);
        }
      });
    });
  }
  /**
   * Creates a new MutationObserver interface on the placeholder element and will observe the element. A promise object is returned where the resolve state contains the mutation record array.
   * @param placeholder HTMLElement
   * @param options MutationObserverInit
   * @returns Promise<MutationRecord[]>
   */
  ;

  VimeoManager.observePlaceholder = function observePlaceholder(placeholder, options) {
    return new Promise(function (resolve, reject) {
      var observer = new MutationObserver(function (records, observer) {
        resolve(records);
        observer.disconnect();
      });
      observer.observe(placeholder, options != null ? options : {});
    });
  }
  /**
   * Takes the Vimeo iframe element and connects to a new Vimeo Player instance.
   * @param iframe HTMLIFrameElement
   * @returns Player
   */
  ;

  _proto.createPlayerByIframe = function createPlayerByIframe(iframe) {
    var player = new _vimeo_player__WEBPACK_IMPORTED_MODULE_11__.default(iframe);
    VimeoManager.setPlayerByIframe(iframe, player);
    return player;
  }
  /**
   * Takes the Vimeo iframe element and the Vimeo Player instance and connects each to their respective WeakMap repository.
   * @param iframe HTMLIFrameElement
   * @param player Player
   */
  ;

  VimeoManager.setPlayerByIframe = function setPlayerByIframe(iframe, player) {
    this.playerRepo.set(iframe, player);
    this.iframeRepo.set(player, iframe);
  }
  /**
   * Takes the Vimeo iframe element as a key to look up it's connected Vimeo Player instance through the Vimeo Player WeakMap repository.
   * @param iframe HTMLIFrameElement
   * @returns Player
   */
  ;

  _proto.getPlayerByIframe = function getPlayerByIframe(iframe) {
    return VimeoManager.playerRepo.get(iframe);
  }
  /**
   * Takes the Vimeo Player instance as a key to look up it's connected Vimeo iframe element through the Vimeo iframe WeakMap repository.
   * @param player Player
   * @returns HTMLIFrameElement
   */
  ;

  _proto.getIframeByPlayer = function getIframeByPlayer(player) {
    return VimeoManager.iframeRepo.get(player);
  };

  return VimeoManager;
}();

VimeoManager.vimeoPlayerSDKEndPoint = "https://player.vimeo.com/api/player.js";
VimeoManager.oEmbedRepo = new WeakMap();
VimeoManager.playerRepo = new WeakMap();
VimeoManager.iframeRepo = new WeakMap();


/***/ }),

/***/ "../../node_modules/core-js/internals/a-function.js":
/*!**********************************************************!*\
  !*** ../../node_modules/core-js/internals/a-function.js ***!
  \**********************************************************/
/***/ (function(module) {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/a-possible-prototype.js":
/*!********************************************************************!*\
  !*** ../../node_modules/core-js/internals/a-possible-prototype.js ***!
  \********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/add-to-unscopables.js":
/*!******************************************************************!*\
  !*** ../../node_modules/core-js/internals/add-to-unscopables.js ***!
  \******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");
var create = __webpack_require__(/*! ../internals/object-create */ "../../node_modules/core-js/internals/object-create.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js");

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/advance-string-index.js":
/*!********************************************************************!*\
  !*** ../../node_modules/core-js/internals/advance-string-index.js ***!
  \********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__(/*! ../internals/string-multibyte */ "../../node_modules/core-js/internals/string-multibyte.js").charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/an-instance.js":
/*!***********************************************************!*\
  !*** ../../node_modules/core-js/internals/an-instance.js ***!
  \***********************************************************/
/***/ (function(module) {

module.exports = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/an-object.js":
/*!*********************************************************!*\
  !*** ../../node_modules/core-js/internals/an-object.js ***!
  \*********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/array-for-each.js":
/*!**************************************************************!*\
  !*** ../../node_modules/core-js/internals/array-for-each.js ***!
  \**************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $forEach = __webpack_require__(/*! ../internals/array-iteration */ "../../node_modules/core-js/internals/array-iteration.js").forEach;
var arrayMethodIsStrict = __webpack_require__(/*! ../internals/array-method-is-strict */ "../../node_modules/core-js/internals/array-method-is-strict.js");

var STRICT_METHOD = arrayMethodIsStrict('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.foreach
module.exports = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
} : [].forEach;


/***/ }),

/***/ "../../node_modules/core-js/internals/array-includes.js":
/*!**************************************************************!*\
  !*** ../../node_modules/core-js/internals/array-includes.js ***!
  \**************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../../node_modules/core-js/internals/to-indexed-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "../../node_modules/core-js/internals/to-length.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "../../node_modules/core-js/internals/to-absolute-index.js");

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ "../../node_modules/core-js/internals/array-iteration.js":
/*!***************************************************************!*\
  !*** ../../node_modules/core-js/internals/array-iteration.js ***!
  \***************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var bind = __webpack_require__(/*! ../internals/function-bind-context */ "../../node_modules/core-js/internals/function-bind-context.js");
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "../../node_modules/core-js/internals/indexed-object.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "../../node_modules/core-js/internals/to-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "../../node_modules/core-js/internals/to-length.js");
var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "../../node_modules/core-js/internals/array-species-create.js");

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_OUT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_OUT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push.call(target, value); // filterOut
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6),
  // `Array.prototype.filterOut` method
  // https://github.com/tc39/proposal-array-filtering
  filterOut: createMethod(7)
};


/***/ }),

/***/ "../../node_modules/core-js/internals/array-method-has-species-support.js":
/*!********************************************************************************!*\
  !*** ../../node_modules/core-js/internals/array-method-has-species-support.js ***!
  \********************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");
var V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ "../../node_modules/core-js/internals/engine-v8-version.js");

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};


/***/ }),

/***/ "../../node_modules/core-js/internals/array-method-is-strict.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/core-js/internals/array-method-is-strict.js ***!
  \**********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),

/***/ "../../node_modules/core-js/internals/array-species-create.js":
/*!********************************************************************!*\
  !*** ../../node_modules/core-js/internals/array-species-create.js ***!
  \********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");
var isArray = __webpack_require__(/*! ../internals/is-array */ "../../node_modules/core-js/internals/is-array.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/check-correctness-of-iteration.js":
/*!******************************************************************************!*\
  !*** ../../node_modules/core-js/internals/check-correctness-of-iteration.js ***!
  \******************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/classof-raw.js":
/*!***********************************************************!*\
  !*** ../../node_modules/core-js/internals/classof-raw.js ***!
  \***********************************************************/
/***/ (function(module) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/classof.js":
/*!*******************************************************!*\
  !*** ../../node_modules/core-js/internals/classof.js ***!
  \*******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ "../../node_modules/core-js/internals/to-string-tag-support.js");
var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ "../../node_modules/core-js/internals/classof-raw.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/collection-weak.js":
/*!***************************************************************!*\
  !*** ../../node_modules/core-js/internals/collection-weak.js ***!
  \***************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(/*! ../internals/redefine-all */ "../../node_modules/core-js/internals/redefine-all.js");
var getWeakData = __webpack_require__(/*! ../internals/internal-metadata */ "../../node_modules/core-js/internals/internal-metadata.js").getWeakData;
var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");
var anInstance = __webpack_require__(/*! ../internals/an-instance */ "../../node_modules/core-js/internals/an-instance.js");
var iterate = __webpack_require__(/*! ../internals/iterate */ "../../node_modules/core-js/internals/iterate.js");
var ArrayIterationModule = __webpack_require__(/*! ../internals/array-iteration */ "../../node_modules/core-js/internals/array-iteration.js");
var $has = __webpack_require__(/*! ../internals/has */ "../../node_modules/core-js/internals/has.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "../../node_modules/core-js/internals/internal-state.js");

var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;
var find = ArrayIterationModule.find;
var findIndex = ArrayIterationModule.findIndex;
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (store) {
  return store.frozen || (store.frozen = new UncaughtFrozenStore());
};

var UncaughtFrozenStore = function () {
  this.entries = [];
};

var findUncaughtFrozen = function (store, key) {
  return find(store.entries, function (it) {
    return it[0] === key;
  });
};

UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.entries.push([key, value]);
  },
  'delete': function (key) {
    var index = findIndex(this.entries, function (it) {
      return it[0] === key;
    });
    if (~index) this.entries.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState(that, {
        type: CONSTRUCTOR_NAME,
        id: id++,
        frozen: undefined
      });
      if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
    });

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var data = getWeakData(anObject(key), true);
      if (data === true) uncaughtFrozenStore(state).set(key, value);
      else data[state.id] = value;
      return that;
    };

    redefineAll(C.prototype, {
      // `{ WeakMap, WeakSet }.prototype.delete(key)` methods
      // https://tc39.es/ecma262/#sec-weakmap.prototype.delete
      // https://tc39.es/ecma262/#sec-weakset.prototype.delete
      'delete': function (key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state)['delete'](key);
        return data && $has(data, state.id) && delete data[state.id];
      },
      // `{ WeakMap, WeakSet }.prototype.has(key)` methods
      // https://tc39.es/ecma262/#sec-weakmap.prototype.has
      // https://tc39.es/ecma262/#sec-weakset.prototype.has
      has: function has(key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state).has(key);
        return data && $has(data, state.id);
      }
    });

    redefineAll(C.prototype, IS_MAP ? {
      // `WeakMap.prototype.get(key)` method
      // https://tc39.es/ecma262/#sec-weakmap.prototype.get
      get: function get(key) {
        var state = getInternalState(this);
        if (isObject(key)) {
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state).get(key);
          return data ? data[state.id] : undefined;
        }
      },
      // `WeakMap.prototype.set(key, value)` method
      // https://tc39.es/ecma262/#sec-weakmap.prototype.set
      set: function set(key, value) {
        return define(this, key, value);
      }
    } : {
      // `WeakSet.prototype.add(value)` method
      // https://tc39.es/ecma262/#sec-weakset.prototype.add
      add: function add(value) {
        return define(this, value, true);
      }
    });

    return C;
  }
};


/***/ }),

/***/ "../../node_modules/core-js/internals/collection.js":
/*!**********************************************************!*\
  !*** ../../node_modules/core-js/internals/collection.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");
var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");
var isForced = __webpack_require__(/*! ../internals/is-forced */ "../../node_modules/core-js/internals/is-forced.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "../../node_modules/core-js/internals/redefine.js");
var InternalMetadataModule = __webpack_require__(/*! ../internals/internal-metadata */ "../../node_modules/core-js/internals/internal-metadata.js");
var iterate = __webpack_require__(/*! ../internals/iterate */ "../../node_modules/core-js/internals/iterate.js");
var anInstance = __webpack_require__(/*! ../internals/an-instance */ "../../node_modules/core-js/internals/an-instance.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");
var checkCorrectnessOfIteration = __webpack_require__(/*! ../internals/check-correctness-of-iteration */ "../../node_modules/core-js/internals/check-correctness-of-iteration.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "../../node_modules/core-js/internals/set-to-string-tag.js");
var inheritIfRequired = __webpack_require__(/*! ../internals/inherit-if-required */ "../../node_modules/core-js/internals/inherit-if-required.js");

module.exports = function (CONSTRUCTOR_NAME, wrapper, common) {
  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
  var ADDER = IS_MAP ? 'set' : 'add';
  var NativeConstructor = global[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var Constructor = NativeConstructor;
  var exported = {};

  var fixMethod = function (KEY) {
    var nativeMethod = NativePrototype[KEY];
    redefine(NativePrototype, KEY,
      KEY == 'add' ? function add(value) {
        nativeMethod.call(this, value === 0 ? 0 : value);
        return this;
      } : KEY == 'delete' ? function (key) {
        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
      } : KEY == 'get' ? function get(key) {
        return IS_WEAK && !isObject(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
      } : KEY == 'has' ? function has(key) {
        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
      } : function set(key, value) {
        nativeMethod.call(this, key === 0 ? 0 : key, value);
        return this;
      }
    );
  };

  var REPLACE = isForced(
    CONSTRUCTOR_NAME,
    typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
      new NativeConstructor().entries().next();
    }))
  );

  if (REPLACE) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    InternalMetadataModule.REQUIRED = true;
  } else if (isForced(CONSTRUCTOR_NAME, true)) {
    var instance = new Constructor();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    // eslint-disable-next-line no-new -- required for testing
    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new NativeConstructor();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });

    if (!ACCEPT_ITERABLES) {
      Constructor = wrapper(function (dummy, iterable) {
        anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
        if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
        return that;
      });
      Constructor.prototype = NativePrototype;
      NativePrototype.constructor = Constructor;
    }

    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }

    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

    // weak collections should not contains .clear method
    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
  }

  exported[CONSTRUCTOR_NAME] = Constructor;
  $({ global: true, forced: Constructor != NativeConstructor }, exported);

  setToStringTag(Constructor, CONSTRUCTOR_NAME);

  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

  return Constructor;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/copy-constructor-properties.js":
/*!***************************************************************************!*\
  !*** ../../node_modules/core-js/internals/copy-constructor-properties.js ***!
  \***************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var has = __webpack_require__(/*! ../internals/has */ "../../node_modules/core-js/internals/has.js");
var ownKeys = __webpack_require__(/*! ../internals/own-keys */ "../../node_modules/core-js/internals/own-keys.js");
var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "../../node_modules/core-js/internals/object-get-own-property-descriptor.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js");

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),

/***/ "../../node_modules/core-js/internals/correct-prototype-getter.js":
/*!************************************************************************!*\
  !*** ../../node_modules/core-js/internals/correct-prototype-getter.js ***!
  \************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ "../../node_modules/core-js/internals/create-iterator-constructor.js":
/*!***************************************************************************!*\
  !*** ../../node_modules/core-js/internals/create-iterator-constructor.js ***!
  \***************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var IteratorPrototype = __webpack_require__(/*! ../internals/iterators-core */ "../../node_modules/core-js/internals/iterators-core.js").IteratorPrototype;
var create = __webpack_require__(/*! ../internals/object-create */ "../../node_modules/core-js/internals/object-create.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "../../node_modules/core-js/internals/create-property-descriptor.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "../../node_modules/core-js/internals/set-to-string-tag.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "../../node_modules/core-js/internals/iterators.js");

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/create-non-enumerable-property.js":
/*!******************************************************************************!*\
  !*** ../../node_modules/core-js/internals/create-non-enumerable-property.js ***!
  \******************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "../../node_modules/core-js/internals/create-property-descriptor.js");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/create-property-descriptor.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/core-js/internals/create-property-descriptor.js ***!
  \**************************************************************************/
/***/ (function(module) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "../../node_modules/core-js/internals/create-property.js":
/*!***************************************************************!*\
  !*** ../../node_modules/core-js/internals/create-property.js ***!
  \***************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "../../node_modules/core-js/internals/to-primitive.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "../../node_modules/core-js/internals/create-property-descriptor.js");

module.exports = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/define-iterator.js":
/*!***************************************************************!*\
  !*** ../../node_modules/core-js/internals/define-iterator.js ***!
  \***************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");
var createIteratorConstructor = __webpack_require__(/*! ../internals/create-iterator-constructor */ "../../node_modules/core-js/internals/create-iterator-constructor.js");
var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "../../node_modules/core-js/internals/object-get-prototype-of.js");
var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "../../node_modules/core-js/internals/object-set-prototype-of.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "../../node_modules/core-js/internals/set-to-string-tag.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../node_modules/core-js/internals/create-non-enumerable-property.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "../../node_modules/core-js/internals/redefine.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "../../node_modules/core-js/internals/is-pure.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "../../node_modules/core-js/internals/iterators.js");
var IteratorsCore = __webpack_require__(/*! ../internals/iterators-core */ "../../node_modules/core-js/internals/iterators-core.js");

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
  }
  Iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/descriptors.js":
/*!***********************************************************!*\
  !*** ../../node_modules/core-js/internals/descriptors.js ***!
  \***********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ "../../node_modules/core-js/internals/document-create-element.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/core-js/internals/document-create-element.js ***!
  \***********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "../../node_modules/core-js/internals/dom-iterables.js":
/*!*************************************************************!*\
  !*** ../../node_modules/core-js/internals/dom-iterables.js ***!
  \*************************************************************/
/***/ (function(module) {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),

/***/ "../../node_modules/core-js/internals/engine-is-browser.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/core-js/internals/engine-is-browser.js ***!
  \*****************************************************************/
/***/ (function(module) {

module.exports = typeof window == 'object';


/***/ }),

/***/ "../../node_modules/core-js/internals/engine-is-ios.js":
/*!*************************************************************!*\
  !*** ../../node_modules/core-js/internals/engine-is-ios.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ "../../node_modules/core-js/internals/engine-user-agent.js");

module.exports = /(?:iphone|ipod|ipad).*applewebkit/i.test(userAgent);


/***/ }),

/***/ "../../node_modules/core-js/internals/engine-is-node.js":
/*!**************************************************************!*\
  !*** ../../node_modules/core-js/internals/engine-is-node.js ***!
  \**************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var classof = __webpack_require__(/*! ../internals/classof-raw */ "../../node_modules/core-js/internals/classof-raw.js");
var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

module.exports = classof(global.process) == 'process';


/***/ }),

/***/ "../../node_modules/core-js/internals/engine-is-webos-webkit.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/core-js/internals/engine-is-webos-webkit.js ***!
  \**********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ "../../node_modules/core-js/internals/engine-user-agent.js");

module.exports = /web0s(?!.*chrome)/i.test(userAgent);


/***/ }),

/***/ "../../node_modules/core-js/internals/engine-user-agent.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/core-js/internals/engine-user-agent.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "../../node_modules/core-js/internals/get-built-in.js");

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ "../../node_modules/core-js/internals/engine-v8-version.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/core-js/internals/engine-v8-version.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");
var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ "../../node_modules/core-js/internals/engine-user-agent.js");

var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] < 4 ? 1 : match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

module.exports = version && +version;


/***/ }),

/***/ "../../node_modules/core-js/internals/enum-bug-keys.js":
/*!*************************************************************!*\
  !*** ../../node_modules/core-js/internals/enum-bug-keys.js ***!
  \*************************************************************/
/***/ (function(module) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "../../node_modules/core-js/internals/export.js":
/*!******************************************************!*\
  !*** ../../node_modules/core-js/internals/export.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");
var getOwnPropertyDescriptor = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "../../node_modules/core-js/internals/object-get-own-property-descriptor.js").f;
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../node_modules/core-js/internals/create-non-enumerable-property.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "../../node_modules/core-js/internals/redefine.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "../../node_modules/core-js/internals/set-global.js");
var copyConstructorProperties = __webpack_require__(/*! ../internals/copy-constructor-properties */ "../../node_modules/core-js/internals/copy-constructor-properties.js");
var isForced = __webpack_require__(/*! ../internals/is-forced */ "../../node_modules/core-js/internals/is-forced.js");

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ "../../node_modules/core-js/internals/fails.js":
/*!*****************************************************!*\
  !*** ../../node_modules/core-js/internals/fails.js ***!
  \*****************************************************/
/***/ (function(module) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "../../node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js":
/*!**********************************************************************************!*\
  !*** ../../node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js ***!
  \**********************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__(/*! ../modules/es.regexp.exec */ "../../node_modules/core-js/modules/es.regexp.exec.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "../../node_modules/core-js/internals/redefine.js");
var regexpExec = __webpack_require__(/*! ../internals/regexp-exec */ "../../node_modules/core-js/internals/regexp-exec.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../node_modules/core-js/internals/create-non-enumerable-property.js");

var SPECIES = wellKnownSymbol('species');
var RegExpPrototype = RegExp.prototype;

module.exports = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    FORCED
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      var $exec = regexp.exec;
      if ($exec === regexpExec || $exec === RegExpPrototype.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    });

    redefine(String.prototype, KEY, methods[0]);
    redefine(RegExpPrototype, SYMBOL, methods[1]);
  }

  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/freezing.js":
/*!********************************************************!*\
  !*** ../../node_modules/core-js/internals/freezing.js ***!
  \********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
  return Object.isExtensible(Object.preventExtensions({}));
});


/***/ }),

/***/ "../../node_modules/core-js/internals/function-bind-context.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/core-js/internals/function-bind-context.js ***!
  \*********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var aFunction = __webpack_require__(/*! ../internals/a-function */ "../../node_modules/core-js/internals/a-function.js");

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "../../node_modules/core-js/internals/get-built-in.js":
/*!************************************************************!*\
  !*** ../../node_modules/core-js/internals/get-built-in.js ***!
  \************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var path = __webpack_require__(/*! ../internals/path */ "../../node_modules/core-js/internals/path.js");
var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "../../node_modules/core-js/internals/get-iterator-method.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/core-js/internals/get-iterator-method.js ***!
  \*******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var classof = __webpack_require__(/*! ../internals/classof */ "../../node_modules/core-js/internals/classof.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "../../node_modules/core-js/internals/iterators.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "../../node_modules/core-js/internals/global.js":
/*!******************************************************!*\
  !*** ../../node_modules/core-js/internals/global.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ "../../node_modules/core-js/internals/has.js":
/*!***************************************************!*\
  !*** ../../node_modules/core-js/internals/has.js ***!
  \***************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toObject = __webpack_require__(/*! ../internals/to-object */ "../../node_modules/core-js/internals/to-object.js");

var hasOwnProperty = {}.hasOwnProperty;

module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty.call(toObject(it), key);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/hidden-keys.js":
/*!***********************************************************!*\
  !*** ../../node_modules/core-js/internals/hidden-keys.js ***!
  \***********************************************************/
/***/ (function(module) {

module.exports = {};


/***/ }),

/***/ "../../node_modules/core-js/internals/host-report-errors.js":
/*!******************************************************************!*\
  !*** ../../node_modules/core-js/internals/host-report-errors.js ***!
  \******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

module.exports = function (a, b) {
  var console = global.console;
  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};


/***/ }),

/***/ "../../node_modules/core-js/internals/html.js":
/*!****************************************************!*\
  !*** ../../node_modules/core-js/internals/html.js ***!
  \****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "../../node_modules/core-js/internals/get-built-in.js");

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ "../../node_modules/core-js/internals/ie8-dom-define.js":
/*!**************************************************************!*\
  !*** ../../node_modules/core-js/internals/ie8-dom-define.js ***!
  \**************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");
var createElement = __webpack_require__(/*! ../internals/document-create-element */ "../../node_modules/core-js/internals/document-create-element.js");

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "../../node_modules/core-js/internals/indexed-object.js":
/*!**************************************************************!*\
  !*** ../../node_modules/core-js/internals/indexed-object.js ***!
  \**************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "../../node_modules/core-js/internals/classof-raw.js");

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),

/***/ "../../node_modules/core-js/internals/inherit-if-required.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/core-js/internals/inherit-if-required.js ***!
  \*******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");
var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "../../node_modules/core-js/internals/object-set-prototype-of.js");

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/inspect-source.js":
/*!**************************************************************!*\
  !*** ../../node_modules/core-js/internals/inspect-source.js ***!
  \**************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var store = __webpack_require__(/*! ../internals/shared-store */ "../../node_modules/core-js/internals/shared-store.js");

var functionToString = Function.toString;

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ "../../node_modules/core-js/internals/internal-metadata.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/core-js/internals/internal-metadata.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "../../node_modules/core-js/internals/hidden-keys.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");
var has = __webpack_require__(/*! ../internals/has */ "../../node_modules/core-js/internals/has.js");
var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js").f;
var uid = __webpack_require__(/*! ../internals/uid */ "../../node_modules/core-js/internals/uid.js");
var FREEZING = __webpack_require__(/*! ../internals/freezing */ "../../node_modules/core-js/internals/freezing.js");

var METADATA = uid('meta');
var id = 0;

// eslint-disable-next-line es/no-object-isextensible -- safe
var isExtensible = Object.isExtensible || function () {
  return true;
};

var setMetadata = function (it) {
  defineProperty(it, METADATA, { value: {
    objectID: 'O' + ++id, // object ID
    weakData: {}          // weak collections IDs
  } });
};

var fastKey = function (it, create) {
  // return a primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMetadata(it);
  // return object ID
  } return it[METADATA].objectID;
};

var getWeakData = function (it, create) {
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMetadata(it);
  // return the store of weak collections IDs
  } return it[METADATA].weakData;
};

// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZING && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
  return it;
};

var meta = module.exports = {
  REQUIRED: false,
  fastKey: fastKey,
  getWeakData: getWeakData,
  onFreeze: onFreeze
};

hiddenKeys[METADATA] = true;


/***/ }),

/***/ "../../node_modules/core-js/internals/internal-state.js":
/*!**************************************************************!*\
  !*** ../../node_modules/core-js/internals/internal-state.js ***!
  \**************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(/*! ../internals/native-weak-map */ "../../node_modules/core-js/internals/native-weak-map.js");
var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../node_modules/core-js/internals/create-non-enumerable-property.js");
var objectHas = __webpack_require__(/*! ../internals/has */ "../../node_modules/core-js/internals/has.js");
var shared = __webpack_require__(/*! ../internals/shared-store */ "../../node_modules/core-js/internals/shared-store.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "../../node_modules/core-js/internals/shared-key.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "../../node_modules/core-js/internals/hidden-keys.js");

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "../../node_modules/core-js/internals/is-array-iterator-method.js":
/*!************************************************************************!*\
  !*** ../../node_modules/core-js/internals/is-array-iterator-method.js ***!
  \************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "../../node_modules/core-js/internals/iterators.js");

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/is-array.js":
/*!********************************************************!*\
  !*** ../../node_modules/core-js/internals/is-array.js ***!
  \********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var classof = __webpack_require__(/*! ../internals/classof-raw */ "../../node_modules/core-js/internals/classof-raw.js");

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};


/***/ }),

/***/ "../../node_modules/core-js/internals/is-forced.js":
/*!*********************************************************!*\
  !*** ../../node_modules/core-js/internals/is-forced.js ***!
  \*********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "../../node_modules/core-js/internals/is-object.js":
/*!*********************************************************!*\
  !*** ../../node_modules/core-js/internals/is-object.js ***!
  \*********************************************************/
/***/ (function(module) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "../../node_modules/core-js/internals/is-pure.js":
/*!*******************************************************!*\
  !*** ../../node_modules/core-js/internals/is-pure.js ***!
  \*******************************************************/
/***/ (function(module) {

module.exports = false;


/***/ }),

/***/ "../../node_modules/core-js/internals/iterate.js":
/*!*******************************************************!*\
  !*** ../../node_modules/core-js/internals/iterate.js ***!
  \*******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");
var isArrayIteratorMethod = __webpack_require__(/*! ../internals/is-array-iterator-method */ "../../node_modules/core-js/internals/is-array-iterator-method.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "../../node_modules/core-js/internals/to-length.js");
var bind = __webpack_require__(/*! ../internals/function-bind-context */ "../../node_modules/core-js/internals/function-bind-context.js");
var getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ "../../node_modules/core-js/internals/get-iterator-method.js");
var iteratorClose = __webpack_require__(/*! ../internals/iterator-close */ "../../node_modules/core-js/internals/iterator-close.js");

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

module.exports = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && result instanceof Result) return result;
      } return new Result(false);
    }
    iterator = iterFn.call(iterable);
  }

  next = iterator.next;
  while (!(step = next.call(iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator);
      throw error;
    }
    if (typeof result == 'object' && result && result instanceof Result) return result;
  } return new Result(false);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/iterator-close.js":
/*!**************************************************************!*\
  !*** ../../node_modules/core-js/internals/iterator-close.js ***!
  \**************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");

module.exports = function (iterator) {
  var returnMethod = iterator['return'];
  if (returnMethod !== undefined) {
    return anObject(returnMethod.call(iterator)).value;
  }
};


/***/ }),

/***/ "../../node_modules/core-js/internals/iterators-core.js":
/*!**************************************************************!*\
  !*** ../../node_modules/core-js/internals/iterators-core.js ***!
  \**************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");
var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "../../node_modules/core-js/internals/object-get-prototype-of.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../node_modules/core-js/internals/create-non-enumerable-property.js");
var has = __webpack_require__(/*! ../internals/has */ "../../node_modules/core-js/internals/has.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "../../node_modules/core-js/internals/is-pure.js");

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = IteratorPrototype == undefined || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if ((!IS_PURE || NEW_ITERATOR_PROTOTYPE) && !has(IteratorPrototype, ITERATOR)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ "../../node_modules/core-js/internals/iterators.js":
/*!*********************************************************!*\
  !*** ../../node_modules/core-js/internals/iterators.js ***!
  \*********************************************************/
/***/ (function(module) {

module.exports = {};


/***/ }),

/***/ "../../node_modules/core-js/internals/microtask.js":
/*!*********************************************************!*\
  !*** ../../node_modules/core-js/internals/microtask.js ***!
  \*********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");
var getOwnPropertyDescriptor = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "../../node_modules/core-js/internals/object-get-own-property-descriptor.js").f;
var macrotask = __webpack_require__(/*! ../internals/task */ "../../node_modules/core-js/internals/task.js").set;
var IS_IOS = __webpack_require__(/*! ../internals/engine-is-ios */ "../../node_modules/core-js/internals/engine-is-ios.js");
var IS_WEBOS_WEBKIT = __webpack_require__(/*! ../internals/engine-is-webos-webkit */ "../../node_modules/core-js/internals/engine-is-webos-webkit.js");
var IS_NODE = __webpack_require__(/*! ../internals/engine-is-node */ "../../node_modules/core-js/internals/engine-is-node.js");

var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
var document = global.document;
var process = global.process;
var Promise = global.Promise;
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head) notify();
        else last = undefined;
        throw error;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
  if (!IS_IOS && !IS_NODE && !IS_WEBOS_WEBKIT && MutationObserver && document) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise.resolve(undefined);
    // workaround of WebKit ~ iOS Safari 10.1 bug
    promise.constructor = Promise;
    then = promise.then;
    notify = function () {
      then.call(promise, flush);
    };
  // Node.js without promises
  } else if (IS_NODE) {
    notify = function () {
      process.nextTick(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }
}

module.exports = queueMicrotask || function (fn) {
  var task = { fn: fn, next: undefined };
  if (last) last.next = task;
  if (!head) {
    head = task;
    notify();
  } last = task;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/native-promise-constructor.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/core-js/internals/native-promise-constructor.js ***!
  \**************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

module.exports = global.Promise;


/***/ }),

/***/ "../../node_modules/core-js/internals/native-symbol.js":
/*!*************************************************************!*\
  !*** ../../node_modules/core-js/internals/native-symbol.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ "../../node_modules/core-js/internals/engine-v8-version.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ "../../node_modules/core-js/internals/native-weak-map.js":
/*!***************************************************************!*\
  !*** ../../node_modules/core-js/internals/native-weak-map.js ***!
  \***************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");
var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "../../node_modules/core-js/internals/inspect-source.js");

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ "../../node_modules/core-js/internals/new-promise-capability.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/core-js/internals/new-promise-capability.js ***!
  \**********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(/*! ../internals/a-function */ "../../node_modules/core-js/internals/a-function.js");

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
};

// `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability
module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/object-create.js":
/*!*************************************************************!*\
  !*** ../../node_modules/core-js/internals/object-create.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");
var defineProperties = __webpack_require__(/*! ../internals/object-define-properties */ "../../node_modules/core-js/internals/object-define-properties.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "../../node_modules/core-js/internals/enum-bug-keys.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "../../node_modules/core-js/internals/hidden-keys.js");
var html = __webpack_require__(/*! ../internals/html */ "../../node_modules/core-js/internals/html.js");
var documentCreateElement = __webpack_require__(/*! ../internals/document-create-element */ "../../node_modules/core-js/internals/document-create-element.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "../../node_modules/core-js/internals/shared-key.js");

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject -- old IE */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/object-define-properties.js":
/*!************************************************************************!*\
  !*** ../../node_modules/core-js/internals/object-define-properties.js ***!
  \************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");
var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "../../node_modules/core-js/internals/object-keys.js");

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/object-define-property.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/core-js/internals/object-define-property.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "../../node_modules/core-js/internals/ie8-dom-define.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");
var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "../../node_modules/core-js/internals/to-primitive.js");

// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/object-get-own-property-descriptor.js":
/*!**********************************************************************************!*\
  !*** ../../node_modules/core-js/internals/object-get-own-property-descriptor.js ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");
var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "../../node_modules/core-js/internals/object-property-is-enumerable.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "../../node_modules/core-js/internals/create-property-descriptor.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../../node_modules/core-js/internals/to-indexed-object.js");
var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "../../node_modules/core-js/internals/to-primitive.js");
var has = __webpack_require__(/*! ../internals/has */ "../../node_modules/core-js/internals/has.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "../../node_modules/core-js/internals/ie8-dom-define.js");

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/object-get-own-property-names.js":
/*!*****************************************************************************!*\
  !*** ../../node_modules/core-js/internals/object-get-own-property-names.js ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "../../node_modules/core-js/internals/object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "../../node_modules/core-js/internals/enum-bug-keys.js");

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/object-get-own-property-symbols.js":
/*!*******************************************************************************!*\
  !*** ../../node_modules/core-js/internals/object-get-own-property-symbols.js ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "../../node_modules/core-js/internals/object-get-prototype-of.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/core-js/internals/object-get-prototype-of.js ***!
  \***********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var has = __webpack_require__(/*! ../internals/has */ "../../node_modules/core-js/internals/has.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "../../node_modules/core-js/internals/to-object.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "../../node_modules/core-js/internals/shared-key.js");
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(/*! ../internals/correct-prototype-getter */ "../../node_modules/core-js/internals/correct-prototype-getter.js");

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/object-keys-internal.js":
/*!********************************************************************!*\
  !*** ../../node_modules/core-js/internals/object-keys-internal.js ***!
  \********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var has = __webpack_require__(/*! ../internals/has */ "../../node_modules/core-js/internals/has.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../../node_modules/core-js/internals/to-indexed-object.js");
var indexOf = __webpack_require__(/*! ../internals/array-includes */ "../../node_modules/core-js/internals/array-includes.js").indexOf;
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "../../node_modules/core-js/internals/hidden-keys.js");

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/object-keys.js":
/*!***********************************************************!*\
  !*** ../../node_modules/core-js/internals/object-keys.js ***!
  \***********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "../../node_modules/core-js/internals/object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "../../node_modules/core-js/internals/enum-bug-keys.js");

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/object-property-is-enumerable.js":
/*!*****************************************************************************!*\
  !*** ../../node_modules/core-js/internals/object-property-is-enumerable.js ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ "../../node_modules/core-js/internals/object-set-prototype-of.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/core-js/internals/object-set-prototype-of.js ***!
  \***********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable no-proto -- safe */
var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");
var aPossiblePrototype = __webpack_require__(/*! ../internals/a-possible-prototype */ "../../node_modules/core-js/internals/a-possible-prototype.js");

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ "../../node_modules/core-js/internals/object-to-string.js":
/*!****************************************************************!*\
  !*** ../../node_modules/core-js/internals/object-to-string.js ***!
  \****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ "../../node_modules/core-js/internals/to-string-tag-support.js");
var classof = __webpack_require__(/*! ../internals/classof */ "../../node_modules/core-js/internals/classof.js");

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};


/***/ }),

/***/ "../../node_modules/core-js/internals/own-keys.js":
/*!********************************************************!*\
  !*** ../../node_modules/core-js/internals/own-keys.js ***!
  \********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "../../node_modules/core-js/internals/get-built-in.js");
var getOwnPropertyNamesModule = __webpack_require__(/*! ../internals/object-get-own-property-names */ "../../node_modules/core-js/internals/object-get-own-property-names.js");
var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ "../../node_modules/core-js/internals/object-get-own-property-symbols.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/path.js":
/*!****************************************************!*\
  !*** ../../node_modules/core-js/internals/path.js ***!
  \****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

module.exports = global;


/***/ }),

/***/ "../../node_modules/core-js/internals/perform.js":
/*!*******************************************************!*\
  !*** ../../node_modules/core-js/internals/perform.js ***!
  \*******************************************************/
/***/ (function(module) {

module.exports = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};


/***/ }),

/***/ "../../node_modules/core-js/internals/promise-resolve.js":
/*!***************************************************************!*\
  !*** ../../node_modules/core-js/internals/promise-resolve.js ***!
  \***************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");
var newPromiseCapability = __webpack_require__(/*! ../internals/new-promise-capability */ "../../node_modules/core-js/internals/new-promise-capability.js");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/redefine-all.js":
/*!************************************************************!*\
  !*** ../../node_modules/core-js/internals/redefine-all.js ***!
  \************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var redefine = __webpack_require__(/*! ../internals/redefine */ "../../node_modules/core-js/internals/redefine.js");

module.exports = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/redefine.js":
/*!********************************************************!*\
  !*** ../../node_modules/core-js/internals/redefine.js ***!
  \********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../node_modules/core-js/internals/create-non-enumerable-property.js");
var has = __webpack_require__(/*! ../internals/has */ "../../node_modules/core-js/internals/has.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "../../node_modules/core-js/internals/set-global.js");
var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "../../node_modules/core-js/internals/inspect-source.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "../../node_modules/core-js/internals/internal-state.js");

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var state;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) {
      createNonEnumerableProperty(value, 'name', key);
    }
    state = enforceInternalState(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
    }
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});


/***/ }),

/***/ "../../node_modules/core-js/internals/regexp-exec-abstract.js":
/*!********************************************************************!*\
  !*** ../../node_modules/core-js/internals/regexp-exec-abstract.js ***!
  \********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var classof = __webpack_require__(/*! ./classof-raw */ "../../node_modules/core-js/internals/classof-raw.js");
var regexpExec = __webpack_require__(/*! ./regexp-exec */ "../../node_modules/core-js/internals/regexp-exec.js");

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classof(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};



/***/ }),

/***/ "../../node_modules/core-js/internals/regexp-exec.js":
/*!***********************************************************!*\
  !*** ../../node_modules/core-js/internals/regexp-exec.js ***!
  \***********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

/* eslint-disable regexp/no-assertion-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var regexpFlags = __webpack_require__(/*! ../internals/regexp-flags */ "../../node_modules/core-js/internals/regexp-flags.js");
var stickyHelpers = __webpack_require__(/*! ../internals/regexp-sticky-helpers */ "../../node_modules/core-js/internals/regexp-sticky-helpers.js");
var shared = __webpack_require__(/*! ../internals/shared */ "../../node_modules/core-js/internals/shared.js");
var create = __webpack_require__(/*! ../internals/object-create */ "../../node_modules/core-js/internals/object-create.js");
var getInternalState = __webpack_require__(/*! ../internals/internal-state */ "../../node_modules/core-js/internals/internal-state.js").get;
var UNSUPPORTED_DOT_ALL = __webpack_require__(/*! ../internals/regexp-unsupported-dot-all */ "../../node_modules/core-js/internals/regexp-unsupported-dot-all.js");
var UNSUPPORTED_NCG = __webpack_require__(/*! ../internals/regexp-unsupported-ncg */ "../../node_modules/core-js/internals/regexp-unsupported-ncg.js");

var nativeExec = RegExp.prototype.exec;
var nativeReplace = shared('native-string-replace', String.prototype.replace);

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

if (PATCH) {
  // eslint-disable-next-line max-statements -- TODO
  patchedExec = function exec(str) {
    var re = this;
    var state = getInternalState(re);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = patchedExec.call(raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = create(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "../../node_modules/core-js/internals/regexp-flags.js":
/*!************************************************************!*\
  !*** ../../node_modules/core-js/internals/regexp-flags.js ***!
  \************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/regexp-sticky-helpers.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/core-js/internals/regexp-sticky-helpers.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
var RE = function (s, f) {
  return RegExp(s, f);
};

exports.UNSUPPORTED_Y = fails(function () {
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

exports.BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});


/***/ }),

/***/ "../../node_modules/core-js/internals/regexp-unsupported-dot-all.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/core-js/internals/regexp-unsupported-dot-all.js ***!
  \**************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(/*! ./fails */ "../../node_modules/core-js/internals/fails.js");

module.exports = fails(function () {
  // babel-minify transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
  var re = RegExp('.', (typeof '').charAt(0));
  return !(re.dotAll && re.exec('\n') && re.flags === 's');
});


/***/ }),

/***/ "../../node_modules/core-js/internals/regexp-unsupported-ncg.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/core-js/internals/regexp-unsupported-ncg.js ***!
  \**********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(/*! ./fails */ "../../node_modules/core-js/internals/fails.js");

module.exports = fails(function () {
  // babel-minify transpiles RegExp('.', 'g') -> /./g and it causes SyntaxError
  var re = RegExp('(?<a>b)', (typeof '').charAt(5));
  return re.exec('b').groups.a !== 'b' ||
    'b'.replace(re, '$<a>c') !== 'bc';
});


/***/ }),

/***/ "../../node_modules/core-js/internals/require-object-coercible.js":
/*!************************************************************************!*\
  !*** ../../node_modules/core-js/internals/require-object-coercible.js ***!
  \************************************************************************/
/***/ (function(module) {

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/set-global.js":
/*!**********************************************************!*\
  !*** ../../node_modules/core-js/internals/set-global.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../node_modules/core-js/internals/create-non-enumerable-property.js");

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/set-species.js":
/*!***********************************************************!*\
  !*** ../../node_modules/core-js/internals/set-species.js ***!
  \***********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "../../node_modules/core-js/internals/get-built-in.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};


/***/ }),

/***/ "../../node_modules/core-js/internals/set-to-string-tag.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/core-js/internals/set-to-string-tag.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js").f;
var has = __webpack_require__(/*! ../internals/has */ "../../node_modules/core-js/internals/has.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),

/***/ "../../node_modules/core-js/internals/shared-key.js":
/*!**********************************************************!*\
  !*** ../../node_modules/core-js/internals/shared-key.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var shared = __webpack_require__(/*! ../internals/shared */ "../../node_modules/core-js/internals/shared.js");
var uid = __webpack_require__(/*! ../internals/uid */ "../../node_modules/core-js/internals/uid.js");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "../../node_modules/core-js/internals/shared-store.js":
/*!************************************************************!*\
  !*** ../../node_modules/core-js/internals/shared-store.js ***!
  \************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "../../node_modules/core-js/internals/set-global.js");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ "../../node_modules/core-js/internals/shared.js":
/*!******************************************************!*\
  !*** ../../node_modules/core-js/internals/shared.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "../../node_modules/core-js/internals/is-pure.js");
var store = __webpack_require__(/*! ../internals/shared-store */ "../../node_modules/core-js/internals/shared-store.js");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.15.1',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "../../node_modules/core-js/internals/species-constructor.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/core-js/internals/species-constructor.js ***!
  \*******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");
var aFunction = __webpack_require__(/*! ../internals/a-function */ "../../node_modules/core-js/internals/a-function.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/string-multibyte.js":
/*!****************************************************************!*\
  !*** ../../node_modules/core-js/internals/string-multibyte.js ***!
  \****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "../../node_modules/core-js/internals/to-integer.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../../node_modules/core-js/internals/require-object-coercible.js");

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ "../../node_modules/core-js/internals/task.js":
/*!****************************************************!*\
  !*** ../../node_modules/core-js/internals/task.js ***!
  \****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");
var bind = __webpack_require__(/*! ../internals/function-bind-context */ "../../node_modules/core-js/internals/function-bind-context.js");
var html = __webpack_require__(/*! ../internals/html */ "../../node_modules/core-js/internals/html.js");
var createElement = __webpack_require__(/*! ../internals/document-create-element */ "../../node_modules/core-js/internals/document-create-element.js");
var IS_IOS = __webpack_require__(/*! ../internals/engine-is-ios */ "../../node_modules/core-js/internals/engine-is-ios.js");
var IS_NODE = __webpack_require__(/*! ../internals/engine-is-node */ "../../node_modules/core-js/internals/engine-is-node.js");

var location = global.location;
var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;

var run = function (id) {
  // eslint-disable-next-line no-prototype-builtins -- safe
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global.postMessage(id + '', location.protocol + '//' + location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func -- spec requirement
      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (IS_NODE) {
    defer = function (id) {
      process.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !IS_IOS) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global.addEventListener &&
    typeof postMessage == 'function' &&
    !global.importScripts &&
    location && location.protocol !== 'file:' &&
    !fails(post)
  ) {
    defer = post;
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

module.exports = {
  set: set,
  clear: clear
};


/***/ }),

/***/ "../../node_modules/core-js/internals/to-absolute-index.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/core-js/internals/to-absolute-index.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "../../node_modules/core-js/internals/to-integer.js");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/to-indexed-object.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/core-js/internals/to-indexed-object.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "../../node_modules/core-js/internals/indexed-object.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../../node_modules/core-js/internals/require-object-coercible.js");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "../../node_modules/core-js/internals/to-integer.js":
/*!**********************************************************!*\
  !*** ../../node_modules/core-js/internals/to-integer.js ***!
  \**********************************************************/
/***/ (function(module) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.es/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/to-length.js":
/*!*********************************************************!*\
  !*** ../../node_modules/core-js/internals/to-length.js ***!
  \*********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "../../node_modules/core-js/internals/to-integer.js");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "../../node_modules/core-js/internals/to-object.js":
/*!*********************************************************!*\
  !*** ../../node_modules/core-js/internals/to-object.js ***!
  \*********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../../node_modules/core-js/internals/require-object-coercible.js");

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "../../node_modules/core-js/internals/to-primitive.js":
/*!************************************************************!*\
  !*** ../../node_modules/core-js/internals/to-primitive.js ***!
  \************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "../../node_modules/core-js/internals/to-string-tag-support.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/core-js/internals/to-string-tag-support.js ***!
  \*********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ "../../node_modules/core-js/internals/uid.js":
/*!***************************************************!*\
  !*** ../../node_modules/core-js/internals/uid.js ***!
  \***************************************************/
/***/ (function(module) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/use-symbol-as-uid.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/core-js/internals/use-symbol-as-uid.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ "../../node_modules/core-js/internals/native-symbol.js");

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ "../../node_modules/core-js/internals/well-known-symbol.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/core-js/internals/well-known-symbol.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");
var shared = __webpack_require__(/*! ../internals/shared */ "../../node_modules/core-js/internals/shared.js");
var has = __webpack_require__(/*! ../internals/has */ "../../node_modules/core-js/internals/has.js");
var uid = __webpack_require__(/*! ../internals/uid */ "../../node_modules/core-js/internals/uid.js");
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ "../../node_modules/core-js/internals/native-symbol.js");
var USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ "../../node_modules/core-js/internals/use-symbol-as-uid.js");

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    if (NATIVE_SYMBOL && has(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
    }
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ "../../node_modules/core-js/modules/es.array.filter.js":
/*!*************************************************************!*\
  !*** ../../node_modules/core-js/modules/es.array.filter.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");
var $filter = __webpack_require__(/*! ../internals/array-iteration */ "../../node_modules/core-js/internals/array-iteration.js").filter;
var arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ "../../node_modules/core-js/internals/array-method-has-species-support.js");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');

// `Array.prototype.filter` method
// https://tc39.es/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "../../node_modules/core-js/modules/es.array.find.js":
/*!***********************************************************!*\
  !*** ../../node_modules/core-js/modules/es.array.find.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");
var $find = __webpack_require__(/*! ../internals/array-iteration */ "../../node_modules/core-js/internals/array-iteration.js").find;
var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "../../node_modules/core-js/internals/add-to-unscopables.js");

var FIND = 'find';
var SKIPS_HOLES = true;

// Shouldn't skip holes
if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

// `Array.prototype.find` method
// https://tc39.es/ecma262/#sec-array.prototype.find
$({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND);


/***/ }),

/***/ "../../node_modules/core-js/modules/es.array.iterator.js":
/*!***************************************************************!*\
  !*** ../../node_modules/core-js/modules/es.array.iterator.js ***!
  \***************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../../node_modules/core-js/internals/to-indexed-object.js");
var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "../../node_modules/core-js/internals/add-to-unscopables.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "../../node_modules/core-js/internals/iterators.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "../../node_modules/core-js/internals/internal-state.js");
var defineIterator = __webpack_require__(/*! ../internals/define-iterator */ "../../node_modules/core-js/internals/define-iterator.js");

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "../../node_modules/core-js/modules/es.array.slice.js":
/*!************************************************************!*\
  !*** ../../node_modules/core-js/modules/es.array.slice.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");
var isArray = __webpack_require__(/*! ../internals/is-array */ "../../node_modules/core-js/internals/is-array.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "../../node_modules/core-js/internals/to-absolute-index.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "../../node_modules/core-js/internals/to-length.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../../node_modules/core-js/internals/to-indexed-object.js");
var createProperty = __webpack_require__(/*! ../internals/create-property */ "../../node_modules/core-js/internals/create-property.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");
var arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ "../../node_modules/core-js/internals/array-method-has-species-support.js");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');

var SPECIES = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.es/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});


/***/ }),

/***/ "../../node_modules/core-js/modules/es.array.splice.js":
/*!*************************************************************!*\
  !*** ../../node_modules/core-js/modules/es.array.splice.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "../../node_modules/core-js/internals/to-absolute-index.js");
var toInteger = __webpack_require__(/*! ../internals/to-integer */ "../../node_modules/core-js/internals/to-integer.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "../../node_modules/core-js/internals/to-length.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "../../node_modules/core-js/internals/to-object.js");
var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "../../node_modules/core-js/internals/array-species-create.js");
var createProperty = __webpack_require__(/*! ../internals/create-property */ "../../node_modules/core-js/internals/create-property.js");
var arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ "../../node_modules/core-js/internals/array-method-has-species-support.js");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');

var max = Math.max;
var min = Math.min;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

// `Array.prototype.splice` method
// https://tc39.es/ecma262/#sec-array.prototype.splice
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject(this);
    var len = toLength(O.length);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toInteger(deleteCount), 0), len - actualStart);
    }
    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }
    A = arraySpeciesCreate(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});


/***/ }),

/***/ "../../node_modules/core-js/modules/es.function.name.js":
/*!**************************************************************!*\
  !*** ../../node_modules/core-js/modules/es.function.name.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");
var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js").f;

var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// Function instances `.name` property
// https://tc39.es/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !(NAME in FunctionPrototype)) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}


/***/ }),

/***/ "../../node_modules/core-js/modules/es.object.keys.js":
/*!************************************************************!*\
  !*** ../../node_modules/core-js/modules/es.object.keys.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "../../node_modules/core-js/internals/to-object.js");
var nativeKeys = __webpack_require__(/*! ../internals/object-keys */ "../../node_modules/core-js/internals/object-keys.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});


/***/ }),

/***/ "../../node_modules/core-js/modules/es.object.to-string.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/core-js/modules/es.object.to-string.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ "../../node_modules/core-js/internals/to-string-tag-support.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "../../node_modules/core-js/internals/redefine.js");
var toString = __webpack_require__(/*! ../internals/object-to-string */ "../../node_modules/core-js/internals/object-to-string.js");

// `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString, { unsafe: true });
}


/***/ }),

/***/ "../../node_modules/core-js/modules/es.promise.js":
/*!********************************************************!*\
  !*** ../../node_modules/core-js/modules/es.promise.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "../../node_modules/core-js/internals/is-pure.js");
var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");
var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "../../node_modules/core-js/internals/get-built-in.js");
var NativePromise = __webpack_require__(/*! ../internals/native-promise-constructor */ "../../node_modules/core-js/internals/native-promise-constructor.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "../../node_modules/core-js/internals/redefine.js");
var redefineAll = __webpack_require__(/*! ../internals/redefine-all */ "../../node_modules/core-js/internals/redefine-all.js");
var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "../../node_modules/core-js/internals/object-set-prototype-of.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "../../node_modules/core-js/internals/set-to-string-tag.js");
var setSpecies = __webpack_require__(/*! ../internals/set-species */ "../../node_modules/core-js/internals/set-species.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");
var aFunction = __webpack_require__(/*! ../internals/a-function */ "../../node_modules/core-js/internals/a-function.js");
var anInstance = __webpack_require__(/*! ../internals/an-instance */ "../../node_modules/core-js/internals/an-instance.js");
var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "../../node_modules/core-js/internals/inspect-source.js");
var iterate = __webpack_require__(/*! ../internals/iterate */ "../../node_modules/core-js/internals/iterate.js");
var checkCorrectnessOfIteration = __webpack_require__(/*! ../internals/check-correctness-of-iteration */ "../../node_modules/core-js/internals/check-correctness-of-iteration.js");
var speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ "../../node_modules/core-js/internals/species-constructor.js");
var task = __webpack_require__(/*! ../internals/task */ "../../node_modules/core-js/internals/task.js").set;
var microtask = __webpack_require__(/*! ../internals/microtask */ "../../node_modules/core-js/internals/microtask.js");
var promiseResolve = __webpack_require__(/*! ../internals/promise-resolve */ "../../node_modules/core-js/internals/promise-resolve.js");
var hostReportErrors = __webpack_require__(/*! ../internals/host-report-errors */ "../../node_modules/core-js/internals/host-report-errors.js");
var newPromiseCapabilityModule = __webpack_require__(/*! ../internals/new-promise-capability */ "../../node_modules/core-js/internals/new-promise-capability.js");
var perform = __webpack_require__(/*! ../internals/perform */ "../../node_modules/core-js/internals/perform.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "../../node_modules/core-js/internals/internal-state.js");
var isForced = __webpack_require__(/*! ../internals/is-forced */ "../../node_modules/core-js/internals/is-forced.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");
var IS_BROWSER = __webpack_require__(/*! ../internals/engine-is-browser */ "../../node_modules/core-js/internals/engine-is-browser.js");
var IS_NODE = __webpack_require__(/*! ../internals/engine-is-node */ "../../node_modules/core-js/internals/engine-is-node.js");
var V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ "../../node_modules/core-js/internals/engine-v8-version.js");

var SPECIES = wellKnownSymbol('species');
var PROMISE = 'Promise';
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var NativePromisePrototype = NativePromise && NativePromise.prototype;
var PromiseConstructor = NativePromise;
var PromiseConstructorPrototype = NativePromisePrototype;
var TypeError = global.TypeError;
var document = global.document;
var process = global.process;
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;
var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
var NATIVE_REJECTION_EVENT = typeof PromiseRejectionEvent == 'function';
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var SUBCLASSING = false;
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

var FORCED = isForced(PROMISE, function () {
  var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);
  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
  // We can't detect it synchronously, so just check versions
  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
  // We need Promise#finally in the pure version for preventing prototype pollution
  if (IS_PURE && !PromiseConstructorPrototype['finally']) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (V8_VERSION >= 51 && /native code/.test(PromiseConstructor)) return false;
  // Detect correctness of subclassing with @@species support
  var promise = new PromiseConstructor(function (resolve) { resolve(1); });
  var FakePromise = function (exec) {
    exec(function () { /* empty */ }, function () { /* empty */ });
  };
  var constructor = promise.constructor = {};
  constructor[SPECIES] = FakePromise;
  SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
  if (!SUBCLASSING) return true;
  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
  return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_REJECTION_EVENT;
});

var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
});

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify = function (state, isReject) {
  if (state.notified) return;
  state.notified = true;
  var chain = state.reactions;
  microtask(function () {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var index = 0;
    // variable length - can't use forEach
    while (chain.length > index) {
      var reaction = chain[index++];
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(state);
            state.rejection = HANDLED;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // can throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (error) {
        if (domain && !exited) domain.exit();
        reject(error);
      }
    }
    state.reactions = [];
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (!NATIVE_REJECTION_EVENT && (handler = global['on' + name])) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (state) {
  task.call(global, function () {
    var promise = state.facade;
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (state) {
  task.call(global, function () {
    var promise = state.facade;
    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, state, unwrap) {
  return function (value) {
    fn(state, value, unwrap);
  };
};

var internalReject = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(state, true);
};

var internalResolve = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (state.facade === value) throw TypeError("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          then.call(value,
            bind(internalResolve, wrapper, state),
            bind(internalReject, wrapper, state)
          );
        } catch (error) {
          internalReject(wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(state, false);
    }
  } catch (error) {
    internalReject({ done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromiseConstructor, PROMISE);
    aFunction(executor);
    Internal.call(this);
    var state = getInternalState(this);
    try {
      executor(bind(internalResolve, state), bind(internalReject, state));
    } catch (error) {
      internalReject(state, error);
    }
  };
  PromiseConstructorPrototype = PromiseConstructor.prototype;
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: [],
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };
  Internal.prototype = redefineAll(PromiseConstructorPrototype, {
    // `Promise.prototype.then` method
    // https://tc39.es/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = IS_NODE ? process.domain : undefined;
      state.parent = true;
      state.reactions.push(reaction);
      if (state.state != PENDING) notify(state, false);
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.es/ecma262/#sec-promise.prototype.catch
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, state);
    this.reject = bind(internalReject, state);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (!IS_PURE && typeof NativePromise == 'function' && NativePromisePrototype !== Object.prototype) {
    nativeThen = NativePromisePrototype.then;

    if (!SUBCLASSING) {
      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
      redefine(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
        var that = this;
        return new PromiseConstructor(function (resolve, reject) {
          nativeThen.call(that, resolve, reject);
        }).then(onFulfilled, onRejected);
      // https://github.com/zloirock/core-js/issues/640
      }, { unsafe: true });

      // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
      redefine(NativePromisePrototype, 'catch', PromiseConstructorPrototype['catch'], { unsafe: true });
    }

    // make `.constructor === Promise` work for native promise-based APIs
    try {
      delete NativePromisePrototype.constructor;
    } catch (error) { /* empty */ }

    // make `instanceof Promise` work for native promise-based APIs
    if (setPrototypeOf) {
      setPrototypeOf(NativePromisePrototype, PromiseConstructorPrototype);
    }
  }
}

$({ global: true, wrap: true, forced: FORCED }, {
  Promise: PromiseConstructor
});

setToStringTag(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);

PromiseWrapper = getBuiltIn(PROMISE);

// statics
$({ target: PROMISE, stat: true, forced: FORCED }, {
  // `Promise.reject` method
  // https://tc39.es/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    capability.reject.call(undefined, r);
    return capability.promise;
  }
});

$({ target: PROMISE, stat: true, forced: IS_PURE || FORCED }, {
  // `Promise.resolve` method
  // https://tc39.es/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve(IS_PURE && this === PromiseWrapper ? PromiseConstructor : this, x);
  }
});

$({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
  // `Promise.all` method
  // https://tc39.es/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        $promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  },
  // `Promise.race` method
  // https://tc39.es/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      iterate(iterable, function (promise) {
        $promiseResolve.call(C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});


/***/ }),

/***/ "../../node_modules/core-js/modules/es.regexp.exec.js":
/*!************************************************************!*\
  !*** ../../node_modules/core-js/modules/es.regexp.exec.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");
var exec = __webpack_require__(/*! ../internals/regexp-exec */ "../../node_modules/core-js/internals/regexp-exec.js");

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),

/***/ "../../node_modules/core-js/modules/es.regexp.to-string.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/core-js/modules/es.regexp.to-string.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var redefine = __webpack_require__(/*! ../internals/redefine */ "../../node_modules/core-js/internals/redefine.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");
var flags = __webpack_require__(/*! ../internals/regexp-flags */ "../../node_modules/core-js/internals/regexp-flags.js");

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var nativeToString = RegExpPrototype[TO_STRING];

var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = nativeToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var p = String(R.source);
    var rf = R.flags;
    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? flags.call(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}


/***/ }),

/***/ "../../node_modules/core-js/modules/es.string.iterator.js":
/*!****************************************************************!*\
  !*** ../../node_modules/core-js/modules/es.string.iterator.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__(/*! ../internals/string-multibyte */ "../../node_modules/core-js/internals/string-multibyte.js").charAt;
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "../../node_modules/core-js/internals/internal-state.js");
var defineIterator = __webpack_require__(/*! ../internals/define-iterator */ "../../node_modules/core-js/internals/define-iterator.js");

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "../../node_modules/core-js/modules/es.string.match.js":
/*!*************************************************************!*\
  !*** ../../node_modules/core-js/modules/es.string.match.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__(/*! ../internals/fix-regexp-well-known-symbol-logic */ "../../node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "../../node_modules/core-js/internals/to-length.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../../node_modules/core-js/internals/require-object-coercible.js");
var advanceStringIndex = __webpack_require__(/*! ../internals/advance-string-index */ "../../node_modules/core-js/internals/advance-string-index.js");
var regExpExec = __webpack_require__(/*! ../internals/regexp-exec-abstract */ "../../node_modules/core-js/internals/regexp-exec-abstract.js");

// @@match logic
fixRegExpWellKnownSymbolLogic('match', function (MATCH, nativeMatch, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.es/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible(this);
      var matcher = regexp == undefined ? undefined : regexp[MATCH];
      return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
    function (string) {
      var res = maybeCallNative(nativeMatch, this, string);
      if (res.done) return res.value;

      var rx = anObject(this);
      var S = String(string);

      if (!rx.global) return regExpExec(rx, S);

      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});


/***/ }),

/***/ "../../node_modules/core-js/modules/es.weak-map.js":
/*!*********************************************************!*\
  !*** ../../node_modules/core-js/modules/es.weak-map.js ***!
  \*********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");
var redefineAll = __webpack_require__(/*! ../internals/redefine-all */ "../../node_modules/core-js/internals/redefine-all.js");
var InternalMetadataModule = __webpack_require__(/*! ../internals/internal-metadata */ "../../node_modules/core-js/internals/internal-metadata.js");
var collection = __webpack_require__(/*! ../internals/collection */ "../../node_modules/core-js/internals/collection.js");
var collectionWeak = __webpack_require__(/*! ../internals/collection-weak */ "../../node_modules/core-js/internals/collection-weak.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");
var enforceIternalState = __webpack_require__(/*! ../internals/internal-state */ "../../node_modules/core-js/internals/internal-state.js").enforce;
var NATIVE_WEAK_MAP = __webpack_require__(/*! ../internals/native-weak-map */ "../../node_modules/core-js/internals/native-weak-map.js");

var IS_IE11 = !global.ActiveXObject && 'ActiveXObject' in global;
// eslint-disable-next-line es/no-object-isextensible -- safe
var isExtensible = Object.isExtensible;
var InternalWeakMap;

var wrapper = function (init) {
  return function WeakMap() {
    return init(this, arguments.length ? arguments[0] : undefined);
  };
};

// `WeakMap` constructor
// https://tc39.es/ecma262/#sec-weakmap-constructor
var $WeakMap = module.exports = collection('WeakMap', wrapper, collectionWeak);

// IE11 WeakMap frozen keys fix
// We can't use feature detection because it crash some old IE builds
// https://github.com/zloirock/core-js/issues/485
if (NATIVE_WEAK_MAP && IS_IE11) {
  InternalWeakMap = collectionWeak.getConstructor(wrapper, 'WeakMap', true);
  InternalMetadataModule.REQUIRED = true;
  var WeakMapPrototype = $WeakMap.prototype;
  var nativeDelete = WeakMapPrototype['delete'];
  var nativeHas = WeakMapPrototype.has;
  var nativeGet = WeakMapPrototype.get;
  var nativeSet = WeakMapPrototype.set;
  redefineAll(WeakMapPrototype, {
    'delete': function (key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeDelete.call(this, key) || state.frozen['delete'](key);
      } return nativeDelete.call(this, key);
    },
    has: function has(key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas.call(this, key) || state.frozen.has(key);
      } return nativeHas.call(this, key);
    },
    get: function get(key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas.call(this, key) ? nativeGet.call(this, key) : state.frozen.get(key);
      } return nativeGet.call(this, key);
    },
    set: function set(key, value) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        nativeHas.call(this, key) ? nativeSet.call(this, key, value) : state.frozen.set(key, value);
      } else nativeSet.call(this, key, value);
      return this;
    }
  });
}


/***/ }),

/***/ "../../node_modules/core-js/modules/web.dom-collections.for-each.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/core-js/modules/web.dom-collections.for-each.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");
var DOMIterables = __webpack_require__(/*! ../internals/dom-iterables */ "../../node_modules/core-js/internals/dom-iterables.js");
var forEach = __webpack_require__(/*! ../internals/array-for-each */ "../../node_modules/core-js/internals/array-for-each.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../node_modules/core-js/internals/create-non-enumerable-property.js");

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
}


/***/ }),

/***/ "../../node_modules/core-js/modules/web.dom-collections.iterator.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/core-js/modules/web.dom-collections.iterator.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");
var DOMIterables = __webpack_require__(/*! ../internals/dom-iterables */ "../../node_modules/core-js/internals/dom-iterables.js");
var ArrayIteratorMethods = __webpack_require__(/*! ../modules/es.array.iterator */ "../../node_modules/core-js/modules/es.array.iterator.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../node_modules/core-js/internals/create-non-enumerable-property.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
}


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
/******/ 			// no module.id needed
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
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!*******************************!*\
  !*** ./js/4.0000/carousel.ts ***!
  \*******************************/
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "../../node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var shared_ts_components_carousel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! shared/ts/components/carousel */ "../../Shared-International/ts/components/carousel.ts");
/* harmony import */ var Shared_ts_api_carousel_slide_adapters_slide_carousel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Shared/ts/api/carousel/slide/adapters/slide-carousel */ "../../Shared-International/ts/api/carousel/slide/adapters/slide-carousel.ts");
/* harmony import */ var shared_ts_components_fade_carousel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! shared/ts/components/fade-carousel */ "../../Shared-International/ts/components/fade-carousel.ts");
/* harmony import */ var Shared_ts_api_carousel_slide_adapters_fade_slide_carousel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! Shared/ts/api/carousel/slide/adapters/fade-slide-carousel */ "../../Shared-International/ts/api/carousel/slide/adapters/fade-slide-carousel.ts");
/* harmony import */ var Shared_ts_components_vimeo_carousel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! Shared/ts/components/vimeo-carousel */ "../../Shared-International/ts/components/vimeo-carousel.ts");
/* harmony import */ var Shared_ts_api_carousel_slide_adapters_vimeo_slide_carousel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! Shared/ts/api/carousel/slide/adapters/vimeo-slide-carousel */ "../../Shared-International/ts/api/carousel/slide/adapters/vimeo-slide-carousel.ts");
/* harmony import */ var Shared_ts_components_responsive_carousel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! Shared/ts/components/responsive-carousel */ "../../Shared-International/ts/components/responsive-carousel.ts");
/* harmony import */ var Shared_ts_api_carousel_slide_adapters_responsive_slide_carousel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! Shared/ts/api/carousel/slide/adapters/responsive-slide-carousel */ "../../Shared-International/ts/api/carousel/slide/adapters/responsive-slide-carousel.ts");
/* harmony import */ var Shared_ts_observers_media_query__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! Shared/ts/observers/media-query */ "../../Shared-International/ts/observers/media-query.ts");
/* harmony import */ var shared_ts_utils_html__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! shared/ts/utils/html */ "../../Shared-International/ts/utils/html.ts");
/* harmony import */ var shared_ts_observers_intersection__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! shared/ts/observers/intersection */ "../../Shared-International/ts/observers/intersection.ts");
/* harmony import */ var shared_ts_utils_vimeo_manager__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! shared/ts/utils/vimeo-manager */ "../../Shared-International/ts/utils/vimeo-manager.ts");













var vimeoManager = new shared_ts_utils_vimeo_manager__WEBPACK_IMPORTED_MODULE_12__.default();
(0,shared_ts_utils_html__WEBPACK_IMPORTED_MODULE_10__.enumerateElements)(document.querySelectorAll("[data-vimeo-carousel-id]")).forEach(function (placeholder) {
    var id = placeholder.getAttribute("data-vimeo-carousel-id");
    vimeoManager.createoEmbedById(id).then(function (response) {
        try {
            var data = JSON.parse(response.response);
            placeholder.setAttribute("data-src-img", data.thumbnail_url);
        }
        catch (error) {
            console.warn(error);
        }
    });
});
var preloadSlideImageByIndex = function preloadSlideImageByIndex(container, index) {
    if ("app" in window && window.app.require(["lazy"])) {
        var slide = container.querySelectorAll(".slide__item").item(index);
        window.app.lazy(slide);
    }
};
(0,shared_ts_observers_intersection__WEBPACK_IMPORTED_MODULE_11__.observer)(".slide--vimeo-carousel", {
    inRange: function inRange(element) {
        var carousel = new Shared_ts_components_vimeo_carousel__WEBPACK_IMPORTED_MODULE_5__.default(new Shared_ts_api_carousel_slide_adapters_vimeo_slide_carousel__WEBPACK_IMPORTED_MODULE_6__.default(element));
        carousel.autoplay();
        carousel.enableThumbnailControls();
        carousel.on("rotation", function (currentIndex, prevIndex, nextIndex) {
            preloadSlideImageByIndex(element, currentIndex);
            preloadSlideImageByIndex(element, nextIndex);
        });
    },
    options: {
        threshold: [0.5]
    }
});
var generateRandomIntegerInRange = function generateRandomIntegerInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
(0,shared_ts_observers_intersection__WEBPACK_IMPORTED_MODULE_11__.observer)(".slide--fade", {
    inRange: function inRange(element) {
        var initialDelay = generateRandomIntegerInRange(3000, 5000);
        var carousel = new shared_ts_components_fade_carousel__WEBPACK_IMPORTED_MODULE_3__.default(new Shared_ts_api_carousel_slide_adapters_fade_slide_carousel__WEBPACK_IMPORTED_MODULE_4__.default(element));
        carousel.setAttributes({
            delay: initialDelay
        });
        carousel.autoplay();
        carousel.on("rotation", function (currentIndex) {
            var delay = currentIndex === 0 ? initialDelay : initialDelay * 1.5;
            carousel.setAttributes({
                delay: delay
            });
        });
    }
});
(0,shared_ts_observers_intersection__WEBPACK_IMPORTED_MODULE_11__.observer)(".slide--review", {
    inRange: function inRange(element) {
        var carousel = new Shared_ts_components_responsive_carousel__WEBPACK_IMPORTED_MODULE_7__.default(new Shared_ts_api_carousel_slide_adapters_responsive_slide_carousel__WEBPACK_IMPORTED_MODULE_8__.default(element));
        carousel.enablePrevNextControls();
        new Shared_ts_observers_media_query__WEBPACK_IMPORTED_MODULE_9__.default("(min-width: 1201px)").inbound(function (event) {
            carousel.setAttributes({
                steps: 3
            });
        });
        new Shared_ts_observers_media_query__WEBPACK_IMPORTED_MODULE_9__.default("(min-width: 1001px) and (max-width: 1200px)").inbound(function (event) {
            carousel.setAttributes({
                steps: 3
            });
        });
        new Shared_ts_observers_media_query__WEBPACK_IMPORTED_MODULE_9__.default("(min-width: 801px) and (max-width: 1000px)").inbound(function (event) {
            carousel.setAttributes({
                steps: 2
            });
        });
        new Shared_ts_observers_media_query__WEBPACK_IMPORTED_MODULE_9__.default("(max-width: 800px)").inbound(function (event) {
            carousel.setAttributes({
                steps: 1
            });
        });
    }
});
(0,shared_ts_observers_intersection__WEBPACK_IMPORTED_MODULE_11__.observer)(".product--single .slide--product:not(.slide--fade)", {
    inRange: function inRange(element) {
        var carousel = new shared_ts_components_carousel__WEBPACK_IMPORTED_MODULE_1__.default(new Shared_ts_api_carousel_slide_adapters_slide_carousel__WEBPACK_IMPORTED_MODULE_2__.default(element));
        carousel.on("rotation", function (currentIndex) {
            return preloadSlideImageByIndex(element, currentIndex);
        });
    }
});

}();
/******/ })()
;
//# sourceMappingURL=carousel.js.map