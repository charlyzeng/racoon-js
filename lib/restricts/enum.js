import ValidateError from '../utils/validate-error';
import { isArray, isString } from '../utils/is';

export default class RestrictEnum {
  enumValues = null;
  errorMessage = '';

  constructor(...values) {
    if (values.length === 0) {
      throw new RangeError('enum arguments can not be empty');
    }
    if (isArray(values[0])) {
      this.enumValues = values[0];
      if (isString(values[1])) {
        this.errorMessage = values[1];
      }
    } else {
      this.enumValues = values;
    }
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
