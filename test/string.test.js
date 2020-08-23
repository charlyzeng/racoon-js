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
    const schema = racoon.string().error('custom error');
    expect(schema.validate('abc')).to.eq('abc');
    expect(() => schema.validate(1)).to.throw(/^custom error$/);
  });

  it('`enum` should restrict the enum type', () => {
    const schema = racoon.string().enum('a', 'b', 'c');
    expect(schema.validate('b')).to.eq('b');
    expect(() => schema.validate('d')).to.throw('value should be one of ["a","b","c"]');
  });

  it('`enum` should restrict the enum type accept custom error', () => {
    const schema = racoon.string().enum('a', 'b', 'c').error('custom error');
    expect(schema.validate('b')).to.eq('b');
    expect(() => schema.validate('d')).to.throw(/^custom error$/);
  });

  it('`default` should deny empty arguments', () => {
    expect(() => racoon.string().default()).to.throw('`default` args can not be empty');
  });

  it('`default` should make a default return when value is undefined/null/[EmptyString]', () => {
    const schema1 = racoon.string().default('default string');
    expect(schema1.validate()).to.eq('default string');
    expect(schema1.validate(undefined)).to.eq('default string');
    expect(schema1.validate(null)).to.eq('default string');
    expect(schema1.validate('')).to.eq('');
    expect(schema1.validate('other string')).to.eq('other string');

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

  it('`format` should deny non-function arguments', () => {
    expect(() => racoon.string().format([])).to.throw('`format` argument should be a function');
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

  it('`min` should deny non-number param', () => {
    expect(() => racoon.string().min('1.0')).to.throw('`min` should be a number');
  });

  it('`min` restrict the min length of string', () => {
    const schema1 = racoon.string().min(3);
    expect(schema1.validate('abc')).to.eq('abc');
    expect(schema1.validate('abcd')).to.eq('abcd');
    expect(() => schema1.validate('ab')).to.throw('value length should greater than or equal 3');

    const schema2 = racoon.string().min(3, false);
    expect(() => schema2.validate('abc')).to.throw('value length should greater than 3');
    expect(schema2.validate('abcd')).to.eq('abcd');
  });

  it('`min` restrict the min length of string and accept custom error', () => {
    const schema1 = racoon.string().min(3).error('custom error 1');
    expect(schema1.validate('abc')).to.eq('abc');
    expect(schema1.validate('abcd')).to.eq('abcd');
    expect(() => schema1.validate('ab')).to.throw(/^custom error 1$/);

    const schema2 = racoon.string().min(3, false).error('custom error 2');
    expect(schema2.validate('abcd')).to.eq('abcd');
    expect(() => schema2.validate('abc')).to.throw(/^custom error 2$/);
  });

  it('`max` should deny non-number param', () => {
    expect(() => racoon.string().max('1.0')).to.throw('`max` should be typeof number');
  });

  it('`max` restrict the max length of string', () => {
    const schema1 = racoon.string().max(3);
    expect(schema1.validate('abc')).to.eq('abc');
    expect(schema1.validate('ab')).to.eq('ab');
    expect(() => schema1.validate('abcd')).to.throw('value length should less than or equal 3');

    const schema2 = racoon.string().max(3, false);
    expect(() => schema2.validate('abc')).to.throw('value length should less than 3');
    expect(schema2.validate('ab')).to.eq('ab');
  });

  it('`max` restrict the max length of string and accept custom error', () => {
    const schema1 = racoon.string().max(3).error('custom error 1');
    expect(schema1.validate('abc')).to.eq('abc');
    expect(schema1.validate('ab')).to.eq('ab');
    expect(() => schema1.validate('abcd')).to.throw(/^custom error 1$/);

    const schema2 = racoon.string().max(3, false).error('custom error 2');
    expect(schema2.validate('ab')).to.eq('ab');
    expect(() => schema2.validate('abc')).to.throw(/^custom error 2$/);
  });

  it('`pattern` should deny non-regexp param', () => {
    expect(() => racoon.string().pattern([])).to.throw('pattern should be a RegExp');
  });

  it('`pattern` should restrict string by RegExp', () => {
    const schema = racoon.string().pattern(/^\d{4}-\d{2}-\d{2}$/);
    expect(schema.validate('2020-02-12')).to.eq('2020-02-12');
    expect(() => schema.validate('2020-2-12')).to.throw(`value should match pattern ${/^\d{4}-\d{2}-\d{2}$/.toString()}`);
  });

  it('`required` should restrict data is required', () => {
    const schema1 = racoon.string().required();
    expect(schema1.validate('test')).to.eq('test');
    expect(() => schema1.validate()).to.throw('value is required and should not be undefined/null');
    expect(() => schema1.validate(undefined)).to.throw('value is required and should not be undefined/null');
    expect(() => schema1.validate(null)).to.throw('value is required and should not be undefined/null');

    const schema2 = racoon.string().required(true);
    expect(() => schema2.validate('')).to.throw('value is required and should not be empty');
  });

  it('`required` should restrict data is required and accept custom error', () => {
    const schema1 = racoon.string().required().error('custom error');
    expect(schema1.validate('test')).to.eq('test');
    expect(() => schema1.validate()).to.throw(/^custom error$/);
    expect(() => schema1.validate(undefined)).to.throw(/^custom error$/);
    expect(() => schema1.validate(null)).to.throw(/^custom error$/);

    const schema2 = racoon.string().required(true).error('custom error 2');
    expect(() => schema2.validate('')).to.throw(/^custom error 2$/);
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

  it('complex scene 2', () => {
    const schema = racoon
      .string()
      .error('error1')
      .min(2, false)
      .error('error2')
      .max(5)
      .error('error3')
      .required(true)
      .error('error4')
      .custom((val) => {
        if (val === '12345') {
          throw new Error('e');
        }
        return true;
      })
      .error('error5');

    expect(schema.validate('abcde')).to.eq('abcde');
    expect(() => schema.validate(1)).to.throw('error1');
    expect(() => schema.validate('ab')).to.throw('error2');
    expect(() => schema.validate('abcdef')).to.throw('error3');
    expect(() => schema.validate('')).to.throw('error4');
    expect(() => schema.validate('12345')).to.throw('error5');
  });

  it('complex scene 3', () => {
    const schema = racoon
      .string()
      .min(2, false)
      .error('error2')
      .max(5)
      .error('error3')
      .required(true)
      .custom((val) => {
        if (val === '12345') {
          throw new Error('e');
        }
        return true;
      })
      .errorForAll('error for all');

    expect(schema.validate('abcde')).to.eq('abcde');
    expect(() => schema.validate(1)).to.throw('error for all');
    expect(() => schema.validate('ab')).to.throw('error2');
    expect(() => schema.validate('abcdef')).to.throw('error3');
    expect(() => schema.validate('')).to.throw('error for all');
    expect(() => schema.validate('12345')).to.throw('error for all');
  });
});
