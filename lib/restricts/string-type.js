import RestrictBase from './base';
import {
  isString,
  isNotRequired
} from '../utils/is';
import ValidateError from '../utils/validate-error';

export default class RestrictStringType extends RestrictBase {
  validate(val) {
    if (isString(val) || isNotRequired(val)) {
      return true;
    }
    throw new ValidateError(this.errorMessage || 'value should be typeof string');
  }
}
