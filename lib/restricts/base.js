import { isFunction } from '../utils/is';
import ValidateError from '../utils/validate-error';

export default class RestrictBase {
  errorConfig = {
    message: '',
    ctx: null
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
        { noKeyChain: true }
      );
    }
    if (message) {
      return new ValidateError(message, { noKeyChain: true });
    }
    return new ValidateError(originMessage);
  }
}
