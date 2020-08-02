import {
  isEmpty,
  isNotRequired
} from '../utils/is';
import RestrictEnum from '../restricts/enum';
import ValidateError from '../utils/validate-error';

export default class TypeBase {
  restricts = [];
  requiredRestrict = null;
  defaultConfig = {
    enable: false,
    strict: false,
    value: undefined
  };
  formatter = val => val;

  required(strict = false) {
    this.requiredRestrict = { strict };
    return this;
  }

  enum(...values) {
    this.restricts.push(new RestrictEnum(...values));
    return this;
  }

  custom(restrictFn) {
    this.restricts.push({
      type: 'custom',
      restrictFn
    });
    return this;
  }

  default(...args) {
    if (args.length === 0) {
      throw new Error('`default` args can not be empty');
    }
    const [value, strict] = args;
    Object.assign(this.defaultConfig, {
      enable: true,
      strict: strict === true,
      value
    });
    return this;
  }

  format(formatter) {
    if (typeof formatter !== 'function') {
      throw new TypeError('`format` argument should be a function');
    }
    this.formatter = formatter;
    return this;
  }

  calcDefaultValue(val) {
    const { value } = this.defaultConfig;
    if (typeof value === 'function') {
      return value.call(null, val);
    }
    return value;
  }

  getReturnValueWithStrict(val) {
    const { enable, strict } = this.defaultConfig;
    if (enable && isNotRequired(val)) {
      return this.formatter.call(
        null,
        this.calcDefaultValue(val)
      );
    }
    if (enable && isEmpty(val) && strict) {
      return this.formatter.call(
        null,
        this.calcDefaultValue(val)
      );
    }
    return this.formatter.call(null, val);
  }

  getReturnValue(val) {
    if (this.defaultConfig.enable && isNotRequired(val)) {
      return this.formatter.call(
        null,
        this.calcDefaultValue(val)
      );
    }
    return this.formatter.call(null, val);
  }

  checkRequired(val) {
    if (!this.requiredRestrict) {
      return true;
    }

    const { strict } = this.requiredRestrict;
    if (strict === true) {
      if (isEmpty(val)) {
        throw new ValidateError('value is required and should not be empty');
      }
      return true;
    }
    if (isNotRequired(val)) {
      throw new ValidateError('value is required and should not be undefined/null');
    }
    return true;
  }

  checkRestricts(val) {
    let restrict;
    for (let i = 0; i < this.restricts.length; i += 1) {
      restrict = this.restricts[i];
      if (restrict.type === 'custom') {
        restrict.restrictFn.call(null, val);
      } else {
        restrict.validate(val);
      }
    }
    return true;
  }

  validate(val) {
    if (!this.requiredRestrict && isNotRequired(val)) {
      return this.getReturnValue(val);
    }
    this.checkType(val);
    this.checkRequired(val);
    this.checkRestricts(val);

    return this.getReturnValue(val);
  }
}
