import RestrictBase from './base';
import { isRegExp } from '../utils/is';
import ValidateError from '../utils/validate-error';

export default class RestrictStringPattern extends RestrictBase {
  constructor(pattern) {
    super();
    if (isRegExp(pattern) === false) {
      throw new TypeError('pattern should be a RegExp');
    }
    this.pattern = pattern;
  }

  validate(val) {
    if (this.pattern.test(val)) {
      return true;
    }
    throw new ValidateError(this.errorMessage || `value should match pattern ${this.pattern.toString()}`);
  }
}
