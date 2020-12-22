/**
 * 通过正则限制`string`类型数值的限制器
 */

import RestrictBase from './base';
import { isRegExp } from '../util/is';

export default class RestrictStringPattern extends RestrictBase {
  pattern = null;

  constructor(pattern) {
    super();
    if (isRegExp(pattern) === false) {
      throw new TypeError('pattern should be a RegExp');
    }
    this.pattern = pattern;
  }

  validate(val) {
    if (!this.pattern.test(val)) {
      throw this.getError(`value should match pattern ${this.pattern.toString()}`);
    }
  }
}
