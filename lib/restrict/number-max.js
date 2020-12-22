/**
 * 限制`number`类型数据的最大值
 */

import RestrictBase from './base';
import { isNumber } from '../util/is';

export default class RestrictNumberMax extends RestrictBase {
  /**
   * 最大值限制器构造函数。
   *
   * @param {number}  max      希望被限制的最大值
   * @param {boolean} [closed] 是否闭区间。如果为闭区间，则`值 <= max`, 否则`值 < max`，
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
    if (this.closed && val > this.max) {
      throw this.getError(`value should less than or equal ${this.max}`);
    }
    if (!this.closed && val >= this.max) {
      throw this.getError(`value should less than ${this.max}`);
    }
  }
}
