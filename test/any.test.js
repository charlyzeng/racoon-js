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

  it('`enum` should restrict enum type', () => {
    const schema = racoon.any().enum([1, 'abc', false]).required();
    expect(schema.validate(1)).to.eq(1);
    expect(schema.validate('abc')).to.eq('abc');
    expect(schema.validate(false)).to.be.false;
    expect(() => schema.validate(3)).to.throw('value should be one of [1,"abc",false]');
  });

  it('`enum` should restrict the enum type and accept custom error', () => {
    const schema = racoon.any().enum([1, 'abc', false], 'custom error').required();
    expect(schema.validate(1)).to.eq(1);
    expect(schema.validate('abc')).to.eq('abc');
    expect(schema.validate(false)).to.be.false;
    expect(() => schema.validate(3)).to.throw(/^custom error$/);
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
    expect(schema.validate(NaN)).to.be.NaN;
    expect(schema.validate(false)).to.be.false;
    expect(schema.validate(0)).to.eq(0);
    expect(schema.validate('')).to.eq('');
    expect(() => schema.validate(undefined)).to.throw('value is required and should not be undefined/null');
    expect(() => schema.validate(null)).to.throw('value is required and should not be undefined/null');
    const schema2 = racoon.any().required(true);
    expect(() => schema2.validate({})).to.throw('value is required and should not be empty');
    expect(() => schema2.validate([])).to.throw('value is required and should not be empty');
    expect(() => schema2.validate('')).to.throw('value is required and should not be empty');
    expect(() => schema2.validate(false)).to.throw('value is required and should not be empty');
    expect(() => schema2.validate(NaN)).to.throw('value is required and should not be empty');
    expect(() => schema2.validate(0)).to.throw('value is required and should not be empty');
  });
});
