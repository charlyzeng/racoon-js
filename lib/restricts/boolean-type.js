import RestrictBase from './base';
import {
  isBoolean,
  isNotRequired
} from '../utils/is';
import ValidateError from '../utils/validate-error';

export default class RestrictBooleanType extends RestrictBase {
  validate(val) {
    if (isBoolean(val) || isNotRequired(val)) {
      return true;
    }
    throw new ValidateError(this.errorMessage || 'value should be typeof boolean');
  }
}
