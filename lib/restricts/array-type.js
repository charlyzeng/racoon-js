/**
 * 限制被检测数据为`array`.
 */

import RestrictBase from './base';
import {
  isArray,
  isNotRequired,
} from '../utils/is';

export default class RestrictArrayType extends RestrictBase {
  validate(val) {
    // 当被检测数据类型为 Array, null, undefined 时校验通过
    if (isArray(val) || isNotRequired(val)) {
      return true;
    }
    throw this.getError('value should be typeof array');
  }
}
