import { isNumber } from '../utils/is';
import ValidateError from '../utils/validate-error';

export default class RestrictNumberMax {
  constructor(max, closed = true) {
    if (isNumber(max) === false) {
      throw new TypeError('`max` should be typeof number');
    }

    this.max = max;
    this.closed = closed;
  }

  validate(val) {
    if (this.closed) {
      if (val <= this.max) {
        return true;
      }
      throw new ValidateError(`value should less than or equal ${this.max}`);
    }
    if (val < this.max) {
      return true;
    }
    throw new ValidateError(`value should less than ${this.max}`);
  }
}
