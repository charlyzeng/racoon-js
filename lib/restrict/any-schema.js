/**
 * Restrict value to be any type, which means that it will not
 * restrict the type of value. So, the validate method return
 * true always.
 */

import RestrictBase from './base';

export default class RestrictAnySchema extends RestrictBase {
  /**
   * Check the detected value whether meets this "any-schema" restrict.
   *
   * @param {*} val The detected value.
   */
  validate() {
    return true;
  }
}
