/**
 * Restrict value to be some enum values.
 */

import RestrictBase from './base';

export default class RestrictEnum extends RestrictBase {
  enumValues = null;

  /**
   * @param  {Array<*>} values The enum values that restrict the detected value can be.
   */
  constructor(...values) {
    super();

    if (values.length === 0) {
      throw new RangeError('enum arguments can not be empty');
    }

    this.enumValues = values;
  }

  /**
   * Check the detected value whether meets this "enum" restrict.
   *
   * @param {*} val The detected value.
   */
  validate(val) {
    if (this.enumValues.indexOf(val) === -1) {
      throw this.getError(`value should be one of ${JSON.stringify(this.enumValues)}`);
    }
  }
}
