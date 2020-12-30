/**
 * Base class for all schema classes.
 */

import {
  isEmpty,
  isNotRequired,
  isNaN,
  isString,
  isFunction,
  isFinalError,
  isCustomError,
} from '../util/is';
import ValidateError from '../util/validate-error';
import RestrictRequired from '../restrict/required';
import RestrictCustom from '../restrict/custom';

export default class SchemaBase {
  restricts = [];
  typeRestrict = null;
  requiredRestrict = null;

  // Save the last restrict that added to schema. This is for add custom error
  // message by call error method.
  lastRestrict = null;

  // The config of default return value when detected is empty.
  defaultConfig = {
    enable: false,
    strict: false,
    ctx: null,
    value: undefined,
  };

  // The config of return value's formatter. By default, this will not do any
  // formatting. This can be setted by call `format` method.
  formatterConfig = {
    ctx: undefined,
    formatter: val => val,
  };

  // The custom error message config for all restricts. This can be setted by
  // call 'errorForAll` method.
  errorForAllConfig = {
    enable: false,
    ctx: undefined,
    message: '',
  };

  /**
   * Validate value.
   *
   * @param {*} val The detected value.
   */
  validate(val) {
    // When it's not required, and the detected value is undefined or null, then it's no need
    // to validate any more, just return default value or default value after formated.
    if (!this.requiredRestrict && isNotRequired(val)) {
      return this.getReturnValue(val);
    }

    try {
      this.checkType(val);
      this.checkRequired(val);
      this.checkRestricts(val);

      return this.getReturnValue(val);
    } catch (error) {
      if (isCustomError(error)) {
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
   * Validate value by silent. The deference from validate method is that validate method will
   * throw an error when validate fail, but validateSilent will not.
   *
   * @param {*} val The detected value.
   */
  validateSilent(val) {
    try {
      return {
        value: this.validate(val),
      };
    } catch (error) {
      return {
        error,
        value: val,
      };
    }
  }

  /**
   * Add a "required" restrict to schema.
   *
   * @param {Boolean} [strict] Whether enable strict mode. By default, the mode
   * is non-strict. If you pass strict exactly true, it will enable strict mode.
   */
  required(strict) {
    this.requiredRestrict = new RestrictRequired(strict);
    this.lastRestrict = this.requiredRestrict;
    return this;
  }

  /**
   * Add a "custom" restrict to schema.
   *
   * @param {Function} restrictFn The custom restrict callback function.
   * @param {*}        [ctx]      The exec context of restrictFn.
   */
  custom(restrictFn, ctx) {
    const restrict = new RestrictCustom(restrictFn, ctx);

    this.restricts.push(restrict);
    this.lastRestrict = restrict;
    return this;
  }

  /**
   * Set custom error message for the last restrict added to schema.
   *
   * @param {String|Function} message The custom error message.
   * @param {*}               ctx     The excute context when message is a function.
   */
  error(message, ctx) {
    this.ensureMessageType(message);
    this.lastRestrict.setErrorMessage(message, ctx);
    return this;
  }

  /**
   * Set custom error message for all restrict. The message setted by `error` method
   * is priority to that setted by `errorForAll`.
   *
   * @param {String|Function} message The custom error message.
   * @param {*}               ctx     The excute context when message is a function.
   */
  errorForAll(message, ctx) {
    this.ensureMessageType(message);
    this.errorForAllConfig = {
      enable: true,
      message,
      ctx,
    };

    return this;
  }

  /**
   * Set the default return value of validate when the detected value is empty.
   *
   * @param {*}       args[0] The default return value.
   * @param {boolean} args[1] Whether to enable strict mode.
   * @param {*}       args[2] The execute context of value when value is a function.
   */
  default(...args) {
    if (args.length === 0) {
      throw new Error('default arguments should not be empty');
    }

    const [value, strict, ctx] = args;
    this.defaultConfig = {
      ctx,
      value,
      enable: true,
      strict: strict === true,
    };

    return this;
  }

  /**
   * Format the return value of validate method.
   *
   * @param {Function} formatter The function that format the return value.
   * @param {*}        [ctx]     The execute context of formatter.
   */
  format(formatter, ctx) {
    if (typeof formatter !== 'function') {
      throw new TypeError('`formatter` should be a type of function');
    }

    this.formatterConfig = {
      ctx,
      formatter,
    };

    return this;
  }

  /**
   * Get the last return value of validate.
   *
   * @param {*} val The origin detected value.
   */
  getReturnValue(val) {
    const { enable, strict } = this.defaultConfig;
    const { formatter, ctx } = this.formatterConfig;

    if (enable && strict && isEmpty(val)) {
      return formatter.call(
        ctx,
        this.getDefaultReturnValue(val),
      );
    }

    return this.getReturnValueWithoutStrict(val);
  }

  /**
   * Get the default return value of validate.
   *
   * @param {*} val The origin detected value.
   */
  getDefaultReturnValue(val) {
    const { value, ctx } = this.defaultConfig;

    if (typeof value === 'function') {
      return value.call(ctx, val);
    }

    return value;
  }

  /**
   * Get the error message for all restricts.
   *
   * @param {string} originalMessage The origin error message throwed by racoon.
   */
  getErrorForAll(originalMessage) {
    const {
      ctx,
      enable,
      message,
    } = this.errorForAllConfig;

    if (enable !== true) {
      return null;
    }

    if (isFunction(message)) {
      return new ValidateError(message.call(ctx, originalMessage));
    }

    return new ValidateError(message);
  }

  /**
   * Check if the detected value's type is right.
   *
   * @param {*} val The detected value.
   */
  checkType(val) {
    return this.typeRestrict.validate(val);
  }

  /**
   * Check if the detected value meet "required" restrict.
   *
   * @param {*} val The detected value.
   */
  checkRequired(val) {
    if (!this.requiredRestrict) {
      return true;
    }

    return this.requiredRestrict.validate(val);
  }

  /**
   * Check all restricts for the detected value.
   *
   * @param {*} val The detected value
   */
  checkRestricts(val) {
    this.restricts.forEach((restrict) => {
      restrict.validate(val);
    });
    return true;
  }

  /**
   * Throw error without key chain when:
   * 1. The error is the final error, it's no need to add key chain.
   * 2. Or the error is custom error, it should not to add key chain.
   *
   * @param {Error} error The origin error object.
   */
  throwErrorWithoutKeyChainIfNeeded(error) {
    if (isFinalError(error)) {
      throw error;
    }

    if (isCustomError(error)) {
      throw new ValidateError(error.message, { final: true });
    }
  }

  /**
   * @private
   * Check if message is a valid type.
   *
   * @param {*} message The message param user passed.
   */
  ensureMessageType(message) {
    if (!isString(message) && !isFunction(message)) {
      throw new TypeError('`message` should be a type of string or function');
    }
  }

  /**
   * @private
   * Get the last return value of validate. This is for non-strict mode scene.
   *
   * @param {*} val The origin return value.
   */
  getReturnValueWithoutStrict(val) {
    const { enable } = this.defaultConfig;
    const { formatter, ctx } = this.formatterConfig;
    let value = val;

    // If there is a default return value, then format the default value and
    // return it.
    if (enable && (isNotRequired(val) || isNaN(val))) {
      value = this.getDefaultReturnValue(val);
    }

    // Otherwise, format the origin return value and return it.
    return formatter.call(ctx, value);
  }
}
