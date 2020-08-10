import RestrictBase from './base';
import {
  isObject,
  isUndefined,
  isNull
} from '../utils/is';
import ValidateError from '../utils/validate-error';

export default class RestrictObjectType extends RestrictBase {
  validate(val) {
    if (isObject(val) || isUndefined(val) || isNull(val)) {
      return true;
    }
    throw new ValidateError(this.errorMessage || 'value should be typeof object');
  }
}
