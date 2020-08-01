import {
  isUndefined,
  isNull,
  isNaN,
  isNumber,
  isNotRequired
} from '../utils/is';
import ValidateError from '../utils/validate-error';
import RestrictNumberMax from '../restricts/number-max';
import RestrictNumberMin from '../restricts/number-min';
import RestrictNumberInt from '../restricts/number-int';
import { TYPE } from '../utils/constants';
import TypeBase from './base';

export default class TypeNumber extends TypeBase {
  type = TYPE.number;

  checkType(val) {
    if (isNumber(val) || isUndefined(val) || isNull(val) || isNaN(val)) {
      return true;
    }
    throw new ValidateError('value should be typeof number');
  }

  checkRequired(val) {
    if (!this.requiredRestrict) {
      return true;
    }

    if (!isUndefined(val) && !isNull(val) && !isNaN(val)) {
      return true;
    }
    throw new ValidateError('value is required and should not be undefined/null/NaN');
  }

  min(min, closed = true) {
    this.restricts.push(new RestrictNumberMin(min, closed));
    return this;
  }

  max(max, closed = true) {
    this.restricts.push(new RestrictNumberMax(max, closed));
    return this;
  }

  int() {
    this.restricts.push(new RestrictNumberInt());
    return this;
  }

  validate(val) {
    if (
      !this.requiredRestrict
      && (isNotRequired(val) || isNaN(val))
    ) {
      return val;
    }
    this.checkRequired(val);
    this.checkType(val);
    this.checkRestricts(val);

    return val;
  }
}
