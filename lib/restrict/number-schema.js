/**
 * Restrict value to be type of number.
 */

import RestrictBase from './base';
import {
  isNaN,
  isNumber,
  isInfinity,
  isNotRequired,
} from '../util/is';

export default class RestrictNumberSchema extends RestrictBase {
  // Whether the detected number is allowed to be NaN. By default, it's not allowd.
  isAllowNaN = false;
  // Whether the detected number is allowed to be Infinity or -Infinity, By default,
  // is't not allowd.
  isAllowInfinity = false;

  /**
   * Allow the detected number to be NaN.
   */
  enableAllowNaN() {
    this.isAllowNaN = true;
  }

  /**
   * Allow the detected number to be Infinity or -Infinity.
   */
  enableAllowInfinity() {
    this.isAllowInfinity = true;
  }

  /**
   * Check the detected value whether meets this "number-schema" restrict.
   *
   * @param {*} val The detected value.
   */
  validate(val) {
    const { isAllowNaN, isAllowInfinity } = this;

    if (isNaN(val) && !isAllowNaN) {
      throw this.getError('value is not allowed to be NaN');
    }

    if (isInfinity(val) && !isAllowInfinity) {
      throw this.getError('value is not allowed to be Infinity');
    }

    if (!isNumber(val) && !isNotRequired(val)) {
      throw this.getError('value should be typeof number');
    }
  }
}
