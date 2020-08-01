import { isRegExp } from '../utils/is';
import ValidateError from '../utils/validate-error';

export default class RestrictStringPattern {
  constructor(pattern) {
    if (isRegExp(pattern) === false) {
      throw new TypeError('pattern should be a RegExp');
    }
    this.pattern = pattern;
  }

  validate(val) {
    if (this.pattern.test(val)) {
      return true;
    }
    throw new ValidateError('value should match pattern');
  }
}
