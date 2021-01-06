import {
  isObject,
  isNotRequired,
} from '../util/is';
import {
  TYPE,
  useKeyChainSymbol,
} from '../util/constants';
import getKeyStr from '../util/get-key-str';
import RestrictObjectSchema from '../restrict/object-schema';
import ValidateError from '../util/validate-error';
import SchemaBase from './base';

const { hasOwnProperty } = Object.prototype;

export default class SchemaObject extends SchemaBase {
  type = TYPE.object;
  config = null;
  isStripUnknown = false;
  isAllowUnknown = false;

  constructor(config) {
    super();
    this.typeRestrict = new RestrictObjectSchema();
    this.lastRestrict = this.typeRestrict;

    // If config is passed non-object, it means that the key-value structure
    // is no need to restrct.
    if (isObject(config)) {
      const pureConfig = {};

      // Filter the keys that corresponding value is an instance of SchemaBase.
      // This is for the purpose that allow config include value that is not an
      // instance of SchemaBase, and ingore them.
      Object.keys(config).forEach((key) => {
        if (config[key] instanceof SchemaBase) {
          pureConfig[key] = config[key];
        }
      });
      this.config = pureConfig;
    }
  }

  /**
   * If stripUnkown is called, then the return result of validate method will
   * not include the keys that not included in config.
   */
  stripUnknown() {
    this.isStripUnknown = true;
    return this;
  }

  /**
   * By default, the detected object is not allowed to include the unknown keys
   * that is not included in config. If allowUnknown is called, then these
   * unknown keys will be allowed, and these unknown key-values will be returned
   * in validate result.
   */
  allowUnknown() {
    this.isAllowUnknown = true;
    return this;
  }

  /**
   * Validate value.
   *
   * @param {*}      obj         The value to validate.
   * @param {Symbol} useKeyChain If pass the special symbol, the keyChain param
   * will be used.
   * @param {Array}  keyChain    The passed key chain of parent keys.
   */
  validate(obj, useKeyChain, keyChain) {
    // When it's not required, and the detected value is undefined or null,
    // then it's no need to validate any more, just return default value or
    // default value after formated.
    if (!this.requiredRestrict && isNotRequired(obj)) {
      return this.getReturnValue(obj);
    }

    try {
      this.checkType(obj);
      this.checkRequired(obj);
      this.checkRestricts(obj);

      return this.getReturnValue(this.validateByRecurse(
        obj,
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
   * Traverse each key of the object and validate each value recursively.
   *
   * @param {Array} obj           The detected object.
   * @param {Array} [keyChain=[]] The key chain of ancestors to give friendly
   * error prompts.
   * @returns {Object}            The return value if validate pass.
   */
  validateByRecurse(obj, keyChain = []) {
    if (this.config === null) {
      return obj;
    }

    const result = {};
    const chain = keyChain;
    const keys = Object.keys(this.config);

    keys.forEach((key) => {
      const schema = this.config[key];

      if (!schema.requiredRestrict && !hasOwnProperty.call(obj, key)) {
        this.setResultWhenDefaultEnabled({
          key,
          result,
        });
      } else {
        result[key] = this.validateObjectByKey(obj, {
          key,
          chain,
        });
      }
    });
    if (!this.isStripUnknown) {
      Object
        .keys(obj)
        .forEach((key) => {
          const notIncluded = keys.includes(key) === false;

          if (notIncluded && !this.isAllowUnknown) {
            throw new ValidateError(`the key \`${key}\` is not allowed`);
          }

          if (notIncluded) {
            result[key] = obj[key];
          }
        });
    }
    return result;
  }

  /**
   * @private
   * Validate an key-value of the detected object.
   *
   * @param {object} obj            The detected object.
   * @param {object} options
   * @param {string} options.key    The prop key.
   * @param {array}  options.chain  The key chain of ancestors to give friendly
   * error prompts.
   */
  validateObjectByKey(obj, options) {
    const { key, chain } = options;
    const schema = this.config[key];
    const keyOption = { key, type: 'prop' };

    try {
      return schema.validate(
        obj[key],
        useKeyChainSymbol,
        [
          ...chain,
          keyOption,
        ],
      );
    } catch (error) {
      this.throwErrorWithoutKeyChainIfNeeded(error);
      const keyChainStr = `"${getKeyStr([...chain, keyOption])}": `;

      throw new ValidateError(
        `${keyChainStr}${error.message}`,
        { final: true },
      );
    }
  }

  /**
   * @private
   * Set some key-values of return value when default method was called.
   *
   * @param {object} params
   * @param {string} params.key    The prop key.
   * @param {object} params.result The value that will be returned.
   * @returns {void}
   */
  setResultWhenDefaultEnabled(params) {
    const { key, result } = params;

    const schema = this.config[key];
    if (schema.defaultConfig.enable) {
      result[key] = schema.getDefaultReturnValue(undefined);
    }
  }
}
