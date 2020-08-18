import RestrictBase from './base';
import { isNumber } from '../utils/is';

export default class RestrictNumberMin extends RestrictBase {
  constructor(min, closed) {
    super();
    if (isNumber(min) === false) {
      throw new TypeError('`min` should be a number');
    }

    this.min = min;
    this.closed = closed !== false;
  }

  validate(val) {
    if (this.closed === false) {
      if (val > this.min) {
        return true;
      }
      throw this.getError(`value should greater than ${this.min}`);
    }

    if (val >= this.min) {
      return true;
    }
    throw this.getError(`value should greater than or equal ${this.min}`);
  }
}
