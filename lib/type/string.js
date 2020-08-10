import { TYPE } from '../utils/constants';
import RestrictStringType from '../restricts/string-type';
import RestrictEnum from '../restricts/enum';
import RestrictLengthMax from '../restricts/length-max';
import RestrictLengthMin from '../restricts/length-min';
import RestrictStringPattern from '../restricts/string-pattern';
import TypeBase from './base';

export default class TypeString extends TypeBase {
  type = TYPE.string;

  constructor() {
    super();
    this.typeRestrict = new RestrictStringType();
  }

  getReturnValue(val) {
    return this.getReturnValueWithStrict(val);
  }

  enum(...values) {
    this.restricts.push(new RestrictEnum(...values));
    return this;
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
