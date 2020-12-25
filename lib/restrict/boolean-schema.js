/**
 * Restrict value to be type of boolean.
 */

import RestrictBase from './base';
import {
  isBoolean,
  isNotRequired,
} from '../util/is';

export default class RestrictBooleanSchema extends RestrictBase {
  /**
   * Check the detected value whether meets this "boolean-schema" restrict.
   *
   * @param {*} val The detected value.
   */
  validate(val) {
    // When the detected value isn't boolean, null or undefined, validation
    // will be fail. Otherwise, validation will be success.
    if (!isBoolean(val) && !isNotRequired(val)) {
      throw this.getError('value should be typeof boolean');
    }
  }
}
