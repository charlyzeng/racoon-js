import RestrictBase from './base';
import { isNaN, isNotRequired } from '../utils/is';

export default class RestrictRequired extends RestrictBase {
  validate(val) {
    if (isNotRequired(val)) {
      throw this.getError('value is required and should not be undefined/null');
    }
    if (isNaN(val)) {
      throw this.getError('value is required and should not be NaN');
    }
    return true;
  }
}
