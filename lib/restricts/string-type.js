import RestrictBase from './base';
import {
  isString,
  isNotRequired,
} from '../utils/is';

export default class RestrictStringType extends RestrictBase {
  validate(val) {
    if (isString(val) || isNotRequired(val)) {
      return true;
    }
    throw this.getError('value should be typeof string');
  }
}
