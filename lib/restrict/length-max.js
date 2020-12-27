/**
 * Restrict the max length of detected value. The detected value
 * can be string or array.
 */

import RestrictBase from './base';
import { isNumber } from '../util/is';

export default class RestrictLengthMax extends RestrictBase {
  /**
   * @param {Number}  max      The max length of detected value.
   * @param {Boolean} [closed] Whether it's a closed interval. By default, the interval
   * is closed, which means the length of the detected value can be equal to max. When
   * closed is exactly false, the interval will be opened.
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
   * Check the detected value whether meets this "length-max" restrict.
   *
   * @param {*} val The detected value.
   */
  validate(val) {
    if (this.closed && val.length > this.max) {
      throw this.getError(`value length should be less than or equal to ${this.max}`);
    }

    if (!this.closed && val.length >= this.max) {
      throw this.getError(`value length should be less than ${this.max}`);
    }

    return true;
  }
}
