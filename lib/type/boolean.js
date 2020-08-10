import { TYPE } from '../utils/constants';
import RestrictBooleanType from '../restricts/boolean-type';
import RestrictEnum from '../restricts/enum';
import TypeBase from './base';

export default class TypeBoolean extends TypeBase {
  type = TYPE;

  constructor() {
    super();
    this.typeRestrict = new RestrictBooleanType();
  }

  enum(...values) {
    this.restricts.push(new RestrictEnum(...values));
    return this;
  }
}
