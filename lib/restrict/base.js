/**
 * The base class of all restrict.
 */

import { isFunction, isString } from '../util/is';
import ValidateError from '../util/validate-error';

export default class RestrictBase {
  // To custom the error message when restrict validate fail. The message field
  // can be either a string or a function, when it's a function, the ctx field
  // can specify execute context of message function.
  errorConfig = {
    ctx: null,
    message: '',
  }

  /**
   * set errorConfig
   *
   * @param {String|Function} message The message of error.
   * @param {*} [ctx] The execute context when message is a function.
   */
  setErrorMessage(message, ctx) {
    this.errorConfig = {
      ctx,
      message,
    };
  }

  /**
   * Get the final error message when validate fail.
   *
   * @param {String} originMessage The origin message that throwed by racoon.
   * @returns {ValidateError}
   */
  getError(originMessage) {
    const { message, ctx } = this.errorConfig;

    if (isFunction(message)) {
      return new ValidateError(
        message.call(ctx, originMessage),
        { custom: true },
      );
    }

    if (message && isString(message)) {
      return new ValidateError(
        message,
        { custom: true },
      );
    }

    return new ValidateError(originMessage);
  }
}
