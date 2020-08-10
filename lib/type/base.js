import {
  isEmpty,
  isNotRequired,
} from '../utils/is';
import RestrictRequired from '../restricts/required';

export default class TypeBase {
  restricts = [];
  typeRestrict = null;
  requiredRestrict = null;
  defaultConfig = {
    enable: false,
    strict: false,
    value: undefined
  };
  formatter = val => val;

  required(strict = false) {
    this.requiredRestrict = new RestrictRequired(strict);
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
