import {
  TypeNumber,
  TypeString,
  TypeBoolean,
  TypeAny,
  TypeObject,
  TypeArray
} from './type';

export function number() {
  return new TypeNumber();
}

export function string() {
  return new TypeString();
}

export function boolean() {
  return new TypeBoolean();
}

export function any() {
  return new TypeAny();
}

export function object(config) {
  return new TypeObject(config);
}

export function array(itemSchema) {
  return new TypeArray(itemSchema);
}

export default {
  number,
  string,
  boolean,
  any,
  object,
  array
};
