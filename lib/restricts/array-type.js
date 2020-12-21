import RestrictBase from './base';
import {
  isArray,
  isUndefined,
  isNull,
} from '../utils/is';

export default class RestrictArrayType extends RestrictBase {
  validate(val) {
    if (isArray(val) || isUndefined(val) || isNull(val)) {
      return true;
    }
    throw this.getError('value should be typeof array');
  }
}
