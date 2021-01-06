/**
 * Get key chain string.
 * @example
 * const keyChainStr = getKeyStr([
 *   {
 *     type: 'prop',
 *     key: 'peoples',
 *   },
 *   {
 *     type: 'index',
 *     key: 2,
 *   },
 *   {
 *     type: 'prop',
 *     key: 'friend',
 *   },
 *   {
 *     type: 'prop',
 *     key: 'first name',
 *   },
 * ]);
 * assert(keyChainStr === 'peoples[0].friend[\'first name\']');
 *
 * @param {Array} keyChain Key chain list.
 */
export default function getKeyStr(keyChain) {
  const propReg = /^[_$a-z][_$a-z\d]*$/i;
  let result = '';

  keyChain.forEach(({ type, key }) => {
    if (type === 'prop' && propReg.test(key)) {
      if (result) {
        result += `.${key}`;
      } else {
        result += key;
      }
    } else if (type === 'prop') {
      result += `['${key}']`;
    } else if (type === 'index') {
      result += `[${key}]`;
    }
  });

  return result;
}
