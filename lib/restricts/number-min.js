import { isNumber } from '../utils/is';
import ValidateError from '../utils/validate-error';

export default class RestrictNumberMin {
  constructor(min, closed = true) {
    if (isNumber(min) === false) {
      throw new TypeError('`min` should be a number');
    }

    this.min = min;
    this.closed = closed;
  }

  validate(val) {
    if (this.closed === false) {
      if (val > this.min) {
        return true;
      }
      throw new ValidateError(`value should greater than ${this.min}`);
    }

    if (val >= this.min) {
      return true;
    }
    throw new ValidateError(`value should greater than or equal ${this.min}`);
  }
}
