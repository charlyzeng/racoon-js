import { TYPE } from '../util/constants';
import RestrictBooleanSchema from '../restrict/boolean-schema';
import RestrictEnum from '../restrict/enum';
import SchemaBase from './base';

export default class SchemaBoolean extends SchemaBase {
  type = TYPE;

  constructor() {
    super();
    this.typeRestrict = new RestrictBooleanSchema();
    this.currentRestrict = this.typeRestrict;
  }

  enum(...values) {
    const restrict = new RestrictEnum(...values);

    this.restricts.push(restrict);
    this.currentRestrict = restrict;
    return this;
  }

  default(...args) {
    if (args.length === 0) {
      throw new Error('`default` args can not be empty');
    }
    const [value, ctx] = args;

    Object.assign(this.defaultConfig, {
      ctx,
      value,
      enable: true,
      strict: false,
    });
    return this;
  }
}
