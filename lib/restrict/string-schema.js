/**
 * 类型限制器，限制被检测值为`string`类型
 */

import RestrictBase from './base';
import {
  isString,
  isNotRequired,
} from '../util/is';

export default class RestrictStringSchema extends RestrictBase {
  validate(val) {
    if (!isString(val) && !isNotRequired(val)) {
      throw this.getError('value should be typeof string');
    }
  }
}
