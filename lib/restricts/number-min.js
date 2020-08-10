import RestrictBase from './base';
import { isNumber } from '../utils/is';
import ValidateError from '../utils/validate-error';

export default class RestrictNumberMin extends RestrictBase {
  constructor(min, closed = true) {
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
      throw new ValidateError(this.errorMessage || `value should greater than ${this.min}`);
    }

    if (val >= this.min) {
      return true;
    }
    throw new ValidateError(this.errorMessage || `value should greater than or equal ${this.min}`);
  }
}
