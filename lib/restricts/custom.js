import { isFunction } from '../utils/is';
import ValidateError from '../utils/validate-error';
import RestrictBase from './base';

export default class RestrictCustom extends RestrictBase {
  constructor(restrictFn) {
    super();
    if (isFunction(restrictFn) === false) {
      throw new TypeError('`custom` must receive a Function parameter');
    }
    this.restrictFn = restrictFn;
  }

  validate(val) {
    try {
      this.restrictFn.call(null, val);
    } catch (error) {
      if (this.errorMessage) {
        throw new ValidateError(this.errorMessage);
      }
      throw error;
    }
    return true;
  }
}
