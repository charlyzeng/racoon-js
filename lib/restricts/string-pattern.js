import RestrictBase from './base';
import { isRegExp } from '../utils/is';

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
    throw this.getError(`value should match pattern ${this.pattern.toString()}`);
  }
}
