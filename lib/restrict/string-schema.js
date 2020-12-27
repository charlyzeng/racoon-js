/**
 * Restrict value to be type of string.
 */

import RestrictBase from './base';
import {
  isString,
  isNotRequired,
} from '../util/is';

export default class RestrictStringSchema extends RestrictBase {
  /**
   * Check the detected value whether meets this "string-schema" restrict.
   *
   * @param {*} val The detected value.
   */
  validate(val) {
    if (!isString(val) && !isNotRequired(val)) {
      throw this.getError('value should be a type of string');
    }
  }
}
