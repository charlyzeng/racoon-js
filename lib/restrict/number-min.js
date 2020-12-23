/**
 * This is for number, to restrict the min value of the detected number.
 */

import RestrictBase from './base';
import { isNumber } from '../util/is';

export default class RestrictNumberMin extends RestrictBase {
  /**
   * @param {number}  min      The min value of the detected number.
   * @param {boolean} [closed] Whether it's a closed interval. By default, the
   * interval is closed, which means the detected number can be equal to min.
   * When closed is exactly false, the interval will be opened.
   */
  constructor(min, closed) {
    super();
    if (isNumber(min) === false) {
      throw new TypeError('`min` should be a number');
    }
    this.min = min;
    this.closed = closed !== false;
  }

  /**
   * Check the detected value whether meets this "number-min" restrict.
   *
   * @param {*} val The detected value.
   */
  validate(val) {
    if (this.closed && val < this.min) {
      throw this.getError(`value should greater than or equal ${this.min}`);
    }
    if (!this.closed && val <= this.min) {
      throw this.getError(`value should greater than ${this.min}`);
    }
  }
}
