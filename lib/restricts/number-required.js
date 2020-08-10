import RestrictBase from './base';
import ValidateError from '../utils/validate-error';
import { isEmpty, isNotRequired } from '../utils/is';

export default class RestrictNumberRequired extends RestrictBase {
  validate(val) {
    const { strict, errorMessage } = this;
    if (isNotRequired(val)) {
      throw new ValidateError(errorMessage || 'value is required and should not be undefined/null');
    }
    return true;
  }
}
