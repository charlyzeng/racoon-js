/**
 * 限制被检测数据为`boolean`类型
 */

import RestrictBase from './base';
import {
  isBoolean,
  isNotRequired,
} from '../utils/is';

export default class RestrictBooleanType extends RestrictBase {
  validate(val) {
    // 当被检测数据未 Boolean, null, undefined 时校验通过
    if (isBoolean(val) || isNotRequired(val)) {
      return true;
    }
    throw this.getError('value should be typeof boolean');
  }
}
