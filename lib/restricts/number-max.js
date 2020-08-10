import RestrictBase from './base';
import { isNumber } from '../utils/is';
import ValidateError from '../utils/validate-error';

export default class RestrictNumberMax extends RestrictBase {
  constructor(max, closed = true) {
    super();
    if (isNumber(max) === false) {
      throw new TypeError('`max` should be typeof number');
    }
    this.max = max;
    this.closed = closed !== false;
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
