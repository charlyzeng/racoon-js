(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["racoon"] = factory();
	else
		root["racoon"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

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

module.exports = _createClass;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(13);

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(24);

var assertThisInitialized = __webpack_require__(25);

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(11)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _validateError) {
  "use strict";

  var _interopRequireDefault = __webpack_require__(0);

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.getType = getType;
  _exports.isUndefined = isUndefined;
  _exports.isNull = isNull;
  _exports.isNaN = isNaN;
  _exports.isString = isString;
  _exports.isNumber = isNumber;
  _exports.isInt = isInt;
  _exports.isInfinity = isInfinity;
  _exports.isBoolean = isBoolean;
  _exports.isRegExp = isRegExp;
  _exports.isObject = isObject;
  _exports.isArray = isArray;
  _exports.isNotRequired = isNotRequired;
  _exports.isEmpty = isEmpty;
  _exports.isFunction = isFunction;
  _exports.isStringNumber = isStringNumber;
  _exports.isCustomError = isCustomError;
  _exports.isFinalError = isFinalError;
  _validateError = _interopRequireDefault(_validateError);
  var toString = Object.prototype.toString;

  function getType(val) {
    var str = toString.call(val);
    return str.substring(8, str.length - 1);
  }

  function isUndefined(val) {
    return val === undefined;
  }

  function isNull(val) {
    return val === null;
  }

  function isNaN(val) {
    return val !== val;
  }

  function isString(val) {
    return typeof val === 'string';
  }

  function isNumber(val) {
    return typeof val === 'number';
  }

  function isInt(val) {
    return isNumber(val) && val % 1 === 0;
  }

  function isInfinity(val) {
    return val === Number.POSITIVE_INFINITY || val === Number.NEGATIVE_INFINITY;
  }

  function isBoolean(val) {
    return typeof val === 'boolean';
  }

  function isRegExp(val) {
    return val instanceof RegExp;
  }

  function isObject(val) {
    return getType(val) === 'Object';
  }

  function isArray(val) {
    return getType(val) === 'Array';
  }

  function isNotRequired(val) {
    return isUndefined(val) || isNull(val);
  }

  function isEmpty(val) {
    var type = getType(val);

    if (type === 'Object') {
      return Object.keys(val).length === 0;
    }

    if (type === 'Array') {
      return val.length === 0;
    }

    return isNotRequired(val) || isNaN(val) || val === '';
  }
  /**
   * Check if the value is Function. AsyncFunction or GeneratorFunction will
   * return false.
   *
   * @param {*} val The value to check.
   */


  function isFunction(val) {
    return getType(val) === 'Function';
  }
  /**
   * Detect string whether can be parsed to number by `Number('xxx')`.
   *
   * Special case:
   * When the detected string is empty or only includes white spaces, the string
   * can be parsed to zero although, but it won't be regarded as a parsable
   * string still.
   *
   * @param {string} val The detected string.
   * @returns {boolean}
   */


  function isStringNumber(val) {
    if (/^\s*$/.test(val)) {
      return false;
    }

    return !isNaN(Number(val));
  }
  /**
   * Check the error is a customed ValidateError.
   *
   * @param {Error} error The error object to check.
   */


  function isCustomError(error) {
    return error instanceof _validateError.default && error.custom;
  }
  /**
   * Check the error is a final ValidateError.
   *
   * @param {Error} error The error object to check.
   */


  function isFinalError(error) {
    return error instanceof _validateError.default && error.final;
  }
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1), __webpack_require__(2), __webpack_require__(6), __webpack_require__(11)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _classCallCheck2, _createClass2, _is, _validateError) {
  "use strict";

  var _interopRequireDefault = __webpack_require__(0);

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _validateError = _interopRequireDefault(_validateError);

  /**
   * The base class of all restrict.
   */
  var RestrictBase = /*#__PURE__*/function () {
    function RestrictBase() {
      (0, _classCallCheck2.default)(this, RestrictBase);
      this.errorConfig = {
        ctx: null,
        message: ''
      };
    }

    (0, _createClass2.default)(RestrictBase, [{
      key: "setErrorMessage",

      /**
       * set errorConfig
       *
       * @param {String|Function} message The message of error.
       * @param {*} [ctx] The execute context when message is a function.
       */
      value: function setErrorMessage(message, ctx) {
        this.errorConfig = {
          ctx: ctx,
          message: message
        };
      }
      /**
       * Get the final error message when validate fail.
       *
       * @param {String} originMessage The origin message that throwed by racoon.
       * @returns {ValidateError}
       */

    }, {
      key: "getError",
      value: function getError(originMessage) {
        var _this$errorConfig = this.errorConfig,
            message = _this$errorConfig.message,
            ctx = _this$errorConfig.ctx;

        if ((0, _is.isFunction)(message)) {
          return new _validateError.default(message.call(ctx, originMessage), {
            custom: true
          });
        }

        if (message && (0, _is.isString)(message)) {
          return new _validateError.default(message, {
            custom: true
          });
        }

        return new _validateError.default(originMessage);
      }
    }]);
    return RestrictBase;
  }();

  _exports.default = RestrictBase;
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1), __webpack_require__(2), __webpack_require__(6), __webpack_require__(11), __webpack_require__(31), __webpack_require__(32)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _classCallCheck2, _createClass2, _is, _validateError, _required, _custom) {
  "use strict";

  var _interopRequireDefault = __webpack_require__(0);

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _validateError = _interopRequireDefault(_validateError);
  _required = _interopRequireDefault(_required);
  _custom = _interopRequireDefault(_custom);

  /**
   * Base class for all schema classes.
   */
  var SchemaBase = /*#__PURE__*/function () {
    function SchemaBase() {
      (0, _classCallCheck2.default)(this, SchemaBase);
      this.restricts = [];
      this.typeRestrict = null;
      this.requiredRestrict = null;
      this.lastRestrict = null;
      this.defaultConfig = {
        enable: false,
        strict: false,
        ctx: null,
        value: undefined
      };
      this.formatterConfig = {
        ctx: undefined,
        formatter: function formatter(val) {
          return val;
        }
      };
      this.errorForAllConfig = {
        enable: false,
        ctx: undefined,
        message: ''
      };
    }

    (0, _createClass2.default)(SchemaBase, [{
      key: "validate",

      /**
       * Validate value.
       *
       * @param {*} val The detected value.
       */
      value: function validate(val) {
        // When it's not required, and the detected value is undefined or null, then it's no need
        // to validate any more, just return default value or default value after formated.
        if (!this.requiredRestrict && (0, _is.isNotRequired)(val)) {
          return this.getReturnValue(val);
        }

        try {
          this.checkType(val);
          this.checkRequired(val);
          this.checkRestricts(val);
          return this.getReturnValue(val);
        } catch (error) {
          if ((0, _is.isCustomError)(error)) {
            throw error;
          }

          var errorForAll = this.getErrorForAll(error.message);

          if (errorForAll) {
            throw errorForAll;
          }

          throw error;
        }
      }
      /**
       * Validate value by silent. The deference from validate method is that validate method will
       * throw an error when validate fail, but validateSilent will not.
       *
       * @param {*} val The detected value.
       */

    }, {
      key: "validateSilent",
      value: function validateSilent(val) {
        try {
          return {
            value: this.validate(val)
          };
        } catch (error) {
          return {
            error: error,
            value: val
          };
        }
      }
      /**
       * Add a "required" restrict to schema.
       *
       * @param {Boolean} [strict] Whether enable strict mode. By default, the mode
       * is non-strict. If you pass strict exactly true, it will enable strict mode.
       */

    }, {
      key: "required",
      value: function required(strict) {
        this.requiredRestrict = new _required.default(strict);
        this.lastRestrict = this.requiredRestrict;
        return this;
      }
      /**
       * Add a "custom" restrict to schema.
       *
       * @param {Function} restrictFn The custom restrict callback function.
       * @param {*}        [ctx]      The exec context of restrictFn.
       */

    }, {
      key: "custom",
      value: function custom(restrictFn, ctx) {
        var restrict = new _custom.default(restrictFn, ctx);
        this.restricts.push(restrict);
        this.lastRestrict = restrict;
        return this;
      }
      /**
       * Set custom error message for the last restrict added to schema.
       *
       * @param {String|Function} message The custom error message.
       * @param {*}               ctx     The excute context when message is a function.
       */

    }, {
      key: "error",
      value: function error(message, ctx) {
        this.ensureMessageType(message);
        this.lastRestrict.setErrorMessage(message, ctx);
        return this;
      }
      /**
       * Set custom error message for all restrict. The message setted by `error` method
       * is priority to that setted by `errorForAll`.
       *
       * @param {String|Function} message The custom error message.
       * @param {*}               ctx     The excute context when message is a function.
       */

    }, {
      key: "errorForAll",
      value: function errorForAll(message, ctx) {
        this.ensureMessageType(message);
        this.errorForAllConfig = {
          enable: true,
          message: message,
          ctx: ctx
        };
        return this;
      }
      /**
       * Set the default return value of validate when the detected value is empty.
       *
       * @param {*}       args[0] The default return value.
       * @param {boolean} args[1] Whether to enable strict mode.
       * @param {*}       args[2] The execute context of value when value is a function.
       */

    }, {
      key: "default",
      value: function _default() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        if (args.length === 0) {
          throw new Error('default arguments should not be empty');
        }

        var value = args[0],
            strict = args[1],
            ctx = args[2];
        this.defaultConfig = {
          ctx: ctx,
          value: value,
          enable: true,
          strict: strict === true
        };
        return this;
      }
      /**
       * Format the return value of validate method.
       *
       * @param {Function} formatter The function that format the return value.
       * @param {*}        [ctx]     The execute context of formatter.
       */

    }, {
      key: "format",
      value: function format(formatter, ctx) {
        if (typeof formatter !== 'function') {
          throw new TypeError('`formatter` should be a type of function');
        }

        this.formatterConfig = {
          ctx: ctx,
          formatter: formatter
        };
        return this;
      }
      /**
       * Get the last return value of validate.
       *
       * @param {*} val The origin detected value.
       */

    }, {
      key: "getReturnValue",
      value: function getReturnValue(val) {
        var _this$defaultConfig = this.defaultConfig,
            enable = _this$defaultConfig.enable,
            strict = _this$defaultConfig.strict;
        var _this$formatterConfig = this.formatterConfig,
            formatter = _this$formatterConfig.formatter,
            ctx = _this$formatterConfig.ctx;

        if (enable && strict && (0, _is.isEmpty)(val)) {
          return formatter.call(ctx, this.getDefaultReturnValue(val));
        }

        return this.getReturnValueWithoutStrict(val);
      }
      /**
       * Get the default return value of validate.
       *
       * @param {*} val The origin detected value.
       */

    }, {
      key: "getDefaultReturnValue",
      value: function getDefaultReturnValue(val) {
        var _this$defaultConfig2 = this.defaultConfig,
            value = _this$defaultConfig2.value,
            ctx = _this$defaultConfig2.ctx;

        if (typeof value === 'function') {
          return value.call(ctx, val);
        }

        return value;
      }
      /**
       * Get the error message for all restricts.
       *
       * @param {string} originalMessage The origin error message throwed by racoon.
       */

    }, {
      key: "getErrorForAll",
      value: function getErrorForAll(originalMessage) {
        var _this$errorForAllConf = this.errorForAllConfig,
            ctx = _this$errorForAllConf.ctx,
            enable = _this$errorForAllConf.enable,
            message = _this$errorForAllConf.message;

        if (enable !== true) {
          return null;
        }

        if ((0, _is.isFunction)(message)) {
          return new _validateError.default(message.call(ctx, originalMessage));
        }

        return new _validateError.default(message);
      }
      /**
       * Check if the detected value's type is right.
       *
       * @param {*} val The detected value.
       */

    }, {
      key: "checkType",
      value: function checkType(val) {
        return this.typeRestrict.validate(val);
      }
      /**
       * Check if the detected value meet "required" restrict.
       *
       * @param {*} val The detected value.
       */

    }, {
      key: "checkRequired",
      value: function checkRequired(val) {
        if (!this.requiredRestrict) {
          return true;
        }

        return this.requiredRestrict.validate(val);
      }
      /**
       * Check all restricts for the detected value.
       *
       * @param {*} val The detected value
       */

    }, {
      key: "checkRestricts",
      value: function checkRestricts(val) {
        this.restricts.forEach(function (restrict) {
          restrict.validate(val);
        });
        return true;
      }
      /**
       * Throw error without key chain when:
       * 1. The error is the final error, it's no need to add key chain.
       * 2. Or the error is custom error, it should not to add key chain.
       *
       * @param {Error} error The origin error object.
       */

    }, {
      key: "throwErrorWithoutKeyChainIfNeeded",
      value: function throwErrorWithoutKeyChainIfNeeded(error) {
        if ((0, _is.isFinalError)(error)) {
          throw error;
        }

        if ((0, _is.isCustomError)(error)) {
          throw new _validateError.default(error.message, {
            final: true
          });
        }
      }
      /**
       * @private
       * Check if message is a valid type.
       *
       * @param {*} message The message param user passed.
       */

    }, {
      key: "ensureMessageType",
      value: function ensureMessageType(message) {
        if (!(0, _is.isString)(message) && !(0, _is.isFunction)(message)) {
          throw new TypeError('`message` should be a type of string or function');
        }
      }
      /**
       * @private
       * Get the last return value of validate. This is for non-strict mode scene.
       *
       * @param {*} val The origin return value.
       */

    }, {
      key: "getReturnValueWithoutStrict",
      value: function getReturnValueWithoutStrict(val) {
        var enable = this.defaultConfig.enable;
        var _this$formatterConfig2 = this.formatterConfig,
            formatter = _this$formatterConfig2.formatter,
            ctx = _this$formatterConfig2.ctx;
        var value = val; // If there is a default return value, then format the default value and
        // return it.

        if (enable && ((0, _is.isNotRequired)(val) || (0, _is.isNaN)(val))) {
          value = this.getDefaultReturnValue(val);
        } // Otherwise, format the origin return value and return it.


        return formatter.call(ctx, value);
      }
    }]);
    return SchemaBase;
  }();

  _exports.default = SchemaBase;
});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(13);

