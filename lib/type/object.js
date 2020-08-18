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
    let keys;
    if (this.isStripUnknown === true) {
      keys = this.keys;
    } else {
      keys = Object.keys(obj);
    }
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const schema = this.config[key];
      if (this.hasKey(key) === false) {
        if (this.isAllowUnknown === true) {
          result[key] = obj[key];
          continue;
        }
        throw new ValidateError(`the key \`${key}\` is not allowed`);
      }

      try {
        if (schema.type === TYPE.object || schema.type === TYPE.array) {
          result[key] = schema.validateRecurse(
            obj[key],
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
        if (error instanceof ValidateError) {
          let keyChainStr = getKeyStr([...keyChain, { type: 'prop', key }]);
          keyChainStr = `"${keyChainStr}": `;
          throw new Error(`${keyChainStr}${error.message}`);
        } else {
          throw error;
        }
      }
    }
    return result;
  }

  validate(obj) {
    if (!this.requiredRestrict && isNotRequired(obj)) {
      return this.getReturnValue(obj);
    }
    this.checkRequired(obj);
    this.checkType(obj);
    this.checkRestricts(obj);

    return this.getReturnValue(
      this.validateRecurse(obj)
    );
  }
}
