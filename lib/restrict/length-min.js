/**
 * 限制被检测数据的长度最小值，可限制字符串或数字的长度最小值。
 */

import RestrictBase from './base';
import { isNumber } from '../util/is';

export default class RestrictLengthMin extends RestrictBase {
  /**
   * 最小长度限制器构造函数。
   *
   * @param {number}  min      希望被限制的长度最小值
   * @param {boolean} [closed] 是否闭区间。如果为闭区间，则`长度 >= min`, 否则`长度 > min`，
   *                           默认为闭区间，明确传`false`则启用开区间。
   */
  constructor(min, closed) {
    super();
    if (isNumber(min) === false) {
      throw new TypeError('`min` should be a number');
    }

    this.min = min;
    this.closed = closed !== false;
  }

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
