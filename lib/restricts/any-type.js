/**
 * 限制被检测数据为`any`类型，也就是不限制类型，
 * 因此，`validate`方法总是返回`true`.
 */

import RestrictBase from './base';

export default class RestrictAnyType extends RestrictBase {
  validate() {
    return true;
  }
}
