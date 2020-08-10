import RestrictBase from './base';

export default class RestrictBooleanType extends RestrictBase {
  validate(val) {
    return true;
  }
}
