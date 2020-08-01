import {
  isEmpty,
  isNotRequired
} from '../utils/is';
import RestrictEnum from '../restricts/enum';
import ValidateError from '../utils/validate-error';

export default class TypeBase {
  restricts = [];
  requiredRestrict = null;

  required(strict = false) {
    this.requiredRestrict = { strict };
    return this;
  }

  enum(...values) {
    this.restricts.push(new RestrictEnum(...values));
    return this;
  }

  custom(restrictFn) {
    this.restricts.push({
      type: 'custom',
      restrictFn
    });
    return this;
  }

  checkRequired(val) {
    if (!this.requiredRestrict) {
      return true;
    }

    const { strict } = this.requiredRestrict;
    if (strict === true) {
      if (isEmpty(val)) {
        throw new ValidateError('value is required and should not be empty');
      }
      return true;
    }
    if (isNotRequired(val)) {
      throw new ValidateError('value is required and should not be undefined/null');
    }
    return true;
  }

  checkRestricts(val) {
    let restrict;
    for (let i = 0; i < this.restricts.length; i += 1) {
      restrict = this.restricts[i];
      if (restrict.type === 'custom') {
        restrict.restrictFn.call(null, val);
      } else {
        restrict.validate(val);
      }
    }
    return true;
  }

  validate(val) {
    if (!this.requiredRestrict && isNotRequired(val)) {
      return val;
    }
    this.checkRequired(val);
    this.checkType(val);
    this.checkRestricts(val);

    return val;
  }
}
