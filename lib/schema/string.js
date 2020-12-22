import { TYPE } from '../util/constants';
import RestrictStringSchema from '../restrict/string-schema';
import RestrictEnum from '../restrict/enum';
import RestrictLengthMax from '../restrict/length-max';
import RestrictLengthMin from '../restrict/length-min';
import RestrictStringPattern from '../restrict/string-pattern';
import SchemaBase from './base';

export default class SchemaString extends SchemaBase {
  type = TYPE.string;

  constructor() {
    super();
    this.typeRestrict = new RestrictStringSchema();
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
