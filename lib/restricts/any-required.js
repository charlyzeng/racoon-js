/**
 * 用于`any`类型的`required`限制器
 */

import RestrictBase from './base';
import {
  isNaN,
  isNotRequired,
  isEmptyObject,
  isEmptyArray,
} from '../utils/is';

export default class RestrictAnyRequired extends RestrictBase {
  strict = false;

  constructor(strict) {
    super();
    this.strict = strict === true;
  }

  validate(val) {
    const { strict } = this;

    // 非严格模式下，被检测数据为 undefined, null 或 NaN 时，检测不通过。
    if (!strict && (isNotRequired(val) || isNaN(val))) {
      throw this.getError('value is required and should not be undefined/null/NaN');
    }

    // 严格模式下，当被检测数据为以下值时，检测不通过。
    // 1. undefined 或 null
    // 2. 空字符串
    // 3. NaN
    // 4. 空对象
    // 5. 空数组
    const isEmpty = (
      isNotRequired(val)
      || val === ''
      || isNaN(val)
      || isEmptyObject(val)
      || isEmptyArray(val)
    );
    if (strict === true && isEmpty) {
      throw this.getError('value is required and should not be empty');
    }
  }
}
