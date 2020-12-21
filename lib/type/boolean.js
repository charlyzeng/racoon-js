import { TYPE } from '../utils/constants';
import RestrictBooleanType from '../restricts/boolean-type';
import RestrictEnum from '../restricts/enum';
import TypeBase from './base';

export default class TypeBoolean extends TypeBase {
  type = TYPE;

  constructor() {
    super();
    this.typeRestrict = new RestrictBooleanType();
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
      enable: true,
      strict: false,
      value,
      ctx,
    });
    return this;
  }
}
