import RestrictBase from './base';
import { isNumber } from '../utils/is';

export default class RestrictLengthMin extends RestrictBase {
  constructor(min, closed = true) {
    super();
    if (isNumber(min) === false) {
      throw new TypeError('`min` should be a number');
    }

    this.min = min;
    this.closed = closed !== false;
  }

  validate(val) {
    if (this.closed) {
      if (val.length >= this.min) {
        return true;
      }
      throw this.getError(`value length should greater than or equal ${this.min}`);
    }
    if (val.length > this.min) {
      return true;
    }
    throw this.getError(`value length should greater than ${this.min}`);
  }
}
