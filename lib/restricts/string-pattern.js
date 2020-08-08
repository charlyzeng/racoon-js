import { isRegExp, isString } from '../utils/is';
import ValidateError from '../utils/validate-error';

export default class RestrictStringPattern {
  constructor(pattern, errorMessage) {
    if (isRegExp(pattern) === false) {
      throw new TypeError('pattern should be a RegExp');
    }
    this.pattern = pattern;
    if (isString(errorMessage)) {
      this.errorMessage = errorMessage;
    }
  }

  validate(val) {
    if (this.pattern.test(val)) {
      return true;
    }
    throw new ValidateError(this.errorMessage || `value should match pattern ${this.pattern.toString()}`);
  }
}
