/**
 * 通过传入回调函数自定义限制器
 */

import { isFunction, isString } from '../utils/is';
import RestrictBase from './base';

export default class RestrictCustom extends RestrictBase {
  restrictFn = null;
  ctx = null;

  /**
   * 自定义限制构造函数。
   * 如果`restrictFn`报错或返回非空字符串，则表示校验失败。错误的`message`
   * 属性或者返回的字符串表示错误信息。
   *
   * @param {Function} restrictFn 用户传入的自定义回调函数
   * @param {*} [ctx]             用户传入的自定义回到函数执行的上下文
   */
  constructor(restrictFn, ctx) {
    super();
    if (isFunction(restrictFn) === false) {
      throw new TypeError('`custom` must receive a Function parameter');
    }
    this.restrictFn = restrictFn;
    this.ctx = ctx;
  }

  validate(val) {
    try {
      const result = this.restrictFn.call(this.ctx, val);
      // 如果`restrictFn`返回非空字符串，则校验失败，需要报错
      if (isString(result) && result) {
        throw this.getError(result);
      }
    } catch (error) {
      // 如果`restrictFn`报错，也校验失败，需要包装后的错误
      throw this.getError(error.message);
    }
    return true;
  }
}
