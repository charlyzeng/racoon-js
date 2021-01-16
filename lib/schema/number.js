import {
  isString,
  isStringNumber,
} from '../util/is';
import { TYPE } from '../util/constants';
import RestrictNumberSchema from '../restrict/number-schema';
import RestrictNumberRequired from '../restrict/number-required';
import RestrictEnum from '../restrict/enum';
import RestrictNumberMax from '../restrict/number-max';
import RestrictNumberMin from '../restrict/number-min';
import RestrictNumberInt from '../restrict/number-int';
import RestrictNumberEven from '../restrict/number-even';
import RestrictNumberOdd from '../restrict/number-odd';
import SchemaBase from './base';

export default class SchemaNumber extends SchemaBase {
  type = TYPE.number;
  isAllowString = false;

  constructor() {
    super();
    this.typeRestrict = new RestrictNumberSchema();
    this.lastRestrict = this.typeRestrict;
  }

  /**
   * Set the default return value of validate when the detected value is empty.
   *
   * @param {*} args[0] The default return value.
   * @param {*} args[1] The execute context of value when value is a function.
   */
  default(...args) {
    if (args.length === 0) {
      throw new Error('default arguments should not be empty');
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
   * Add a "required" restrict to number schema.
   */
  required() {
    this.requiredRestrict = new RestrictNumberRequired();
    this.lastRestrict = this.requiredRestrict;
    return this;
  }

  /**
   * By default, number schema doesn't allow the detected value to be NaN. If
   * allowNaN method is called, then NaN will be allowd.
   */
  allowNaN() {
    this.typeRestrict.enableAllowNaN();
    return this;
  }

  /**
   * By default, number schema doesn't allow the detected value to be Infinity.
   * If allowInfinity method is called, then Infinity will be allowd.
   */
  allowInfinity() {
    this.typeRestrict.enableAllowInfinity();
    return this;
  }

  /**
   * By default, number schema doesn't allow the detected value to be number
   * style string. For example, a string "123" is not allowed. If allowString
   * method is called, then number schema will try to parse string to number.
   */
  allowString() {
    this.isAllowString = true;
    return this;
  }

  /**
   * Add a "min-number" restrict for detected number.
   *
   * @param {Number}  min      The min value of detected number.
   * @param {Boolean} [closed] Whether it's a closed interval. By default, the interval
   * is closed, which means the value of the detected number can be equal to min. When
   * closed is exactly false, the interval will be opened.
   */
  min(min, closed) {
    const restrict = new RestrictNumberMin(min, closed);

    this.restricts.push(restrict);
    this.lastRestrict = restrict;
    return this;
  }

  /**
   * Add a "max-number" restrict to number schema.
   *
   * @param {Number}  max      The max value of detected number.
   * @param {Boolean} [closed] Whether it's a closed interval. By default, the interval
   * is closed, which means the value of the detected number can be equal to max. When
   * closed is exactly false, the interval will be opened.
   */
  max(max, closed) {
    const restrict = new RestrictNumberMax(max, closed);

    this.restricts.push(restrict);
    this.lastRestrict = restrict;
    return this;
  }

  /**
   * Add an "int-number" restrict to number schema.
   */
  int() {
    const restrict = new RestrictNumberInt();

    this.restricts.push(restrict);
    this.lastRestrict = restrict;
    return this;
  }

  even() {
    const restrict = new RestrictNumberEven();

    this.restricts.push(restrict);
    this.lastRestrict = restrict;
    return this;
  }

  odd() {
    const restrict = new RestrictNumberOdd();

    this.restricts.push(restrict);
    this.lastRestrict = restrict;
    return this;
  }

  /**
   * @override
   * Validate value.
   *
   * @param {*} val The detected value.
   */
  validate(val) {
    let value = val;

    // If allowString is called, then preparse string to number.
    if (
      this.isAllowString
      && isString(val)
      && isStringNumber(val)
    ) {
      value = Number(val);
    }

    return super.validate(value);
  }
}
