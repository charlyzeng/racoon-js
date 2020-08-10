import RestrictBase from './base';
import ValidateError from '../utils/validate-error';

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
    throw new ValidateError(this.errorMessage || `value should be one of ${this.valueStr}`);
  }
}
