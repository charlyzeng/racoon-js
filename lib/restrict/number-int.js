/**
 * This is for number, to restrict the detected number to be
 * an integer.
 */

import RestrictBase from './base';
import { isInt } from '../util/is';

export default class RestrictNumberInt extends RestrictBase {
  /**
   * Check the detected value whether meets this "number-int" restrict.
   *
   * @param {*} val The detected value.
   */
  validate(val) {
    if (isInt(val) === false) {
      throw this.getError('value should be an integer');
    }
  }
}
