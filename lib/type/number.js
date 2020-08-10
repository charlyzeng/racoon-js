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
    this.restricts.push(new RestrictEnum(...values));
    return this;
  }

  allowNaN(errorMessage) {
    this.typeRestrict.enableAllowNaN(errorMessage);
    return this;
  }

  min(min, closed = true) {
    this.restricts.push(new RestrictNumberMin(min, closed));
    return this;
  }

  max(max, closed = true) {
    this.restricts.push(new RestrictNumberMax(max, closed));
    return this;
  }

  int() {
    this.restricts.push(new RestrictNumberInt());
    return this;
  }
}
