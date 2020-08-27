import {
  isObject,
  isNotRequired,
  getKeyStr,
} from '../utils/is';
import { TYPE } from '../utils/constants';
import RestrictObjectType from '../restricts/object-type';
import ValidateError from '../utils/validate-error';
import TypeBase from './base';

export default class TypeObject extends TypeBase {
  type = TYPE.object;
  config = null;
  isStripUnknown = false;
  isAllowUnknown = false;

  constructor(config) {
    super();
    this.typeRestrict = new RestrictObjectType();
    this.currentRestrict = this.typeRestrict;
    if (isObject(config)) {
      const pureConfig = Object.create(null);
      Object.keys(config).forEach(key => {
        if (config[key] instanceof TypeBase) {
          pureConfig[key] = config[key];
        }
      });
      this.config = pureConfig;
    }
  }

  get keys() {
    return Object.keys(this.config);
  }

  hasKey(key) {
    return this.keys.includes(key);
  }

  getReturnValue(val) {
    return this.getReturnValueWithStrict(val);
  }

  stripUnknown() {
    this.isStripUnknown = true;
    return this;
  }

  allowUnknown() {
    this.isAllowUnknown = true;
    return this;
  }

  /**
   * @private
   * @param {Object} obj - object to validate
   * @param {Array} [keyChain=[]] - object props chain
   * @returns {Object} - result of validate
   */
  validateRecurse(obj, keyChain) {
    keyChain = keyChain || [];

    if (this.config === null) {
      return obj;
    }

    const result = {};
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const schema = this.config[key];
      if (this.hasKey(key) === false) {
        if (this.isStripUnknown === true) {
          continue;
        }
        if (this.isAllowUnknown === true) {
          result[key] = obj[key];
          continue;
        }
        throw new ValidateError(`the key \`${key}\` is not allowed`);
      }

      try {
        if (schema.type === TYPE.object || schema.type === TYPE.array) {
          result[key] = schema.validate(
            obj[key],
            'USE_KEY_CHAIN',
            [
              ...keyChain,
              {
                key,
                type: 'prop'
              }
            ]
          );
        } else {
          result[key] = schema.validate(obj[key]);
        }
      } catch (error) {
        if (error.final) {
          throw error;
        }
        if (error.noKeyChain) {
          throw new ValidateError(error.message, { final: true });
        }
        let keyChainStr = getKeyStr([...keyChain, { type: 'prop', key }]);
        keyChainStr = `"${keyChainStr}": `;
        throw new ValidateError(`${keyChainStr}${error.message}`, { final: true });
      }
    }
    return result;
  }

  validate(obj, useKeyChain, keyChain) {
    if (!this.requiredRestrict && isNotRequired(obj)) {
      return this.getReturnValue(obj);
    }

    try {
      this.checkType(obj);
      this.checkRequired(obj);
      this.checkRestricts(obj);

      return this.getReturnValue(
        this.validateRecurse(obj, useKeyChain === 'USE_KEY_CHAIN' ? keyChain : undefined)
      );
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
