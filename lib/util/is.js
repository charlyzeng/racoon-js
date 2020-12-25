export const { toString } = Object.prototype;

export function getType(val) {
  const str = toString.call(val);
  return str.substring(8, str.length - 1);
}

export function isUndefined(val) {
  return typeof val === 'undefined';
}

export function isNull(val) {
  return getType(val) === 'Null';
}

export function isNaN(val) {
  return val !== val;
}

export function isNotRequired(val) {
  return isUndefined(val) || isNull(val);
}

export function isFalsy(val) {
  return !val;
}

export function isEmpty(val) {
  const type = getType(val);
  if (type === 'Object') {
    return Object.keys(val).length === 0;
  }
  if (type === 'Array') {
    return val.length === 0;
  }
  return isFalsy(val);
}

export function isEmptyObject(val) {
  if (getType(val) === 'Object') {
    return Object.keys(val).length === 0;
  }
  return false;
}

export function isEmptyArray(val) {
  if (getType(val) === 'Array') {
    return val.length === 0;
  }
  return false;
}

export function isString(val) {
  return typeof val === 'string';
}

export function isNumber(val) {
  return typeof val === 'number';
}

export function isInt(val) {
  if (isNumber(val) === false) {
    return false;
  }
  return Math.floor(val) === val;
}

export function isInfinity(val) {
  return isNumber(val) && isNaN(val) === false && Number.isFinite(val) === false;
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

export function isFunction(val) {
  return getType(val) === 'Function';
}

/**
 * 检测字符串是否可通过`Number('xxx')`解析为数值。特殊情况说明：
 * 当被检测字符串为空字符串或者只包含空白的字符串时，虽然字符串可
 * 被解析为`0`, 但依然不被当做可解析的字符串。
 *
 * @param {string} val 被检测字符串
 * @returns {boolean}
 */
export function isStringNumber(val) {
  if (/^\s*$/.test(val)) {
    return false;
  }
  return !isNaN(Number(val));
}