var isNativeReflectConstruct = __webpack_require__(21);

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

module.exports = _construct;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.useKeyChainSymbol = _exports.TYPE = void 0;
  var TYPE = {
    number: 'number',
    string: 'string',
    boolean: 'boolean',
    object: 'object',
    array: 'array',
    any: 'any'
  };
  _exports.TYPE = TYPE;
  var useKeyChainSymbol = Symbol('#useKeyChainSymbol');
  _exports.useKeyChainSymbol = useKeyChainSymbol;
});

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1), __webpack_require__(2), __webpack_require__(14), __webpack_require__(4), __webpack_require__(5), __webpack_require__(3), __webpack_require__(28)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _classCallCheck2, _createClass2, _get2, _inherits2, _possibleConstructorReturn2, _getPrototypeOf2, _wrapNativeSuper2) {
  "use strict";

  var _interopRequireDefault = __webpack_require__(0);

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _get2 = _interopRequireDefault(_get2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _wrapNativeSuper2 = _interopRequireDefault(_wrapNativeSuper2);

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var ValidateError = /*#__PURE__*/function (_Error) {
    (0, _inherits2.default)(ValidateError, _Error);

    var _super = _createSuper(ValidateError);

    function ValidateError(message) {
      var _this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      (0, _classCallCheck2.default)(this, ValidateError);
      _this = _super.call(this, message);
      _this.custom = false;
      _this.final = false;
      var _options$custom = options.custom,
          custom = _options$custom === void 0 ? false : _options$custom,
          _options$final = options.final,
          final = _options$final === void 0 ? false : _options$final;
      _this.custom = custom;
      _this.final = final;
      return _this;
    }

    (0, _createClass2.default)(ValidateError, [{
      key: "toString",
      value: function toString() {
        return "Validate".concat((0, _get2.default)((0, _getPrototypeOf2.default)(ValidateError.prototype), "toString", this).call(this));
      }
    }]);
    return ValidateError;
  }( /*#__PURE__*/(0, _wrapNativeSuper2.default)(Error));

  _exports.default = ValidateError;
});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1), __webpack_require__(2), __webpack_require__(4), __webpack_require__(5), __webpack_require__(3), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _classCallCheck2, _createClass2, _inherits2, _possibleConstructorReturn2, _getPrototypeOf2, _base) {
  "use strict";

  var _interopRequireDefault = __webpack_require__(0);

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _base = _interopRequireDefault(_base);

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var RestrictEnum = /*#__PURE__*/function (_RestrictBase) {
    (0, _inherits2.default)(RestrictEnum, _RestrictBase);

    var _super = _createSuper(RestrictEnum);

    /**
     * @param {Array<*>} values The enum values that restrict the detected value can be.
     */
    function RestrictEnum() {
      var _this;

      (0, _classCallCheck2.default)(this, RestrictEnum);
      _this = _super.call(this);
      _this.enumValues = null;

      for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
        values[_key] = arguments[_key];
      }

      if (values.length === 0) {
        throw new RangeError('enum arguments should not be empty');
      }

      _this.enumValues = values;
      return _this;
    }
    /**
     * Check the detected value whether meets this "enum" restrict.
     *
     * @param {*} val The detected value.
     */


    (0, _createClass2.default)(RestrictEnum, [{
      key: "validate",
      value: function validate(val) {
        if (this.enumValues.indexOf(val) === -1) {
          throw this.getError("value should be one of ".concat(JSON.stringify(this.enumValues)));
        }
      }
    }]);
    return RestrictEnum;
  }(_base.default);

  _exports.default = RestrictEnum;
});

