export default class ValidateError extends Error {
  toString() {
    return `Validate${super.toString()}`;
  }
}
