/**
 * 限制被检测数据为枚举值`enum`
 */

import RestrictBase from './base';

export default class RestrictEnum extends RestrictBase {
  enumValues = null;

  constructor(...values) {
    super();
    if (values.length === 0) {
      throw new RangeError('enum arguments can not be empty');
    }
    this.enumValues = values;
  }

  get valueStr() {
    return JSON.stringify(this.enumValues);
  }

  validate(val) {
    if (this.enumValues.indexOf(val) > -1) {
      return true;
    }
    throw this.getError(`value should be one of ${this.valueStr}`);
  }
}
