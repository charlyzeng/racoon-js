/**
 * This is for number, to restrict the detected number is non-empty,
 * which means it's not undefined, null or NaN. This is differet from
 * the "required" strict, the "required" strict is for non-number value.
 */

import RestrictBase from './base';
import { isNaN, isNotRequired } from '../util/is';

export default class RestrictRequired extends RestrictBase {
  /**
   * Check the detected value whether meets this "number-required" restrict.
   *
   * @param {*} val The detected value.
   */
  validate(val) {
    if (isNotRequired(val)) {
      throw this.getError('value is required and should not be undefined/null');
    }

    // 如果为`number`类型添加了`required`限制器，则要求被检测值不能为`NaN`.
    if (isNaN(val)) {
      throw this.getError('value is required and should not be NaN');
    }
  }
}
