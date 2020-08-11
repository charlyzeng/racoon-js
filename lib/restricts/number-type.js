import RestrictBase from './base';
import {
  isNaN,
  isNumber,
  isUndefined,
  isNull,
  isInfinity
} from '../utils/is';
import ValidateError from '../utils/validate-error';

export default class RestrictNumberType extends RestrictBase {
  isAllowNaN = false;
  isAllowInfinity = false;

  enableAllowNaN() {
    this.isAllowNaN = true;
  }

  enableAllowInfinity() {
    this.isAllowInfinity = true;
  }

  validate(val) {
    const { isAllowNaN, isAllowInfinity, errorMessage } = this;
    if (isNaN(val) && isAllowNaN === false) {
      throw new ValidateError(
        errorMessage || 'value is not allowed to be NaN'
      );
    }
    if (isInfinity(val) && isAllowInfinity === false) {
      throw new ValidateError(
        errorMessage || 'value is not allowed to be Infinity'
      );
    }
    if (isNumber(val) || isUndefined(val) || isNull(val)) {
      return true;
    }
    throw new ValidateError(errorMessage || 'value should be typeof number');
  }
}
