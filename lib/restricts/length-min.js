import { isNumber, isString } from '../utils/is';
import ValidateError from '../utils/validate-error';

export default class RestrictLengthMin {
  constructor(min, closed = true, errorMessage) {
    if (isNumber(min) === false) {
      throw new TypeError('`min` should be a number');
    }

    if (isString(closed)) {
      errorMessage = closed;
      closed = true;
    }

    this.min = min;
    this.closed = closed !== false;
    if (isString(errorMessage)) {
      this.errorMessage = errorMessage;
    }
  }

  validate(val) {
    if (this.closed) {
      if (val.length >= this.min) {
        return true;
      }
      throw new ValidateError(this.errorMessage || `value length should greater than or equal ${this.min}`);
    }
    if (val.length > this.min) {
      return true;
    }
    throw new ValidateError(this.errorMessage || `value length should greater than ${this.min}`);
  }
}
