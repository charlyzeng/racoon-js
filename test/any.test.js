import { expect } from 'chai';
import racoon from '../lib';

describe('`any` function test', () => {
  it('should accept any type of data', () => {
    const schema = racoon.any();
    expect(schema.validate()).to.be.undefined;
    expect(schema.validate(null)).to.be.null;
    expect(schema.validate(NaN)).to.be.NaN;
    expect(schema.validate(1)).to.eq(1);
    expect(schema.validate(2.2)).to.eq(2.2);
    expect(schema.validate('abc')).to.eq('abc');
    const obj = {
      prop1: 1,
      prop2: [
        {
          prop3: 2,
          prop4: {
            prop5: []
          }
        }
      ]
    };
    const clone = JSON.parse(JSON.stringify(obj));
    expect(schema.validate(obj)).to.deep.eq(clone);
  });

  it('`default` should make a default return when value is undefined/null', () => {
    const schema = racoon.any().default(100);
    expect(schema.validate()).to.eq(100);
    expect(schema.validate(undefined)).to.eq(100);
    expect(schema.validate(null)).to.eq(100);

    const schema2 = racoon.any().default('string');
    expect(schema2.validate()).to.eq('string');
    expect(schema2.validate(undefined)).to.eq('string');
    expect(schema2.validate(null)).to.eq('string');
  });

  it('`required` restrict data is required', () => {
    const schema = racoon.any().required();
    expect(() => schema.validate(undefined)).to.throw('value is required and should not be undefined/null');
    const schema2 = racoon.any().required(true);
    expect(() => schema2.validate({})).to.throw('value is required and should not be empty');
    expect(() => schema2.validate([])).to.throw('value is required and should not be empty');
    expect(() => schema2.validate('')).to.throw('value is required and should not be empty');
  });
});
