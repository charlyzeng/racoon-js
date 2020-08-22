import {
  isNaN,
  isNotRequired
} from '../utils/is';
import { TYPE } from '../utils/constants';
import RestrictNumberType from '../restricts/number-type';
import RestrictNumberRequired from '../restricts/number-required';
import RestrictEnum from '../restricts/enum';
import RestrictNumberMax from '../restricts/number-max';
import RestrictNumberMin from '../restricts/number-min';
import RestrictNumberInt from '../restricts/number-int';
import TypeBase from './base';

const NUMBER_REG = /^[+-]?\d*\.?\d*$/;

export default class TypeNumber extends TypeBase {
  type = TYPE.number;
  isAllowString = false;

  constructor() {
    super();
    this.typeRestrict = new RestrictNumberType();
    this.currentRestrict = this.typeRestrict;
  }

  getReturnValue(val) {
    const { enable } = this.defaultConfig;
    const { formatter, ctx } = this.formatterConfig;
    if (
      enable
      && (isNotRequired(val) || isNaN(val))
    ) {
      return formatter.call(
        ctx,
        this.calcDefaultValue(val)
      );
    }
    return formatter.call(ctx, val);
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
      ctx
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

  min(min, closed = true) {
    const restrict = new RestrictNumberMin(min, closed);
    this.restricts.push(restrict);
    this.currentRestrict = restrict;
    return this;
  }

  max(max, closed = true) {
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
    if (this.isAllowString && NUMBER_REG.test(val)) {
      val = Number(val);
    }
    return super.validate(val);
  }
}
