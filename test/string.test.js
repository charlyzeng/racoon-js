/* eslint-disable no-plusplus */
import { expect } from 'chai';
import racoon from '../lib';

describe('`string` function test', () => {
  it('should restrict the basic type', () => {
    const schema = racoon.string();
    expect(schema.validate('abc')).to.eq('abc');
    expect(() => schema.validate(1)).to.throw('value should be typeof string');
  });

  it('should restrict the basic type and accept custom error', () => {
    const schema = racoon.string('custom error');
    expect(schema.validate('abc')).to.eq('abc');
    expect(() => schema.validate(1)).to.throw(/^custom error$/);
  });

  it('`enum` should restrict the enum type', () => {
    const schema = racoon.string().enum('a', 'b', 'c');
    expect(schema.validate('b')).to.eq('b');
    expect(() => schema.validate('d')).to.throw('value should be one of ["a","b","c"]');
  });

  it('`enum` should restrict the enum type and accept custom error', () => {
    const schema = racoon.string().enum(['a', 'b', 'c'], 'custom error');
    expect(schema.validate('b')).to.eq('b');
    expect(() => schema.validate('d')).to.throw(/^custom error$/);
  });

  it('`default` should make a default return when value is undefined/null/[EmptyString]', () => {
    const schema = racoon.string().default('default string');
    expect(schema.validate()).to.eq('default string');
    expect(schema.validate(undefined)).to.eq('default string');
    expect(schema.validate(null)).to.eq('default string');
    expect(schema.validate('')).to.eq('');
    expect(schema.validate('other string')).to.eq('other string');

    const schema2 = racoon.string().default('default string', true);
    expect(schema2.validate()).to.eq('default string');
    expect(schema2.validate(undefined)).to.eq('default string');
    expect(schema2.validate(null)).to.eq('default string');
    expect(schema2.validate('')).to.eq('default string');
    expect(schema2.validate('other string')).to.eq('other string');

    let couter = 0;
    const schema3 = racoon.string().default((val) => `${val}:${++couter}`, true);
    expect(schema3.validate()).to.eq('undefined:1');
    expect(schema3.validate(undefined)).to.eq('undefined:2');
    expect(schema3.validate(null)).to.eq('null:3');
    expect(schema3.validate('')).to.eq(':4');
    expect(schema3.validate('other string')).to.eq('other string');
  });

  it('`format` should set return value formatter', () => {
    const schema = racoon.string().format(str => `#${str}`);
    expect(schema.validate('str')).to.be.eq('#str');
    expect(schema.validate()).to.be.eq('#undefined');
    expect(schema.validate(undefined)).to.be.eq('#undefined');
    expect(schema.validate(null)).to.be.eq('#null');

    const schema2 = racoon.string().default('default str').format(str => `#${str}`);
    expect(schema2.validate('str')).to.be.eq('#str');
    expect(schema2.validate()).to.be.eq('#default str');
    expect(schema2.validate(undefined)).to.be.eq('#default str');
    expect(schema2.validate(null)).to.be.eq('#default str');
    expect(schema2.validate('')).to.be.eq('#');

    const schema3 = racoon.string().default('default str', true).format(str => `#${str}`);
    expect(schema3.validate('')).to.be.eq('#default str');
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

  it('`min` restrict the min length of string and accept custom error', () => {
    const schema1 = racoon.string().min(3, 'custom error 1');
    expect(schema1.validate('abc')).to.eq('abc');
    expect(schema1.validate('abcd')).to.eq('abcd');
    expect(() => schema1.validate('ab')).to.throw(/^custom error 1$/);

    const schema2 = racoon.string().min(3, true, 'custom error 2');
    expect(schema2.validate('abc')).to.eq('abc');
    expect(schema2.validate('abcd')).to.eq('abcd');
    expect(() => schema2.validate('ab')).to.throw(/^custom error 2$/);

    const schema3 = racoon.string().min(3, false, 'custom error 3');
    expect(schema3.validate('abcd')).to.eq('abcd');
    expect(() => schema3.validate('abc')).to.throw(/^custom error 3$/);
    expect(() => schema3.validate('ab')).to.throw(/^custom error 3$/);
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

  it('`max` restrict the max length of string and accept custom error', () => {
    const schema1 = racoon.string().max(3, 'custom error 1');
    expect(schema1.validate('ab')).to.eq('ab');
    expect(schema1.validate('abc')).to.eq('abc');
    expect(() => schema1.validate('abcd')).to.throw(/^custom error 1$/);

    const schema2 = racoon.string().max(3, true, 'custom error 2');
    expect(schema2.validate('ab')).to.eq('ab');
    expect(schema2.validate('abc')).to.eq('abc');
    expect(() => schema2.validate('abcd')).to.throw(/^custom error 2$/);

    const schema3 = racoon.string().max(3, false, 'custom error 3');
    expect(schema3.validate('ab')).to.eq('ab');
    expect(() => schema3.validate('abc')).to.throw(/^custom error 3$/);
    expect(() => schema3.validate('abcd')).to.throw(/^custom error 3$/);
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
