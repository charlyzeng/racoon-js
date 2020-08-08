import {
  isString,
  isNotRequired
} from '../utils/is';
import { TYPE } from '../utils/constants';
import ValidateError from '../utils/validate-error';
import RestrictEnum from '../restricts/enum';
import RestrictLengthMax from '../restricts/length-max';
import RestrictLengthMin from '../restricts/length-min';
import RestrictStringPattern from '../restricts/string-pattern';
import TypeBase from './base';

export default class TypeString extends TypeBase {
  type = TYPE.string;

  constructor(errorMessage) {
    super();
    this.setErrorMessage(errorMessage);
  }

  checkType(val) {
    if (isString(val) || isNotRequired(val)) {
      return true;
    }
    throw new ValidateError(this.errorMessage || 'value should be typeof string');
  }

  getReturnValue(val) {
    return this.getReturnValueWithStrict(val);
  }

  enum(...values) {
    this.restricts.push(new RestrictEnum(...values));
    return this;
  }

  max(max, closed = true, errorMessage) {
    this.restricts.push(new RestrictLengthMax(max, closed, errorMessage));
    return this;
  }

  min(min, closed = true, errorMessage) {
    this.restricts.push(new RestrictLengthMin(min, closed, errorMessage));
    return this;
  }

  pattern(pattern) {
    this.restricts.push(new RestrictStringPattern(pattern));
    return this;
  }
}
