import RestrictBase from './base';
import {
  isNaN,
  isNumber,
  isUndefined,
  isNull
} from '../utils/is';
import ValidateError from '../utils/validate-error';

export default class RestrictNumberType extends RestrictBase {
  isAllowNaN = false;

  enableAllowNaN() {
    this.isAllowNaN = true;
  }

  validate(val) {
    const { isAllowNaN, errorMessage } = this;
    if (isNaN(val) && isAllowNaN === false) {
      throw new ValidateError(
        errorMessage || 'value is not allowed to be NaN'
      );
    }
    if (isNumber(val) || isUndefined(val) || isNull(val)) {
      return true;
    }
    throw new ValidateError(errorMessage || 'value should be typeof number');
  }
}
