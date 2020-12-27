/**
 * Restrict the min length of detected value. The detected value
 * can be string or array.
 */

import RestrictBase from './base';
import { isNumber } from '../util/is';

export default class RestrictLengthMin extends RestrictBase {
  /**
   * @param {Number}  min      The min length of detected value.
   * @param {Boolean} [closed] Whether it's a closed interval. By default, the interval
   * is closed, which means the length of the detected value can be equal to min. When
   * closed is exactly false, the interval will be opened.
   */
  constructor(min, closed) {
    super();

    if (isNumber(min) === false) {
      throw new TypeError('`min` should be a type of number');
    }

    this.min = min;
    this.closed = closed !== false;
  }

  /**
   * Check the detected value whether meets this "length-min" restrict.
   *
   * @param {*} val The detected value.
   */
  validate(val) {
    if (this.closed && val.length < this.min) {
      throw this.getError(`value length should be greater than or equal to ${this.min}`);
    }

    if (!this.closed && val.length <= this.min) {
      throw this.getError(`value length should greater than ${this.min}`);
    }

    return true;
  }
}
