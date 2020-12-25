/**
 * Restrict value by a custom callback function.
 */

import { isFunction, isString } from '../util/is';
import RestrictBase from './base';

export default class RestrictCustom extends RestrictBase {
  ctx = null;
  restrictFn = null;

  /**
   * If restrictFn throws an error or returns a string, the validation
   * will be fail. The message of error or the returned string respect
   * the error message of validation.
   *
   * @param {Function} restrictFn The custom restrict callback function.
   * @param {*}        [ctx]      The exec context of restrictFn.
   */
  constructor(restrictFn, ctx) {
    super();

    if (isFunction(restrictFn) === false) {
      throw new TypeError('`custom` must receive a Function parameter');
    }

    this.restrictFn = restrictFn;
    this.ctx = ctx;
  }

  /**
   * Check the detected value whether meets this "custom" restrict.
   *
   * @param {*} val The detected value.
   */
  validate(val) {
    try {
      const result = this.restrictFn.call(this.ctx, val);

      // If restrictFn return a non-empty string, validation will be fail.
      if (isString(result) && result) {
        throw this.getError(result);
      }
    } catch (error) {
      // If restrictFn throws an error, validation will be fail too. And
      // then should throw a wrapped error.
      throw this.getError(error.message);
    }

    return true;
  }
}
