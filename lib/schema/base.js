import {
  isEmpty,
  isNotRequired,
  isNaN,
  isString,
  isFunction,
} from '../util/is';
import ValidateError from '../util/validate-error';
import RestrictRequired from '../restrict/required';
import RestrictCustom from '../restrict/custom';

export default class SchemaBase {
  restricts = [];
  typeRestrict = null;
  requiredRestrict = null;
  // 保存当前正在操作的限制器，便于调用`error(msg)`方法自定义错误
  // 文案时，能够将错误文案添加到正确限制器中
  currentRestrict = null;
  // 当被检测值为空时的默认返回值配置
  defaultConfig = {
    enable: false,
    strict: false,
    value: undefined,
  };
  // 默认的格式化配置，原封不动返回原始数据
  formatterConfig = {
    ctx: undefined,
    formatter: val => val,
  };
  errorForAllConfig = {
    enable: false,
    ctx: undefined,
    message: '',
  };

  required(strict) {
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
      ctx,
    };
    return this;
  }

  default(...args) {
    if (args.length === 0) {
      throw new Error('`default` args can not be empty');
    }
    const [value, strict, ctx] = args;
    Object.assign(this.defaultConfig, {
      ctx,
      value,
      enable: true,
      strict: strict === true,
    });
    return this;
  }

  format(formatter, ctx) {
    if (typeof formatter !== 'function') {
      throw new TypeError('`format` argument should be a function');
    }
    this.formatterConfig = {
      ctx,
      formatter,
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

  /**
   * 当数据类型、格式校验通过后，做最后的格式化操作
   *
   * @param {*} val 原始数据
   * @returns {*} 格式化后的数据
   */
  getReturnValue(val) {
    const { enable, strict } = this.defaultConfig;
    const { formatter, ctx } = this.formatterConfig;

    if (enable && isEmpty(val) && strict) {
      return formatter.call(
        ctx,
        this.calcDefaultValue(val),
      );
    }
    return this.getReturnValueWithoutStrict(val);
  }

  getErrorForAll(originalMessage) {
    const {
      ctx,
      enable,
      message,
    } = this.errorForAllConfig;

    if (enable !== true) {
      return null;
    }
    if (message && isString(message)) {
      return new ValidateError(message);
    }
    if (isFunction(message)) {
      return new ValidateError(message.call(ctx, originalMessage));
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
        value: this.validate(val),
      };
    } catch (error) {
      return {
        error,
        value: val,
      };
    }
  }

  /**
   * @private
   * 当数据类型、格式校验通过后，做最后的格式化操作
   * 这是`defaultConfig.strict`为`false`的场景
   *
   * @param {*} val 原始数据
   */
  getReturnValueWithoutStrict(val) {
    const { enable } = this.defaultConfig;
    const { formatter, ctx } = this.formatterConfig;
    let value = val;

    // 当有设置默认返回值，并且被检测值为空时，需要对默认返回值格式化
    if (enable && (isNotRequired(val) || isNaN(val))) {
      value = this.calcDefaultValue(val);
    }
    // 否则，对原始值格式化
    return formatter.call(ctx, value);
  }
}
