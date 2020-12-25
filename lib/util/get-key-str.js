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
