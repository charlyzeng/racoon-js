import { isNumber, isString } from '../utils/is';
import ValidateError from '../utils/validate-error';

export default class RestrictLengthMax {
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
    if (this.closed) {
      if (val.length <= this.max) {
        return true;
      }
      throw new ValidateError(this.errorMessage || `value length should less than or equal ${this.max}`);
    }
    if (val.length < this.max) {
      return true;
    }
    throw new ValidateError(this.errorMessage || `value length should less than ${this.max}`);
  }
}
