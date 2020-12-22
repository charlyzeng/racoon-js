import {
  isObject,
  isNotRequired,
  getKeyStr,
} from '../utils/is';
import {
  TYPE,
  useKeyChainSymbol,
  validateRecurseSymbol,
} from '../utils/constants';
import RestrictObjectType from '../restricts/object-type';
import ValidateError from '../utils/validate-error';
import TypeBase from './base';

const { hasOwnProperty }          = Object.prototype;
const setResultWhenDefaultEnabled = Symbol('#setResultWhenDefaultEnabled');
const validateObjByKeySymbol      = Symbol('#validateObjByKeySymbol');

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

  /**
   * 调用此方法后，将会在`validate`最终返回结果中剔除schema配置中没有声明的属性
   */
  stripUnknown() {
    this.isStripUnknown = true;
    return this;
  }

  /**
   * 默认情况下，被检测对象中不允许包含schema配置中没有声明的属性，调用此方法可允
   * 被检测对象包含未声明属性
   */
  allowUnknown() {
    this.isAllowUnknown = true;
    return this;
  }

  validate(obj, useKeyChain, keyChain) {
    // 当`required`限制为空，且被检测值为`undefined`或`null`时，则无需经过
    // 后续校验，直接返回默认值或者经过格式化后的默认值。
    if (!this.requiredRestrict && isNotRequired(obj)) {
      return this.getReturnValue(obj);
    }

    try {
      this.checkType(obj);
      this.checkRequired(obj);
      this.checkRestricts(obj);

      return this.getReturnValue(this[validateRecurseSymbol](
        obj,
        useKeyChain === useKeyChainSymbol ? keyChain : undefined,
      ));
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

  /**
   * @private
   * 遍历对象每个属性，并递归式校验对象的每个属性
   *
   * @param   {object} obj           被检测对象
   * @param   {array}  [keyChain=[]] 父对象的键链，便于给出友好的错误提示
   * @returns {object}               检验通过后的值
   */
  [validateRecurseSymbol](obj, keyChain) {
    // 当`config`为空时，则无需进行后续校验
    if (this.config === null) {
      return obj;
    }

    const chain = keyChain || [];
    const result = {};
    const keys = Object.keys(this.config);

    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const schema = this.config[key];

      if (!schema.requiredRestrict && !hasOwnProperty.call(obj, key)) {
        this[setResultWhenDefaultEnabled]({
          key,
          result,
        });
      } else {
        this[validateObjByKeySymbol](obj, {
          key,
          chain,
          result,
        });
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

  /**
   * @private
   * 当有设置默认返回（即`default()`有被调用）时，设置返回结果相关的键值
   *
   * @param {object} params
   * @param {string} params.key    键
   * @param {object} params.result 需要设置的返回值
   * @returns {void}
   */
  [setResultWhenDefaultEnabled](params) {
    const { key, result } = params;
    const schema = this.config[key];
    if (schema.defaultConfig.enable) {
      result[key] = schema.calcDefaultValue(undefined);
    }
  }

  /**
   * @private
   * 对对象的某个key相关值做校验
   *
   * @param {object} obj            需要校验的对象
   * @param {object} options        额外参数
   * @param {string} options.key    键
   * @param {array}  options.chain  已校验通过的父对象Key组成的数组
   * @param {object} options.result 需要返回的数据
   */
  [validateObjByKeySymbol](obj, options) {
    const { key, chain, result } = options;
    const schema = this.config[key];

    try {
      result[key] = schema.validate(
        obj[key],
        useKeyChainSymbol,
        [
          ...chain,
          {
            key,
            type: 'prop',
          },
        ],
      );
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
}
