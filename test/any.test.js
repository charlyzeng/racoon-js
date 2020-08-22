import { expect } from 'chai';
import racoon from '../lib';

describe('`any` function test', () => {
  it('should accept any type data', () => {
    const schema = racoon.any();
    expect(schema.validate()).to.be.undefined;
    expect(schema.validate(null)).to.be.null;
    expect(schema.validate(NaN)).to.be.NaN;
    expect(schema.validate(1)).to.eq(1);
    expect(schema.validate(2.2)).to.eq(2.2);
    expect(schema.validate('abc')).to.eq('abc');

    const emptyObj = {};
    expect(schema.validate(emptyObj)).to.eq(emptyObj);
    const emptyArray = [];
    expect(schema.validate(emptyArray)).to.eq(emptyArray);
    const obj = {
      prop1: 1,
      prop2: [
        {
          prop3: 2,
          prop4: {
            prop5: [1, { a: 'a', b: 'b' }]
          }
        }
      ]
    };
    const clone = JSON.parse(JSON.stringify(obj));
    expect(schema.validate(obj)).to.deep.eq(clone);
  });

  it('should accept any type data and accept custom error', () => {
    const schema = racoon.any().error('custom error');
    expect(schema.validate(1)).to.be.eq(1);
  });

  it('`enum` should restrict enum type and accept custom error', () => {
    const schema = racoon.any().enum(1, 'abc', false);
    expect(schema.validate(1)).to.eq(1);
    expect(schema.validate('abc')).to.eq('abc');
    expect(schema.validate(false)).to.be.false;
    expect(() => schema.validate(3)).to.throw('value should be one of [1,"abc",false]');

    schema.error('custom error');
    expect(() => schema.validate(3)).to.throw(/^custom error$/);
  });

  it('`enum` should restrict enum type and accept custom error', () => {
    const schema = racoon.any().enum(1, 'abc', false).error('custom error');
    expect(schema.validate(1)).to.eq(1);
    expect(schema.validate('abc')).to.eq('abc');
    expect(schema.validate(false)).to.be.false;
    expect(() => schema.validate(3)).to.throw(/^custom error$/);
  });

  it('`required` restrict data is required', () => {
    const schema1 = racoon.any().required();
    expect(schema1.validate(false)).to.be.false;
    expect(schema1.validate(0)).to.eq(0);
    expect(schema1.validate('')).to.eq('');
    expect(() => schema1.validate(NaN)).to.throw('value is required and should not be undefined/null/NaN');
    expect(() => schema1.validate(undefined)).to.throw('value is required and should not be undefined/null/NaN');
    expect(() => schema1.validate(null)).to.throw('value is required and should not be undefined/null/NaN');

    const schema2 = racoon.any().required(true);
    expect(schema2.validate(false)).to.be.false;
    expect(schema2.validate(0)).to.eq(0);
    expect(() => schema2.validate({})).to.throw('value is required and should not be empty');
    expect(() => schema2.validate([])).to.throw('value is required and should not be empty');
    expect(() => schema2.validate('')).to.throw('value is required and should not be empty');
    expect(() => schema2.validate(NaN)).to.throw('value is required and should not be empty');
  });

  it('`required` restrict data is required and accept custom data', () => {
    const schema1 = racoon.any().required().error('custom error 1');
    expect(schema1.validate(false)).to.be.false;
    expect(schema1.validate(0)).to.eq(0);
    expect(schema1.validate('')).to.eq('');
    expect(() => schema1.validate(NaN)).to.throw(/^custom error 1$/);
    expect(() => schema1.validate(undefined)).to.throw(/^custom error 1$/);
    expect(() => schema1.validate(null)).to.throw(/^custom error 1$/);

    const schema2 = racoon.any().required(true).error('custom error 2');
    expect(schema2.validate(1)).to.be.eq(1);
    expect(schema2.validate(false)).to.be.false;
    expect(schema2.validate(0)).to.eq(0);
    expect(() => schema2.validate({})).to.throw(/^custom error 2$/);
    expect(() => schema2.validate([])).to.throw(/^custom error 2$/);
    expect(() => schema2.validate('')).to.throw(/^custom error 2$/);
    expect(() => schema2.validate(NaN)).to.throw(/^custom error 2$/);
  });

  it('`custom` should restrict with custom function', () => {
    const schema = racoon.any().custom((val) => {
      if (val % 2 === 0) {
        return true;
      }
      throw new Error('odd error');
    });
    expect(schema.validate(6)).to.eq(6);
    expect(() => schema.validate(3)).to.throw('odd error');
  });

  it('`custom` should restrict with custom function and accept custom error', () => {
    const schema = racoon.any().custom((val) => {
      if (val % 2 === 0) {
        return true;
      }
      throw new Error('odd error');
    }).error('custom error');
    expect(schema.validate(6)).to.eq(6);
    expect(() => schema.validate(3)).to.throw('custom error');
  });

  it('`default` should make a default return when value is undefined/null', () => {
    const schema1 = racoon.any().default(100);
    expect(schema1.validate(12)).to.eq(12);
    expect(schema1.validate()).to.eq(100);
    expect(schema1.validate(undefined)).to.eq(100);
    expect(schema1.validate(null)).to.eq(100);

    const schema2 = racoon.any().default('string');
    expect(schema2.validate(12)).to.eq(12);
    expect(schema2.validate('')).to.eq('');
    expect(schema2.validate({})).to.deep.eq({});
    expect(schema2.validate([])).to.deep.eq([]);
    expect(schema2.validate()).to.eq('string');
    expect(schema2.validate(undefined)).to.eq('string');
    expect(schema2.validate(null)).to.eq('string');
    expect(schema2.validate(NaN)).to.eq('string');

    const schema3 = racoon.any().default('string', true);
    expect(schema3.validate(12)).to.eq(12);
    expect(schema3.validate('')).to.eq('string');
    expect(schema3.validate({})).to.eq('string');
    expect(schema3.validate([])).to.eq('string');
    expect(schema3.validate()).to.eq('string');
    expect(schema3.validate(undefined)).to.eq('string');
    expect(schema3.validate(null)).to.eq('string');
    expect(schema3.validate(NaN)).to.eq('string');
  });

  it('`format` should set return value formatter', () => {
    const schema = racoon.any().format((val) => val + 1);
    expect(schema.validate(1)).to.be.eq(2);
  });

  it('complex scene 1', () => {
    const schema = racoon
      .any()
      .error('error1')
      .enum(1, 2, 3)
      .error('error2')
      .custom((val) => {
        if (val % 2 === 1) {
          return true;
        }
        throw new Error('even error');
      })
      .required(true)
      .error('error4');
    expect(schema.validate(1)).to.be.eq(1);
    expect(() => schema.validate(5)).to.throw(/^error2$/);
    expect(() => schema.validate(null)).to.throw(/^error4$/);
    expect(() => schema.validate(2)).to.throw(/^even error$/);
  });

  it('complex scene 2', () => {
    const schema = racoon
      .any()
      .error('error1')
      .enum(1, 2, 3)
      .error('error2')
      .custom((val) => {
        if (val % 2 === 1) {
          return true;
        }
        throw new Error('even error');
      })
      .error('error3')
      .required(true)
      .error('error4');
    expect(schema.validate(1)).to.be.eq(1);
    expect(() => schema.validate(5)).to.throw(/^error2$/);
    expect(() => schema.validate(null)).to.throw(/^error4$/);
    expect(() => schema.validate(2)).to.throw(/^error3$/);
  });
});
