import RestrictBase from './base';
import { isInt } from '../utils/is';

export default class RestrictNumberInt extends RestrictBase {
  validate(val) {
    if (isInt(val)) {
      return true;
    }
    throw this.getError('value should be an int');
  }
}
