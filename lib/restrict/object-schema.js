/**
 * Restrict value to be type of object.
 */

import RestrictBase from './base';
import {
  isObject,
  isNotRequired,
} from '../util/is';

export default class RestrictObjectSchema extends RestrictBase {
  /**
   * Check the detected value whether meets this "object-schema" restrict.
   *
   * @param {*} val The detected value.
   */
  validate(val) {
    if (isObject(val) || isNotRequired(val)) {
      return true;
    }
    throw this.getError('value should be typeof object');
  }
}
