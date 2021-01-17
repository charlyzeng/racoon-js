(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.racoon = {}));
}(this, (function (exports) { 'use strict';

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

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

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

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
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  var TYPE = {
    number: 'number',
    string: 'string',
    boolean: 'boolean',
    object: 'object',
    array: 'array',
    any: 'any'
  };
  var useKeyChainSymbol = Symbol('#useKeyChainSymbol');

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);
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

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var ValidateError = /*#__PURE__*/function (_Error) {
    _inherits(ValidateError, _Error);

    var _super = _createSuper(ValidateError);

    function ValidateError(message) {
      var _this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, ValidateError);

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

    _createClass(ValidateError, [{
      key: "toString",
      value: function toString() {
        return "Validate".concat(_get(_getPrototypeOf(ValidateError.prototype), "toString", this).call(this));
      }
    }]);

    return ValidateError;
  }( /*#__PURE__*/_wrapNativeSuper(Error));

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
    return error instanceof ValidateError && error.custom;
  }
  /**
   * Check the error is a final ValidateError.
   *
   * @param {Error} error The error object to check.
   */

  function isFinalError(error) {
    return error instanceof ValidateError && error.final;
  }

  var RestrictBase = /*#__PURE__*/function () {
    function RestrictBase() {
      _classCallCheck(this, RestrictBase);

      this.errorConfig = {
        ctx: null,
        message: ''
      };
    }

    _createClass(RestrictBase, [{
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

        if (isFunction(message)) {
          return new ValidateError(message.call(ctx, originMessage), {
            custom: true
          });
        }

        if (message && isString(message)) {
          return new ValidateError(message, {
            custom: true
          });
        }

        return new ValidateError(originMessage);
      }
    }]);

    return RestrictBase;
  }();

  function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var RestrictAnySchema = /*#__PURE__*/function (_RestrictBase) {
    _inherits(RestrictAnySchema, _RestrictBase);

    var _super = _createSuper$1(RestrictAnySchema);

    function RestrictAnySchema() {
      _classCallCheck(this, RestrictAnySchema);

      return _super.apply(this, arguments);
    }

    _createClass(RestrictAnySchema, [{
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
  }(RestrictBase);

  function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var RestrictAnyRequired = /*#__PURE__*/function (_RestrictBase) {
    _inherits(RestrictAnyRequired, _RestrictBase);

    var _super = _createSuper$2(RestrictAnyRequired);

    /**
     * @param {Boolean} strict Whether to enable strict mode. By default, strict mode
     * is disabled. If strict param is passed to exactly true, strict mode will be
     * enabled.
     */
    function RestrictAnyRequired(strict) {
      var _this;

      _classCallCheck(this, RestrictAnyRequired);

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


    _createClass(RestrictAnyRequired, [{
      key: "validate",
      value: function validate(val) {
        var strict = this.strict; // In non-strict mode, if the detected value is undefined, null or NaN, the
        // validation will be fail.

        if (!strict && (isNotRequired(val) || isNaN(val))) {
          throw this.getError('value is required and should not be undefined/null/NaN');
        }

        if (strict === true && isEmpty(val)) {
          throw this.getError('value is required and should not be empty');
        }
      }
    }]);

    return RestrictAnyRequired;
  }(RestrictBase);

  function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var RestrictEnum = /*#__PURE__*/function (_RestrictBase) {
    _inherits(RestrictEnum, _RestrictBase);

    var _super = _createSuper$3(RestrictEnum);

    /**
     * @param {Array<*>} values The enum values that restrict the detected value can be.
     */
    function RestrictEnum() {
      var _this;

      _classCallCheck(this, RestrictEnum);

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


    _createClass(RestrictEnum, [{
      key: "validate",
      value: function validate(val) {
        if (this.enumValues.indexOf(val) === -1) {
          throw this.getError("value should be one of ".concat(JSON.stringify(this.enumValues)));
        }
      }
    }]);

    return RestrictEnum;
  }(RestrictBase);

  function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var RestrictRequired = /*#__PURE__*/function (_RestrictBase) {
    _inherits(RestrictRequired, _RestrictBase);

    var _super = _createSuper$4(RestrictRequired);

    /**
     * @param {Boolean} [strict] Whether enable strict mode. By default, the mode
     * is non-strict. If you pass strict exactly true, it will enable strict mode.
     */
    function RestrictRequired(strict) {
      var _this;

      _classCallCheck(this, RestrictRequired);

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


    _createClass(RestrictRequired, [{
      key: "validate",
      value: function validate(val) {
        var strict = this.strict;

        if (strict && isEmpty(val)) {
          throw this.getError('value is required and should not be empty');
        }

        if (!strict && isNotRequired(val)) {
          throw this.getError('value is required and should not be undefined/null');
        }
      }
    }]);

    return RestrictRequired;
  }(RestrictBase);

  function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$6(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var RestrictCustom = /*#__PURE__*/function (_RestrictBase) {
    _inherits(RestrictCustom, _RestrictBase);

    var _super = _createSuper$5(RestrictCustom);

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

      _classCallCheck(this, RestrictCustom);

      _this = _super.call(this);
      _this.ctx = null;
      _this.restrictFn = null;

      if (isFunction(restrictFn) === false) {
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


    _createClass(RestrictCustom, [{
      key: "validate",
      value: function validate(val) {
        try {
          var result = this.restrictFn.call(this.ctx, val); // If restrictFn return a non-empty string, validation will be fail.

          if (isString(result) && result) {
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
  }(RestrictBase);

  var SchemaBase = /*#__PURE__*/function () {
    function SchemaBase() {
      _classCallCheck(this, SchemaBase);

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

    _createClass(SchemaBase, [{
      key: "validate",

      /**
       * Validate value.
       *
       * @param {*} val The detected value.
       */
      value: function validate(val) {
        // When it's not required, and the detected value is undefined or null, then it's no need
        // to validate any more, just return default value or default value after formated.
        if (!this.requiredRestrict && isNotRequired(val)) {
          return this.getReturnValue(val);
        }

        try {
          this.checkType(val);
          this.checkRequired(val);
          this.checkRestricts(val);
          return this.getReturnValue(val);
        } catch (error) {
          if (isCustomError(error)) {
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
        this.requiredRestrict = new RestrictRequired(strict);
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
        var restrict = new RestrictCustom(restrictFn, ctx);
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

        if (enable && strict && isEmpty(val)) {
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

        if (isFunction(message)) {
          return new ValidateError(message.call(ctx, originalMessage));
        }

        return new ValidateError(message);
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
        if (isFinalError(error)) {
          throw error;
        }

        if (isCustomError(error)) {
          throw new ValidateError(error.message, {
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
        if (!isString(message) && !isFunction(message)) {
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

        if (enable && (isNotRequired(val) || isNaN(val))) {
          value = this.getDefaultReturnValue(val);
        } // Otherwise, format the origin return value and return it.


        return formatter.call(ctx, value);
      }
    }]);

    return SchemaBase;
  }();

  function _createSuper$6(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$7(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$7() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var SchemaAny = /*#__PURE__*/function (_SchemaBase) {
    _inherits(SchemaAny, _SchemaBase);

    var _super = _createSuper$6(SchemaAny);

    function SchemaAny() {
      var _this;

      _classCallCheck(this, SchemaAny);

      _this = _super.call(this);
      _this.type = TYPE.any;
      _this.typeRestrict = new RestrictAnySchema();
      _this.lastRestrict = _this.typeRestrict;
      return _this;
    }
    /**
     * Add a "required" restrict to any schema.
     *
     * @param {Boolean} [strict] Whether enable strict mode. By default, the mode
     * is non-strict. If you pass strict exactly true, it will enable strict mode.
     */


    _createClass(SchemaAny, [{
      key: "required",
      value: function required(strict) {
        this.requiredRestrict = new RestrictAnyRequired(strict);
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

        var restrict = _construct(RestrictEnum, values);

        this.restricts.push(restrict);
        this.lastRestrict = restrict;
        return this;
      }
    }]);

    return SchemaAny;
  }(SchemaBase);

  function _createSuper$7(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$8(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$8() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var RestrictNumberSchema = /*#__PURE__*/function (_RestrictBase) {
    _inherits(RestrictNumberSchema, _RestrictBase);

    var _super = _createSuper$7(RestrictNumberSchema);

    function RestrictNumberSchema() {
      var _this;

      _classCallCheck(this, RestrictNumberSchema);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));
      _this.isAllowNaN = false;
      _this.isAllowInfinity = false;
      return _this;
    }

    _createClass(RestrictNumberSchema, [{
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

        if (isNaN(val) && !isAllowNaN) {
          throw this.getError('value is not allowed to be NaN');
        }

        if (isInfinity(val) && !isAllowInfinity) {
          throw this.getError('value is not allowed to be Infinity');
        }

        if (!isNumber(val) && !isNotRequired(val)) {
          throw this.getError('value should be a type of number');
        }
      }
    }]);

    return RestrictNumberSchema;
  }(RestrictBase);

  function _createSuper$8(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$9(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$9() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var RestrictRequired$1 = /*#__PURE__*/function (_RestrictBase) {
    _inherits(RestrictRequired, _RestrictBase);

    var _super = _createSuper$8(RestrictRequired);

    function RestrictRequired() {
      _classCallCheck(this, RestrictRequired);

      return _super.apply(this, arguments);
    }

    _createClass(RestrictRequired, [{
      key: "validate",

      /**
       * Check the detected value whether meets this "number-required" restrict.
       *
       * @param {*} val The detected value.
       */
      value: function validate(val) {
        if (isNotRequired(val)) {
          throw this.getError('value is required and should not be undefined/null');
        } // If required restrict is added for number schema, then the detected value
        // cann't be NaN.


        if (isNaN(val)) {
          throw this.getError('value is required and should not be NaN');
        }
      }
    }]);

    return RestrictRequired;
  }(RestrictBase);

  function _createSuper$9(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$a(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$a() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var RestrictNumberMax = /*#__PURE__*/function (_RestrictBase) {
    _inherits(RestrictNumberMax, _RestrictBase);

    var _super = _createSuper$9(RestrictNumberMax);

    /**
     * @param {Number}  max      The max value of the detected number.
     * @param {Boolean} [closed] Whether it's a closed interval. By default, the
     * interval is closed, which means the detected number can be equal to max.
     * When closed is exactly false, the interval will be opened.
     */
    function RestrictNumberMax(max, closed) {
      var _this;

      _classCallCheck(this, RestrictNumberMax);

      _this = _super.call(this);

      if (isNumber(max) === false) {
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


    _createClass(RestrictNumberMax, [{
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
  }(RestrictBase);

  function _createSuper$a(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$b(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$b() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var RestrictNumberMin = /*#__PURE__*/function (_RestrictBase) {
    _inherits(RestrictNumberMin, _RestrictBase);

    var _super = _createSuper$a(RestrictNumberMin);

    /**
     * @param {Number}  min      The min value of the detected number.
     * @param {Boolean} [closed] Whether it's a closed interval. By default, the
     * interval is closed, which means the detected number can be equal to min.
     * When closed is exactly false, the interval will be opened.
     */
    function RestrictNumberMin(min, closed) {
      var _this;

      _classCallCheck(this, RestrictNumberMin);

      _this = _super.call(this);

      if (isNumber(min) === false) {
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


    _createClass(RestrictNumberMin, [{
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
  }(RestrictBase);

  function _createSuper$b(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$c(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$c() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var RestrictNumberInt = /*#__PURE__*/function (_RestrictBase) {
    _inherits(RestrictNumberInt, _RestrictBase);

    var _super = _createSuper$b(RestrictNumberInt);

    function RestrictNumberInt() {
      _classCallCheck(this, RestrictNumberInt);

      return _super.apply(this, arguments);
    }

    _createClass(RestrictNumberInt, [{
      key: "validate",

      /**
       * Check the detected value whether meets this "number-int" restrict.
       *
       * @param {*} val The detected value.
       */
      value: function validate(val) {
        if (isInt(val) === false) {
          throw this.getError('value should be an integer');
        }
      }
    }]);

    return RestrictNumberInt;
  }(RestrictBase);

  function _createSuper$c(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$d(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$d() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var RestrictNumberEven = /*#__PURE__*/function (_RestrictBase) {
    _inherits(RestrictNumberEven, _RestrictBase);

    var _super = _createSuper$c(RestrictNumberEven);

    function RestrictNumberEven() {
      _classCallCheck(this, RestrictNumberEven);

      return _super.apply(this, arguments);
    }

    _createClass(RestrictNumberEven, [{
      key: "validate",

      /**
       * Check the detected number whether meets this "number-even" restrict.
       *
       * @param {*} val The detected value.
       */
      value: function validate(val) {
        if (val % 2 !== 0) {
          throw this.getError('value should be an even integer');
        }
      }
    }]);

    return RestrictNumberEven;
  }(RestrictBase);

  function _createSuper$d(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$e(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$e() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var RestrictNumberOdd = /*#__PURE__*/function (_RestrictBase) {
    _inherits(RestrictNumberOdd, _RestrictBase);

    var _super = _createSuper$d(RestrictNumberOdd);

    function RestrictNumberOdd() {
      _classCallCheck(this, RestrictNumberOdd);

      return _super.apply(this, arguments);
    }

    _createClass(RestrictNumberOdd, [{
      key: "validate",

      /**
       * Check the detected number whether meets this "number-odd" restrict.
       *
       * @param {*} val The detected value.
       */
      value: function validate(val) {
        if (Math.abs(val) % 2 !== 1) {
          throw this.getError('value should be an odd integer');
        }
      }
    }]);

    return RestrictNumberOdd;
  }(RestrictBase);

  function _createSuper$e(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$f(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$f() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var SchemaNumber = /*#__PURE__*/function (_SchemaBase) {
    _inherits(SchemaNumber, _SchemaBase);

    var _super = _createSuper$e(SchemaNumber);

    function SchemaNumber() {
      var _this;

      _classCallCheck(this, SchemaNumber);

      _this = _super.call(this);
      _this.type = TYPE.number;
      _this.isAllowString = false;
      _this.typeRestrict = new RestrictNumberSchema();
      _this.lastRestrict = _this.typeRestrict;
      return _this;
    }
    /**
     * Set the default return value of validate when the detected value is empty.
     *
     * @param {*} args[0] The default return value.
     * @param {*} args[1] The execute context of value when value is a function.
     */


    _createClass(SchemaNumber, [{
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

        var restrict = _construct(RestrictEnum, values);

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
        this.requiredRestrict = new RestrictRequired$1();
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
        var restrict = new RestrictNumberMin(_min, closed);
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
        var restrict = new RestrictNumberMax(_max, closed);
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
        var restrict = new RestrictNumberInt();
        this.restricts.push(restrict);
        this.lastRestrict = restrict;
        return this;
      }
    }, {
      key: "even",
      value: function even() {
        var restrict = new RestrictNumberEven();
        this.restricts.push(restrict);
        this.lastRestrict = restrict;
        return this;
      }
    }, {
      key: "odd",
      value: function odd() {
        var restrict = new RestrictNumberOdd();
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

        if (this.isAllowString && isString(val) && isStringNumber(val)) {
          value = Number(val);
        }

        return _get(_getPrototypeOf(SchemaNumber.prototype), "validate", this).call(this, value);
      }
    }]);

    return SchemaNumber;
  }(SchemaBase);

  function _createSuper$f(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$g(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$g() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var RestrictStringSchema = /*#__PURE__*/function (_RestrictBase) {
    _inherits(RestrictStringSchema, _RestrictBase);

    var _super = _createSuper$f(RestrictStringSchema);

    function RestrictStringSchema() {
      _classCallCheck(this, RestrictStringSchema);

      return _super.apply(this, arguments);
    }

    _createClass(RestrictStringSchema, [{
      key: "validate",

      /**
       * Check the detected value whether meets this "string-schema" restrict.
       *
       * @param {*} val The detected value.
       */
      value: function validate(val) {
        if (!isString(val) && !isNotRequired(val)) {
          throw this.getError('value should be a type of string');
        }
      }
    }]);

    return RestrictStringSchema;
  }(RestrictBase);

  function _createSuper$g(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$h(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$h() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var RestrictLengthMax = /*#__PURE__*/function (_RestrictBase) {
    _inherits(RestrictLengthMax, _RestrictBase);

    var _super = _createSuper$g(RestrictLengthMax);

    /**
     * @param {Number}  max      The max length of detected value.
     * @param {Boolean} [closed] Whether it's a closed interval. By default, the interval
     * is closed, which means the length of the detected value can be equal to max. When
     * closed is exactly false, the interval will be opened.
     */
    function RestrictLengthMax(max, closed) {
      var _this;

      _classCallCheck(this, RestrictLengthMax);

      _this = _super.call(this);

      if (isNumber(max) === false) {
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


    _createClass(RestrictLengthMax, [{
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
  }(RestrictBase);

  function _createSuper$h(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$i(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$i() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var RestrictLengthMin = /*#__PURE__*/function (_RestrictBase) {
    _inherits(RestrictLengthMin, _RestrictBase);

    var _super = _createSuper$h(RestrictLengthMin);

    /**
     * @param {Number}  min      The min length of detected value.
     * @param {Boolean} [closed] Whether it's a closed interval. By default, the interval
     * is closed, which means the length of the detected value can be equal to min. When
     * closed is exactly false, the interval will be opened.
     */
    function RestrictLengthMin(min, closed) {
      var _this;

      _classCallCheck(this, RestrictLengthMin);

      _this = _super.call(this);

      if (isNumber(min) === false) {
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


    _createClass(RestrictLengthMin, [{
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
  }(RestrictBase);

  function _createSuper$i(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$j(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$j() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var RestrictStringPattern = /*#__PURE__*/function (_RestrictBase) {
    _inherits(RestrictStringPattern, _RestrictBase);

    var _super = _createSuper$i(RestrictStringPattern);

    /**
     * @param {RegExp} pattern The regular expression to restrict the format of string.
     */
    function RestrictStringPattern(pattern) {
      var _this;

      _classCallCheck(this, RestrictStringPattern);

      _this = _super.call(this);
      _this.pattern = null;

      if (isRegExp(pattern) === false) {
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


    _createClass(RestrictStringPattern, [{
      key: "validate",
      value: function validate(val) {
        if (!this.pattern.test(val)) {
          throw this.getError("value should match pattern ".concat(this.pattern.toString()));
        }
      }
    }]);

    return RestrictStringPattern;
  }(RestrictBase);

  function _createSuper$j(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$k(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$k() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var SchemaString = /*#__PURE__*/function (_SchemaBase) {
    _inherits(SchemaString, _SchemaBase);

    var _super = _createSuper$j(SchemaString);

    function SchemaString() {
      var _this;

      _classCallCheck(this, SchemaString);

      _this = _super.call(this);
      _this.type = TYPE.string;
      _this.typeRestrict = new RestrictStringSchema();
      _this.lastRestrict = _this.typeRestrict;
      return _this;
    }
    /**
     * Add an "enum" restrict to string schema.
     *
     * @param {Array<*>} values The enum values that restrict the detected value can be.
     */


    _createClass(SchemaString, [{
      key: "enum",
      value: function _enum() {
        for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
          values[_key] = arguments[_key];
        }

        var restrict = _construct(RestrictEnum, values);

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
        var restrict = new RestrictLengthMin(_min, closed);
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
        var restrict = new RestrictLengthMax(_max, closed);
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
        var restrict = new RestrictStringPattern(_pattern);
        this.restricts.push(restrict);
        this.lastRestrict = restrict;
        return this;
      }
    }]);

    return SchemaString;
  }(SchemaBase);

  function _createSuper$k(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$l(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$l() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var RestrictBooleanSchema = /*#__PURE__*/function (_RestrictBase) {
    _inherits(RestrictBooleanSchema, _RestrictBase);

    var _super = _createSuper$k(RestrictBooleanSchema);

    function RestrictBooleanSchema() {
      _classCallCheck(this, RestrictBooleanSchema);

      return _super.apply(this, arguments);
    }

    _createClass(RestrictBooleanSchema, [{
      key: "validate",

      /**
       * Check the detected value whether meets this "boolean-schema" restrict.
       *
       * @param {*} val The detected value.
       */
      value: function validate(val) {
        // When the detected value isn't boolean, null or undefined, validation
        // will be fail. Otherwise, validation will be success.
        if (!isBoolean(val) && !isNotRequired(val)) {
          throw this.getError('value should be a type of boolean');
        }
      }
    }]);

    return RestrictBooleanSchema;
  }(RestrictBase);

  function _createSuper$l(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$m(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$m() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var SchemaBoolean = /*#__PURE__*/function (_SchemaBase) {
    _inherits(SchemaBoolean, _SchemaBase);

    var _super = _createSuper$l(SchemaBoolean);

    function SchemaBoolean() {
      var _this;

      _classCallCheck(this, SchemaBoolean);

      _this = _super.call(this);
      _this.type = TYPE;
      _this.typeRestrict = new RestrictBooleanSchema();
      _this.lastRestrict = _this.typeRestrict;
      return _this;
    }
    /**
     * Add an "enum" restrict to boolean schema.
     *
     * @param {Array<*>} values The enum values that restrict the detected value can be.
     */


    _createClass(SchemaBoolean, [{
      key: "enum",
      value: function _enum() {
        for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
          values[_key] = arguments[_key];
        }

        var restrict = _construct(RestrictEnum, values);

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
  }(SchemaBase);

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

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

  function _createSuper$m(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$n(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$n() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var RestrictObjectSchema = /*#__PURE__*/function (_RestrictBase) {
    _inherits(RestrictObjectSchema, _RestrictBase);

    var _super = _createSuper$m(RestrictObjectSchema);

    function RestrictObjectSchema() {
      _classCallCheck(this, RestrictObjectSchema);

      return _super.apply(this, arguments);
    }

    _createClass(RestrictObjectSchema, [{
      key: "validate",

      /**
       * Check the detected value whether meets this "object-schema" restrict.
       *
       * @param {*} val The detected value.
       */
      value: function validate(val) {
        if (isObject(val) || isNotRequired(val)) {
          return true;
        }

        throw this.getError('value should be a type of object');
      }
    }]);

    return RestrictObjectSchema;
  }(RestrictBase);

  function _createSuper$n(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$o(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$o() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
  var hasOwnProperty = Object.prototype.hasOwnProperty;

  var SchemaObject = /*#__PURE__*/function (_SchemaBase) {
    _inherits(SchemaObject, _SchemaBase);

    var _super = _createSuper$n(SchemaObject);

    function SchemaObject(config) {
      var _this;

      _classCallCheck(this, SchemaObject);

      _this = _super.call(this);
      _this.type = TYPE.object;
      _this.config = null;
      _this.isStripUnknown = false;
      _this.isAllowUnknown = false;
      _this.typeRestrict = new RestrictObjectSchema();
      _this.lastRestrict = _this.typeRestrict; // If config is passed non-object, it means that the key-value structure
      // is no need to restrct.

      if (isObject(config)) {
        var pureConfig = {}; // Filter the keys that corresponding value is an instance of SchemaBase.
        // This is for the purpose that allow config include value that is not an
        // instance of SchemaBase, and ingore them.

        Object.keys(config).forEach(function (key) {
          if (config[key] instanceof SchemaBase) {
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


    _createClass(SchemaObject, [{
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
        if (!this.requiredRestrict && isNotRequired(obj)) {
          return this.getReturnValue(obj);
        }

        try {
          this.checkType(obj);
          this.checkRequired(obj);
          this.checkRestricts(obj);
          return this.getReturnValue(this.validateByRecurse(obj, useKeyChain === useKeyChainSymbol ? keyChain : undefined));
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
              throw new ValidateError("the key `".concat(key, "` is not allowed"));
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
          return schema.validate(obj[key], useKeyChainSymbol, [].concat(_toConsumableArray(chain), [keyOption]));
        } catch (error) {
          this.throwErrorWithoutKeyChainIfNeeded(error);
          var keyChainStr = "\"".concat(getKeyStr([].concat(_toConsumableArray(chain), [keyOption])), "\": ");
          throw new ValidateError("".concat(keyChainStr).concat(error.message), {
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
  }(SchemaBase);

  function _createSuper$o(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$p(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$p() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var RestrictArraySchema = /*#__PURE__*/function (_RestrictBase) {
    _inherits(RestrictArraySchema, _RestrictBase);

    var _super = _createSuper$o(RestrictArraySchema);

    function RestrictArraySchema() {
      _classCallCheck(this, RestrictArraySchema);

      return _super.apply(this, arguments);
    }

    _createClass(RestrictArraySchema, [{
      key: "validate",

      /**
       * Check the detected value whether meets this "array-schema" restrict.
       *
       * @param {*} val The detected value.
       */
      value: function validate(val) {
        // When the detected value isn't array, null or undefined, validation
        // will be fail. Otherwise, validation will be success.
        if (!isArray(val) && !isNotRequired(val)) {
          throw this.getError('value should be a type of array');
        }
      }
    }]);

    return RestrictArraySchema;
  }(RestrictBase);

  function _createSuper$p(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$q(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$q() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var SchemaArray = /*#__PURE__*/function (_SchemaBase) {
    _inherits(SchemaArray, _SchemaBase);

    var _super = _createSuper$p(SchemaArray);

    /**
     * @param {SchemaBase} itemSchema The schema defined for every item of array.
     * If itemSchema isn't instanceof SchemaBase, then it will be ignored, this
     * means that the detected array can include any type value.
     */
    function SchemaArray(itemSchema) {
      var _this;

      _classCallCheck(this, SchemaArray);

      _this = _super.call(this);
      _this.type = TYPE.array;
      _this.itemSchema = null;
      _this.typeRestrict = new RestrictArraySchema();
      _this.lastRestrict = _this.typeRestrict; // Only handle itemSchema when it's instanceof SchemaBase.

      if (itemSchema instanceof SchemaBase) {
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


    _createClass(SchemaArray, [{
      key: "min",
      value: function min(_min, closed) {
        var restrict = new RestrictLengthMin(_min, closed);
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
        var restrict = new RestrictLengthMax(_max, closed);
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
        if (!this.requiredRestrict && isNotRequired(array)) {
          return this.getReturnValue(array);
        }

        try {
          this.checkType(array);
          this.checkRequired(array);
          this.checkRestricts(array);
          return this.getReturnValue(this.validateByRecurse(array, useKeyChain === useKeyChainSymbol ? keyChain : undefined));
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


        return _toConsumableArray(array);
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
          return itemSchema.validate(array[index], useKeyChainSymbol, [].concat(_toConsumableArray(chain), [{
            type: 'index',
            key: index
          }]));
        } catch (error) {
          this.throwErrorWithoutKeyChainIfNeeded(error);
          var keyOption = {
            type: 'index',
            key: index
          };
          var keyChainStr = "\"".concat(getKeyStr([].concat(_toConsumableArray(chain), [keyOption])), "\": ");
          throw new ValidateError("".concat(keyChainStr).concat(error.message), {
            final: true
          });
        }
      }
    }]);

    return SchemaArray;
  }(SchemaBase);

  function _createSuper$q(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$r(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$r() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var SchemaMixed = /*#__PURE__*/function (_SchemaBase) {
    _inherits(SchemaMixed, _SchemaBase);

    var _super = _createSuper$q(SchemaMixed);

    /**
     * @param {Array<SchemaBase>} schemas The allowed schemas.
     */
    function SchemaMixed() {
      var _this;

      _classCallCheck(this, SchemaMixed);

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


    _createClass(SchemaMixed, [{
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
  }(SchemaBase);

  function any() {
    return new SchemaAny();
  }
  function number() {
    return new SchemaNumber();
  }
  function string() {
    return new SchemaString();
  }
  function boolean() {
    return new SchemaBoolean();
  }
  function object(config) {
    return new SchemaObject(config);
  }
  function array(itemSchema) {
    return new SchemaArray(itemSchema);
  }
  function mixed() {
    for (var _len = arguments.length, schemas = new Array(_len), _key = 0; _key < _len; _key++) {
      schemas[_key] = arguments[_key];
    }

    return _construct(SchemaMixed, schemas);
  }
  var index = {
    any: any,
    number: number,
    string: string,
    boolean: boolean,
    object: object,
    array: array,
    mixed: mixed
  };

  exports.any = any;
  exports.array = array;
  exports.boolean = boolean;
  exports.default = index;
  exports.mixed = mixed;
  exports.number = number;
  exports.object = object;
  exports.string = string;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=racoon.umd.js.map
