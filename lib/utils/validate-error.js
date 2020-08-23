export default class ValidateError extends Error {
  noKeyChain = false;
  final = false;

  constructor(message, options = {}) {
    super(message);
    const {
      noKeyChain = false,
      final = false
    } = options;
    this.noKeyChain = noKeyChain;
    this.final = final;
  }

  toString() {
    return `Validate${super.toString()}`;
  }
}
