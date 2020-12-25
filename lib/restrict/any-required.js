/**
 * This is for any schema, to estrict value to be non-empty. By default,
 * non-empty means the detected value cann't be undefined, null. When in
 * strict mode, the detected value cann't be undefined, null, empty-string,
 * empty-object or empty-array.
 */

import RestrictBase from './base';
import {
  isNaN,
  isNotRequired,
  isEmptyObject,
  isEmptyArray,
} from '../util/is';

export default class RestrictAnyRequired extends RestrictBase {
  strict = false;

  /**
   * @param {Boolean} strict Whether to enable strict mode. By default, strict mode
   * is disabled. If strict param is passed to exactly true, strict mode will be
   * enabled.
   */
  constructor(strict) {
    super();
    this.strict = strict === true;
  }

  /**
   * Check the detected value whether meets this "any-required" restrict.
   *
   * @param {*} val The detected value.
   */
  validate(val) {
    const { strict } = this;

    // In non-strict mode, if the detected value is undefined, null or NaN, the
    // validation will be fail.
    if (!strict && (isNotRequired(val) || isNaN(val))) {
      throw this.getError('value is required and should not be undefined/null/NaN');
    }

    // In strict mode, when the detected value one of the follow, the validation
    // will be fail:
    // 1. undefined
    // 2. null
    // 3. NaN
    // 4. empty string
    // 5. empty object
    // 6. empty array
    const isEmpty = (
      isNotRequired(val)
      || val === ''
      || isNaN(val)
      || isEmptyObject(val)
      || isEmptyArray(val)
    );

    if (strict === true && isEmpty) {
      throw this.getError('value is required and should not be empty');
    }
  }
}
