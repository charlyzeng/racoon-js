/**
 * This is for number, to restrict the max value of the detected number.
 */

import RestrictBase from './base';
import { isNumber } from '../util/is';

export default class RestrictNumberMax extends RestrictBase {
  /**
   * @param {Number}  max      The max value of the detected number.
   * @param {Boolean} [closed] Whether it's a closed interval. By default, the
   * interval is closed, which means the detected number can be equal to max.
   * When closed is exactly false, the interval will be opened.
   */
  constructor(max, closed) {
    super();

    if (isNumber(max) === false) {
      throw new TypeError('`max` should be a type of number');
    }

    this.max = max;
    this.closed = closed !== false;
  }

  /**
   * Check the detected value whether meets this "number-max" restrict.
   *
   * @param {*} val The detected value.
   */
  validate(val) {
    if (this.closed && val > this.max) {
      throw this.getError(`value should be less than or equal to ${this.max}`);
    }

    if (!this.closed && val >= this.max) {
      throw this.getError(`value should be less than ${this.max}`);
    }
  }
}
