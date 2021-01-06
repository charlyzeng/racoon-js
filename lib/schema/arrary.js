/**
 * Class for array schema.
 */

import {
  isNotRequired,
} from '../util/is';
import {
  TYPE,
  useKeyChainSymbol,
} from '../util/constants';
import getKeyStr from '../util/get-key-str';
import ValidateError from '../util/validate-error';
import RestrictArraySchema from '../restrict/array-schema';
import RestrictLengthMin from '../restrict/length-min';
import RestrictLengthMax from '../restrict/length-max';
import SchemaBase from './base';

export default class SchemaArray extends SchemaBase {
  type = TYPE.array;
  itemSchema = null;

  /**
   * @param {SchemaBase} itemSchema The schema defined for every item of array.
   * If itemSchema isn't instanceof SchemaBase, then it will be ignored, this
   * means that the detected array can include any type value.
   */
  constructor(itemSchema) {
    super();
    this.typeRestrict = new RestrictArraySchema();
    this.lastRestrict = this.typeRestrict;

    // Only handle itemSchema when it's instanceof SchemaBase.
    if (itemSchema instanceof SchemaBase) {
      this.itemSchema = itemSchema;
    }
  }

  /**
   * Add a "min-length" restrict to array schema.
   *
   * @param {Number}  min      The min length of detected array.
   * @param {Boolean} [closed] Whether it's a closed interval. By default, the interval
   * is closed, which means the length of the detected array can be equal to min. When
   * closed is exactly false, the interval will be opened.
   */
  min(min, closed) {
    const restrict = new RestrictLengthMin(min, closed);

    this.restricts.push(restrict);
    this.lastRestrict = restrict;
    return this;
  }

  /**
   * Add a "max-length" restrict to array schema.
   *
   * @param {Number}  max      The max length of detected array.
   * @param {Boolean} [closed] Whether it's a closed interval. By default, the interval
   * is closed, which means the length of the detected array can be equal to max. When
   * closed is exactly false, the interval will be opened.
   */
  max(max, closed) {
    const restrict = new RestrictLengthMax(max, closed);

    this.restricts.push(restrict);
    this.lastRestrict = restrict;
    return this;
  }

  /**
   * Validate value.
   *
   * @param {*}      array       The value to validate.
   * @param {Symbol} useKeyChain If pass the special symbol, the keyChain param will be used.
   * @param {Array}  keyChain    The passed key chain of parent keys.
   */
  validate(array, useKeyChain, keyChain) {
    // When it's not required, and the detected value is undefined or null, then it's no need
    // to validate any more, just return default value or default value after formated.
    if (!this.requiredRestrict && isNotRequired(array)) {
      return this.getReturnValue(array);
    }

    try {
      this.checkType(array);
      this.checkRequired(array);
      this.checkRestricts(array);

      return this.getReturnValue(this.validateByRecurse(
        array,
        useKeyChain === useKeyChainSymbol ? keyChain : undefined,
      ));
    } catch (error) {
      this.throwErrorWithoutKeyChainIfNeeded(error);
      const errorForAll = this.getErrorForAll(error.message);

      if (errorForAll) {
        throw errorForAll;
      }

      throw error;
    }
  }

  /**
   * @private
   * Traverse each item of the array and validate each member recursively.
   *
   * @param {Array} array         The detected array.
   * @param {Array} [keyChain=[]] The key chain of ancestors to give friendly error prompts.
   * @returns {Array}             The return value if validate pass.
   */
  validateByRecurse(array, keyChain = []) {
    const chain = keyChain;
    const { itemSchema } = this;

    if (itemSchema) {
      return array.map((_, index) => this.validateItem({
        index,
        array,
        chain,
      }));
    }

    // Return a shallow copy of the detected array.
    return [...array];
  }

  /**
   * @private
   * Validate an item of the detected array.
   *
   * @param {object} params
   * @param {number} params.index  The index of the item in array.
   * @param {array}  params.array  The detected array.
   * @param {array}  params.chain  The key chain of ancestors.
   */
  validateItem(params) {
    const {
      index,
      array,
      chain,
    } = params;
    const { itemSchema } = this;

    try {
      return itemSchema.validate(
        array[index],
        useKeyChainSymbol,
        [...chain, { type: 'index', key: index }],
      );
    } catch (error) {
      this.throwErrorWithoutKeyChainIfNeeded(error);
      const keyOption = {
        type: 'index',
        key: index,
      };
      const keyChainStr = `"${getKeyStr([...chain, keyOption])}": `;

      throw new ValidateError(
        `${keyChainStr}${error.message}`,
        { final: true },
      );
    }
  }
}
