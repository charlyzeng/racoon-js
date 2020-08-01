import {
  isBoolean,
  isNotRequired
} from '../utils/is';
import { TYPE } from '../utils/constants';
import ValidateError from '../utils/validate-error';
import TypeBase from './base';

export default class TypeBoolean extends TypeBase {
  type = TYPE;

  checkType(val) {
    if (isBoolean(val) || isNotRequired(val)) {
      return true;
    }
    throw new ValidateError('value should be typeof boolean');
  }
}
