/**
 * Restrict value to be type of array.
 */

import RestrictBase from './base';
import {
  isArray,
  isNotRequired,
} from '../util/is';

export default class RestrictArraySchema extends RestrictBase {
  /**
   * Check the detected value whether meets this "array-schema" restrict.
   *
   * @param {*} val The detected value.
   */
  validate(val) {
    // When the detected value isn't array, null or undefined, validation
    // will be fail. Otherwise, validation will be success.
    if (!isArray(val) && !isNotRequired(val)) {
      throw this.getError('value should be a type of array');
    }
  }
}
