import { isNumber, isString } from '../utils/is';
import ValidateError from '../utils/validate-error';

export default class RestrictNumberMax {
  constructor(max, closed = true, errorMessage) {
    if (isNumber(max) === false) {
      throw new TypeError('`max` should be typeof number');
    }

    if (isString(closed)) {
      errorMessage = closed;
      closed = true;
    }
    this.max = max;
    this.closed = closed !== false;
    if (isString(errorMessage)) {
      this.errorMessage = errorMessage;
    }
  }

  validate(val) {
    if (this.closed === false) {
      if (val < this.max) {
        return true;
      }
      throw new ValidateError(this.errorMessage || `value should less than ${this.max}`);
    }

    if (val <= this.max) {
      return true;
    }
    throw new ValidateError(this.errorMessage || `value should less than or equal ${this.max}`);
  }
}
