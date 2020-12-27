import arrayData from './data/array.json';

export function getArray() {
  return JSON.parse(JSON.stringify(arrayData));
}
