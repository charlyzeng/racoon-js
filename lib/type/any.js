import { TYPE } from '../utils/constants';
import RestrictAnyType from '../restricts/any-type';
import RestrictEnum from '../restricts/enum';
import TypeBase from './base';

export default class TypeAny extends TypeBase {
  type = TYPE.any;

  constructor() {
    super();
    this.typeRestrict = new RestrictAnyType();
    this.currentRestrict = this.typeRestrict;
  }

  enum(...values) {
    const restrict = new RestrictEnum(...values);
    this.restricts.push(restrict);
    this.currentRestrict = restrict;
    return this;
  }
}
