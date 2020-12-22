import {
  isObject,
  isNotRequired,
  getKeyStr,
} from '../utils/is';
import { TYPE } from '../utils/constants';
import RestrictObjectType from '../restricts/object-type';
import ValidateError from '../utils/validate-error';
import TypeBase from './base';

const { hasOwnProperty } = Object.prototype;

export default class TypeObject extends TypeBase {
  type = TYPE.object;
  config = null;
  isStripUnknown = false;
  isAllowUnknown = false;

  constructor(config) {
    super();
    this.typeRestrict = new RestrictObjectType();
    this.currentRestrict = this.typeRestrict;

    // 如果传入的`config`为`object`类型，则表明无需限制被检测值
    // 的具体键值结构
    if (isObject(config)) {
      const pureConfig = Object.create(null);
      // 过滤出只包含`TypeBase`实例的键值对，这是为了允许用户配置
      // 非`TypeBase`配置项，不会报错，但会忽略之。
      Object.keys(config).forEach((key) => {
        if (config[key] instanceof TypeBase) {
          pureConfig[key] = config[key];
        }
      });
      this.config = pureConfig;
    }
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
    const chain = keyChain || [];

    if (this.config === null) {
      return obj;
    }

    const result = {};
    const keys = Object.keys(this.config);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const schema = this.config[key];

      if (!schema.requiredRestrict && !hasOwnProperty.call(obj, key)) {
        if (schema.defaultConfig.enable) {
          result[key] = schema.calcDefaultValue(undefined);
        }
        continue;
      }

      try {
        if (schema.type === TYPE.object || schema.type === TYPE.array) {
          result[key] = schema.validate(
            obj[key],
            'USE_KEY_CHAIN',
            [
              ...chain,
              {
                key,
                type: 'prop',
              },
            ],
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
        let keyChainStr = getKeyStr([...chain, { type: 'prop', key }]);
        keyChainStr = `"${keyChainStr}": `;
        throw new ValidateError(`${keyChainStr}${error.message}`, { final: true });
      }
    }
    if (!this.isStripUnknown) {
      const otherKeys = Object
        .keys(obj)
        .filter(key => keys.includes(key) === false);
      for (let i = 0; i < otherKeys.length; i += 1) {
        const key = otherKeys[i];
        if (!this.isAllowUnknown) {
          throw new ValidateError(`the key \`${key}\` is not allowed`);
        }
        result[key] = obj[key];
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

      return this.getReturnValue(this.validateRecurse(obj, useKeyChain === 'USE_KEY_CHAIN' ? keyChain : undefined));
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
