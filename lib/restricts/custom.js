import { isFunction } from '../utils/is';
import ValidateError from '../utils/validate-error';
import RestrictBase from './base';

export default class RestrictCustom extends RestrictBase {
  constructor(restrictFn, ctx) {
    super();
    if (isFunction(restrictFn) === false) {
      throw new TypeError('`custom` must receive a Function parameter');
    }
    this.restrictFn = restrictFn;
    this.ctx = ctx;
  }

  validate(val) {
    try {
      this.restrictFn.call(this.ctx, val);
    } catch (error) {
      if (this.errorMessage) {
        throw new ValidateError(this.errorMessage);
      }
      throw error;
    }
    return true;
  }
}
