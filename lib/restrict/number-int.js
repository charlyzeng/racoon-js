/**
 * 限制`number`类型数据为整数的限制器
 */

import RestrictBase from './base';
import { isInt } from '../util/is';

export default class RestrictNumberInt extends RestrictBase {
  validate(val) {
    if (isInt(val) === false) {
      throw this.getError('value should be an int');
    }
  }
}
