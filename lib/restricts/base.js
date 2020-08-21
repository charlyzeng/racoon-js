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
        true
      );
    }
    if (message) {
      return new ValidateError(message, true);
    }
    return new ValidateError(originMessage);
  }
}
