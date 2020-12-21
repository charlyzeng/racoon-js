import RestrictBase from './base';

export default class RestrictAnyType extends RestrictBase {
  validate() {
    return true;
  }
}
