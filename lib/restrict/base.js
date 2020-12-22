import { isFunction, isString } from '../util/is';
import ValidateError from '../util/validate-error';

export default class RestrictBase {
  errorConfig = {
    message: '',
    ctx: null,
  }

  setErrorMessage(message, ctx) {
    this.errorConfig = {
      message,
      ctx,
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
    if (isString(message) && message) {
      return new ValidateError(message, { noKeyChain: true, custom: true });
    }
    return new ValidateError(originMessage);
  }
}
