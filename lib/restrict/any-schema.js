/**
 * Restrict value to be any type, which means that it will not
 * restrict the type of value. So, the validate method return
 * true always.
 */

import RestrictBase from './base';

export default class RestrictAnySchema extends RestrictBase {
  validate() {
    return true;
  }
}
