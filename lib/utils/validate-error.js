export default class ValidateError extends Error {
  get [Symbol.toStringTag]() {
    return 'ValidateError';
  }

  toString() {
    return `Validate${super.toString()}`;
  }
}
