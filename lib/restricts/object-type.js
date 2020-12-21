import RestrictBase from './base';
import {
  isObject,
  isUndefined,
  isNull,
} from '../utils/is';

export default class RestrictObjectType extends RestrictBase {
  validate(val) {
    if (isObject(val) || isUndefined(val) || isNull(val)) {
      return true;
    }
    throw this.getError('value should be typeof object');
  }
}