/***/ }),
/* 13 */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var superPropBase = __webpack_require__(27);

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    module.exports = _get = Reflect.get;
  } else {
    module.exports = _get = function _get(target, property, receiver) {
      var base = superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

module.exports = _get;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1), __webpack_require__(2), __webpack_require__(4), __webpack_require__(5), __webpack_require__(3), __webpack_require__(7), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _classCallCheck2, _createClass2, _inherits2, _possibleConstructorReturn2, _getPrototypeOf2, _base, _is) {
  "use strict";

  var _interopRequireDefault = __webpack_require__(0);

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _base = _interopRequireDefault(_base);

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var RestrictLengthMax = /*#__PURE__*/function (_RestrictBase) {
    (0, _inherits2.default)(RestrictLengthMax, _RestrictBase);

    var _super = _createSuper(RestrictLengthMax);

    /**
     * @param {Number}  max      The max length of detected value.
     * @param {Boolean} [closed] Whether it's a closed interval. By default, the interval
     * is closed, which means the length of the detected value can be equal to max. When
     * closed is exactly false, the interval will be opened.
     */
    function RestrictLengthMax(max, closed) {
      var _this;

      (0, _classCallCheck2.default)(this, RestrictLengthMax);
      _this = _super.call(this);

      if ((0, _is.isNumber)(max) === false) {
        throw new TypeError('`max` should be a type of number');
      }

      _this.max = max;
      _this.closed = closed !== false;
      return _this;
    }
    /**
     * Check the detected value whether meets this "length-max" restrict.
     *
     * @param {*} val The detected value.
     */


    (0, _createClass2.default)(RestrictLengthMax, [{
      key: "validate",
      value: function validate(val) {
        if (this.closed && val.length > this.max) {
          throw this.getError("value length should be less than or equal to ".concat(this.max));
        }

        if (!this.closed && val.length >= this.max) {
          throw this.getError("value length should be less than ".concat(this.max));
        }

        return true;
      }
    }]);
    return RestrictLengthMax;
  }(_base.default);

  _exports.default = RestrictLengthMax;
});

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1), __webpack_require__(2), __webpack_require__(4), __webpack_require__(5), __webpack_require__(3), __webpack_require__(7), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _classCallCheck2, _createClass2, _inherits2, _possibleConstructorReturn2, _getPrototypeOf2, _base, _is) {
  "use strict";

  var _interopRequireDefault = __webpack_require__(0);

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _base = _interopRequireDefault(_base);

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var RestrictLengthMin = /*#__PURE__*/function (_RestrictBase) {
    (0, _inherits2.default)(RestrictLengthMin, _RestrictBase);

    var _super = _createSuper(RestrictLengthMin);

    /**
     * @param {Number}  min      The min length of detected value.
     * @param {Boolean} [closed] Whether it's a closed interval. By default, the interval
     * is closed, which means the length of the detected value can be equal to min. When
     * closed is exactly false, the interval will be opened.
     */
    function RestrictLengthMin(min, closed) {
      var _this;

      (0, _classCallCheck2.default)(this, RestrictLengthMin);
      _this = _super.call(this);

      if ((0, _is.isNumber)(min) === false) {
        throw new TypeError('`min` should be a type of number');
      }

      _this.min = min;
      _this.closed = closed !== false;
      return _this;
    }
    /**
     * Check the detected value whether meets this "length-min" restrict.
     *
     * @param {*} val The detected value.
     */


    (0, _createClass2.default)(RestrictLengthMin, [{
      key: "validate",
      value: function validate(val) {
        if (this.closed && val.length < this.min) {
          throw this.getError("value length should be greater than or equal to ".concat(this.min));
        }

        if (!this.closed && val.length <= this.min) {
          throw this.getError("value length should greater than ".concat(this.min));
        }

        return true;
      }
    }]);
    return RestrictLengthMin;
  }(_base.default);

  _exports.default = RestrictLengthMin;
});

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(45);

var iterableToArray = __webpack_require__(46);

var unsupportedIterableToArray = __webpack_require__(47);

var nonIterableSpread = __webpack_require__(48);

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = getKeyStr;

  /**
   * Get key chain string.
   * @example
   * const keyChainStr = getKeyStr([
   *   {
   *     type: 'prop',
   *     key: 'peoples',
   *   },
   *   {
   *     type: 'index',
   *     key: 2,
   *   },
   *   {
   *     type: 'prop',
   *     key: 'friend',
   *   },
   *   {
   *     type: 'prop',
   *     key: 'first name',
   *   },
   * ]);
   * assert(keyChainStr === 'peoples[0].friend[\'first name\']');
   *
   * @param {Array} keyChain Key chain list.
   */
  function getKeyStr(keyChain) {
    var propReg = /^[_$a-z][_$a-z\d]*$/i;
    var result = '';
    keyChain.forEach(function (_ref) {
      var type = _ref.type,
          key = _ref.key;

      if (type === 'prop' && propReg.test(key)) {
        if (result) {
          result += ".".concat(key);
        } else {
          result += key;
        }
      } else if (type === 'prop') {
        result += "['".concat(key, "']");
      } else if (type === 'index') {
        result += "[".concat(key, "]");
      }
    });
    return result;
  }
});

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(9), __webpack_require__(22)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _construct2, _schema) {
  "use strict";

  var _interopRequireDefault = __webpack_require__(0);

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.any = any;
  _exports.number = number;
  _exports.string = string;
  _exports.boolean = boolean;
  _exports.object = object;
  _exports.array = array;
  _exports.mixed = mixed;
  _exports.default = void 0;
  _construct2 = _interopRequireDefault(_construct2);

  function any() {
    return new _schema.SchemaAny();
  }

  function number() {
    return new _schema.SchemaNumber();
  }

  function string() {
    return new _schema.SchemaString();
  }

  function boolean() {
    return new _schema.SchemaBoolean();
  }

  function object(config) {
    return new _schema.SchemaObject(config);
  }

  function array(itemSchema) {
    return new _schema.SchemaArray(itemSchema);
  }

  function mixed() {
    for (var _len = arguments.length, schemas = new Array(_len), _key = 0; _key < _len; _key++) {
      schemas[_key] = arguments[_key];
    }

    return (0, _construct2.default)(_schema.SchemaMixed, schemas);
  }

  var _default = {
    any: any,
    number: number,
    string: string,
    boolean: boolean,
    object: object,
    array: array,
    mixed: mixed
  };
  _exports.default = _default;
});

/***/ }),
/* 21 */
/***/ (function(module, exports) {

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = _isNativeReflectConstruct;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(23), __webpack_require__(33), __webpack_require__(39), __webpack_require__(42), __webpack_require__(44), __webpack_require__(50), __webpack_require__(52)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _any, _number, _string, _boolean, _object, _arrary, _mixed) {
  "use strict";

  var _interopRequireDefault = __webpack_require__(0);

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "SchemaAny", {
    enumerable: true,
    get: function get() {
      return _any.default;
    }
  });
  Object.defineProperty(_exports, "SchemaNumber", {
    enumerable: true,
    get: function get() {
      return _number.default;
    }
  });
  Object.defineProperty(_exports, "SchemaString", {
    enumerable: true,
    get: function get() {
      return _string.default;
    }
  });
  Object.defineProperty(_exports, "SchemaBoolean", {
    enumerable: true,
    get: function get() {
      return _boolean.default;
    }
  });
  Object.defineProperty(_exports, "SchemaObject", {
    enumerable: true,
    get: function get() {
      return _object.default;
    }
  });
  Object.defineProperty(_exports, "SchemaArray", {
    enumerable: true,
    get: function get() {
      return _arrary.default;
    }
  });
  Object.defineProperty(_exports, "SchemaMixed", {
    enumerable: true,
    get: function get() {
      return _mixed.default;
    }
  });
  _any = _interopRequireDefault(_any);
  _number = _interopRequireDefault(_number);
  _string = _interopRequireDefault(_string);
  _boolean = _interopRequireDefault(_boolean);
  _object = _interopRequireDefault(_object);
  _arrary = _interopRequireDefault(_arrary);
  _mixed = _interopRequireDefault(_mixed);
});

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(9), __webpack_require__(1), __webpack_require__(2), __webpack_require__(4), __webpack_require__(5), __webpack_require__(3), __webpack_require__(10), __webpack_require__(26), __webpack_require__(30), __webpack_require__(12), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _construct2, _classCallCheck2, _createClass2, _inherits2, _possibleConstructorReturn2, _getPrototypeOf2, _constants, _anySchema, _anyRequired, _enum2, _base) {
  "use strict";

  var _interopRequireDefault = __webpack_require__(0);

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _construct2 = _interopRequireDefault(_construct2);
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _anySchema = _interopRequireDefault(_anySchema);
  _anyRequired = _interopRequireDefault(_anyRequired);
  _enum2 = _interopRequireDefault(_enum2);
  _base = _interopRequireDefault(_base);

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var SchemaAny = /*#__PURE__*/function (_SchemaBase) {
    (0, _inherits2.default)(SchemaAny, _SchemaBase);

    var _super = _createSuper(SchemaAny);

    function SchemaAny() {
      var _this;

      (0, _classCallCheck2.default)(this, SchemaAny);
      _this = _super.call(this);
      _this.type = _constants.TYPE.any;
      _this.typeRestrict = new _anySchema.default();
      _this.lastRestrict = _this.typeRestrict;
      return _this;
    }
    /**
     * Add a "required" restrict to any schema.
     *
     * @param {Boolean} [strict] Whether enable strict mode. By default, the mode
     * is non-strict. If you pass strict exactly true, it will enable strict mode.
     */


    (0, _createClass2.default)(SchemaAny, [{
      key: "required",
      value: function required(strict) {
        this.requiredRestrict = new _anyRequired.default(strict);
        this.lastRestrict = this.requiredRestrict;
        return this;
      }
      /**
       * Add an "enum" restrict to any schema.
       *
       * @param {Array<*>} values The enum values that restrict the detected value can be.
       */

    }, {
      key: "enum",
      value: function _enum() {
        for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
          values[_key] = arguments[_key];
        }

        var restrict = (0, _construct2.default)(_enum2.default, values);
        this.restricts.push(restrict);
        this.lastRestrict = restrict;
        return this;
      }
    }]);
    return SchemaAny;
  }(_base.default);

  _exports.default = SchemaAny;
});

