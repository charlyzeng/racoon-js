import RestrictBase from './base';
import {
  isNaN,
  isNumber,
  isUndefined,
  isNull,
  isInfinity
} from '../utils/is';

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
    const { isAllowNaN, isAllowInfinity } = this;
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
}
