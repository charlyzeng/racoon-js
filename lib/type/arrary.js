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
    keyChain = keyChain || [];
    const { itemSchema } = this;

    if (itemSchema) {
      const result = [];
      for (let i = 0; i < array.length; i += 1) {
        try {
          if (itemSchema.type === TYPE.array || itemSchema.type === TYPE.object) {
            result.push(
              itemSchema.validateRecurse(array[i], [...keyChain, { type: 'index', key: i }])
            );
          } else {
            result.push(
              itemSchema.validate(array[i])
            );
          }
        } catch (error) {
          if (error instanceof ValidateError) {
            let keyChainStr = getKeyStr([...keyChain, { type: 'index', key: i }]);
            keyChainStr = `"${keyChainStr}": `;
            throw new Error(`${keyChainStr}${error.message}`);
          } else {
            throw error;
          }
        }
      }
      return result;
    }
    return array;
  }

  validate(array) {
    if (!this.requiredRestrict && isNotRequired(array)) {
      return this.getReturnValue(array);
    }
    this.checkRequired(array);
    this.checkType(array);
    this.checkRestricts(array);

    return this.getReturnValue(
      this.validateRecurse(array)
    );
  }
}
