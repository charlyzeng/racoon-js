import RestrictBase from './base';
import ValidateError from '../utils/validate-error';
import { isEmpty, isNotRequired } from '../utils/is';

export default class RestrictRequired extends RestrictBase {
  strict = false;

  constructor(strict) {
    super();
    this.strict = strict === true;
  }

  validate(val) {
    const { strict, errorMessage } = this;
    if (strict === true) {
      if (isEmpty(val)) {
        throw new ValidateError(errorMessage || 'value is required and should not be empty');
      }
      return true;
    }
    if (isNotRequired(val)) {
      throw new ValidateError(errorMessage || 'value is required and should not be undefined/null');
    }
    return true;
  }
}
