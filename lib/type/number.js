import {
  isUndefined,
  isNull,
  isNaN,
  isNumber,
  isNotRequired,
  isString
} from '../utils/is';
import { TYPE } from '../utils/constants';
import ValidateError from '../utils/validate-error';
import RestrictEnum from '../restricts/enum';
import RestrictNumberMax from '../restricts/number-max';
import RestrictNumberMin from '../restricts/number-min';
import RestrictNumberInt from '../restricts/number-int';
import TypeBase from './base';

export default class TypeNumber extends TypeBase {
  type = TYPE.number;
  enableAllowNaN = false;
  errorMessage = '';
  allowNaNErrorMessage = '';

  constructor(errorMessage) {
    super();
    this.setErrorMessage(errorMessage);
  }

  checkType(val) {
    if (isNaN(val) && this.enableAllowNaN === false) {
      throw new ValidateError(
        this.allowNaNErrorMessage || this.errorMessage || 'value is not allowed to be NaN'
      );
    }
    if (isNumber(val) || isUndefined(val) || isNull(val)) {
      return true;
    }
    throw new ValidateError(this.errorMessage || 'value should be typeof number');
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

  enum(...values) {
    this.restricts.push(new RestrictEnum(...values));
    return this;
  }

  allowNaN(enable = true, errorMessage) {
    if (isString(enable)) {
      errorMessage = enable;
      enable = true;
    }

    this.enableAllowNaN = enable !== false;
    if (isString(errorMessage)) {
      this.allowNaNErrorMessage = errorMessage;
    }
    return this;
  }

  min(min, closed = true, errorMessage) {
    this.restricts.push(new RestrictNumberMin(min, closed, errorMessage));
    return this;
  }

  max(max, closed = true, errorMessage) {
    this.restricts.push(new RestrictNumberMax(max, closed, errorMessage));
    return this;
  }

  int(errorMessage) {
    this.restricts.push(new RestrictNumberInt(errorMessage));
    return this;
  }
}
