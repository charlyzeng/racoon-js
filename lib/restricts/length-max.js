import { isNumber } from '../utils/is';
import ValidateError from '../utils/validate-error';

export default class RestrictLengthMax {
  constructor(max, closed = true) {
    if (isNumber(max) === false) {
      throw new TypeError('`max` should be typeof number');
    }

    this.max = max;
    this.closed = closed;
  }

  validate(val) {
    if (this.closed) {
      if (val.length <= this.max) {
        return true;
      }
      throw new ValidateError(`value length should less than or equal ${this.max}`);
    }
    if (val.length < this.max) {
      return true;
    }
    throw new ValidateError(`value length should less than ${this.max}`);
  }
}
