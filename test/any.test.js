import { expect } from 'chai';
import racoon from '../lib';

describe('schema#any', () => {
  describe('should accept any type of value', () => {
    it('without custom error', () => {
      const schema = racoon.any();
      const obj = { a: 1 };
      const ary = [1, 2, 3];

      expect(schema.validate()).to.be.undefined;
      expect(schema.validate(null)).to.be.null;
      expect(schema.validate(NaN)).to.be.NaN;
      expect(schema.validate(1)).to.eq(1);
      expect(schema.validate(2.2)).to.eq(2.2);
      expect(schema.validate('abc')).to.eq('abc');

      // For reference type, it will return origin value.
      expect(schema.validate(obj)).to.eq(obj);
      expect(schema.validate(ary)).to.eq(ary);
    });

    it('with custom error', () => {
      const schema = racoon
        .any()
        .custom((value) => {
          if (value !== 1) {
            return 'custom error 1';
          }
        })
        .error('custom error 2');

      expect(schema.validate(1)).to.be.eq(1);
      expect(() => schema.validate(2)).to.throw('custom error 2');
    });
  });

  describe('`enum` should restrict enum type', () => {
    it('should deny empty arguments', () => {
      expect(() => racoon.any().enum()).to.throw('enum arguments should not be empty');
    });

    it('without custom error', () => {
      const schema = racoon.any().enum(1, 'abc', false);

      expect(schema.validate(1)).to.eq(1);
      expect(schema.validate('abc')).to.eq('abc');
      expect(schema.validate(false)).to.be.false;
      expect(() => schema.validate(3)).to.throw('value should be one of [1,"abc",false]');
    });

    it('with custom error', () => {
      const schema = racoon
        .any()
        .enum(1, 'abc', false)
        .error('custom error');

      expect(schema.validate(1)).to.eq(1);
      expect(schema.validate('abc')).to.eq('abc');
      expect(schema.validate(false)).to.be.false;
      expect(() => schema.validate(3)).to.throw(/^custom error$/);
    });
  });

  describe('`required` should restrict value to be required', () => {
    it('non-strict mode', () => {
      const schema = racoon.any().required();
      const errorMsg = 'value is required and should not be undefined/null/NaN';

      expect(schema.validate(false)).to.be.false;
      expect(schema.validate(0)).to.eq(0);
      expect(schema.validate('')).to.eq('');
      expect(() => schema.validate(NaN)).to.throw(errorMsg);
      expect(() => schema.validate(undefined)).to.throw(errorMsg);
      expect(() => schema.validate(null)).to.throw(errorMsg);
    });

    it('strict mode', () => {
      const schema = racoon.any().required(true);
      const errorMsg = 'value is required and should not be empty';

      expect(schema.validate(false)).to.be.false;
      expect(schema.validate(0)).to.eq(0);
      expect(() => schema.validate({})).to.throw(errorMsg);
      expect(() => schema.validate([])).to.throw(errorMsg);
      expect(() => schema.validate('')).to.throw(errorMsg);
      expect(() => schema.validate(NaN)).to.throw(errorMsg);
    });

    it('non-strict mode with custom error', () => {
      const errorMsg = 'non-strict mode with custom error';
      const schema1 = racoon
        .any()
        .required()
        .error(errorMsg);

      expect(schema1.validate(false)).to.be.false;
      expect(schema1.validate(0)).to.eq(0);
      expect(schema1.validate('')).to.eq('');
      expect(() => schema1.validate(NaN)).to.throw(errorMsg);
      expect(() => schema1.validate(undefined)).to.throw(errorMsg);
      expect(() => schema1.validate(null)).to.throw(errorMsg);
    });

    it('strict mode with custom error', () => {
      const errorMsg = 'strict mode with custom error';
      const schema2 = racoon
        .any()
        .required(true)
        .error(errorMsg);

      expect(schema2.validate(1)).to.be.eq(1);
      expect(schema2.validate(false)).to.be.false;
      expect(schema2.validate(0)).to.eq(0);
      expect(() => schema2.validate({})).to.throw(errorMsg);
      expect(() => schema2.validate([])).to.throw(errorMsg);
      expect(() => schema2.validate('')).to.throw(errorMsg);
      expect(() => schema2.validate(NaN)).to.throw(errorMsg);
    });
  });

  describe('`custom` should restrict value by a custom function', () => {
    it('should deny non-function param', () => {
      expect(() => racoon.any().custom([])).to.throw('`restrictFn` should be a type of function');
    });

    it('`restrictFn` can throw an error', () => {
      const schema = racoon
        .any()
        .custom((val) => {
          if (val % 2 !== 0) {
            throw new Error('odd error by throw');
          }
        });

      expect(schema.validate(6)).to.eq(6);
      expect(() => schema.validate(3)).to.throw('odd error by throw');
    });

    it('`restrictFn` can return a non-empty string', () => {
      const schema = racoon
        .any()
        .custom((val) => {
          if (val % 2 !== 0) {
            return 'odd error by return string';
          }
        });

      expect(schema.validate(6)).to.eq(6);
      expect(() => schema.validate(3)).to.throw('odd error by return string');
    });

    it('can accept custom error too', () => {
      const schema = racoon
        .any()
        .custom((val) => {
          if (val % 2 !== 0) {
            throw new Error('odd error');
          }
        })
        .error('custom error');

      expect(schema.validate(6)).to.eq(6);
      expect(() => schema.validate(3)).to.throw('custom error');
    });
  });

  describe('`default` should make an default return when value is emtpy', () => {
    it('should deny empty arguments', () => {
      expect(() => racoon.any().default()).to.throw('default arguments should not be empty');
    });

    it('non-strict mode', () => {
      const schema = racoon.any().default('string');

      expect(schema.validate(12)).to.eq(12);
      expect(schema.validate('')).to.eq('');
      expect(schema.validate({})).to.deep.eq({});
      expect(schema.validate([])).to.deep.eq([]);
      expect(schema.validate()).to.eq('string');
      expect(schema.validate(undefined)).to.eq('string');
      expect(schema.validate(null)).to.eq('string');
      expect(schema.validate(NaN)).to.eq('string');
    });

    it('strict mode', () => {
      const schema = racoon.any().default('string', true);

      expect(schema.validate(12)).to.eq(12);
      expect(schema.validate('')).to.eq('string');
      expect(schema.validate({})).to.eq('string');
      expect(schema.validate([])).to.eq('string');
      expect(schema.validate()).to.eq('string');
      expect(schema.validate(undefined)).to.eq('string');
      expect(schema.validate(null)).to.eq('string');
      expect(schema.validate(NaN)).to.eq('string');
    });
  });

  describe('`format` should format the final return value', () => {
    it('should deny empty non-function param', () => {
      expect(() => racoon.any().format(1)).to.throw('`formatter` should be a type of function');
    });

    it('without default return value', () => {
      const schema = racoon.any().format(val => val + 1);

      expect(schema.validate(1)).to.eq(2);
    });

    it('with non-strict default return value', () => {
      const schema = racoon
        .any()
        .default(10)
        .format(val => val + 1);

      expect(schema.validate(1)).to.eq(2);
      expect(schema.validate(null)).to.eq(11);
    });

    it('with strict default return value', () => {
      const schema = racoon
        .any()
        .default(10, true)
        .format(val => String(val) + 1);

      expect(schema.validate(1)).to.eq('11');
      expect(schema.validate(null)).to.eq('101');
      expect(schema.validate({})).to.eq('101');
    });
  });

  describe('custom error should work', () => {
    describe('`error` should work', () => {
      it('`error` should deny non-function and non-string param', () => {
        expect(() => racoon.any().error(1)).throw('`message` should be a type of string or function');
      });

      it('`error` should add custom error to the right restrict', () => {
        const schema = racoon
          .any()
          .enum(1, 2, 3)
          .error('error1')
          .custom((val) => {
            if (val % 2 !== 1) {
              throw new Error('even error');
            }
          })
          .error('error2')
          .required(true)
          .error('error3');

        expect(schema.validate(1)).to.be.eq(1);
        expect(() => schema.validate(5)).to.throw('error1');
        expect(() => schema.validate(2)).to.throw('error2');
        expect(() => schema.validate(null)).to.throw('error3');
      });
    });

    describe('`errorForAll` should work', () => {
      it('`errorForAll` should deny non-function and non-string param', () => {
        expect(() => racoon.any().errorForAll(1)).throw('`message` should be a type of string or function');
      });

      it('`errorForAll` should add custom error to all restricts when restrict has\'t custom error', () => {
        const schema = racoon
          .any()
          .error('error1')
          .enum(1, 2, 3)
          .custom((val) => {
            if (val % 2 !== 1) {
              throw new Error('even error');
            }
          })
          .error('error2')
          .required(true)
          .error('error3')
          .errorForAll('error for all');

        expect(schema.validate(1)).to.be.eq(1);
        expect(() => schema.validate(2)).to.throw('error2');
        expect(() => schema.validate(null)).to.throw('error3');
        expect(() => schema.validate(5)).to.throw('error for all');
      });
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
        .any()
        .enum(123, 'abc', true)
        .error(obj.getMessage, obj)
        .required(true)
        .errorForAll(obj.getMessage, obj);

      expect(() => schema.validate(1)).to.throw('PREFIX value should be one of [123,"abc",true]');
      expect(() => schema.validate(null)).to.throw('PREFIX value is required and should not be empty');
    });
  });

  describe('`validateSilent` should work', () => {
    const schema = racoon.any().enum(123);

    it('has error', () => {
      const { error } = schema.validateSilent(12);

      expect(error.message).to.eq('value should be one of [123]');
    });

    it('has no error', () => {
      const { error, value } = schema.validateSilent(123);

      expect(error).to.be.undefined;
      expect(value).to.eq(123);
    });
  });
});
