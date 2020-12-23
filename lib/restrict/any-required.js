/**
 * Restrict value to be required for `any` schema value.
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

  constructor(strict) {
    super();
    this.strict = strict === true;
  }

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
