/* eslint-disable no-plusplus */
import { expect } from 'chai';
import racoon from '../lib';

describe('schema#string', () => {
  describe('should restrict the detected value to be a type of string', () => {
    it('without custom error', () => {
      const schema = racoon.string();

      expect(schema.validate('abc')).to.eq('abc');
      expect(() => schema.validate(1)).to.throw('value should be a type of string');
    });

    it('with custom error', () => {
      const schema = racoon.string().error('custom error');

      expect(schema.validate('abc')).to.eq('abc');
      expect(() => schema.validate(1)).to.throw('custom error');
    });
  });

  describe('`enum` should restrict enum type', () => {
    it('should deny empty arguments', () => {
      expect(() => racoon.string().enum()).to.throw('enum arguments should not be empty');
    });

    it('without custom error', () => {
      const schema = racoon.string().enum('a', 'b');

      expect(schema.validate('a')).to.eq('a');
      expect(() => schema.validate('c')).to.throw('value should be one of ["a","b"]');
    });

    it('with custom error', () => {
      const schema = racoon
        .string()
        .enum('a', 'b')
        .error('custom error');

      expect(schema.validate('b')).to.eq('b');
      expect(() => schema.validate('c')).to.throw('custom error');
    });
  });

  describe('`default` should make an default return when value is emtpy', () => {
    it('should deny empty arguments', () => {
      expect(() => racoon.string().default()).to.throw('default arguments should not be empty');
    });

    describe('should make an default return val', () => {
      it('non-strict mode', () => {
        const schema = racoon.string().default('abc');

        expect(schema.validate(undefined)).to.eq('abc');
        expect(schema.validate(null)).to.eq('abc');
        expect(schema.validate('')).to.eq('');
      });

      it('strict mode', () => {
        const schema = racoon.string().default('abc', true);

        expect(schema.validate(undefined)).to.eq('abc');
        expect(schema.validate(null)).to.eq('abc');
        expect(schema.validate('')).to.eq('abc');
      });
    });
  });

  describe('`format` should format the final return value', () => {
    it('should deny empty non-function param', () => {
      expect(() => racoon.string().format('abc')).to.throw('`formatter` should be a type of function');
    });

    it('without default return value', () => {
      const schema = racoon.string().format(val => `${val}:abc`);

      expect(schema.validate(null)).to.eq('null:abc');
      expect(schema.validate('123')).to.eq('123:abc');
    });

    it('with default return value', () => {
      const schema = racoon
        .string()
        .default('ABC')
        .format(val => `${val}:abc`);

      expect(schema.validate(null)).to.eq('ABC:abc');
      expect(schema.validate('123')).to.eq('123:abc');
    });
  });

  describe('`min` should restrict the min length of string', () => {
    it('should deny non-number param', () => {
      expect(() => racoon.string().min('abc')).to.throw('`min` should be a type of number');
    });

    it('closed interval', () => {
      const schema = racoon.string().min(3);
      const errorMsg = 'value length should be greater than or equal to 3';

      expect(schema.validate('abc')).to.eq('abc');
      expect(() => schema.validate('ab')).to.throw(errorMsg);
    });

    it('opened interval', () => {
      const schema = racoon.string().min(3, false);
      const errorMsg = 'value length should greater than 3';

      expect(schema.validate('abcd')).to.eq('abcd');
      expect(() => schema.validate('abc')).to.throw(errorMsg);
    });

    it('should accept custom error', () => {
      const schema = racoon
        .string()
        .min(3)
        .error('custom error');

      expect(schema.validate('abc')).to.eq('abc');
      expect(() => schema.validate('ab')).to.throw('custom error');
    });
  });

  describe('`max` should restrict the max length of string', () => {
    it('should deny non-number param', () => {
      expect(() => racoon.string().max('abc')).to.throw('`max` should be a type of number');
    });

    it('closed interval', () => {
      const schema = racoon.string().max(3);
      const errorMsg = 'value length should be less than or equal to 3';

      expect(schema.validate('abc')).to.eq('abc');
      expect(schema.validate('abc')).to.eq('abc');
      expect(() => schema.validate('abcd')).to.throw(errorMsg);
    });

    it('opened interval', () => {
      const schema = racoon.string().max(3, false);
      const errorMsg = 'value length should be less than 3';

      expect(schema.validate('ab')).to.eq('ab');
      expect(() => schema.validate('abc')).to.throw(errorMsg);
    });

    it('should accept custom error', () => {
      const schema = racoon
        .string()
        .max(3, false)
        .error('custom error');

      expect(schema.validate('ab')).to.eq('ab');
      expect(() => schema.validate('abc')).to.throw('custom error');
    });
  });

  describe('`pattern` should restrict string format by a RegExp', () => {
    it('should deny non-regexp param', () => {
      expect(() => racoon.string().pattern([])).to.throw('pattern should be an RegExp');
    });

    it('without custom error', () => {
      const schema = racoon.string().pattern(/^\d{4}-\d{2}-\d{2}$/);
      const errorMsg = `value should match pattern ${/^\d{4}-\d{2}-\d{2}$/.toString()}`;

      expect(schema.validate('2020-02-12')).to.eq('2020-02-12');
      expect(() => schema.validate('2020-2-12')).to.throw(errorMsg);
    });

    it('with custom error', () => {
      const schema = racoon
        .string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .error('custom error');

      expect(schema.validate('2020-02-12')).to.eq('2020-02-12');
      expect(() => schema.validate('2020-2-12')).to.throw('custom error');
    });
  });

  describe('`required` should restrict value to be required', () => {
    const errorMsg = 'value is required and should not be undefined/null';

    it('non-strict mode without custom error', () => {
      const schema = racoon.string().required();

      expect(schema.validate('abc')).to.eq('abc');
      expect(() => schema.validate(undefined)).to.throw(errorMsg);
      expect(() => schema.validate(null)).to.throw(errorMsg);
    });

    it('non-strict mode with custom error', () => {
      const schema = racoon
        .string()
        .required()
        .error('custom error');

      expect(schema.validate('abc')).to.eq('abc');
      expect(() => schema.validate(undefined)).to.throw('custom error');
      expect(() => schema.validate(null)).to.throw('custom error');
    });

    it('strict mode without custom error', () => {
      const schema = racoon.string().required(true);

      expect(schema.validate('abc')).to.eq('abc');
      expect(() => schema.validate(undefined)).to.throw('value is required and should not be empty');
      expect(() => schema.validate(null)).to.throw('value is required and should not be empty');
      expect(() => schema.validate('')).to.throw('value is required and should not be empty');
    });

    it('strict mode with custom error', () => {
      const schema = racoon
        .string()
        .required(true)
        .error('custom error');

      expect(schema.validate('abc')).to.eq('abc');
      expect(() => schema.validate(undefined)).to.throw('custom error');
      expect(() => schema.validate(null)).to.throw('custom error');
      expect(() => schema.validate('')).to.throw('custom error');
    });
  });

  describe('`custom` should restrict string by a custom function', () => {
    it('should deny non-function param', () => {
      expect(() => racoon.string().custom([])).to.throw('`restrictFn` should be a type of function');
    });

    it('can throw an error', () => {
      const schema = racoon
        .string()
        .custom((val) => {
          if (val.length % 2 === 0) {
            throw new Error('custom error');
          }
        });

      expect(schema.validate('abc')).to.eq('abc');
      expect(() => schema.validate('ab')).to.throw('custom error');
    });

    it('can return a non-empty string', () => {
      const schema = racoon
        .string()
        .custom((val) => {
          if (val.length % 2 === 0) {
            return 'custom error';
          }
        });

      expect(schema.validate('abc')).to.eq('abc');
      expect(() => schema.validate('ab')).to.throw('custom error');
    });

    it('can accept custom error too', () => {
      const schema = racoon
        .string()
        .custom((val) => {
          if (val.length % 2 === 0) {
            return 'custom error';
          }
        })
        .error('custom error 2');

      expect(schema.validate('abc')).to.eq('abc');
      expect(() => schema.validate('ab')).to.throw('custom error 2');
    });
  });

  it('`error` should deny non-function and non-string param', () => {
    expect(() => racoon.string().error(1)).throw('`message` should be a type of string or function');
  });

  it('`error` should add custom error to the right restrict', () => {
    const schema = racoon
      .string()
      .error('error1')
      .min(3)
      .error('error2')
      .max(5, false)
      .error('error3')
      .pattern(/\d+/)
      .error('error4')
      .required()
      .error('error5');

    expect(schema.validate('123')).to.eq('123');
    expect(() => schema.validate(123)).to.throw('error1');
    expect(() => schema.validate('12')).to.throw('error2');
    expect(() => schema.validate('12345')).to.throw('error3');
    expect(() => schema.validate('abc')).to.throw('error4');
    expect(() => schema.validate(null)).to.throw('error5');
  });

  it('`errorForAll` should deny non-function and non-string param', () => {
    expect(() => racoon.string().errorForAll(1)).throw('`message` should be a type of string or function');
  });

  it('`errorForAll` should add custom error to all restricts when restrict has\'t custom error', () => {
    const schema = racoon
      .string()
      .error('error1')
      .min(3)
      .max(5, false)
      .error('error3')
      .pattern(/\d+/)
      .required()
      .error('error5')
      .errorForAll('error for all');

    expect(schema.validate('123')).to.eq('123');
    expect(() => schema.validate(123)).to.throw('error1');
    expect(() => schema.validate('12')).to.throw('error for all');
    expect(() => schema.validate('12345')).to.throw('error3');
    expect(() => schema.validate('abc')).to.throw('error for all');
    expect(() => schema.validate(null)).to.throw('error5');
  });

  it('`error` and `errorForAll` should accept message as a callback', () => {
    const obj = {
      getMessage(message) {
        return this.getMessagePrivate(message);
      },
      getMessagePrivate(message) {
        return `PREFIX ${message}`;
      },
    };
    const schema = racoon
      .string()
      .error(obj.getMessage, obj)
      .min(3)
      .max(5, false)
      .error('error3')
      .pattern(/\d+/)
      .required(true)
      .error('error5')
      .errorForAll(obj.getMessage, obj);

    expect(schema.validate('123')).to.eq('123');
    expect(() => schema.validate(123)).to.throw('PREFIX value should be a type of string');
    expect(() => schema.validate('12345')).to.throw('error3');
    expect(() => schema.validate('abc')).to.throw('PREFIX value should match pattern /\\d+/');
    expect(() => schema.validate(null)).to.throw('error5');
  });

  describe('`validateSilent` should work', () => {
    const schema = racoon.string().min(2);

    it('has error', () => {
      const { error } = schema.validateSilent('a');

      expect(error.message).to.eq('value length should be greater than or equal to 2');
    });

    it('has no error', () => {
      const { error, value } = schema.validateSilent('abc');

      expect(error).to.be.undefined;
      expect(value).to.eq('abc');
    });
  });
});
