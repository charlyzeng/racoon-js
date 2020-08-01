import { expect } from 'chai';
import racoon from '../lib';

describe('`string` function test', () => {
  it('should restrict the basic type', () => {
    const schema = racoon.string();
    expect(schema.validate('abc')).to.eq('abc');
    expect(() => schema.validate(1)).to.throw('value should be typeof string');
  });

  it('`min` restrict the min length of string', () => {
    const schema = racoon.string().min(3);
    expect(schema.validate('abc')).to.eq('abc');
    expect(schema.validate('abcd')).to.eq('abcd');
    expect(() => schema.validate('ab')).to.throw('value length should greater than or equal 3');

    const schema2 = racoon.string().min(3, false);
    expect(() => schema2.validate('abc')).to.throw('value length should greater than 3');
    expect(schema2.validate('abcd')).to.eq('abcd');
  });

  it('`max` restrict the max length of string', () => {
    const schema = racoon.string().max(3);
    expect(schema.validate('abc')).to.eq('abc');
    expect(schema.validate('ab')).to.eq('ab');
    expect(() => schema.validate('abcd')).to.throw('value length should less than or equal 3');

    const schema2 = racoon.string().max(3, false);
    expect(() => schema2.validate('abc')).to.throw('value length should less than 3');
    expect(schema2.validate('ab')).to.eq('ab');
  });

  it('`pattern` restrict string by RegExp', () => {
    const reg = /^\d+(\.(\d)+)?$/;
    const schema = racoon.string().pattern(reg);
    expect(schema.validate('12.00')).to.eq('12.00');
    expect(schema.validate('0.01')).to.eq('0.01');
    expect(() => schema.validate('12.a')).to.throw('value should match pattern');
  });

  it('`required` should restrict data is required', () => {
    const schema = racoon.string().required();
    expect(schema.validate('test')).to.eq('test');
    expect(() => schema.validate()).to.throw('value is required and should not be undefined/null');
    expect(() => schema.validate(undefined)).to.throw('value is required and should not be undefined/null');
    expect(() => schema.validate(null)).to.throw('value is required and should not be undefined/null');

    const schema2 = racoon.string().required(true);
    expect(() => schema2.validate('')).to.throw('value is required and should not be empty');
  });

  it('`custom` should restrict by user custom function', () => {
    const schema = racoon.string().custom((val) => {
      if (val.startsWith('ab')) {
        return true;
      }
      throw new Error('value should starts with "ab"');
    });
    expect(schema.validate('ab')).to.eq('ab');
    expect(schema.validate('abc')).to.eq('abc');
    expect(() => schema.validate('bc')).to.throw('value should starts with "ab"');
  });

  it('complex scene 1', () => {
    const schema = racoon.string().min(2, false).max(5).required();
    expect(schema.validate('abc')).to.eq('abc');
    expect(schema.validate('abcd')).to.eq('abcd');
    expect(schema.validate('abcde')).to.eq('abcde');
    expect(() => schema.validate('abcdef')).to.throw('value length should less than or equal 5');
    expect(() => schema.validate('ab')).to.throw('value length should greater than 2');
    expect(() => schema.validate()).to.throw('value is required and should not be undefined/null');
  });
});
