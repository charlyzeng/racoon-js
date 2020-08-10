import RestrictBase from './base';
import { isInt } from '../utils/is';
import ValidateError from '../utils/validate-error';

export default class RestrictNumberInt extends RestrictBase {
  validate(val) {
    if (isInt(val)) {
      return true;
    }
    throw new ValidateError(this.errorMessage || 'value should be an int');
  }
}
