import ValidateError from './validate-error';

const { toString } = Object.prototype;

export function getType(val) {
  const str = toString.call(val);
  return str.substring(8, str.length - 1);
}

export function isUndefined(val) {
  return val === undefined;
}

export function isNull(val) {
  return val === null;
}

export function isNaN(val) {
  return Number.isNaN(val);
}

export function isString(val) {
  return typeof val === 'string';
}

export function isNumber(val) {
  return typeof val === 'number';
}

export function isInt(val) {
  return Number.isInteger(val);
}

export function isInfinity(val) {
  return (
    val === Number.POSITIVE_INFINITY
    || val === Number.NEGATIVE_INFINITY
  );
}

export function isBoolean(val) {
  return typeof val === 'boolean';
}

export function isRegExp(val) {
  return val instanceof RegExp;
}

export function isObject(val) {
  return getType(val) === 'Object';
}

export function isArray(val) {
  return Array.isArray(val);
}

export function isNotRequired(val) {
  return isUndefined(val) || isNull(val);
}

export function isEmpty(val) {
  const type = getType(val);

  if (type === 'Object') {
    return Object.keys(val).length === 0;
  }

  if (type === 'Array') {
    return val.length === 0;
  }

  return (
    isNotRequired(val)
    || isNaN(val)
    || val === ''
  );
}

/**
 * Check if the value is Function. AsyncFunction or GeneratorFunction will
 * return false.
 *
 * @param {*} val The value to check.
 */
export function isFunction(val) {
  return getType(val) === 'Function';
}

/**
 * Detect string whether can be parsed to number by `Number('xxx')`.
 *
 * Special case:
 * When the detected string is empty or only includes white spaces, the string
 * can be parsed to zero although, but it won't be regarded as a parsable
 * string still.
 *
 * @param {string} val The detected string.
 * @returns {boolean}
 */
export function isStringNumber(val) {
  if (/^\s*$/.test(val)) {
    return false;
  }
  return !isNaN(Number(val));
}

/**
 * Check the error is a customed ValidateError.
 *
 * @param {Error} error The error object to check.
 */
export function isCustomError(error) {
  return error instanceof ValidateError && error.custom;
}

/**
 * Check the error is a final ValidateError.
 *
 * @param {Error} error The error object to check.
 */
export function isFinalError(error) {
  return error instanceof ValidateError && error.final;
}
