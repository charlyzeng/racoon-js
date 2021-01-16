/**
 * This is for number, to restrict the detected number to be an odd integer.
 */

import RestrictBase from './base';

export default class RestrictNumberOdd extends RestrictBase {
  /**
   * Check the detected number whether meets this "number-odd" restrict.
   *
   * @param {*} val The detected value.
   */
  validate(val) {
    if (Math.abs(val) % 2 !== 1) {
      throw this.getError('value should be an odd integer');
    }
  }
}
