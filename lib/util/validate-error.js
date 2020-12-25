export default class ValidateError extends Error {
  noKeyChain = false;
  final = false;

  constructor(message, options = {}) {
    super(message);
    const {
      noKeyChain = false,
      final = false,
      custom = false,
    } = options;

    this.noKeyChain = noKeyChain;
    this.final = final;
    this.custom = custom;
  }

  toString() {
    return `Validate${super.toString()}`;
  }
}
