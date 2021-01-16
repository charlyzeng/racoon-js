/**
 * This is for number, to restrict the detected number to be an even integer.
 */

import RestrictBase from './base';

export default class RestrictNumberEven extends RestrictBase {
  /**
   * Check the detected number whether meets this "number-even" restrict.
   *
   * @param {*} val The detected value.
   */
  validate(val) {
    if (val % 2 !== 0) {
      throw this.getError('value should be an even integer');
    }
  }
}
