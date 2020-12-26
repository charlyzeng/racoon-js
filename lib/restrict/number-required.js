/**
 * This is for number, to restrict the detected number is non-empty,
 * which means it's not undefined, null or NaN. This is differet from
 * the "required" strict, the "required" strict is for non-number value.
 */

import RestrictBase from './base';
import { isNaN, isNotRequired } from '../util/is';

export default class RestrictRequired extends RestrictBase {
  /**
   * Check the detected value whether meets this "number-required" restrict.
   *
   * @param {*} val The detected value.
   */
  validate(val) {
    if (isNotRequired(val)) {
      throw this.getError('value is required and should not be undefined/null');
    }

    // If required restrict is added for number schema, then the detected value
    // cann't be NaN.
    if (isNaN(val)) {
      throw this.getError('value is required and should not be NaN');
    }
  }
}
