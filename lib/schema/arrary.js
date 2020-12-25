import { isNotRequired } from '../util/is';
import getKeyStr from '../util/get-key-str';
import {
  TYPE,
  useKeyChainSymbol,
  validateRecurseSymbol,
} from '../util/constants';
import ValidateError from '../util/validate-error';
import RestrictArraySchema from '../restrict/array-schema';
import RestrictLengthMin from '../restrict/length-min';
import RestrictLengthMax from '../restrict/length-max';
import SchemaBase from './base';

const validateItemSymbol = Symbol('#validateItemSymbol');

export default class SchemaArray extends SchemaBase {
  type = TYPE.array;
  itemSchema = null; // 数组成员的模式声明

  constructor(itemSchema) {
    super();
    this.typeRestrict = new RestrictArraySchema();
    this.currentRestrict = this.typeRestrict;

    if (itemSchema instanceof SchemaBase) {
      this.itemSchema = itemSchema;
    }
  }

  min(min, closed) {
    const restrict = new RestrictLengthMin(min, closed);

    this.restricts.push(restrict);
    this.currentRestrict = restrict;
    return this;
  }

  max(max, closed) {
    const restrict = new RestrictLengthMax(max, closed);

    this.restricts.push(restrict);
    this.currentRestrict = restrict;
    return this;
  }

  validate(array, useKeyChain, keyChain) {
    // 当`required`限制为空，且被检测值为`undefined`或`null`时，则无需经过
    // 后续校验，直接返回默认值或者经过格式化后的默认值。
    if (!this.requiredRestrict && isNotRequired(array)) {
      return this.getReturnValue(array);
    }

    try {
      this.checkType(array);
      this.checkRequired(array);
      this.checkRestricts(array);
      return this.getReturnValue(this[validateRecurseSymbol](
        array,
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
   * 遍历数组每个元素，并递归式校验每个成员。
   *
   * @param {Object} obj 被检测对象
   * @param {Array} [keyChain=[]] 父对象的键链，便于给出友好的错误提示
   * @returns {Object} 检验通过后的值
   */
  [validateRecurseSymbol](array, keyChain) {
    const chain = keyChain || [];
    const { itemSchema } = this;

    if (itemSchema) {
      const result = [];
      array.forEach((_, index) => {
        this[validateItemSymbol]({
          index,
          array,
          result,
          chain,
        });
      });

      return result;
    }

    // 返回被检测数组的浅拷贝
    return [...array];
  }

  /**
   * @private
   * 对数组某一项元素进行校验
   *
   * @param {object} params
   * @param {number} params.index  数组元素所在索引
   * @param {array}  params.array  被检测数组
   * @param {array}  params.result 将要返回的数组
   * @param {array}  params.chain  已校验通过的父对象Key组成的数组
   */
  [validateItemSymbol](params) {
    const {
      index,
      array,
      result,
      chain,
    } = params;
    const { itemSchema } = this;

    try {
      result.push(itemSchema.validate(
        array[index],
        useKeyChainSymbol,
        [...chain, { type: 'index', key: index }],
      ));
    } catch (error) {
      if (error.final) {
        throw error;
      }

      if (error.noKeyChain) {
        throw new ValidateError(error.message, { final: true });
      }

      const keyOption = {
        type: 'index',
        key: index,
      };
      const keyChainStr = `"${getKeyStr([...chain, keyOption])}": `;
      throw new ValidateError(
        `${keyChainStr}${error.message}`,
        { final: true },
      );
    }
  }
}
