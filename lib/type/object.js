import {
  isUndefined,
  isNull,
  isObject,
  isNotRequired,
  getKeyStr
} from '../utils/is';
import { TYPE } from '../utils/constants';
import ValidateError from '../utils/validate-error';
import TypeBase from './base';

export default class TypeObject extends TypeBase {
  type = TYPE.object;
  enableStripUnknown = false;
  enableAllowUnknown = false;

  constructor(config) {
    super();
    if (isObject(config)) {
      const pureConfig = Object.create(null);
      Object.keys(config).forEach(key => {
        if (config[key] instanceof TypeBase) {
          pureConfig[key] = config[key];
        }
      });
      this.config = pureConfig;
    } else {
      this.config = null;
    }
  }

  get keys() {
    return Object.keys(this.config);
  }

  checkType(val) {
    if (isObject(val) || isUndefined(val) || isNull(val)) {
      return true;
    }
    throw new ValidateError('value should be typeof object');
  }

  hasKey(key) {
    return this.keys.includes(key);
  }

  getReturnValue(val) {
    return this.getReturnValueWithStrict(val);
  }

  stripUnknown(enable) {
    if (enable !== false) {
      this.enableStripUnknown = true;
    }
    return this;
  }

  allowUnknown(enable) {
    if (enable !== false) {
      this.enableAllowUnknown = true;
    }
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
    if (this.enableStripUnknown === true) {
      keys = this.keys;
    } else {
      keys = Object.keys(obj);
    }
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const racoonType = this.config[key];
      if (this.hasKey(key) === false) {
        if (this.enableStripUnknown === true) {
          continue;
        }
        if (this.enableAllowUnknown === true) {
          result[key] = obj[key];
          continue;
        }
        throw new ValidateError(`the key \`${key}\` is not allowed`);
      }

      try {
        if (racoonType.type === TYPE.object || racoonType.type === TYPE.array) {
          result[key] = racoonType.validateRecurse(
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
          result[key] = racoonType.validate(obj[key]);
        }
      } catch (error) {
        if (error instanceof ValidateError) {
          let keyChainStr = getKeyStr([...keyChain, { type: 'prop', key }]);
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
