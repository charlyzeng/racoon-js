/**
 * The base class of all restrict.
 */

import { isFunction, isString } from '../util/is';
import ValidateError from '../util/validate-error';

export default class RestrictBase {
  errorConfig = {
    ctx: null,
    message: '',
  }

  setErrorMessage(message, ctx) {
    this.errorConfig = {
      ctx,
      message,
    };
  }

  getError(originMessage) {
    const { message, ctx } = this.errorConfig;

    if (isFunction(message)) {
      return new ValidateError(
        message.call(ctx, originMessage),
        { noKeyChain: true, custom: true },
      );
    }
    if (message && isString(message)) {
      return new ValidateError(
        message,
        { noKeyChain: true, custom: true },
      );
    }
    return new ValidateError(originMessage);
  }
}
