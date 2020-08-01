import {
  TypeNumber,
  TypeString,
  // TypeBoolean,
  // TypeObject,
  // TypeArray,
  // TypeAny
} from './type';

export function number() {
  return new TypeNumber();
}

export function string() {
  return new TypeString();
}

// export function boolean() {
//   return new TypeBoolean();
// }

// export function object(config) {
//   return new TypeObject(config);
// }

// export function array() {
//   return new TypeArray();
// }

// export function any() {
//   return new TypeAny();
// }

export default {
  number,
  string,
  // boolean,
  // object,
  // array,
  // any
};
