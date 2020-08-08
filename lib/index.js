import {
  TypeNumber,
  TypeString,
  TypeBoolean,
  TypeAny,
  TypeObject,
  TypeArray
} from './type';

export function number(...args) {
  return new TypeNumber(...args);
}

export function string(...args) {
  return new TypeString(...args);
}

export function boolean(...args) {
  return new TypeBoolean(...args);
}

export function any() {
  return new TypeAny();
}

export function object(...args) {
  return new TypeObject(...args);
}

export function array(...args) {
  return new TypeArray(...args);
}

export default {
  number,
  string,
  boolean,
  any,
  object,
  array
};
