import { TYPE } from '../util/constants';
import RestrictBooleanSchema from '../restrict/boolean-schema';
import RestrictEnum from '../restrict/enum';
import SchemaBase from './base';

export default class SchemaBoolean extends SchemaBase {
  type = TYPE;

  constructor() {
    super();
    this.typeRestrict = new RestrictBooleanSchema();
    this.lastRestrict = this.typeRestrict;
  }

  /**
   * Add an "enum" restrict to boolean schema.
   *
   * @param {Array<*>} values The enum values that restrict the detected value can be.
   */
  enum(...values) {
    const restrict = new RestrictEnum(...values);

    this.restricts.push(restrict);
    this.lastRestrict = restrict;
    return this;
  }

  /**
   * Set the default return value of validate when the detected value is empty.
   *
   * @param {*} args[0] The default return value.
   * @param {*} args[1] The execute context of value when value is a function.
   */
  default(...args) {
    if (args.length === 0) {
      throw new Error('`default` args can not be empty');
    }

    const [value, ctx] = args;

    this.defaultConfig = {
      ctx,
      value,
      enable: true,
      strict: false,
    };

    return this;
  }
}
