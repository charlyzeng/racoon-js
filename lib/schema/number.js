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
import SchemaBase from './base';

export default class SchemaNumber extends SchemaBase {
  type = TYPE.number;
  isAllowString = false;

  constructor() {
    super();
    this.typeRestrict = new RestrictNumberSchema();
    this.currentRestrict = this.typeRestrict;
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

  enum(...values) {
    const restrict = new RestrictEnum(...values);

    this.restricts.push(restrict);
    this.currentRestrict = restrict;
    return this;
  }

  required() {
    this.requiredRestrict = new RestrictNumberRequired();
    this.currentRestrict = this.requiredRestrict;
    return this;
  }

  allowNaN() {
    this.typeRestrict.enableAllowNaN();
    return this;
  }

  allowInfinity() {
    this.typeRestrict.enableAllowInfinity();
    return this;
  }

  allowString() {
    this.isAllowString = true;
    return this;
  }

  min(min, closed) {
    const restrict = new RestrictNumberMin(min, closed);

    this.restricts.push(restrict);
    this.currentRestrict = restrict;
    return this;
  }

  max(max, closed) {
    const restrict = new RestrictNumberMax(max, closed);

    this.restricts.push(restrict);
    this.currentRestrict = restrict;
    return this;
  }

  int() {
    const restrict = new RestrictNumberInt();

    this.restricts.push(restrict);
    this.currentRestrict = restrict;
    return this;
  }

  validate(val) {
    let value = val;

    // 如果允许被检测值为可解析为`number`的字符串，则需要在检验之前解析之
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
