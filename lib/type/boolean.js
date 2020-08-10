import { TYPE } from '../utils/constants';
import RestrictBooleanType from '../restricts/boolean-type';
import RestrictEnum from '../restricts/enum';
import TypeBase from './base';

export default class TypeBoolean extends TypeBase {
  type = TYPE;

  constructor() {
    super();
    this.typeRestrict = new RestrictBooleanType();
    this.currentRestrict = this.typeRestrict;
  }

  enum(...values) {
    const restrict = new RestrictEnum(...values);
    this.restricts.push(restrict);
    this.currentRestrict = restrict;
    return this;
  }
}
