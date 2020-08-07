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

export function array(itemConfig) {
  return new TypeArray(itemConfig);
}

export default {
  number,
  string,
  boolean,
  any,
  object,
  array
};