/***/ }),
/* 24 */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),
/* 25 */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1), __webpack_require__(2), __webpack_require__(4), __webpack_require__(5), __webpack_require__(3), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _classCallCheck2, _createClass2, _inherits2, _possibleConstructorReturn2, _getPrototypeOf2, _base) {
  "use strict";

  var _interopRequireDefault = __webpack_require__(0);

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _base = _interopRequireDefault(_base);

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var RestrictAnySchema = /*#__PURE__*/function (_RestrictBase) {
    (0, _inherits2.default)(RestrictAnySchema, _RestrictBase);

    var _super = _createSuper(RestrictAnySchema);

    function RestrictAnySchema() {
      (0, _classCallCheck2.default)(this, RestrictAnySchema);
      return _super.apply(this, arguments);
    }

    (0, _createClass2.default)(RestrictAnySchema, [{
      key: "validate",

      /**
       * Check the detected value whether meets this "any-schema" restrict.
       *
       * @param {*} val The detected value.
       */
      value: function validate() {
        return true;
      }
    }]);
    return RestrictAnySchema;
  }(_base.default);

  _exports.default = RestrictAnySchema;
});

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__(3);

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

module.exports = _superPropBase;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__(3);

var setPrototypeOf = __webpack_require__(13);

var isNativeFunction = __webpack_require__(29);

