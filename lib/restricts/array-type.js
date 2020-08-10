import RestrictBase from './base';
import {
  isArray,
  isUndefined,
  isNull
} from '../utils/is';
import ValidateError from '../utils/validate-error';

export default class RestrictArrayType extends RestrictBase {
  validate(val) {
    if (isArray(val) || isUndefined(val) || isNull(val)) {
      return true;
    }
    throw new ValidateError(this.errorMessage || 'value should be typeof array');
  }
}
