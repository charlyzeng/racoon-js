/**
 * Restrict the detected value to be non-empty. Non-empty means undefined,
 * null. When in strict mode, non-empty means undefined, null, empty-string,
 * empty-object, empty-array.
 */

import RestrictBase from './base';
import { isEmpty, isNotRequired } from '../util/is';

export default class RestrictRequired extends RestrictBase {
  strict = false;

  /**
   * @param {Boolean} [strict] Whether enable strict mode. By default, the mode
   * is non-strict. If you pass strict exactly true, it will enable strict mode.
   */
  constructor(strict) {
    super();
    this.strict = strict === true;
  }

  /**
   * Check the detected value whether meets this "required" restrict.
   *
   * @param {*} val The detected value.
   */
  validate(val) {
    const { strict } = this;

    if (strict && isEmpty(val)) {
      throw this.getError('value is required and should not be empty');
    }

    if (!strict && isNotRequired(val))  {
      throw this.getError('value is required and should not be undefined/null');
    }
  }
}
