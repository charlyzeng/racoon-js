/**
 * Restrict string format by a regular expression.
 */

import RestrictBase from './base';
import { isRegExp } from '../util/is';

export default class RestrictStringPattern extends RestrictBase {
  pattern = null;

  /**
   * @param {RegExp} pattern The regular expression to restrict the format of string.
   */
  constructor(pattern) {
    super();
    if (isRegExp(pattern) === false) {
      throw new TypeError('pattern should be a RegExp');
    }
    this.pattern = pattern;
  }

  /**
   * Check the detected value whether meets this "string-pattern" restrict.
   *
   * @param {*} val The detected value.
   */
  validate(val) {
    if (!this.pattern.test(val)) {
      throw this.getError(`value should match pattern ${this.pattern.toString()}`);
    }
  }
}
