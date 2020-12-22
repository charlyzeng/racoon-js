/**
 * 类型限制器，限制被检测值必须为`number`类型
 */

import RestrictBase from './base';
import {
  isNaN,
  isNumber,
  isInfinity,
  isNotRequired,
} from '../util/is';

export default class RestrictNumberSchema extends RestrictBase {
  isAllowNaN = false;      // 是否允许被检测值为`NaN`, 默认不允许
  isAllowInfinity = false; // 是否允许被检测值为`Infinity`或`-Infinity`, 默认不允许

  /**
   * 允许被检测值为`NaN`.
   */
  enableAllowNaN() {
    this.isAllowNaN = true;
  }

  /**
   * 允许被检测值为`Infinity`或`-Infinity`
   */
  enableAllowInfinity() {
    this.isAllowInfinity = true;
  }

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
