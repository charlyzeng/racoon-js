/**
 * Class for any schema.
 */

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
    this.lastRestrict = this.typeRestrict;
  }

  /**
   * Add a "required" restrict to any schema.
   *
   * @param {Boolean} [strict] Whether enable strict mode. By default, the mode
   * is non-strict. If you pass strict exactly true, it will enable strict mode.
   */
  required(strict) {
    this.requiredRestrict = new RestrictAnyRequired(strict);
    this.lastRestrict = this.requiredRestrict;
    return this;
  }

  /**
   * Add an "enum" restrict to any schema.
   *
   * @param {Array<*>} values The enum values that restrict the detected value can be.
   */
  enum(...values) {
    const restrict = new RestrictEnum(...values);

    this.restricts.push(restrict);
    this.lastRestrict = restrict;
    return this;
  }
}
