export default class ValidateError extends Error {
  custom = false;
  final = false;

  constructor(message, options = {}) {
    super(message);
    const {
      custom = false,
      final = false,
    } = options;

    this.custom = custom;
    this.final = final;
  }

  toString() {
    return `Validate${super.toString()}`;
  }
}
