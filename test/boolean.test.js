import { expect } from 'chai';
import racoon from '../lib';

describe('`boolean` function test', () => {
  it('should restrict the basic type', () => {
    const schema = racoon.boolean();
    expect(schema.validate(true)).to.be.true;
    expect(schema.validate(false)).to.be.false;
    expect(() => schema.validate(1)).to.throw('value should be typeof boolean');
  });

  it('`custom` should restrict by user custom function', () => {
    const schema = racoon.boolean().custom((val) => {
      if (val === false) {
        return true;
      }
      throw new Error('value should can be false');
    });
    expect(schema.validate(false)).to.be.false;
    expect(() => schema.validate(true)).to.throw('value should can be false');
  });

  it('complex scene 1', () => {
    const schema = racoon.boolean().required();
    expect(schema.validate(true)).to.be.true;
    expect(schema.validate(false)).to.be.false;
    expect(() => schema.validate(undefined)).to.throw('value is required and should not be undefined/null');
    expect(() => schema.validate(null)).to.throw('value is required and should not be undefined/null');
  });
});
