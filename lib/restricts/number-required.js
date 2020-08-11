import RestrictBase from './base';
import ValidateError from '../utils/validate-error';
import { isNaN, isNotRequired } from '../utils/is';

export default class RestrictRequired extends RestrictBase {
  validate(val) {
    const { errorMessage } = this;
    if (isNotRequired(val)) {
      throw new ValidateError(errorMessage || 'value is required and should not be undefined/null');
    }
    if (isNaN(val)) {
      throw new ValidateError(errorMessage || 'value is required and should not be NaN');
    }
    return true;
  }
}
