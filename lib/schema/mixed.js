/**
 * Mixed schema, it means you can combine several schemas into one schema.
 */

import SchemaBase from './base';

export default class SchemaMixed extends SchemaBase {
  schemas = null;

  /**
   * @param {Array<SchemaBase>} schemas The allowed schemas.
   */
  constructor(...schemas) {
    super();

    if (schemas.length === 0) {
      throw new RangeError('mixed arguments should not be empty');
    }

    this.schemas = schemas;
  }

  /**
   * Validate value.
   *
   * @param {*} val The detected value.
   */
  validate(val) {
    let finalError = null;

    for (let i = 0; i < this.schemas.length; i += 1) {
      try {
        return this.schemas[i].validate(val);
      } catch (error) {
        finalError = error;
      }
    }

    throw finalError;
  }
}
