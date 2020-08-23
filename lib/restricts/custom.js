import { isFunction, isString } from '../utils/is';
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
      const result = this.restrictFn.call(this.ctx, val);
      if (isString(result) && result) {
        throw this.getError(result);
      }
    } catch (error) {
      throw this.getError(error.message);
    }
    return true;
  }
}
