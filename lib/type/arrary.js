import {
  isUndefined,
  isNull,
  isArray,
  isString,
  isNotRequired,
  getKeyStr,
} from '../utils/is';
import ValidateError from '../utils/validate-error';
import { TYPE } from '../utils/constants';
import RestrictLengthMin from '../restricts/length-min';
import RestrictLengthMax from '../restricts/length-max';
import TypeBase from './base';

export default class TypeArray extends TypeBase {
  type = TYPE.array;
  itemSchema = null;

  constructor(itemSchema, errorMessage) {
    super();
    if (isString(itemSchema)) {
      this.setErrorMessage(itemSchema);
    } else {
      if (itemSchema instanceof TypeBase) {
        this.itemSchema = itemSchema;
      }
      this.setErrorMessage(errorMessage);
    }
  }

  checkType(val) {
    if (isArray(val) || isUndefined(val) || isNull(val)) {
      return true;
    }
    throw new ValidateError(this.errorMessage || 'value should be typeof array');
  }

  getReturnValue(val) {
    return this.getReturnValueWithStrict(val);
  }

  min(min, closed = true, errorMessage) {
    this.restricts.push(new RestrictLengthMin(min, closed, errorMessage));
    return this;
  }

  max(max, closed = true, errorMessage) {
    this.restricts.push(new RestrictLengthMax(max, closed, errorMessage));
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
            if (keyChainStr) {
              keyChainStr = `"${keyChainStr}": `;
            }
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
