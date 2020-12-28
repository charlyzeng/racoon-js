import data from './data.json';

export function getArray() {
  return JSON.parse(JSON.stringify(data));
}

export function getObject(index = 0, keys) {
  const object = JSON.parse(JSON.stringify(data[index]));
  if (keys) {
    const obj = {};
    keys.forEach((key) => {
      obj[key] = object[key];
    });
    return obj;
  }
  return object;
}
