import {
  isUndefined,
  isNull,
  isNaN,
  isNumber,
  isNotRequired
} from '../utils/is';
import { TYPE } from '../utils/constants';
import ValidateError from '../utils/validate-error';
import RestrictNumberMax from '../restricts/number-max';
import RestrictNumberMin from '../restricts/number-min';
import RestrictNumberInt from '../restricts/number-int';
import TypeBase from './base';

export default class TypeNumber extends TypeBase {
  type = TYPE.number;
  enableAllowNaN = false;

  checkType(val) {
    if (isNaN(val) && this.enableAllowNaN === false) {
      throw new ValidateError('value is not allowed to be NaN');
    }
    if (isNumber(val) || isUndefined(val) || isNull(val)) {
      return true;
    }
    throw new ValidateError('value should be typeof number');
  }

  checkRequired(val) {
    if (!this.requiredRestrict) {
      return true;
    }

    if (!isUndefined(val) && !isNull(val) && !isNaN(val)) {
      return true;
    }
    throw new ValidateError('value is required and should not be undefined/null/NaN');
  }

  getReturnValue(val) {
    const { enable } = this.defaultConfig;
    if (
      enable
      && (isNotRequired(val) || isNaN(val))
    ) {
      return this.formatter.call(
        null,
        this.calcDefaultValue(val)
      );
    }
    return this.formatter.call(null, val);
  }

  allowNaN(enable = true) {
    this.enableAllowNaN = enable === true;
    return this;
  }

  min(min, closed = true) {
    this.restricts.push(new RestrictNumberMin(min, closed));
    return this;
  }

  max(max, closed = true) {
    this.restricts.push(new RestrictNumberMax(max, closed));
    return this;
  }

  int() {
    this.restricts.push(new RestrictNumberInt());
    return this;
  }
}
