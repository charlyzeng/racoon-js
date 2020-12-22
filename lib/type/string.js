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
    this.currentRestrict = this.typeRestrict;
  }

  enum(...values) {
    const restrict = new RestrictEnum(...values);
    this.restricts.push(restrict);
    this.currentRestrict = restrict;
    return this;
  }

  max(max, closed) {
    const restrict = new RestrictLengthMax(max, closed);
    this.restricts.push(restrict);
    this.currentRestrict = restrict;
    return this;
  }

  min(min, closed) {
    const restrict = new RestrictLengthMin(min, closed);
    this.restricts.push(restrict);
    this.currentRestrict = restrict;
    return this;
  }

  pattern(pattern) {
    const restrict = new RestrictStringPattern(pattern);
    this.restricts.push(restrict);
    this.currentRestrict = restrict;
    return this;
  }
}
