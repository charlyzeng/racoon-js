import RestrictBase from './base';
import { isNumber } from '../utils/is';

export default class RestrictLengthMax extends RestrictBase {
  constructor(max, closed = true) {
    super();
    if (isNumber(max) === false) {
      throw new TypeError('`max` should be typeof number');
    }

    this.max = max;
    this.closed = closed !== false;
  }

  validate(val) {
    if (this.closed) {
      if (val.length <= this.max) {
        return true;
      }
      throw this.getError(`value length should less than or equal ${this.max}`);
    }
    if (val.length < this.max) {
      return true;
    }
    throw this.getError(`value length should less than ${this.max}`);
  }
}