var construct = __webpack_require__(9);

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return construct(Class, arguments, getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

module.exports = _wrapNativeSuper;

/***/ }),
/* 29 */
/***/ (function(module, exports) {

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

module.exports = _isNativeFunction;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1), __webpack_require__(2), __webpack_require__(4), __webpack_require__(5), __webpack_require__(3), __webpack_require__(7), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _classCallCheck2, _createClass2, _inherits2, _possibleConstructorReturn2, _getPrototypeOf2, _base, _is) {
  "use strict";

  var _interopRequireDefault = __webpack_require__(0);

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _base = _interopRequireDefault(_base);

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var RestrictAnyRequired = /*#__PURE__*/function (_RestrictBase) {
    (0, _inherits2.default)(RestrictAnyRequired, _RestrictBase);

    var _super = _createSuper(RestrictAnyRequired);

    /**
     * @param {Boolean} strict Whether to enable strict mode. By default, strict mode
     * is disabled. If strict param is passed to exactly true, strict mode will be
     * enabled.
     */
    function RestrictAnyRequired(strict) {
      var _this;

      (0, _classCallCheck2.default)(this, RestrictAnyRequired);
      _this = _super.call(this);
      _this.strict = false;
      _this.strict = strict === true;
      return _this;
    }
    /**
     * Check the detected value whether meets this "any-required" restrict.
     *
     * @param {*} val The detected value.
     */


    (0, _createClass2.default)(RestrictAnyRequired, [{
      key: "validate",
      value: function validate(val) {
        var strict = this.strict; // In non-strict mode, if the detected value is undefined, null or NaN, the
        // validation will be fail.

        if (!strict && ((0, _is.isNotRequired)(val) || (0, _is.isNaN)(val))) {
          throw this.getError('value is required and should not be undefined/null/NaN');
        }

        if (strict === true && (0, _is.isEmpty)(val)) {
          throw this.getError('value is required and should not be empty');
        }
      }
    }]);
    return RestrictAnyRequired;
  }(_base.default);

  _exports.default = RestrictAnyRequired;
});

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1), __webpack_require__(2), __webpack_require__(4), __webpack_require__(5), __webpack_require__(3), __webpack_require__(7), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _classCallCheck2, _createClass2, _inherits2, _possibleConstructorReturn2, _getPrototypeOf2, _base, _is) {
  "use strict";

  var _interopRequireDefault = __webpack_require__(0);

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _base = _interopRequireDefault(_base);

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var RestrictRequired = /*#__PURE__*/function (_RestrictBase) {
    (0, _inherits2.default)(RestrictRequired, _RestrictBase);

    var _super = _createSuper(RestrictRequired);

    /**
     * @param {Boolean} [strict] Whether enable strict mode. By default, the mode
     * is non-strict. If you pass strict exactly true, it will enable strict mode.
     */
    function RestrictRequired(strict) {
      var _this;

      (0, _classCallCheck2.default)(this, RestrictRequired);
      _this = _super.call(this);
      _this.strict = false;
      _this.strict = strict === true;
      return _this;
    }
    /**
     * Check the detected value whether meets this "required" restrict.
     *
     * @param {*} val The detected value.
     */


    (0, _createClass2.default)(RestrictRequired, [{
      key: "validate",
      value: function validate(val) {
        var strict = this.strict;

        if (strict && (0, _is.isEmpty)(val)) {
          throw this.getError('value is required and should not be empty');
        }

        if (!strict && (0, _is.isNotRequired)(val)) {
          throw this.getError('value is required and should not be undefined/null');
        }
      }
    }]);
    return RestrictRequired;
  }(_base.default);

  _exports.default = RestrictRequired;
});

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1), __webpack_require__(2), __webpack_require__(4), __webpack_require__(5), __webpack_require__(3), __webpack_require__(6), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _classCallCheck2, _createClass2, _inherits2, _possibleConstructorReturn2, _getPrototypeOf2, _is, _base) {
  "use strict";

  var _interopRequireDefault = __webpack_require__(0);

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _base = _interopRequireDefault(_base);

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var RestrictCustom = /*#__PURE__*/function (_RestrictBase) {
    (0, _inherits2.default)(RestrictCustom, _RestrictBase);

    var _super = _createSuper(RestrictCustom);

    /**
     * If restrictFn throws an error or returns a string, the validation
     * will be fail. The message of error or the returned string respect
     * the error message of validation.
     *
     * @param {Function} restrictFn The custom restrict callback function.
     * @param {*}        [ctx]      The exec context of restrictFn.
     */
    function RestrictCustom(restrictFn, ctx) {
      var _this;

      (0, _classCallCheck2.default)(this, RestrictCustom);
      _this = _super.call(this);
      _this.ctx = null;
      _this.restrictFn = null;

      if ((0, _is.isFunction)(restrictFn) === false) {
        throw new TypeError('`restrictFn` should be a type of function');
      }

      _this.restrictFn = restrictFn;
      _this.ctx = ctx;
      return _this;
    }
    /**
     * Check the detected value whether meets this "custom" restrict.
     *
     * @param {*} val The detected value.
     */


    (0, _createClass2.default)(RestrictCustom, [{
      key: "validate",
      value: function validate(val) {
        try {
          var result = this.restrictFn.call(this.ctx, val); // If restrictFn return a non-empty string, validation will be fail.

          if ((0, _is.isString)(result) && result) {
            throw this.getError(result);
          }
        } catch (error) {
          // If restrictFn throws an error, validation will be fail too. And
          // then should throw a wrapped error.
          throw this.getError(error.message);
        }

        return true;
      }
    }]);
    return RestrictCustom;
  }(_base.default);

  _exports.default = RestrictCustom;
});

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(9), __webpack_require__(1), __webpack_require__(2), __webpack_require__(14), __webpack_require__(4), __webpack_require__(5), __webpack_require__(3), __webpack_require__(6), __webpack_require__(10), __webpack_require__(34), __webpack_require__(35), __webpack_require__(12), __webpack_require__(36), __webpack_require__(37), __webpack_require__(38), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _construct2, _classCallCheck2, _createClass2, _get2, _inherits2, _possibleConstructorReturn2, _getPrototypeOf2, _is, _constants, _numberSchema, _numberRequired, _enum2, _numberMax, _numberMin, _numberInt, _base) {
  "use strict";

  var _interopRequireDefault = __webpack_require__(0);

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _construct2 = _interopRequireDefault(_construct2);
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _get2 = _interopRequireDefault(_get2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _numberSchema = _interopRequireDefault(_numberSchema);
  _numberRequired = _interopRequireDefault(_numberRequired);
  _enum2 = _interopRequireDefault(_enum2);
  _numberMax = _interopRequireDefault(_numberMax);
  _numberMin = _interopRequireDefault(_numberMin);
  _numberInt = _interopRequireDefault(_numberInt);
  _base = _interopRequireDefault(_base);

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var SchemaNumber = /*#__PURE__*/function (_SchemaBase) {
    (0, _inherits2.default)(SchemaNumber, _SchemaBase);

    var _super = _createSuper(SchemaNumber);

    function SchemaNumber() {
      var _this;

      (0, _classCallCheck2.default)(this, SchemaNumber);
      _this = _super.call(this);
      _this.type = _constants.TYPE.number;
      _this.isAllowString = false;
      _this.typeRestrict = new _numberSchema.default();
      _this.lastRestrict = _this.typeRestrict;
      return _this;
    }
    /**
     * Set the default return value of validate when the detected value is empty.
     *
     * @param {*} args[0] The default return value.
     * @param {*} args[1] The execute context of value when value is a function.
     */


    (0, _createClass2.default)(SchemaNumber, [{
      key: "default",
      value: function _default() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        if (args.length === 0) {
          throw new Error('default arguments should not be empty');
        }

        var value = args[0],
            ctx = args[1];
        this.defaultConfig = {
          ctx: ctx,
          value: value,
          enable: true,
          strict: false
        };
        return this;
      }
      /**
       * Add an "enum" restrict to boolean schema.
       *
       * @param {Array<*>} values The enum values that restrict the detected value can be.
       */

    }, {
      key: "enum",
      value: function _enum() {
        for (var _len2 = arguments.length, values = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          values[_key2] = arguments[_key2];
        }

        var restrict = (0, _construct2.default)(_enum2.default, values);
        this.restricts.push(restrict);
        this.lastRestrict = restrict;
        return this;
      }
      /**
       * Add a "required" restrict to number schema.
       */

    }, {
      key: "required",
      value: function required() {
        this.requiredRestrict = new _numberRequired.default();
        this.lastRestrict = this.requiredRestrict;
        return this;
      }
      /**
       * By default, number schema doesn't allow the detected value to be NaN. If
       * allowNaN method is called, then NaN will be allowd.
       */

    }, {
      key: "allowNaN",
      value: function allowNaN() {
        this.typeRestrict.enableAllowNaN();
        return this;
      }
      /**
       * By default, number schema doesn't allow the detected value to be Infinity.
       * If allowInfinity method is called, then Infinity will be allowd.
       */

    }, {
      key: "allowInfinity",
      value: function allowInfinity() {
        this.typeRestrict.enableAllowInfinity();
        return this;
      }
      /**
       * By default, number schema doesn't allow the detected value to be number
       * style string. For example, a string "123" is not allowed. If allowString
       * method is called, then number schema will try to parse string to number.
       */

    }, {
      key: "allowString",
      value: function allowString() {
        this.isAllowString = true;
        return this;
      }
      /**
       * Add a "min-number" restrict for detected number.
       *
       * @param {Number}  min      The min value of detected number.
       * @param {Boolean} [closed] Whether it's a closed interval. By default, the interval
       * is closed, which means the value of the detected number can be equal to min. When
       * closed is exactly false, the interval will be opened.
       */

    }, {
      key: "min",
      value: function min(_min, closed) {
        var restrict = new _numberMin.default(_min, closed);
        this.restricts.push(restrict);
        this.lastRestrict = restrict;
        return this;
      }
      /**
       * Add a "max-number" restrict to number schema.
       *
       * @param {Number}  max      The max value of detected number.
       * @param {Boolean} [closed] Whether it's a closed interval. By default, the interval
       * is closed, which means the value of the detected number can be equal to max. When
       * closed is exactly false, the interval will be opened.
       */

    }, {
      key: "max",
      value: function max(_max, closed) {
        var restrict = new _numberMax.default(_max, closed);
        this.restricts.push(restrict);
        this.lastRestrict = restrict;
        return this;
      }
      /**
       * Add an "int-number" restrict to number schema.
       */

    }, {
      key: "int",
      value: function int() {
        var restrict = new _numberInt.default();
        this.restricts.push(restrict);
        this.lastRestrict = restrict;
        return this;
      }
      /**
       * @override
       * Validate value.
       *
       * @param {*} val The detected value.
       */

    }, {
      key: "validate",
      value: function validate(val) {
        var value = val; // If allowString is called, then preparse string to number.

        if (this.isAllowString && (0, _is.isString)(val) && (0, _is.isStringNumber)(val)) {
          value = Number(val);
        }

        return (0, _get2.default)((0, _getPrototypeOf2.default)(SchemaNumber.prototype), "validate", this).call(this, value);
      }
    }]);
    return SchemaNumber;
  }(_base.default);

  _exports.default = SchemaNumber;
});

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1), __webpack_require__(2), __webpack_require__(4), __webpack_require__(5), __webpack_require__(3), __webpack_require__(7), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _classCallCheck2, _createClass2, _inherits2, _possibleConstructorReturn2, _getPrototypeOf2, _base, _is) {
  "use strict";

  var _interopRequireDefault = __webpack_require__(0);

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _base = _interopRequireDefault(_base);

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var RestrictNumberSchema = /*#__PURE__*/function (_RestrictBase) {
    (0, _inherits2.default)(RestrictNumberSchema, _RestrictBase);

    var _super = _createSuper(RestrictNumberSchema);

    function RestrictNumberSchema() {
      var _this;

      (0, _classCallCheck2.default)(this, RestrictNumberSchema);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));
      _this.isAllowNaN = false;
      _this.isAllowInfinity = false;
      return _this;
    }

    (0, _createClass2.default)(RestrictNumberSchema, [{
      key: "enableAllowNaN",

      /**
       * Allow the detected number to be NaN.
       */
      value: function enableAllowNaN() {
        this.isAllowNaN = true;
      }
      /**
       * Allow the detected number to be Infinity or -Infinity.
       */

    }, {
      key: "enableAllowInfinity",
      value: function enableAllowInfinity() {
        this.isAllowInfinity = true;
      }
      /**
       * Check the detected value whether meets this "number-schema" restrict.
       *
       * @param {*} val The detected value.
       */

    }, {
      key: "validate",
      value: function validate(val) {
        var isAllowNaN = this.isAllowNaN,
            isAllowInfinity = this.isAllowInfinity;

        if ((0, _is.isNaN)(val) && !isAllowNaN) {
          throw this.getError('value is not allowed to be NaN');
        }

        if ((0, _is.isInfinity)(val) && !isAllowInfinity) {
          throw this.getError('value is not allowed to be Infinity');
        }

        if (!(0, _is.isNumber)(val) && !(0, _is.isNotRequired)(val)) {
          throw this.getError('value should be a type of number');
        }
      }
    }]);
    return RestrictNumberSchema;
  }(_base.default);

  _exports.default = RestrictNumberSchema;
});

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1), __webpack_require__(2), __webpack_require__(4), __webpack_require__(5), __webpack_require__(3), __webpack_require__(7), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _classCallCheck2, _createClass2, _inherits2, _possibleConstructorReturn2, _getPrototypeOf2, _base, _is) {
  "use strict";

  var _interopRequireDefault = __webpack_require__(0);

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _base = _interopRequireDefault(_base);

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var RestrictRequired = /*#__PURE__*/function (_RestrictBase) {
    (0, _inherits2.default)(RestrictRequired, _RestrictBase);

    var _super = _createSuper(RestrictRequired);

    function RestrictRequired() {
      (0, _classCallCheck2.default)(this, RestrictRequired);
      return _super.apply(this, arguments);
    }

    (0, _createClass2.default)(RestrictRequired, [{
      key: "validate",

      /**
       * Check the detected value whether meets this "number-required" restrict.
       *
       * @param {*} val The detected value.
       */
      value: function validate(val) {
        if ((0, _is.isNotRequired)(val)) {
          throw this.getError('value is required and should not be undefined/null');
        } // If required restrict is added for number schema, then the detected value
        // cann't be NaN.


        if ((0, _is.isNaN)(val)) {
          throw this.getError('value is required and should not be NaN');
        }
      }
    }]);
    return RestrictRequired;
  }(_base.default);

  _exports.default = RestrictRequired;
});

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1), __webpack_require__(2), __webpack_require__(4), __webpack_require__(5), __webpack_require__(3), __webpack_require__(7), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _classCallCheck2, _createClass2, _inherits2, _possibleConstructorReturn2, _getPrototypeOf2, _base, _is) {
  "use strict";

  var _interopRequireDefault = __webpack_require__(0);

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _base = _interopRequireDefault(_base);

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var RestrictNumberMax = /*#__PURE__*/function (_RestrictBase) {
    (0, _inherits2.default)(RestrictNumberMax, _RestrictBase);

    var _super = _createSuper(RestrictNumberMax);

    /**
     * @param {Number}  max      The max value of the detected number.
     * @param {Boolean} [closed] Whether it's a closed interval. By default, the
     * interval is closed, which means the detected number can be equal to max.
     * When closed is exactly false, the interval will be opened.
     */
    function RestrictNumberMax(max, closed) {
      var _this;

      (0, _classCallCheck2.default)(this, RestrictNumberMax);
      _this = _super.call(this);

      if ((0, _is.isNumber)(max) === false) {
        throw new TypeError('`max` should be a type of number');
      }

      _this.max = max;
      _this.closed = closed !== false;
      return _this;
    }
    /**
     * Check the detected value whether meets this "number-max" restrict.
     *
     * @param {*} val The detected value.
     */


    (0, _createClass2.default)(RestrictNumberMax, [{
      key: "validate",
      value: function validate(val) {
        if (this.closed && val > this.max) {
          throw this.getError("value should be less than or equal to ".concat(this.max));
        }

        if (!this.closed && val >= this.max) {
          throw this.getError("value should be less than ".concat(this.max));
        }
      }
    }]);
    return RestrictNumberMax;
  }(_base.default);

  _exports.default = RestrictNumberMax;
});

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1), __webpack_require__(2), __webpack_require__(4), __webpack_require__(5), __webpack_require__(3), __webpack_require__(7), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _classCallCheck2, _createClass2, _inherits2, _possibleConstructorReturn2, _getPrototypeOf2, _base, _is) {
  "use strict";

  var _interopRequireDefault = __webpack_require__(0);

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _base = _interopRequireDefault(_base);

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var RestrictNumberMin = /*#__PURE__*/function (_RestrictBase) {
    (0, _inherits2.default)(RestrictNumberMin, _RestrictBase);

    var _super = _createSuper(RestrictNumberMin);

    /**
     * @param {Number}  min      The min value of the detected number.
     * @param {Boolean} [closed] Whether it's a closed interval. By default, the
     * interval is closed, which means the detected number can be equal to min.
     * When closed is exactly false, the interval will be opened.
     */
    function RestrictNumberMin(min, closed) {
      var _this;

      (0, _classCallCheck2.default)(this, RestrictNumberMin);
      _this = _super.call(this);

      if ((0, _is.isNumber)(min) === false) {
        throw new TypeError('`min` should be a type of number');
      }

      _this.min = min;
      _this.closed = closed !== false;
      return _this;
    }
    /**
     * Check the detected value whether meets this "number-min" restrict.
     *
     * @param {*} val The detected value.
     */


    (0, _createClass2.default)(RestrictNumberMin, [{
      key: "validate",
      value: function validate(val) {
        if (this.closed && val < this.min) {
          throw this.getError("value should be greater than or equal to ".concat(this.min));
        }

        if (!this.closed && val <= this.min) {
          throw this.getError("value should be greater than ".concat(this.min));
        }
      }
    }]);
    return RestrictNumberMin;
  }(_base.default);

  _exports.default = RestrictNumberMin;
});

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1), __webpack_require__(2), __webpack_require__(4), __webpack_require__(5), __webpack_require__(3), __webpack_require__(7), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _classCallCheck2, _createClass2, _inherits2, _possibleConstructorReturn2, _getPrototypeOf2, _base, _is) {
  "use strict";

  var _interopRequireDefault = __webpack_require__(0);

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _base = _interopRequireDefault(_base);

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var RestrictNumberInt = /*#__PURE__*/function (_RestrictBase) {
    (0, _inherits2.default)(RestrictNumberInt, _RestrictBase);

    var _super = _createSuper(RestrictNumberInt);

    function RestrictNumberInt() {
      (0, _classCallCheck2.default)(this, RestrictNumberInt);
      return _super.apply(this, arguments);
    }

    (0, _createClass2.default)(RestrictNumberInt, [{
      key: "validate",

      /**
       * Check the detected value whether meets this "number-int" restrict.
       *
       * @param {*} val The detected value.
       */
      value: function validate(val) {
        if ((0, _is.isInt)(val) === false) {
          throw this.getError('value should be an integer');
        }
      }
    }]);
    return RestrictNumberInt;
  }(_base.default);

  _exports.default = RestrictNumberInt;
});

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(9), __webpack_require__(1), __webpack_require__(2), __webpack_require__(4), __webpack_require__(5), __webpack_require__(3), __webpack_require__(10), __webpack_require__(40), __webpack_require__(12), __webpack_require__(15), __webpack_require__(16), __webpack_require__(41), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _construct2, _classCallCheck2, _createClass2, _inherits2, _possibleConstructorReturn2, _getPrototypeOf2, _constants, _stringSchema, _enum2, _lengthMax, _lengthMin, _stringPattern, _base) {
  "use strict";

  var _interopRequireDefault = __webpack_require__(0);

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _construct2 = _interopRequireDefault(_construct2);
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _stringSchema = _interopRequireDefault(_stringSchema);
  _enum2 = _interopRequireDefault(_enum2);
  _lengthMax = _interopRequireDefault(_lengthMax);
  _lengthMin = _interopRequireDefault(_lengthMin);
  _stringPattern = _interopRequireDefault(_stringPattern);
  _base = _interopRequireDefault(_base);

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var SchemaString = /*#__PURE__*/function (_SchemaBase) {
    (0, _inherits2.default)(SchemaString, _SchemaBase);

    var _super = _createSuper(SchemaString);

    function SchemaString() {
      var _this;

      (0, _classCallCheck2.default)(this, SchemaString);
      _this = _super.call(this);
      _this.type = _constants.TYPE.string;
      _this.typeRestrict = new _stringSchema.default();
      _this.lastRestrict = _this.typeRestrict;
      return _this;
    }
    /**
     * Add an "enum" restrict to string schema.
     *
     * @param {Array<*>} values The enum values that restrict the detected value can be.
     */


    (0, _createClass2.default)(SchemaString, [{
      key: "enum",
      value: function _enum() {
        for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
          values[_key] = arguments[_key];
        }

        var restrict = (0, _construct2.default)(_enum2.default, values);
        this.restricts.push(restrict);
        this.lastRestrict = restrict;
        return this;
      }
      /**
       * Add a "min-length" restrict to string schema.
       *
       * @param {Number}  min      The min length of detected string.
       * @param {Boolean} [closed] Whether it's a closed interval. By default, the interval
       * is closed, which means the length of the detected string can be equal to min. When
       * closed is exactly false, the interval will be opened.
       */

    }, {
      key: "min",
      value: function min(_min, closed) {
        var restrict = new _lengthMin.default(_min, closed);
        this.restricts.push(restrict);
        this.lastRestrict = restrict;
        return this;
      }
      /**
       * Add a "max-length" restrict to string schema.
       *
       * @param {Number}  max      The max length of detected string.
       * @param {Boolean} [closed] Whether it's a closed interval. By default, the interval
       * is closed, which means the length of the detected string can be equal to max. When
       * closed is exactly false, the interval will be opened.
       */

    }, {
      key: "max",
      value: function max(_max, closed) {
        var restrict = new _lengthMax.default(_max, closed);
        this.restricts.push(restrict);
        this.lastRestrict = restrict;
        return this;
      }
      /**
       * Add a "pattern" string to string schema.
       *
       * @param {RegExp} pattern RegExp to restrict the format of string.
       */

    }, {
      key: "pattern",
      value: function pattern(_pattern) {
        var restrict = new _stringPattern.default(_pattern);
        this.restricts.push(restrict);
        this.lastRestrict = restrict;
        return this;
      }
    }]);
    return SchemaString;
  }(_base.default);

  _exports.default = SchemaString;
});

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1), __webpack_require__(2), __webpack_require__(4), __webpack_require__(5), __webpack_require__(3), __webpack_require__(7), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _classCallCheck2, _createClass2, _inherits2, _possibleConstructorReturn2, _getPrototypeOf2, _base, _is) {
  "use strict";

  var _interopRequireDefault = __webpack_require__(0);

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _base = _interopRequireDefault(_base);

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var RestrictStringSchema = /*#__PURE__*/function (_RestrictBase) {
    (0, _inherits2.default)(RestrictStringSchema, _RestrictBase);

    var _super = _createSuper(RestrictStringSchema);

    function RestrictStringSchema() {
      (0, _classCallCheck2.default)(this, RestrictStringSchema);
      return _super.apply(this, arguments);
    }

    (0, _createClass2.default)(RestrictStringSchema, [{
      key: "validate",

      /**
       * Check the detected value whether meets this "string-schema" restrict.
       *
       * @param {*} val The detected value.
       */
      value: function validate(val) {
        if (!(0, _is.isString)(val) && !(0, _is.isNotRequired)(val)) {
          throw this.getError('value should be a type of string');
        }
      }
    }]);
    return RestrictStringSchema;
  }(_base.default);

  _exports.default = RestrictStringSchema;
});

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1), __webpack_require__(2), __webpack_require__(4), __webpack_require__(5), __webpack_require__(3), __webpack_require__(7), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _classCallCheck2, _createClass2, _inherits2, _possibleConstructorReturn2, _getPrototypeOf2, _base, _is) {
  "use strict";

  var _interopRequireDefault = __webpack_require__(0);

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _base = _interopRequireDefault(_base);

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var RestrictStringPattern = /*#__PURE__*/function (_RestrictBase) {
    (0, _inherits2.default)(RestrictStringPattern, _RestrictBase);

    var _super = _createSuper(RestrictStringPattern);

    /**
     * @param {RegExp} pattern The regular expression to restrict the format of string.
     */
    function RestrictStringPattern(pattern) {
      var _this;

      (0, _classCallCheck2.default)(this, RestrictStringPattern);
      _this = _super.call(this);
      _this.pattern = null;

      if ((0, _is.isRegExp)(pattern) === false) {
        throw new TypeError('pattern should be an RegExp');
      }

      _this.pattern = pattern;
      return _this;
    }
    /**
     * Check the detected value whether meets this "string-pattern" restrict.
     *
     * @param {*} val The detected value.
     */


    (0, _createClass2.default)(RestrictStringPattern, [{
      key: "validate",
      value: function validate(val) {
        if (!this.pattern.test(val)) {
          throw this.getError("value should match pattern ".concat(this.pattern.toString()));
        }
      }
    }]);
    return RestrictStringPattern;
  }(_base.default);

  _exports.default = RestrictStringPattern;
});

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(9), __webpack_require__(1), __webpack_require__(2), __webpack_require__(4), __webpack_require__(5), __webpack_require__(3), __webpack_require__(10), __webpack_require__(43), __webpack_require__(12), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _construct2, _classCallCheck2, _createClass2, _inherits2, _possibleConstructorReturn2, _getPrototypeOf2, _constants, _booleanSchema, _enum2, _base) {
  "use strict";

  var _interopRequireDefault = __webpack_require__(0);

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _construct2 = _interopRequireDefault(_construct2);
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _booleanSchema = _interopRequireDefault(_booleanSchema);
  _enum2 = _interopRequireDefault(_enum2);
  _base = _interopRequireDefault(_base);

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var SchemaBoolean = /*#__PURE__*/function (_SchemaBase) {
    (0, _inherits2.default)(SchemaBoolean, _SchemaBase);

    var _super = _createSuper(SchemaBoolean);

    function SchemaBoolean() {
      var _this;

      (0, _classCallCheck2.default)(this, SchemaBoolean);
      _this = _super.call(this);
      _this.type = _constants.TYPE;
      _this.typeRestrict = new _booleanSchema.default();
      _this.lastRestrict = _this.typeRestrict;
      return _this;
    }
    /**
     * Add an "enum" restrict to boolean schema.
     *
     * @param {Array<*>} values The enum values that restrict the detected value can be.
     */


    (0, _createClass2.default)(SchemaBoolean, [{
      key: "enum",
      value: function _enum() {
        for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
          values[_key] = arguments[_key];
        }

        var restrict = (0, _construct2.default)(_enum2.default, values);
        this.restricts.push(restrict);
        this.lastRestrict = restrict;
        return this;
      }
      /**
       * Set the default return value of validate when the detected value is empty.
       *
       * @param {*} args[0] The default return value.
       * @param {*} args[1] The execute context of value when value is a function.
       */

    }, {
      key: "default",
      value: function _default() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        if (args.length === 0) {
          throw new Error('default arguments should not be empty');
        }

        var value = args[0],
            ctx = args[1];
        this.defaultConfig = {
          ctx: ctx,
          value: value,
          enable: true,
          strict: false
        };
        return this;
      }
    }]);
    return SchemaBoolean;
  }(_base.default);

  _exports.default = SchemaBoolean;
});

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1), __webpack_require__(2), __webpack_require__(4), __webpack_require__(5), __webpack_require__(3), __webpack_require__(7), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _classCallCheck2, _createClass2, _inherits2, _possibleConstructorReturn2, _getPrototypeOf2, _base, _is) {
  "use strict";

  var _interopRequireDefault = __webpack_require__(0);

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _base = _interopRequireDefault(_base);

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var RestrictBooleanSchema = /*#__PURE__*/function (_RestrictBase) {
    (0, _inherits2.default)(RestrictBooleanSchema, _RestrictBase);

    var _super = _createSuper(RestrictBooleanSchema);

    function RestrictBooleanSchema() {
      (0, _classCallCheck2.default)(this, RestrictBooleanSchema);
      return _super.apply(this, arguments);
    }

    (0, _createClass2.default)(RestrictBooleanSchema, [{
      key: "validate",

      /**
       * Check the detected value whether meets this "boolean-schema" restrict.
       *
       * @param {*} val The detected value.
       */
      value: function validate(val) {
        // When the detected value isn't boolean, null or undefined, validation
        // will be fail. Otherwise, validation will be success.
        if (!(0, _is.isBoolean)(val) && !(0, _is.isNotRequired)(val)) {
          throw this.getError('value should be a type of boolean');
        }
      }
    }]);
    return RestrictBooleanSchema;
  }(_base.default);

  _exports.default = RestrictBooleanSchema;
});

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(17), __webpack_require__(1), __webpack_require__(2), __webpack_require__(4), __webpack_require__(5), __webpack_require__(3), __webpack_require__(6), __webpack_require__(10), __webpack_require__(19), __webpack_require__(49), __webpack_require__(11), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _toConsumableArray2, _classCallCheck2, _createClass2, _inherits2, _possibleConstructorReturn2, _getPrototypeOf2, _is, _constants, _getKeyStr, _objectSchema, _validateError, _base) {
  "use strict";

  var _interopRequireDefault = __webpack_require__(0);

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _toConsumableArray2 = _interopRequireDefault(_toConsumableArray2);
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _getKeyStr = _interopRequireDefault(_getKeyStr);
  _objectSchema = _interopRequireDefault(_objectSchema);
  _validateError = _interopRequireDefault(_validateError);
  _base = _interopRequireDefault(_base);

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var hasOwnProperty = Object.prototype.hasOwnProperty;

  var SchemaObject = /*#__PURE__*/function (_SchemaBase) {
    (0, _inherits2.default)(SchemaObject, _SchemaBase);

    var _super = _createSuper(SchemaObject);

    function SchemaObject(config) {
      var _this;

      (0, _classCallCheck2.default)(this, SchemaObject);
      _this = _super.call(this);
      _this.type = _constants.TYPE.object;
      _this.config = null;
      _this.isStripUnknown = false;
      _this.isAllowUnknown = false;
      _this.typeRestrict = new _objectSchema.default();
      _this.lastRestrict = _this.typeRestrict; // If config is passed non-object, it means that the key-value structure
      // is no need to restrct.

      if ((0, _is.isObject)(config)) {
        var pureConfig = {}; // Filter the keys that corresponding value is an instance of SchemaBase.
        // This is for the purpose that allow config include value that is not an
        // instance of SchemaBase, and ingore them.

        Object.keys(config).forEach(function (key) {
          if (config[key] instanceof _base.default) {
            pureConfig[key] = config[key];
          }
        });
        _this.config = pureConfig;
      }

      return _this;
    }
    /**
     * If stripUnkown is called, then the return result of validate method will
     * not include the keys that not included in config.
     */


    (0, _createClass2.default)(SchemaObject, [{
      key: "stripUnknown",
      value: function stripUnknown() {
        this.isStripUnknown = true;
        return this;
      }
      /**
       * By default, the detected object is not allowed to include the unknown keys
       * that is not included in config. If allowUnknown is called, then these
       * unknown keys will be allowed, and these unknown key-values will be returned
       * in validate result.
       */

    }, {
      key: "allowUnknown",
      value: function allowUnknown() {
        this.isAllowUnknown = true;
        return this;
      }
      /**
       * Validate value.
       *
       * @param {*}      obj         The value to validate.
       * @param {Symbol} useKeyChain If pass the special symbol, the keyChain param
       * will be used.
       * @param {Array}  keyChain    The passed key chain of parent keys.
       */

    }, {
      key: "validate",
      value: function validate(obj, useKeyChain, keyChain) {
        // When it's not required, and the detected value is undefined or null,
        // then it's no need to validate any more, just return default value or
        // default value after formated.
        if (!this.requiredRestrict && (0, _is.isNotRequired)(obj)) {
          return this.getReturnValue(obj);
        }

        try {
          this.checkType(obj);
          this.checkRequired(obj);
          this.checkRestricts(obj);
          return this.getReturnValue(this.validateByRecurse(obj, useKeyChain === _constants.useKeyChainSymbol ? keyChain : undefined));
        } catch (error) {
          this.throwErrorWithoutKeyChainIfNeeded(error);
          var errorForAll = this.getErrorForAll(error.message);

          if (errorForAll) {
            throw errorForAll;
          }

          throw error;
        }
      }
      /**
       * @private
       * Traverse each key of the object and validate each value recursively.
       *
       * @param {Array} obj           The detected object.
       * @param {Array} [keyChain=[]] The key chain of ancestors to give friendly
       * error prompts.
       * @returns {Object}            The return value if validate pass.
       */

    }, {
      key: "validateByRecurse",
      value: function validateByRecurse(obj) {
        var _this2 = this;

        var keyChain = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

        if (this.config === null) {
          return obj;
        }

        var result = {};
        var chain = keyChain;
        var keys = Object.keys(this.config);
        keys.forEach(function (key) {
          var schema = _this2.config[key];

          if (!schema.requiredRestrict && !hasOwnProperty.call(obj, key)) {
            _this2.setResultWhenDefaultEnabled({
              key: key,
              result: result
            });
          } else {
            result[key] = _this2.validateObjectByKey(obj, {
              key: key,
              chain: chain
            });
          }
        });

        if (!this.isStripUnknown) {
          Object.keys(obj).forEach(function (key) {
            var notIncluded = keys.includes(key) === false;

            if (notIncluded && !_this2.isAllowUnknown) {
              throw new _validateError.default("the key `".concat(key, "` is not allowed"));
            }

            if (notIncluded) {
              result[key] = obj[key];
            }
          });
        }

        return result;
      }
      /**
       * @private
       * Validate an key-value of the detected object.
       *
       * @param {object} obj            The detected object.
       * @param {object} options
       * @param {string} options.key    The prop key.
       * @param {array}  options.chain  The key chain of ancestors to give friendly
       * error prompts.
       */

    }, {
      key: "validateObjectByKey",
      value: function validateObjectByKey(obj, options) {
        var key = options.key,
            chain = options.chain;
        var schema = this.config[key];
        var keyOption = {
          key: key,
          type: 'prop'
        };

        try {
          return schema.validate(obj[key], _constants.useKeyChainSymbol, [].concat((0, _toConsumableArray2.default)(chain), [keyOption]));
        } catch (error) {
          this.throwErrorWithoutKeyChainIfNeeded(error);
          var keyChainStr = "\"".concat((0, _getKeyStr.default)([].concat((0, _toConsumableArray2.default)(chain), [keyOption])), "\": ");
          throw new _validateError.default("".concat(keyChainStr).concat(error.message), {
            final: true
          });
        }
      }
      /**
       * @private
       * Set some key-values of return value when default method was called.
       *
       * @param {object} params
       * @param {string} params.key    The prop key.
       * @param {object} params.result The value that will be returned.
       * @returns {void}
       */

    }, {
      key: "setResultWhenDefaultEnabled",
      value: function setResultWhenDefaultEnabled(params) {
        var key = params.key,
            result = params.result;
        var schema = this.config[key];

        if (schema.defaultConfig.enable) {
          result[key] = schema.getDefaultReturnValue(undefined);
        }
      }
    }]);
    return SchemaObject;
  }(_base.default);

  _exports.default = SchemaObject;
});

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(18);

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles;

