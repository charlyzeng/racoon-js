import {
  SchemaAny,
  SchemaNumber,
  SchemaString,
  SchemaBoolean,
  SchemaObject,
  SchemaArray,
} from './schema';

export function any() {
  return new SchemaAny();
}

export function number() {
  return new SchemaNumber();
}

export function string() {
  return new SchemaString();
}

export function boolean() {
  return new SchemaBoolean();
}

export function object(config) {
  return new SchemaObject(config);
}

export function array(itemSchema) {
  return new SchemaArray(itemSchema);
}

export default {
  any,
  number,
  string,
  boolean,
  object,
  array,
};
