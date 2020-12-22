/**
 * 类型限制器，限制被检测值为`object`类型
 */

import RestrictBase from './base';
import {
  isObject,
  isNotRequired,
} from '../utils/is';

export default class RestrictObjectType extends RestrictBase {
  validate(val) {
    if (isObject(val) || isNotRequired(val)) {
      return true;
    }
    throw this.getError('value should be typeof object');
  }
}
