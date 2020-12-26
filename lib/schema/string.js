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
    this.lastRestrict = this.typeRestrict;
  }

  /**
   * Add an "enum" restrict to string schema.
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
   * Add a "min-length" restrict to string schema.
   *
   * @param {Number}  min      The min length of detected string.
   * @param {Boolean} [closed] Whether it's a closed interval. By default, the interval
   * is closed, which means the length of the detected string can be equal to min. When
   * closed is exactly false, the interval will be opened.
   */
  min(min, closed) {
    const restrict = new RestrictLengthMin(min, closed);

    this.restricts.push(restrict);
    this.lastRestrict = restrict;
    return this;
  }

  /**
   * Add a "max-length" restrict to string schema.
   *
   * @param {Number}  max      The max length of detected string.
   * @param {Boolean} [closed] Whether it's a closed interval. By default, the interval
   * is closed, which means the length of the detected string can be equal to max. When
   * closed is exactly false, the interval will be opened.
   */
  max(max, closed) {
    const restrict = new RestrictLengthMax(max, closed);

    this.restricts.push(restrict);
    this.lastRestrict = restrict;
    return this;
  }

  /**
   * Add a "pattern" string to string schema.
   *
   * @param {RegExp} pattern RegExp to restrict the format of string.
   */
  pattern(pattern) {
    const restrict = new RestrictStringPattern(pattern);

    this.restricts.push(restrict);
    this.lastRestrict = restrict;
    return this;
  }
}
