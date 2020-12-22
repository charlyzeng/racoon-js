/**
 * 限制`number`类型数据的最小值
 */

import RestrictBase from './base';
import { isNumber } from '../util/is';

export default class RestrictNumberMin extends RestrictBase {
  /**
   * 最小值限制器构造函数。
   *
   * @param {number}  min      希望被限制的最小值
   * @param {boolean} [closed] 是否闭区间。如果为闭区间，则`值 >= min`, 否则`值 > min`，
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
    if (this.closed && val < this.min) {
      throw this.getError(`value should greater than or equal ${this.min}`);
    }
    if (!this.closed && val <= this.min) {
      throw this.getError(`value should greater than ${this.min}`);
    }
  }
}
