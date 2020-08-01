import {
  isString,
  isNotRequired
} from '../utils/is';
import { TYPE } from '../utils/constants';
import ValidateError from '../utils/validate-error';
import RestrictLengthMax from '../restricts/length-max';
import RestrictLengthMin from '../restricts/length-min';
import RestrictStringPattern from '../restricts/string-pattern';
import TypeBase from './base';

export default class TypeString extends TypeBase {
  type = TYPE.string;

  checkType(val) {
    if (isString(val) || isNotRequired(val)) {
      return true;
    }
    throw new ValidateError('value should be typeof string');
  }

  max(max, closed = true) {
    this.restricts.push(new RestrictLengthMax(max, closed));
    return this;
  }

  min(min, closed = true) {
    this.restricts.push(new RestrictLengthMin(min, closed));
    return this;
  }

  pattern(pattern) {
    this.restricts.push(new RestrictStringPattern(pattern));
    return this;
  }
}
