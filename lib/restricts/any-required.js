import RestrictBase from './base';
import {
  isNaN,
  isNotRequired,
  isEmptyObject,
  isEmptyArray
} from '../utils/is';

export default class RestrictRequired extends RestrictBase {
  strict = false;

  constructor(strict) {
    super();
    this.strict = strict === true;
  }

  validate(val) {
    const { strict } = this;
    if (strict === true) {
      if (
        isNotRequired(val)
        || val === ''
        || isNaN(val)
        || isEmptyObject(val)
        || isEmptyArray(val)
      ) {
        throw this.getError('value is required and should not be empty');
      }
      return true;
    }
    if (isNotRequired(val) || isNaN(val)) {
      throw this.getError('value is required and should not be undefined/null/NaN');
    }
    return true;
  }
}
