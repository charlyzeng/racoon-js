import {
  isEmpty,
  isNotRequired
} from '../utils/is';
import ValidateError from '../utils/validate-error';
import { TYPE } from '../utils/constants';
import RestrictEnum from '../restricts/enum';
import TypeBase from './base';

export default class TypeAny extends TypeBase {
  type = TYPE.any;

  checkType(val) {
    return true;
  }

  checkRequired(val) {
    if (!this.requiredRestrict) {
      return true;
    }

    const { strict, errorMessage } = this.requiredRestrict;
    if (strict === true) {
      if (isEmpty(val)) {
        throw new ValidateError(errorMessage || 'value is required and should not be empty');
      }
      return true;
    }
    if (isNotRequired(val)) {
      throw new ValidateError(errorMessage || 'value is required and should not be undefined/null');
    }
    return true;
  }

  enum(...values) {
    this.restricts.push(new RestrictEnum(...values));
    return this;
  }
}
