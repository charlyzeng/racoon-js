/**
 * 限制被检测数据的长度最小值，可限制字符串或数字的长度最小值。
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
      throw new TypeError('`min` should be a number');
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
      throw this.getError(`value length should greater than or equal ${this.min}`);
    }

    if (!this.closed && val.length <= this.min) {
      throw this.getError(`value length should greater than ${this.min}`);
    }

    return true;
  }
}
