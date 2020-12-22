/**
 * 限制被检测值不为空
 */

import RestrictBase from './base';
import { isEmpty, isNotRequired } from '../utils/is';

export default class RestrictRequired extends RestrictBase {
  strict = false;

  /**
   * 非空限制器构造函数
   *
   * @param {boolean} [strict] 是否为严格模式，默认为非严格模式。严格模式下，要求
   *                           被检测值非空，即非`falsy`值，以及非空数组、空对象。
   *                           非严格模式下，要求被检测值非`undefined`, `null`.
   */
  constructor(strict) {
    super();
    this.strict = strict === true;
  }

  validate(val) {
    const { strict } = this;

    if (strict && isEmpty(val)) {
      throw this.getError('value is required and should not be empty');
    }
    if (!strict && isNotRequired(val))  {
      throw this.getError('value is required and should not be undefined/null');
    }
  }
}
