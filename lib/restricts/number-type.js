import RestrictBase from './base';
import {
  isNaN,
  isNumber,
  isUndefined,
  isNull,
  isString
} from '../utils/is';
import ValidateError from '../utils/validate-error';

export default class RestrictNumberType extends RestrictBase {
  isAllowNaN = false;
  nanErrorMessage = '';

  enableAllowNaN(message) {
    this.isAllowNaN = true;
    if (isString(message)) {
      this.nanErrorMessage = message;
    }
  }

  validate(val) {
    const { isAllowNaN, errorMessage, nanErrorMessage } = this;
    if (isNaN(val) && isAllowNaN === false) {
      throw new ValidateError(
        nanErrorMessage || errorMessage || 'value is not allowed to be NaN'
      );
    }
    if (isNumber(val) || isUndefined(val) || isNull(val)) {
      return true;
    }
    throw new ValidateError(errorMessage || 'value should be typeof number');
  }
}
