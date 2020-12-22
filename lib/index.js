import {
  SchemaNumber,
  SchemaString,
  SchemaBoolean,
  SchemaAny,
  SchemaObject,
  SchemaArray,
} from './schema';

export function number() {
  return new SchemaNumber();
}

export function string() {
  return new SchemaString();
}

export function boolean() {
  return new SchemaBoolean();
}

export function any() {
  return new SchemaAny();
}

export function object(config) {
  return new SchemaObject(config);
}

export function array(itemSchema) {
  return new SchemaArray(itemSchema);
}

export default {
  number,
  string,
  boolean,
  any,
  object,
  array,
};
