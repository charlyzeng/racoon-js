import {
  isNaN,
  isNotRequired
} from '../utils/is';
import { TYPE } from '../utils/constants';
import RestrictNumberType from '../restricts/number-type';
import RestrictEnum from '../restricts/enum';
import RestrictNumberMax from '../restricts/number-max';
import RestrictNumberMin from '../restricts/number-min';
import RestrictNumberInt from '../restricts/number-int';
import TypeBase from './base';

export default class TypeNumber extends TypeBase {
  type = TYPE.number;

  constructor() {
    super();
    this.typeRestrict = new RestrictNumberType();
    this.currentRestrict = this.typeRestrict;
  }

  getReturnValue(val) {
    const { enable } = this.defaultConfig;
    if (
      enable
      && (isNotRequired(val) || isNaN(val))
    ) {
      return this.formatter.call(
        null,
        this.calcDefaultValue(val)
      );
    }
    return this.formatter.call(null, val);
  }

  enum(...values) {
    const restrict = new RestrictEnum(...values);
    this.restricts.push(restrict);
    this.currentRestrict = restrict;
    return this;
  }

  allowNaN() {
    this.typeRestrict.enableAllowNaN();
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
}
