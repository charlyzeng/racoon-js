import { expect } from 'chai';
import racoon from '../lib';

describe('schema#boolean', () => {
  describe('should restrict the detected value to be a type of boolean', () => {
    it('without custom error', () => {
      const schema = racoon.boolean();

      expect(schema.validate(true)).to.be.true;
      expect(schema.validate(false)).to.be.false;
      expect(() => schema.validate(1)).to.throw('value should be a type of boolean');
    });

    it('with custom error', () => {
      const schema = racoon
        .boolean()
        .custom((value) => {
          if (value !== true) {
            return 'custom error 1';
          }
        })
        .error('custom error 2');

      expect(schema.validate(true)).to.be.true;
      expect(() => schema.validate(false)).to.throw('custom error 2');
    });
  });

  describe('`enum` should restrict enum type', () => {
    it('should deny empty arguments', () => {
      expect(() => racoon.boolean().enum()).to.throw('enum arguments should not be empty');
    });

    it('without custom error', () => {
      const schema = racoon.boolean().enum(false);

      expect(schema.validate(false)).to.be.false;
      expect(() => schema.validate(true)).to.throw('value should be one of [false]');
    });

    it('with custom error', () => {
      const schema = racoon
        .boolean()
        .enum(false)
        .error('custom error');

      expect(schema.validate(false)).to.be.false;
      expect(() => schema.validate(true)).to.throw('custom error');
    });
  });

  describe('`required` should restrict boolean to be required', () => {
    it('without custom error', () => {
      const schema = racoon.boolean().required();
      const errorMsg = 'value is required and should not be undefined/null';

      expect(schema.validate(false)).to.be.false;
      expect(schema.validate(true)).to.be.true;
      expect(() => schema.validate(undefined)).to.throw(errorMsg);
      expect(() => schema.validate(null)).to.throw(errorMsg);
    });

    it('with custom error', () => {
      const schema = racoon
        .boolean()
        .required()
        .error('custom error');

      expect(schema.validate(false)).to.be.false;
      expect(schema.validate(true)).to.be.true;
      expect(() => schema.validate(undefined)).to.throw('custom error');
      expect(() => schema.validate(null)).to.throw('custom error');
    });
  });

  describe('`custom` should restrict boolean by a custom function', () => {
    it('should deny non-function param', () => {
      expect(() => racoon.boolean().custom([])).to.throw('`restrictFn` should be a type of function');
    });

    it('`restrictFn` can throw an error', () => {
      const schema = racoon
        .boolean()
        .custom((val) => {
          if (val !== true) {
            throw new Error('error by throw');
          }
        });

      expect(schema.validate(true)).to.be.true;
      expect(() => schema.validate(false)).to.throw('error by throw');
    });

    it('`restrictFn` can return a non-empty string', () => {
      const schema = racoon
        .boolean()
        .custom((val) => {
          if (val !== true) {
            return 'error by return';
          }
        });

      expect(schema.validate(true)).to.be.true;
      expect(() => schema.validate(false)).to.throw('error by return');
    });

    it('can accept custom error too', () => {
      const schema = racoon
        .boolean()
        .custom((val) => {
          if (val !== true) {
            return 'error by return';
          }
        })
        .error('error by custom');

      expect(schema.validate(true)).to.be.true;
      expect(() => schema.validate(false)).to.throw('error by custom');
    });
  });

  describe('`default` should make an default return when value is emtpy', () => {
    it('should deny empty arguments', () => {
      expect(() => racoon.boolean().default()).to.throw('default arguments should not be empty');
    });

    it('should make an default return val', () => {
      const schema = racoon.boolean().default(true);

      expect(schema.validate()).to.be.true;
      expect(schema.validate(undefined)).to.be.true;
      expect(schema.validate(null)).to.be.true;
      expect(schema.validate(false)).to.be.false;
      expect(schema.validate(true)).to.be.true;
    });
  });

  describe('`format` should format the final return value', () => {
    it('should deny empty non-function param', () => {
      expect(() => racoon.boolean().format(1)).to.throw('`formatter` should be a type of function');
    });

    it('without default return value', () => {
      const schema = racoon.boolean().format(val => String(val) + 1);

      expect(schema.validate(null)).to.eq('null1');
      expect(schema.validate(true)).to.eq('true1');
    });

    it('with default return value', () => {
      const schema = racoon
        .boolean()
        .default(true)
        .format(val => String(val) + 1);

      expect(schema.validate(null)).to.eq('true1');
      expect(schema.validate(true)).to.eq('true1');
    });
  });

  describe('custom error should work', () => {
    describe('`error` should work', () => {
      it('`error` should deny non-function and non-string param', () => {
        expect(() => racoon.boolean().error(1)).throw('`message` should be a type of string or function');
      });

      it('`error` should add custom error to the right restrict', () => {
        const schema = racoon
          .boolean()
          .enum(true)
          .error('error1')
          .required()
          .error('error2');

        expect(schema.validate(true)).to.be.eq(true);
        expect(() => schema.validate(false)).to.throw('error1');
        expect(() => schema.validate(null)).to.throw('error2');
      });
    });

    describe('`errorForAll` should work', () => {
      it('`errorForAll` should deny non-function and non-string param', () => {
        expect(() => racoon.boolean().errorForAll(1)).throw('`message` should be a type of string or function');
      });

      it('`errorForAll` should add custom error to all restricts when restrict has\'t custom error', () => {
        const schema = racoon
          .boolean()
          .enum(true)
          .error('error1')
          .required()
          .errorForAll('error for all');

        expect(schema.validate(true)).to.be.eq(true);
        expect(() => schema.validate(false)).to.throw('error1');
        expect(() => schema.validate(null)).to.throw('error for all');
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
        .boolean()
        .enum(true)
        .error(obj.getMessage, obj)
        .required()
        .errorForAll(obj.getMessage, obj);

      const errorMsg1 = 'PREFIX value should be one of [true]';
      const errorMsg2 = 'PREFIX value is required and should not be undefined/null';

      expect(schema.validate(true)).to.be.eq(true);
      expect(() => schema.validate(false)).to.throw(errorMsg1);
      expect(() => schema.validate(null)).to.throw(errorMsg2);
    });
  });

  describe('`validateSilent` should work', () => {
    const schema = racoon.boolean().enum(true);

    it('has error', () => {
      const { error } = schema.validateSilent(false);

      expect(error.message).to.eq('value should be one of [true]');
    });

    it('has no error', () => {
      const { error, value } = schema.validateSilent(true);

      expect(error).to.be.undefined;
      expect(value).to.be.true;
    });
  });
});
