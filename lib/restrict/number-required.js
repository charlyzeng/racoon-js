/**
 * 限制`number`类型值不为空
 */

import RestrictBase from './base';
import { isNaN, isNotRequired } from '../util/is';

export default class RestrictRequired extends RestrictBase {
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
