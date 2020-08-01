import { isInt } from '../utils/is';
import ValidateError from '../utils/validate-error';

export default class RestrictNumberInt {
  validate(val) {
    if (isInt(val)) {
      return true;
    }
    throw new ValidateError('value should be an int');
  }
}