/***/ }),
/* 46 */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(18);

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;

/***/ }),
/* 48 */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1), __webpack_require__(2), __webpack_require__(4), __webpack_require__(5), __webpack_require__(3), __webpack_require__(7), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _classCallCheck2, _createClass2, _inherits2, _possibleConstructorReturn2, _getPrototypeOf2, _base, _is) {
  "use strict";

  var _interopRequireDefault = __webpack_require__(0);

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _base = _interopRequireDefault(_base);

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var RestrictObjectSchema = /*#__PURE__*/function (_RestrictBase) {
    (0, _inherits2.default)(RestrictObjectSchema, _RestrictBase);

    var _super = _createSuper(RestrictObjectSchema);

    function RestrictObjectSchema() {
      (0, _classCallCheck2.default)(this, RestrictObjectSchema);
      return _super.apply(this, arguments);
    }

    (0, _createClass2.default)(RestrictObjectSchema, [{
      key: "validate",

      /**
       * Check the detected value whether meets this "object-schema" restrict.
       *
       * @param {*} val The detected value.
       */
      value: function validate(val) {
        if ((0, _is.isObject)(val) || (0, _is.isNotRequired)(val)) {
          return true;
        }

        throw this.getError('value should be a type of object');
      }
    }]);
    return RestrictObjectSchema;
  }(_base.default);

  _exports.default = RestrictObjectSchema;
});

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(17), __webpack_require__(1), __webpack_require__(2), __webpack_require__(4), __webpack_require__(5), __webpack_require__(3), __webpack_require__(6), __webpack_require__(10), __webpack_require__(19), __webpack_require__(11), __webpack_require__(51), __webpack_require__(16), __webpack_require__(15), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _toConsumableArray2, _classCallCheck2, _createClass2, _inherits2, _possibleConstructorReturn2, _getPrototypeOf2, _is, _constants, _getKeyStr, _validateError, _arraySchema, _lengthMin, _lengthMax, _base) {
  "use strict";

  var _interopRequireDefault = __webpack_require__(0);

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _toConsumableArray2 = _interopRequireDefault(_toConsumableArray2);
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _getKeyStr = _interopRequireDefault(_getKeyStr);
  _validateError = _interopRequireDefault(_validateError);
  _arraySchema = _interopRequireDefault(_arraySchema);
  _lengthMin = _interopRequireDefault(_lengthMin);
  _lengthMax = _interopRequireDefault(_lengthMax);
  _base = _interopRequireDefault(_base);

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var SchemaArray = /*#__PURE__*/function (_SchemaBase) {
    (0, _inherits2.default)(SchemaArray, _SchemaBase);

    var _super = _createSuper(SchemaArray);

    /**
     * @param {SchemaBase} itemSchema The schema defined for every item of array.
     * If itemSchema isn't instanceof SchemaBase, then it will be ignored, this
     * means that the detected array can include any type value.
     */
    function SchemaArray(itemSchema) {
      var _this;

      (0, _classCallCheck2.default)(this, SchemaArray);
      _this = _super.call(this);
      _this.type = _constants.TYPE.array;
      _this.itemSchema = null;
      _this.typeRestrict = new _arraySchema.default();
      _this.lastRestrict = _this.typeRestrict; // Only handle itemSchema when it's instanceof SchemaBase.

      if (itemSchema instanceof _base.default) {
        _this.itemSchema = itemSchema;
      }

      return _this;
    }
    /**
     * Add a "min-length" restrict to array schema.
     *
     * @param {Number}  min      The min length of detected array.
     * @param {Boolean} [closed] Whether it's a closed interval. By default, the interval
     * is closed, which means the length of the detected array can be equal to min. When
     * closed is exactly false, the interval will be opened.
     */


    (0, _createClass2.default)(SchemaArray, [{
      key: "min",
      value: function min(_min, closed) {
        var restrict = new _lengthMin.default(_min, closed);
        this.restricts.push(restrict);
        this.lastRestrict = restrict;
        return this;
      }
      /**
       * Add a "max-length" restrict to array schema.
       *
       * @param {Number}  max      The max length of detected array.
       * @param {Boolean} [closed] Whether it's a closed interval. By default, the interval
       * is closed, which means the length of the detected array can be equal to max. When
       * closed is exactly false, the interval will be opened.
       */

    }, {
      key: "max",
      value: function max(_max, closed) {
        var restrict = new _lengthMax.default(_max, closed);
        this.restricts.push(restrict);
        this.lastRestrict = restrict;
        return this;
      }
      /**
       * Validate value.
       *
       * @param {*}      array       The value to validate.
       * @param {Symbol} useKeyChain If pass the special symbol, the keyChain param will be used.
       * @param {Array}  keyChain    The passed key chain of parent keys.
       */

    }, {
      key: "validate",
      value: function validate(array, useKeyChain, keyChain) {
        // When it's not required, and the detected value is undefined or null, then it's no need
        // to validate any more, just return default value or default value after formated.
        if (!this.requiredRestrict && (0, _is.isNotRequired)(array)) {
          return this.getReturnValue(array);
        }

        try {
          this.checkType(array);
          this.checkRequired(array);
          this.checkRestricts(array);
          return this.getReturnValue(this.validateByRecurse(array, useKeyChain === _constants.useKeyChainSymbol ? keyChain : undefined));
        } catch (error) {
          this.throwErrorWithoutKeyChainIfNeeded(error);
          var errorForAll = this.getErrorForAll(error.message);

          if (errorForAll) {
            throw errorForAll;
          }

          throw error;
        }
      }
      /**
       * @private
       * Traverse each item of the array and validate each member recursively.
       *
       * @param {Array} array         The detected array.
       * @param {Array} [keyChain=[]] The key chain of ancestors to give friendly error prompts.
       * @returns {Array}             The return value if validate pass.
       */

    }, {
      key: "validateByRecurse",
      value: function validateByRecurse(array) {
        var _this2 = this;

        var keyChain = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var chain = keyChain;
        var itemSchema = this.itemSchema;

        if (itemSchema) {
          return array.map(function (_, index) {
            return _this2.validateItem({
              index: index,
              array: array,
              chain: chain
            });
          });
        } // Return a shallow copy of the detected array.


        return (0, _toConsumableArray2.default)(array);
      }
      /**
       * @private
       * Validate an item of the detected array.
       *
       * @param {object} params
       * @param {number} params.index  The index of the item in array.
       * @param {array}  params.array  The detected array.
       * @param {array}  params.chain  The key chain of ancestors.
       */

    }, {
      key: "validateItem",
      value: function validateItem(params) {
        var index = params.index,
            array = params.array,
            chain = params.chain;
        var itemSchema = this.itemSchema;

        try {
          return itemSchema.validate(array[index], _constants.useKeyChainSymbol, [].concat((0, _toConsumableArray2.default)(chain), [{
            type: 'index',
            key: index
          }]));
        } catch (error) {
          this.throwErrorWithoutKeyChainIfNeeded(error);
          var keyOption = {
            type: 'index',
            key: index
          };
          var keyChainStr = "\"".concat((0, _getKeyStr.default)([].concat((0, _toConsumableArray2.default)(chain), [keyOption])), "\": ");
          throw new _validateError.default("".concat(keyChainStr).concat(error.message), {
            final: true
          });
        }
      }
    }]);
    return SchemaArray;
  }(_base.default);

  _exports.default = SchemaArray;
});

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1), __webpack_require__(2), __webpack_require__(4), __webpack_require__(5), __webpack_require__(3), __webpack_require__(7), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _classCallCheck2, _createClass2, _inherits2, _possibleConstructorReturn2, _getPrototypeOf2, _base, _is) {
  "use strict";

  var _interopRequireDefault = __webpack_require__(0);

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _base = _interopRequireDefault(_base);

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var RestrictArraySchema = /*#__PURE__*/function (_RestrictBase) {
    (0, _inherits2.default)(RestrictArraySchema, _RestrictBase);

    var _super = _createSuper(RestrictArraySchema);

    function RestrictArraySchema() {
      (0, _classCallCheck2.default)(this, RestrictArraySchema);
      return _super.apply(this, arguments);
    }

    (0, _createClass2.default)(RestrictArraySchema, [{
      key: "validate",

      /**
       * Check the detected value whether meets this "array-schema" restrict.
       *
       * @param {*} val The detected value.
       */
      value: function validate(val) {
        // When the detected value isn't array, null or undefined, validation
        // will be fail. Otherwise, validation will be success.
        if (!(0, _is.isArray)(val) && !(0, _is.isNotRequired)(val)) {
          throw this.getError('value should be a type of array');
        }
      }
    }]);
    return RestrictArraySchema;
  }(_base.default);

  _exports.default = RestrictArraySchema;
});

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1), __webpack_require__(2), __webpack_require__(4), __webpack_require__(5), __webpack_require__(3), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _classCallCheck2, _createClass2, _inherits2, _possibleConstructorReturn2, _getPrototypeOf2, _base) {
  "use strict";

  var _interopRequireDefault = __webpack_require__(0);

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _base = _interopRequireDefault(_base);

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var SchemaMixed = /*#__PURE__*/function (_SchemaBase) {
    (0, _inherits2.default)(SchemaMixed, _SchemaBase);

    var _super = _createSuper(SchemaMixed);

    /**
     * @param {Array<SchemaBase>} schemas The allowed schemas.
     */
    function SchemaMixed() {
      var _this;

      (0, _classCallCheck2.default)(this, SchemaMixed);
      _this = _super.call(this);
      _this.schemas = null;

      for (var _len = arguments.length, schemas = new Array(_len), _key = 0; _key < _len; _key++) {
        schemas[_key] = arguments[_key];
      }

      if (schemas.length === 0) {
        throw new RangeError('mixed arguments should not be empty');
      }

      _this.schemas = schemas;
      return _this;
    }
    /**
     * Validate value.
     *
     * @param {*} val The detected value.
     */


    (0, _createClass2.default)(SchemaMixed, [{
      key: "validate",
      value: function validate(val) {
        var finalError = null;

        for (var i = 0; i < this.schemas.length; i += 1) {
          try {
            return this.schemas[i].validate(val);
          } catch (error) {
            finalError = error;
          }
        }

        throw finalError;
      }
    }]);
    return SchemaMixed;
  }(_base.default);

  _exports.default = SchemaMixed;
});

/***/ })
/******/ ]);
});
//# sourceMappingURL=racoon.js.map