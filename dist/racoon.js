(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.racoon = {}));
}(this, (function (exports) { 'use strict';

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

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

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

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

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

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
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

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var toString = Object.prototype.toString;
  function getType(val) {
    var str = toString.call(val);
    return str.substring(8, str.length - 1);
  }
  function isUndefined(val) {
    return getType(val) === 'Undefined';
  }
  function isNull(val) {
    return val === null;
  }
  function isNaN(val) {
    return val !== val;
  }
  function isNotRequired(val) {
    return isUndefined(val) || isNull(val);
  }
  function isFalsy(val) {
    return !val;
  }
  function isEmpty(val) {
    var type = getType(val);

    if (type === 'Object') {
      return Object.keys(val).length === 0;
    }

    if (type === 'Array' || type === 'Arguments') {
      return val.length === 0;
    }

    return isFalsy(val);
  }
  function isEmptyObject(val) {
    if (getType(val) === 'Object') {
      return Object.keys(val).length === 0;
    }

    return false;
  }
  function isEmptyArray(val) {
    if (getType(val) === 'Array') {
      return val.length === 0;
    }

    return false;
  }
  function isString(val) {
    return typeof val === 'string';
  }
  function isNumber(val) {
    return typeof val === 'number';
  }
  function isInt(val) {
    if (isNumber(val) === false) {
      return false;
    }

    return Math.floor(val) === val;
  }
  function isInfinity(val) {
    return isNumber(val) && isNaN(val) === false && Number.isFinite(val) === false;
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
    return Array.isArray(val);
  }
  function isFunction(val) {
    return getType(val) === 'Function';
  }
  function getKeyStr(keyChain) {
    var propReg = /^[_$a-z][_$a-z\d]*$/i;
    var result = '';

    for (var i = 0; i < keyChain.length; i += 1) {
      var _keyChain$i = keyChain[i],
          type = _keyChain$i.type,
          key = _keyChain$i.key;

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
    }

    return result;
  }

  var TYPE = {
    number: 'number',
    string: 'string',
    "boolean": 'boolean',
    object: 'object',
    array: 'array',
    any: 'any'
  };

  var ValidateError = /*#__PURE__*/function (_Error) {
    _inherits(ValidateError, _Error);

    var _super = _createSuper(ValidateError);

    function ValidateError() {
      _classCallCheck(this, ValidateError);

      return _super.apply(this, arguments);
    }

    _createClass(ValidateError, [{
      key: "toString",
      value: function toString() {
        return "Validate".concat(_get(_getPrototypeOf(ValidateError.prototype), "toString", this).call(this));
      }
    }]);

    return ValidateError;
  }( /*#__PURE__*/_wrapNativeSuper(Error));

  var RestrictBase = /*#__PURE__*/function () {
    function RestrictBase() {
      _classCallCheck(this, RestrictBase);

      this.errorConfig = {
        message: '',
        ctx: null
      };
    }

    _createClass(RestrictBase, [{
      key: "setErrorMessage",
      value: function setErrorMessage(message, ctx) {
        this.errorConfig = {
          message: message,
          ctx: ctx
        };
      }
    }, {
      key: "getError",
      value: function getError(originMessage) {
        var _this$errorConfig = this.errorConfig,
            message = _this$errorConfig.message,
            ctx = _this$errorConfig.ctx;

        if (isFunction(message)) {
          return new ValidateError(message.call(ctx, originMessage));
        }

        return new ValidateError(message || originMessage);
      }
    }]);

    return RestrictBase;
  }();

  var RestrictNumberType = /*#__PURE__*/function (_RestrictBase) {
    _inherits(RestrictNumberType, _RestrictBase);

    var _super = _createSuper(RestrictNumberType);

    function RestrictNumberType() {
      var _this;

      _classCallCheck(this, RestrictNumberType);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));
      _this.isAllowNaN = false;
      _this.isAllowInfinity = false;
      return _this;
    }

    _createClass(RestrictNumberType, [{
      key: "enableAllowNaN",
      value: function enableAllowNaN() {
        this.isAllowNaN = true;
      }
    }, {
      key: "enableAllowInfinity",
      value: function enableAllowInfinity() {
        this.isAllowInfinity = true;
      }
    }, {
      key: "validate",
      value: function validate(val) {
        var isAllowNaN = this.isAllowNaN,
            isAllowInfinity = this.isAllowInfinity;

        if (isNaN(val) && isAllowNaN === false) {
          throw this.getError('value is not allowed to be NaN');
        }

        if (isInfinity(val) && isAllowInfinity === false) {
          throw this.getError('value is not allowed to be Infinity');
        }

        if (isNumber(val) || isUndefined(val) || isNull(val)) {
          return true;
        }

        throw this.getError('value should be typeof number');
      }
    }]);

    return RestrictNumberType;
  }(RestrictBase);

  var RestrictRequired = /*#__PURE__*/function (_RestrictBase) {
    _inherits(RestrictRequired, _RestrictBase);

    var _super = _createSuper(RestrictRequired);

    function RestrictRequired() {
      _classCallCheck(this, RestrictRequired);

      return _super.apply(this, arguments);
    }

    _createClass(RestrictRequired, [{
      key: "validate",
      value: function validate(val) {
        if (isNotRequired(val)) {
          throw this.getError('value is required and should not be undefined/null');
        }

        if (isNaN(val)) {
          throw this.getError('value is required and should not be NaN');
        }

        return true;
      }
    }]);

    return RestrictRequired;
  }(RestrictBase);

  var RestrictEnum = /*#__PURE__*/function (_RestrictBase) {
    _inherits(RestrictEnum, _RestrictBase);

    var _super = _createSuper(RestrictEnum);

    function RestrictEnum() {
      var _this;

      _classCallCheck(this, RestrictEnum);

      _this = _super.call(this);
      _this.enumValues = null;

      for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
        values[_key] = arguments[_key];
      }

      if (values.length === 0) {
        throw new RangeError('enum arguments can not be empty');
      }

      _this.enumValues = values;
      return _this;
    }

    _createClass(RestrictEnum, [{
      key: "validate",
      value: function validate(val) {
        if (this.enumValues.indexOf(val) > -1) {
          return true;
        }

        throw this.getError("value should be one of ".concat(this.valueStr));
      }
    }, {
      key: "valueStr",
      get: function get() {
        return JSON.stringify(this.enumValues);
      }
    }]);

    return RestrictEnum;
  }(RestrictBase);

  var RestrictNumberMax = /*#__PURE__*/function (_RestrictBase) {
    _inherits(RestrictNumberMax, _RestrictBase);

    var _super = _createSuper(RestrictNumberMax);

    function RestrictNumberMax(max, closed) {
      var _this;

      _classCallCheck(this, RestrictNumberMax);

      _this = _super.call(this);

      if (isNumber(max) === false) {
        throw new TypeError('`max` should be typeof number');
      }

      _this.max = max;
      _this.closed = closed !== false;
      return _this;
    }

    _createClass(RestrictNumberMax, [{
      key: "validate",
      value: function validate(val) {
        if (this.closed === false) {
          if (val < this.max) {
            return true;
          }

          throw this.getError("value should less than ".concat(this.max));
        }

        if (val <= this.max) {
          return true;
        }

        throw this.getError("value should less than or equal ".concat(this.max));
      }
    }]);

    return RestrictNumberMax;
  }(RestrictBase);

  var RestrictNumberMin = /*#__PURE__*/function (_RestrictBase) {
    _inherits(RestrictNumberMin, _RestrictBase);

    var _super = _createSuper(RestrictNumberMin);

    function RestrictNumberMin(min, closed) {
      var _this;

      _classCallCheck(this, RestrictNumberMin);

      _this = _super.call(this);

      if (isNumber(min) === false) {
        throw new TypeError('`min` should be a number');
      }

      _this.min = min;
      _this.closed = closed !== false;
      return _this;
    }

    _createClass(RestrictNumberMin, [{
      key: "validate",
      value: function validate(val) {
        if (this.closed === false) {
          if (val > this.min) {
            return true;
          }

          throw this.getError("value should greater than ".concat(this.min));
        }

        if (val >= this.min) {
          return true;
        }

        throw this.getError("value should greater than or equal ".concat(this.min));
      }
    }]);

    return RestrictNumberMin;
  }(RestrictBase);

  var RestrictNumberInt = /*#__PURE__*/function (_RestrictBase) {
    _inherits(RestrictNumberInt, _RestrictBase);

    var _super = _createSuper(RestrictNumberInt);

    function RestrictNumberInt() {
      _classCallCheck(this, RestrictNumberInt);

      return _super.apply(this, arguments);
    }

    _createClass(RestrictNumberInt, [{
      key: "validate",
      value: function validate(val) {
        if (isInt(val)) {
          return true;
        }

        throw this.getError('value should be an int');
      }
    }]);

    return RestrictNumberInt;
  }(RestrictBase);

  var RestrictRequired$1 = /*#__PURE__*/function (_RestrictBase) {
    _inherits(RestrictRequired, _RestrictBase);

    var _super = _createSuper(RestrictRequired);

    function RestrictRequired(strict) {
      var _this;

      _classCallCheck(this, RestrictRequired);

      _this = _super.call(this);
      _this.strict = false;
      _this.strict = strict === true;
      return _this;
    }

    _createClass(RestrictRequired, [{
      key: "validate",
      value: function validate(val) {
        var strict = this.strict;

        if (strict === true) {
          if (isEmpty(val)) {
            throw this.getError('value is required and should not be empty');
          }

          return true;
        }

        if (isNotRequired(val)) {
          throw this.getError('value is required and should not be undefined/null');
        }

        return true;
      }
    }]);

    return RestrictRequired;
  }(RestrictBase);

  var RestrictCustom = /*#__PURE__*/function (_RestrictBase) {
    _inherits(RestrictCustom, _RestrictBase);

    var _super = _createSuper(RestrictCustom);

    function RestrictCustom(restrictFn, ctx) {
      var _this;

      _classCallCheck(this, RestrictCustom);

      _this = _super.call(this);

      if (isFunction(restrictFn) === false) {
        throw new TypeError('`custom` must receive a Function parameter');
      }

      _this.restrictFn = restrictFn;
      _this.ctx = ctx;
      return _this;
    }

    _createClass(RestrictCustom, [{
      key: "validate",
      value: function validate(val) {
        try {
          this.restrictFn.call(this.ctx, val);
        } catch (error) {
          throw this.getError(error.message);
        }

        return true;
      }
    }]);

    return RestrictCustom;
  }(RestrictBase);

  var TypeBase = /*#__PURE__*/function () {
    function TypeBase() {
      _classCallCheck(this, TypeBase);

      this.restricts = [];
      this.typeRestrict = null;
      this.requiredRestrict = null;
      this.currentRestrict = null;
      this.defaultConfig = {
        enable: false,
        strict: false,
        value: undefined
      };
      this.formatterConfig = {
        ctx: undefined,
        formatter: function formatter(val) {
          return val;
        }
      };
    }

    _createClass(TypeBase, [{
      key: "required",
      value: function required() {
        var strict = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        this.requiredRestrict = new RestrictRequired$1(strict);
        this.currentRestrict = this.requiredRestrict;
        return this;
      }
    }, {
      key: "custom",
      value: function custom(restrictFn, ctx) {
        var restrict = new RestrictCustom(restrictFn, ctx);
        this.restricts.push(restrict);
        this.currentRestrict = restrict;
        return this;
      }
    }, {
      key: "error",
      value: function error(message, ctx) {
        this.currentRestrict.setErrorMessage(message, ctx);
        return this;
      }
    }, {
      key: "default",
      value: function _default() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        if (args.length === 0) {
          throw new Error('`default` args can not be empty');
        }

        var value = args[0],
            strict = args[1],
            ctx = args[2];
        Object.assign(this.defaultConfig, {
          enable: true,
          strict: strict === true,
          value: value,
          ctx: ctx
        });
        return this;
      }
    }, {
      key: "format",
      value: function format(formatter, ctx) {
        if (typeof formatter !== 'function') {
          throw new TypeError('`format` argument should be a function');
        }

        this.formatterConfig = {
          ctx: ctx,
          formatter: formatter
        };
        return this;
      }
    }, {
      key: "calcDefaultValue",
      value: function calcDefaultValue(val) {
        var _this$defaultConfig = this.defaultConfig,
            value = _this$defaultConfig.value,
            ctx = _this$defaultConfig.ctx;

        if (typeof value === 'function') {
          return value.call(ctx, val);
        }

        return value;
      }
    }, {
      key: "getReturnValueWithStrict",
      value: function getReturnValueWithStrict(val) {
        var _this$defaultConfig2 = this.defaultConfig,
            enable = _this$defaultConfig2.enable,
            strict = _this$defaultConfig2.strict;
        var _this$formatterConfig = this.formatterConfig,
            formatter = _this$formatterConfig.formatter,
            ctx = _this$formatterConfig.ctx;

        if (enable && (isNotRequired(val) || isNaN(val))) {
          return formatter.call(ctx, this.calcDefaultValue(val));
        }

        if (enable && isEmpty(val) && strict) {
          return formatter.call(ctx, this.calcDefaultValue(val));
        }

        return formatter.call(ctx, val);
      }
    }, {
      key: "getReturnValue",
      value: function getReturnValue(val) {
        var _this$formatterConfig2 = this.formatterConfig,
            formatter = _this$formatterConfig2.formatter,
            ctx = _this$formatterConfig2.ctx;

        if (this.defaultConfig.enable && (isNotRequired(val) || isNaN(val))) {
          return formatter.call(ctx, this.calcDefaultValue(val));
        }

        return formatter.call(ctx, val);
      }
    }, {
      key: "checkType",
      value: function checkType(val) {
        return this.typeRestrict.validate(val);
      }
    }, {
      key: "checkRequired",
      value: function checkRequired(val) {
        if (!this.requiredRestrict) {
          return true;
        }

        return this.requiredRestrict.validate(val);
      }
    }, {
      key: "checkRestricts",
      value: function checkRestricts(val) {
        for (var i = 0; i < this.restricts.length; i += 1) {
          this.restricts[i].validate(val);
        }

        return true;
      }
    }, {
      key: "validate",
      value: function validate(val) {
        if (!this.requiredRestrict && isNotRequired(val)) {
          return this.getReturnValue(val);
        }

        this.checkType(val);
        this.checkRequired(val);
        this.checkRestricts(val);
        return this.getReturnValue(val);
      }
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
    }]);

    return TypeBase;
  }();

  var TypeNumber = /*#__PURE__*/function (_TypeBase) {
    _inherits(TypeNumber, _TypeBase);

    var _super = _createSuper(TypeNumber);

    function TypeNumber() {
      var _this;

      _classCallCheck(this, TypeNumber);

      _this = _super.call(this);
      _this.type = TYPE.number;
      _this.typeRestrict = new RestrictNumberType();
      _this.currentRestrict = _this.typeRestrict;
      return _this;
    }

    _createClass(TypeNumber, [{
      key: "getReturnValue",
      value: function getReturnValue(val) {
        var enable = this.defaultConfig.enable;
        var _this$formatterConfig = this.formatterConfig,
            formatter = _this$formatterConfig.formatter,
            ctx = _this$formatterConfig.ctx;

        if (enable && (isNotRequired(val) || isNaN(val))) {
          return formatter.call(ctx, this.calcDefaultValue(val));
        }

        return formatter.call(ctx, val);
      }
    }, {
      key: "default",
      value: function _default() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        if (args.length === 0) {
          throw new Error('`default` args can not be empty');
        }

        var value = args[0],
            ctx = args[1];
        Object.assign(this.defaultConfig, {
          enable: true,
          strict: false,
          value: value,
          ctx: ctx
        });
        return this;
      }
    }, {
      key: "enum",
      value: function _enum() {
        for (var _len2 = arguments.length, values = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          values[_key2] = arguments[_key2];
        }

        var restrict = _construct(RestrictEnum, values);

        this.restricts.push(restrict);
        this.currentRestrict = restrict;
        return this;
      }
    }, {
      key: "required",
      value: function required() {
        this.requiredRestrict = new RestrictRequired();
        this.currentRestrict = this.requiredRestrict;
        return this;
      }
    }, {
      key: "allowNaN",
      value: function allowNaN() {
        this.typeRestrict.enableAllowNaN();
        return this;
      }
    }, {
      key: "allowInfinity",
      value: function allowInfinity() {
        this.typeRestrict.enableAllowInfinity();
        return this;
      }
    }, {
      key: "min",
      value: function min(_min) {
        var closed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var restrict = new RestrictNumberMin(_min, closed);
        this.restricts.push(restrict);
        this.currentRestrict = restrict;
        return this;
      }
    }, {
      key: "max",
      value: function max(_max) {
        var closed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var restrict = new RestrictNumberMax(_max, closed);
        this.restricts.push(restrict);
        this.currentRestrict = restrict;
        return this;
      }
    }, {
      key: "int",
      value: function int() {
        var restrict = new RestrictNumberInt();
        this.restricts.push(restrict);
        this.currentRestrict = restrict;
        return this;
      }
    }]);

    return TypeNumber;
  }(TypeBase);

  var RestrictStringType = /*#__PURE__*/function (_RestrictBase) {
    _inherits(RestrictStringType, _RestrictBase);

    var _super = _createSuper(RestrictStringType);

    function RestrictStringType() {
      _classCallCheck(this, RestrictStringType);

      return _super.apply(this, arguments);
    }

    _createClass(RestrictStringType, [{
      key: "validate",
      value: function validate(val) {
        if (isString(val) || isNotRequired(val)) {
          return true;
        }

        throw this.getError('value should be typeof string');
      }
    }]);

    return RestrictStringType;
  }(RestrictBase);

  var RestrictLengthMax = /*#__PURE__*/function (_RestrictBase) {
    _inherits(RestrictLengthMax, _RestrictBase);

    var _super = _createSuper(RestrictLengthMax);

    function RestrictLengthMax(max, closed) {
      var _this;

      _classCallCheck(this, RestrictLengthMax);

      _this = _super.call(this);

      if (isNumber(max) === false) {
        throw new TypeError('`max` should be typeof number');
      }

      _this.max = max;
      _this.closed = closed !== false;
      return _this;
    }

    _createClass(RestrictLengthMax, [{
      key: "validate",
      value: function validate(val) {
        if (this.closed) {
          if (val.length <= this.max) {
            return true;
          }

          throw this.getError("value length should less than or equal ".concat(this.max));
        }

        if (val.length < this.max) {
          return true;
        }

        throw this.getError("value length should less than ".concat(this.max));
      }
    }]);

    return RestrictLengthMax;
  }(RestrictBase);

  var RestrictLengthMin = /*#__PURE__*/function (_RestrictBase) {
    _inherits(RestrictLengthMin, _RestrictBase);

    var _super = _createSuper(RestrictLengthMin);

    function RestrictLengthMin(min, closed) {
      var _this;

      _classCallCheck(this, RestrictLengthMin);

      _this = _super.call(this);

      if (isNumber(min) === false) {
        throw new TypeError('`min` should be a number');
      }

      _this.min = min;
      _this.closed = closed !== false;
      return _this;
    }

    _createClass(RestrictLengthMin, [{
      key: "validate",
      value: function validate(val) {
        if (this.closed) {
          if (val.length >= this.min) {
            return true;
          }

          throw this.getError("value length should greater than or equal ".concat(this.min));
        }

        if (val.length > this.min) {
          return true;
        }

        throw this.getError("value length should greater than ".concat(this.min));
      }
    }]);

    return RestrictLengthMin;
  }(RestrictBase);

  var RestrictStringPattern = /*#__PURE__*/function (_RestrictBase) {
    _inherits(RestrictStringPattern, _RestrictBase);

    var _super = _createSuper(RestrictStringPattern);

    function RestrictStringPattern(pattern) {
      var _this;

      _classCallCheck(this, RestrictStringPattern);

      _this = _super.call(this);

      if (isRegExp(pattern) === false) {
        throw new TypeError('pattern should be a RegExp');
      }

      _this.pattern = pattern;
      return _this;
    }

    _createClass(RestrictStringPattern, [{
      key: "validate",
      value: function validate(val) {
        if (this.pattern.test(val)) {
          return true;
        }

        throw this.getError("value should match pattern ".concat(this.pattern.toString()));
      }
    }]);

    return RestrictStringPattern;
  }(RestrictBase);

  var TypeString = /*#__PURE__*/function (_TypeBase) {
    _inherits(TypeString, _TypeBase);

    var _super = _createSuper(TypeString);

    function TypeString() {
      var _this;

      _classCallCheck(this, TypeString);

      _this = _super.call(this);
      _this.type = TYPE.string;
      _this.typeRestrict = new RestrictStringType();
      _this.currentRestrict = _this.typeRestrict;
      return _this;
    }

    _createClass(TypeString, [{
      key: "getReturnValue",
      value: function getReturnValue(val) {
        return this.getReturnValueWithStrict(val);
      }
    }, {
      key: "enum",
      value: function _enum() {
        for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
          values[_key] = arguments[_key];
        }

        var restrict = _construct(RestrictEnum, values);

        this.restricts.push(restrict);
        this.currentRestrict = restrict;
        return this;
      }
    }, {
      key: "max",
      value: function max(_max) {
        var closed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var restrict = new RestrictLengthMax(_max, closed);
        this.restricts.push(restrict);
        this.currentRestrict = restrict;
        return this;
      }
    }, {
      key: "min",
      value: function min(_min) {
        var closed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var restrict = new RestrictLengthMin(_min, closed);
        this.restricts.push(restrict);
        this.currentRestrict = restrict;
        return this;
      }
    }, {
      key: "pattern",
      value: function pattern(_pattern) {
        var restrict = new RestrictStringPattern(_pattern);
        this.restricts.push(restrict);
        this.currentRestrict = restrict;
        return this;
      }
    }]);

    return TypeString;
  }(TypeBase);

  var RestrictBooleanType = /*#__PURE__*/function (_RestrictBase) {
    _inherits(RestrictBooleanType, _RestrictBase);

    var _super = _createSuper(RestrictBooleanType);

    function RestrictBooleanType() {
      _classCallCheck(this, RestrictBooleanType);

      return _super.apply(this, arguments);
    }

    _createClass(RestrictBooleanType, [{
      key: "validate",
      value: function validate(val) {
        if (isBoolean(val) || isNotRequired(val)) {
          return true;
        }

        throw this.getError('value should be typeof boolean');
      }
    }]);

    return RestrictBooleanType;
  }(RestrictBase);

  var TypeBoolean = /*#__PURE__*/function (_TypeBase) {
    _inherits(TypeBoolean, _TypeBase);

    var _super = _createSuper(TypeBoolean);

    function TypeBoolean() {
      var _this;

      _classCallCheck(this, TypeBoolean);

      _this = _super.call(this);
      _this.type = TYPE;
      _this.typeRestrict = new RestrictBooleanType();
      _this.currentRestrict = _this.typeRestrict;
      return _this;
    }

    _createClass(TypeBoolean, [{
      key: "enum",
      value: function _enum() {
        for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
          values[_key] = arguments[_key];
        }

        var restrict = _construct(RestrictEnum, values);

        this.restricts.push(restrict);
        this.currentRestrict = restrict;
        return this;
      }
    }, {
      key: "default",
      value: function _default() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        if (args.length === 0) {
          throw new Error('`default` args can not be empty');
        }

        var value = args[0],
            ctx = args[1];
        Object.assign(this.defaultConfig, {
          enable: true,
          strict: false,
          value: value,
          ctx: ctx
        });
        return this;
      }
    }]);

    return TypeBoolean;
  }(TypeBase);

  var RestrictAnyType = /*#__PURE__*/function (_RestrictBase) {
    _inherits(RestrictAnyType, _RestrictBase);

    var _super = _createSuper(RestrictAnyType);

    function RestrictAnyType() {
      _classCallCheck(this, RestrictAnyType);

      return _super.apply(this, arguments);
    }

    _createClass(RestrictAnyType, [{
      key: "validate",
      value: function validate(val) {
        return true;
      }
    }]);

    return RestrictAnyType;
  }(RestrictBase);

  var RestrictRequired$2 = /*#__PURE__*/function (_RestrictBase) {
    _inherits(RestrictRequired, _RestrictBase);

    var _super = _createSuper(RestrictRequired);

    function RestrictRequired(strict) {
      var _this;

      _classCallCheck(this, RestrictRequired);

      _this = _super.call(this);
      _this.strict = false;
      _this.strict = strict === true;
      return _this;
    }

    _createClass(RestrictRequired, [{
      key: "validate",
      value: function validate(val) {
        var strict = this.strict;

        if (strict === true) {
          if (isNotRequired(val) || val === '' || isNaN(val) || isEmptyObject(val) || isEmptyArray(val)) {
            throw this.getError('value is required and should not be empty');
          }

          return true;
        }

        if (isNotRequired(val) || isNaN(val)) {
          throw this.getError('value is required and should not be undefined/null/NaN');
        }

        return true;
      }
    }]);

    return RestrictRequired;
  }(RestrictBase);

  var TypeAny = /*#__PURE__*/function (_TypeBase) {
    _inherits(TypeAny, _TypeBase);

    var _super = _createSuper(TypeAny);

    function TypeAny() {
      var _this;

      _classCallCheck(this, TypeAny);

      _this = _super.call(this);
      _this.type = TYPE.any;
      _this.typeRestrict = new RestrictAnyType();
      _this.currentRestrict = _this.typeRestrict;
      return _this;
    }

    _createClass(TypeAny, [{
      key: "getReturnValue",
      value: function getReturnValue(val) {
        return this.getReturnValueWithStrict(val);
      }
    }, {
      key: "required",
      value: function required() {
        var strict = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        this.requiredRestrict = new RestrictRequired$2(strict);
        this.currentRestrict = this.requiredRestrict;
        return this;
      }
    }, {
      key: "enum",
      value: function _enum() {
        for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
          values[_key] = arguments[_key];
        }

        var restrict = _construct(RestrictEnum, values);

        this.restricts.push(restrict);
        this.currentRestrict = restrict;
        return this;
      }
    }]);

    return TypeAny;
  }(TypeBase);

  var RestrictObjectType = /*#__PURE__*/function (_RestrictBase) {
    _inherits(RestrictObjectType, _RestrictBase);

    var _super = _createSuper(RestrictObjectType);

    function RestrictObjectType() {
      _classCallCheck(this, RestrictObjectType);

      return _super.apply(this, arguments);
    }

    _createClass(RestrictObjectType, [{
      key: "validate",
      value: function validate(val) {
        if (isObject(val) || isUndefined(val) || isNull(val)) {
          return true;
        }

        throw this.getError('value should be typeof object');
      }
    }]);

    return RestrictObjectType;
  }(RestrictBase);

  var TypeObject = /*#__PURE__*/function (_TypeBase) {
    _inherits(TypeObject, _TypeBase);

    var _super = _createSuper(TypeObject);

    function TypeObject(config) {
      var _this;

      _classCallCheck(this, TypeObject);

      _this = _super.call(this);
      _this.type = TYPE.object;
      _this.config = null;
      _this.isStripUnknown = false;
      _this.isAllowUnknown = false;
      _this.typeRestrict = new RestrictObjectType();
      _this.currentRestrict = _this.typeRestrict;

      if (isObject(config)) {
        var pureConfig = Object.create(null);
        Object.keys(config).forEach(function (key) {
          if (config[key] instanceof TypeBase) {
            pureConfig[key] = config[key];
          }
        });
        _this.config = pureConfig;
      }

      return _this;
    }

    _createClass(TypeObject, [{
      key: "hasKey",
      value: function hasKey(key) {
        return this.keys.includes(key);
      }
    }, {
      key: "getReturnValue",
      value: function getReturnValue(val) {
        return this.getReturnValueWithStrict(val);
      }
    }, {
      key: "stripUnknown",
      value: function stripUnknown() {
        this.isStripUnknown = true;
        return this;
      }
    }, {
      key: "allowUnknown",
      value: function allowUnknown() {
        this.isAllowUnknown = true;
        return this;
      }
      /**
       * @private
       * @param {Object} obj - object to validate
       * @param {Array} [keyChain=[]] - object props chain
       * @returns {Object} - result of validate
       */

    }, {
      key: "validateRecurse",
      value: function validateRecurse(obj, keyChain) {
        keyChain = keyChain || [];

        if (this.config === null) {
          return obj;
        }

        var result = {};
        var keys;

        if (this.isStripUnknown === true) {
          keys = this.keys;
        } else {
          keys = Object.keys(obj);
        }

        for (var i = 0; i < keys.length; i += 1) {
          var key = keys[i];
          var schema = this.config[key];

          if (this.hasKey(key) === false) {
            if (this.isAllowUnknown === true) {
              result[key] = obj[key];
              continue;
            }

            throw new ValidateError("the key `".concat(key, "` is not allowed"));
          }

          try {
            if (schema.type === TYPE.object || schema.type === TYPE.array) {
              result[key] = schema.validateRecurse(obj[key], [].concat(_toConsumableArray(keyChain), [{
                key: key,
                type: 'prop'
              }]));
            } else {
              result[key] = schema.validate(obj[key]);
            }
          } catch (error) {
            if (error instanceof ValidateError) {
              var keyChainStr = getKeyStr([].concat(_toConsumableArray(keyChain), [{
                type: 'prop',
                key: key
              }]));
              keyChainStr = "\"".concat(keyChainStr, "\": ");
              throw new Error("".concat(keyChainStr).concat(error.message));
            } else {
              throw error;
            }
          }
        }

        return result;
      }
    }, {
      key: "validate",
      value: function validate(obj) {
        if (!this.requiredRestrict && isNotRequired(obj)) {
          return this.getReturnValue(obj);
        }

        this.checkRequired(obj);
        this.checkType(obj);
        this.checkRestricts(obj);
        return this.getReturnValue(this.validateRecurse(obj));
      }
    }, {
      key: "keys",
      get: function get() {
        return Object.keys(this.config);
      }
    }]);

    return TypeObject;
  }(TypeBase);

  var RestrictArrayType = /*#__PURE__*/function (_RestrictBase) {
    _inherits(RestrictArrayType, _RestrictBase);

    var _super = _createSuper(RestrictArrayType);

    function RestrictArrayType() {
      _classCallCheck(this, RestrictArrayType);

      return _super.apply(this, arguments);
    }

    _createClass(RestrictArrayType, [{
      key: "validate",
      value: function validate(val) {
        if (isArray(val) || isUndefined(val) || isNull(val)) {
          return true;
        }

        throw this.getError('value should be typeof array');
      }
    }]);

    return RestrictArrayType;
  }(RestrictBase);

  var TypeArray = /*#__PURE__*/function (_TypeBase) {
    _inherits(TypeArray, _TypeBase);

    var _super = _createSuper(TypeArray);

    function TypeArray(itemSchema) {
      var _this;

      _classCallCheck(this, TypeArray);

      _this = _super.call(this);
      _this.type = TYPE.array;
      _this.itemSchema = null;
      _this.typeRestrict = new RestrictArrayType();
      _this.currentRestrict = _this.typeRestrict;

      if (itemSchema instanceof TypeBase) {
        _this.itemSchema = itemSchema;
      }

      return _this;
    }

    _createClass(TypeArray, [{
      key: "getReturnValue",
      value: function getReturnValue(val) {
        return this.getReturnValueWithStrict(val);
      }
    }, {
      key: "min",
      value: function min(_min) {
        var closed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var restrict = new RestrictLengthMin(_min, closed);
        this.restricts.push(restrict);
        this.currentRestrict = restrict;
        return this;
      }
    }, {
      key: "max",
      value: function max(_max) {
        var closed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var restrict = new RestrictLengthMax(_max, closed);
        this.restricts.push(restrict);
        this.currentRestrict = restrict;
        return this;
      }
      /**
       * @private
       * @param {Array} array - array to validate
       * @param {Array} [keyChain=[]] - props key chain
       * @returns {Array} - result of validate
       */

    }, {
      key: "validateRecurse",
      value: function validateRecurse(array, keyChain) {
        keyChain = keyChain || [];
        var itemSchema = this.itemSchema;

        if (itemSchema) {
          var result = [];

          for (var i = 0; i < array.length; i += 1) {
            try {
              if (itemSchema.type === TYPE.array || itemSchema.type === TYPE.object) {
                result.push(itemSchema.validateRecurse(array[i], [].concat(_toConsumableArray(keyChain), [{
                  type: 'index',
                  key: i
                }])));
              } else {
                result.push(itemSchema.validate(array[i]));
              }
            } catch (error) {
              if (error instanceof ValidateError) {
                var keyChainStr = getKeyStr([].concat(_toConsumableArray(keyChain), [{
                  type: 'index',
                  key: i
                }]));
                keyChainStr = "\"".concat(keyChainStr, "\": ");
                throw new Error("".concat(keyChainStr).concat(error.message));
              } else {
                throw error;
              }
            }
          }

          return result;
        }

        return array;
      }
    }, {
      key: "validate",
      value: function validate(array) {
        if (!this.requiredRestrict && isNotRequired(array)) {
          return this.getReturnValue(array);
        }

        this.checkRequired(array);
        this.checkType(array);
        this.checkRestricts(array);
        return this.getReturnValue(this.validateRecurse(array));
      }
    }]);

    return TypeArray;
  }(TypeBase);

  function number() {
    return new TypeNumber();
  }
  function string() {
    return new TypeString();
  }

  function _boolean() {
    return new TypeBoolean();
  }
  function any() {
    return new TypeAny();
  }
  function object(config) {
    return new TypeObject(config);
  }
  function array(itemSchema) {
    return new TypeArray(itemSchema);
  }
  var index = {
    number: number,
    string: string,
    "boolean": _boolean,
    any: any,
    object: object,
    array: array
  };

  exports.any = any;
  exports.array = array;
  exports.boolean = _boolean;
  exports.default = index;
  exports.number = number;
  exports.object = object;
  exports.string = string;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=racoon.js.map
