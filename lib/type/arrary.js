import {
  isNotRequired,
  getKeyStr,
} from '../utils/is';
import ValidateError from '../utils/validate-error';
import { TYPE } from '../utils/constants';
import RestrictArrayType from '../restricts/array-type';
import RestrictLengthMin from '../restricts/length-min';
import RestrictLengthMax from '../restricts/length-max';
import TypeBase from './base';

export default class TypeArray extends TypeBase {
  type = TYPE.array;
  itemSchema = null;

  constructor(itemSchema) {
    super();
    this.typeRestrict = new RestrictArrayType();
    this.currentRestrict = this.typeRestrict;
    if (itemSchema instanceof TypeBase) {
      this.itemSchema = itemSchema;
    }
  }

  getReturnValue(val) {
    return this.getReturnValueWithStrict(val);
  }

  min(min, closed = true) {
    const restrict = new RestrictLengthMin(min, closed);
    this.restricts.push(restrict);
    this.currentRestrict = restrict;
    return this;
  }

  max(max, closed = true) {
    const restrict = new RestrictLengthMax(max, closed);
    this.restricts.push(restrict);
    this.currentRestrict = restrict;
    return this;
  }

  /**
   * @private
   * @param {Array} array - array to validate
   * @param {Array} [keyChain=[]] - props key chain
   * @returns {Array} - result of validate
   */
  validateRecurse(array, keyChain) {
    const chain = keyChain || [];
    const { itemSchema } = this;

    if (itemSchema) {
      const result = [];
      for (let i = 0; i < array.length; i += 1) {
        try {
          if (itemSchema.type === TYPE.array || itemSchema.type === TYPE.object) {
            result.push(itemSchema.validate(array[i], 'USE_KEY_CHAIN', [...chain, { type: 'index', key: i }]));
          } else {
            result.push(itemSchema.validate(array[i]));
          }
        } catch (error) {
          if (error.final) {
            throw error;
          }
          if (error.noKeyChain) {
            throw new ValidateError(error.message, { final: true });
          }
          let keyChainStr = getKeyStr([...chain, { type: 'index', key: i }]);
          keyChainStr = `"${keyChainStr}": `;
          throw new ValidateError(`${keyChainStr}${error.message}`, { final: true });
        }
      }
      return result;
    }
    return array;
  }

  validate(array, useKeyChain, keyChain) {
    if (!this.requiredRestrict && isNotRequired(array)) {
      return this.getReturnValue(array);
    }

    try {
      this.checkType(array);
      this.checkRequired(array);
      this.checkRestricts(array);

      return this.getReturnValue(this.validateRecurse(array, useKeyChain === 'USE_KEY_CHAIN' ? keyChain : undefined));
    } catch (error) {
      if (error.custom === true) {
        throw error;
      }
      const errorForAll = this.getErrorForAll(error.message);
      if (errorForAll) {
        throw errorForAll;
      }
      throw error;
    }
  }
}
