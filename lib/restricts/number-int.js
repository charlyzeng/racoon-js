import { isInt, isString } from '../utils/is';
import ValidateError from '../utils/validate-error';

export default class RestrictNumberInt {
  constructor(errorMessage) {
    if (isString(errorMessage)) {
      this.errorMessage = errorMessage;
    }
  }

  validate(val) {
    if (isInt(val)) {
      return true;
    }
    throw new ValidateError(this.errorMessage || 'value should be an int');
  }
}
