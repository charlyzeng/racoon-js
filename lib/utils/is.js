export const { toString } = Object.prototype;

export function getType(val) {
  const str = toString.call(val);
  return str.substring(8, str.length - 1);
}

export function isUndefined(val) {
  return getType(val) === 'Undefined';
}

export function isNull(val) {
  return val === null;
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
  if (type === 'Array' || type === 'Arguments') {
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

export function getKeyStr(keyChain) {
  const propReg = /^[_$a-z][_$a-z\d]*$/i;
  let result = '';
  for (let i = 0; i < keyChain.length; i += 1) {
    const { type, key } = keyChain[i];
    if (type === 'prop' && propReg.test(key)) {
      if (result) {
        result += `.${key}`;
      } else {
        result += key;
      }
    } else if (type === 'prop') {
      result += `['${key}']`;
    } else if (type === 'index') {
      result += `[${key}]`;
    }
  }
  return result;
}
