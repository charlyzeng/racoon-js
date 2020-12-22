import { TYPE } from '../util/constants';
import RestrictAnySchema from '../restrict/any-schema';
import RestrictAnyRequired from '../restrict/any-required';
import RestrictEnum from '../restrict/enum';
import SchemaBase from './base';

export default class SchemaAny extends SchemaBase {
  type = TYPE.any;

  constructor() {
    super();
    this.typeRestrict = new RestrictAnySchema();
    this.currentRestrict = this.typeRestrict;
  }

  required(strict) {
    this.requiredRestrict = new RestrictAnyRequired(strict);
    this.currentRestrict = this.requiredRestrict;
    return this;
  }

  enum(...values) {
    const restrict = new RestrictEnum(...values);
    this.restricts.push(restrict);
    this.currentRestrict = restrict;
    return this;
  }
}
