import RestrictBase from './base';
import {
  isBoolean,
  isNotRequired,
} from '../utils/is';

export default class RestrictBooleanType extends RestrictBase {
  validate(val) {
    if (isBoolean(val) || isNotRequired(val)) {
      return true;
    }
    throw this.getError('value should be typeof boolean');
  }
}
