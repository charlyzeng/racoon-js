import { TYPE } from '../utils/constants';
import RestrictAnyType from '../restricts/any-type';
import RestrictEnum from '../restricts/enum';
import TypeBase from './base';

export default class TypeAny extends TypeBase {
  type = TYPE.any;

  constructor() {
    super();
    this.typeRestrict = new RestrictAnyType();
  }

  enum(...values) {
    this.restricts.push(new RestrictEnum(...values));
    return this;
  }
}
