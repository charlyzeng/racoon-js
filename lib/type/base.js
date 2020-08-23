import {
  isEmpty,
  isNotRequired,
  isNaN,
  isString,
  isFunction
} from '../utils/is';
import ValidateError from '../utils/validate-error';
import RestrictRequired from '../restricts/required';
import RestrictCustom from '../restricts/custom';

export default class TypeBase {
  restricts = [];
  typeRestrict = null;
  requiredRestrict = null;
  currentRestrict = null;
  defaultConfig = {
    enable: false,
    strict: false,
    value: undefined
  };
  formatterConfig = {
    ctx: undefined,
    formatter: val => val
  };
  errorForAllConfig = {
    enable: false,
    ctx: undefined,
    message: ''
  };

  required(strict = false) {
    this.requiredRestrict = new RestrictRequired(strict);
    this.currentRestrict = this.requiredRestrict;
    return this;
  }

  custom(restrictFn, ctx) {
    const restrict = new RestrictCustom(restrictFn, ctx);
    this.restricts.push(restrict);
    this.currentRestrict = restrict;
    return this;
  }

  error(message, ctx) {
    this.currentRestrict.setErrorMessage(message, ctx);
    return this;
  }

  errorForAll(message, ctx) {
    this.errorForAllConfig = {
      enable: true,
      message,
      ctx
    };
    return this;
  }

  default(...args) {
    if (args.length === 0) {
      throw new Error('`default` args can not be empty');
    }
    const [value, strict, ctx] = args;
    Object.assign(this.defaultConfig, {
      enable: true,
      strict: strict === true,
      value,
      ctx
    });
    return this;
  }

  format(formatter, ctx) {
    if (typeof formatter !== 'function') {
      throw new TypeError('`format` argument should be a function');
    }
    this.formatterConfig = {
      ctx,
      formatter
    };
    return this;
  }

  calcDefaultValue(val) {
    const { value, ctx } = this.defaultConfig;
    if (typeof value === 'function') {
      return value.call(ctx, val);
    }
    return value;
  }

  getReturnValueWithStrict(val) {
    const { enable, strict } = this.defaultConfig;
    const { formatter, ctx } = this.formatterConfig;
    if (enable && (isNotRequired(val) || isNaN(val))) {
      return formatter.call(
        ctx,
        this.calcDefaultValue(val)
      );
    }
    if (enable && isEmpty(val) && strict) {
      return formatter.call(
        ctx,
        this.calcDefaultValue(val)
      );
    }
    return formatter.call(ctx, val);
  }

  getReturnValue(val) {
    const { formatter, ctx } = this.formatterConfig;
    if (this.defaultConfig.enable && (isNotRequired(val) || isNaN(val))) {
      return formatter.call(
        ctx,
        this.calcDefaultValue(val)
      );
    }
    return formatter.call(ctx, val);
  }

  getErrorForAll(originalMessage) {
    const {
      enable,
      ctx,
      message
    } = this.errorForAllConfig;
    if (enable !== true) {
      return null;
    }
    if (isString(message) && message) {
      return new ValidateError(message);
    }
    if (isFunction(message)) {
      return new ValidateError(
        message.call(ctx, originalMessage)
      );
    }
    return null;
  }

  checkType(val) {
    return this.typeRestrict.validate(val);
  }

  checkRequired(val) {
    if (!this.requiredRestrict) {
      return true;
    }

    return this.requiredRestrict.validate(val);
  }

  checkRestricts(val) {
    for (let i = 0; i < this.restricts.length; i += 1) {
      this.restricts[i].validate(val);
    }
    return true;
  }

  validate(val) {
    if (!this.requiredRestrict && isNotRequired(val)) {
      return this.getReturnValue(val);
    }
    try {
      this.checkType(val);
      this.checkRequired(val);
      this.checkRestricts(val);

      return this.getReturnValue(val);
    } catch (error) {
      if (error.custom === true) {
        throw error;
      }
      const errorForAll = this.getErrorForAll(error.message);
      if (errorForAll) {
        throw errorForAll;
      }
      throw error;
    }
  }

  validateSilent(val) {
    try {
      return {
        value: this.validate(val)
      };
    } catch (error) {
      return {
        error,
        value: val
      };
    }
  }
}
