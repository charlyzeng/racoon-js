/**
 * 限制被检测数据的长度最大值，可限制字符串或数字的长度最大值。
 */

import RestrictBase from './base';
import { isNumber } from '../utils/is';

export default class RestrictLengthMax extends RestrictBase {
  /**
   * 最大长度限制器构造函数。
   *
   * @param {number}  max      希望被限制的长度最大值
   * @param {boolean} [closed] 是否闭区间。如果为闭区间，则`长度 <= max`, 否则`长度 < max`，
   *                           默认为闭区间，明确传`false`则启用开区间。
   */
  constructor(max, closed) {
    super();
    if (isNumber(max) === false) {
      throw new TypeError('`max` should be typeof number');
    }

    this.max = max;
    this.closed = closed !== false;
  }

  validate(val) {
    if (this.closed && val.length > this.max) {
      throw this.getError(`value length should less than or equal ${this.max}`);
    }
    if (!this.closed && val.length >= this.max) {
      throw this.getError(`value length should less than ${this.max}`);
    }
    return true;
  }
}
