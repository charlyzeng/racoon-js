import RestrictBase from './base';
import { isEmpty, isNotRequired } from '../utils/is';

export default class RestrictRequired extends RestrictBase {
  strict = false;

  constructor(strict) {
    super();
    this.strict = strict === true;
  }

  validate(val) {
    const { strict } = this;
    if (strict === true) {
      if (isEmpty(val)) {
        throw this.getError('value is required and should not be empty');
      }
      return true;
    }
    if (isNotRequired(val)) {
      throw this.getError('value is required and should not be undefined/null');
    }
    return true;
  }
}
