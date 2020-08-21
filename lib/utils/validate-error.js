export default class ValidateError extends Error {
  constructor(message, noKeyChain = false) {
    super(message);
    this.noKeyChain = noKeyChain;
  }

  toString() {
    return `Validate${super.toString()}`;
  }
}
