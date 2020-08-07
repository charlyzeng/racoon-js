import {
  isUndefined,
  isNull,
  isArray,
  isNotRequired,
  getKeyStr
} from '../utils/is';
import ValidateError from '../utils/validate-error';
import { TYPE } from '../utils/constants';
import RestrictLengthMin from '../restricts/length-min';
import RestrictLengthMax from '../restricts/length-max';
import TypeBase from './base';

export default class TypeArray extends TypeBase {
  type = TYPE.array;
  itemRacoon = null;

  constructor(itemConfig) {
    super();
    if (itemConfig instanceof TypeBase) {
      this.itemRacoon = itemConfig;
    }
  }

  checkType(val) {
    if (isArray(val) || isUndefined(val) || isNull(val)) {
      return true;
    }
    throw new ValidateError('value should be typeof array');
  }

  getReturnValue(val) {
    return this.getReturnValueWithStrict(val);
  }

  min(min, closed = true) {
    this.restricts.push(new RestrictLengthMin(min, closed));
    return this;
  }

  max(max, closed = true) {
    this.restricts.push(new RestrictLengthMax(max, closed));
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
    const { itemRacoon } = this;

    if (itemRacoon) {
      const result = [];
      for (let i = 0; i < array.length; i += 1) {
        try {
          if (itemRacoon.type === TYPE.array || itemRacoon.type === TYPE.object) {
            result.push(
              itemRacoon.validateRecurse(array[i], [...keyChain, { type: 'index', key: i }])
            );
          } else {
            result.push(
              itemRacoon.validate(array[i])
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
