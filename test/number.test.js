import { expect } from 'chai';
import racoon from '../lib';

describe('schema#number', () => {
  describe('should restrict the detected value to be a type of number', () => {
    it('without custom error', () => {
      const schema = racoon.number();

      expect(schema.validate(0.1)).to.eq(0.1);
      expect(() => schema.validate(NaN)).to.throw('value is not allowed to be NaN');
      expect(() => schema.validate(Infinity)).to.throw('value is not allowed to be Infinity');
      expect(() => schema.validate(-Infinity)).to.throw('value is not allowed to be Infinity');
      expect(() => schema.validate('abc')).to.throw('value should be a type of number');
    });

    it('with custom error', () => {
      const schema = racoon.number().error('custom error');

      expect(schema.validate(0.1)).to.eq(0.1);
      expect(() => schema.validate(NaN)).to.throw('custom error');
      expect(() => schema.validate(Infinity)).to.throw('custom error');
      expect(() => schema.validate('abc')).to.throw('custom error');
    });
  });

  describe('`min` should restrict the min value of number', () => {
    it('should deny non-number param', () => {
      expect(() => racoon.number().min('abc')).to.throw('`min` should be a type of number');
    });

    it('closed interval', () => {
      const schema = racoon.number().min(1);

      expect(schema.validate(1)).to.eq(1);
      expect(schema.validate(2)).to.eq(2);
      expect(() => schema.validate(0)).to.throw('value should be greater than or equal to 1');
    });

    it('opened interval', () => {
      const schema = racoon.number().min(1, false);

      expect(schema.validate(2)).to.eq(2);
      expect(() => schema.validate(1)).to.throw('value should be greater than 1');
    });

    describe('should accept custom error', () => {
      it('closed interval', () => {
        const schema = racoon
          .number()
          .min(1)
          .error('custom error');

        expect(schema.validate(1)).to.eq(1);
        expect(schema.validate(2)).to.eq(2);
        expect(() => schema.validate(0)).to.throw('custom error');
      });

      it('opened interval', () => {
        const schema2 = racoon
          .number()
          .min(1, false)
          .error('custom error');

        expect(schema2.validate(2)).to.eq(2);
        expect(() => schema2.validate(1)).to.throw('custom error');
      });
    });
  });

  describe('`max` should restrict the max value of number', () => {
    it('should deny non-number param', () => {
      expect(() => racoon.number().max('abc')).to.throw('`max` should be a type of number');
    });

    it('closed interval', () => {
      const schema = racoon.number().max(1);

      expect(schema.validate(1)).to.eq(1);
      expect(schema.validate(0)).to.eq(0);
      expect(() => schema.validate(2)).to.throw('value should be less than or equal to 1');
    });

    it('opened interval', () => {
      const schema = racoon.number().max(1, false);

      expect(schema.validate(0)).to.eq(0);
      expect(() => schema.validate(1)).to.throw('value should be less than 1');
    });

    describe('should accept custom error', () => {
      it('closed interval', () => {
        const schema = racoon
          .number()
          .max(1)
          .error('custom error');

        expect(schema.validate(1)).to.eq(1);
        expect(schema.validate(0)).to.eq(0);
        expect(() => schema.validate(2)).to.throw('custom error');
      });

      it('opened interval', () => {
        const schema2 = racoon
          .number()
          .max(1, false)
          .error('custom error');

        expect(schema2.validate(0)).to.eq(0);
        expect(() => schema2.validate(1)).to.throw('custom error');
      });
    });
  });

  describe('`required` should restrict value to be required', () => {
    it('without custom error', () => {
      const schema = racoon.number().required();

      expect(schema.validate(1)).to.eq(1);
      expect(() => schema.validate()).to.throw('value is required and should not be undefined/null');
      expect(() => schema.validate(null)).to.throw('value is required and should not be undefined/null');
      expect(() => schema.validate(NaN)).to.throw('value is not allowed to be NaN');
    });

    it('with custom error', () => {
      const schema = racoon
        .number()
        .required()
        .error('custom error');

      expect(schema.validate(1)).to.eq(1);
      expect(() => schema.validate()).to.throw('custom error');
      expect(() => schema.validate(null)).to.throw('custom error');
      expect(() => schema.validate(NaN)).to.throw('value is not allowed to be NaN');
    });
  });

  describe('`custom` should restrict number by a custom function', () => {
    it('should deny non-function param', () => {
      expect(() => racoon.number().custom([])).to.throw('`restrictFn` should be a type of function');
    });

    it('can throw an error', () => {
      const schema = racoon
        .number()
        .custom((val) => {
          if (val % 2 === 0) {
            throw new Error('custom error');
          }
        });

      expect(schema.validate(1)).to.eq(1);
      expect(() => schema.validate(2)).to.throw('custom error');
    });

    it('can return a non-empty string', () => {
      const schema = racoon
        .number()
        .custom((val) => {
          if (val % 2 === 0) {
            return 'custom error';
          }
        });

      expect(schema.validate(1)).to.eq(1);
      expect(() => schema.validate(2)).to.throw('custom error');
    });

    it('can accept custom error too', () => {
      const schema = racoon
        .number()
        .custom((val) => {
          if (val % 2 === 0) {
            return 'custom error';
          }
        })
        .error('custom error 2');

      expect(schema.validate(1)).to.deep.eq(1);
      expect(() => schema.validate(2)).to.throw('custom error 2');
    });
  });

  describe('`enum` should restrict enum type', () => {
    it('should deny empty arguments', () => {
      expect(() => racoon.number().enum()).to.throw('enum arguments should not be empty');
    });

    it('without custom error', () => {
      const schema = racoon.number().enum(1, 2, 3);

      expect(schema.validate(1)).to.eq(1);
      expect(() => schema.validate(4)).to.throw('value should be one of [1,2,3]');
    });

    it('with custom error', () => {
      const schema = racoon
        .number()
        .enum(1, 2, 3)
        .error('custom error');

      expect(schema.validate(3)).to.eq(3);
      expect(() => schema.validate(4)).to.throw('custom error');
    });
  });

  describe('`int` should restrict number to be an intgeter', () => {
    it('without custom error', () => {
      const schema = racoon.number().int();

      expect(schema.validate(1)).to.eq(1);
      expect(() => schema.validate(1.1)).to.throw('value should be an integer');
    });

    it('with custom error', () => {
      const schema = racoon
        .number()
        .int()
        .error('custom error');

      expect(schema.validate(1)).to.eq(1);
      expect(() => schema.validate(1.1)).to.throw('custom error');
    });
  });

  describe('`default` should make an default return when value is emtpy', () => {
    it('should deny empty arguments', () => {
      expect(() => racoon.number().default()).to.throw('default arguments should not be empty');
    });

    it('should make an default return val', () => {
      const schema = racoon.number().default(10);

      expect(schema.validate(undefined)).to.eq(10);
      expect(schema.validate(null)).to.eq(10);
      expect(() => schema.validate(NaN)).to.throw('value is not allowed to be NaN');

      schema.allowNaN();
      expect(schema.validate(NaN)).to.eq(10);
    });
  });

  describe('`format` should format the final return value', () => {
    it('should deny empty non-function param', () => {
      expect(() => racoon.number().format(1)).to.throw('`formatter` should be a type of function');
    });

    it('without default return value', () => {
      const schema = racoon.number().format(val => String(val) + 1);

      expect(schema.validate(null)).to.eq('null1');
      expect(schema.validate(1)).to.eq('11');
    });

    it('with default return value', () => {
      const schema = racoon
        .number()
        .default(1)
        .format(val => val + 1);

      expect(schema.validate(null)).to.eq(2);
      expect(schema.validate(10)).to.eq(11);
    });
  });

  describe('`allowNaN` should make number allow NaN', () => {
    it('without required', () => {
      const schema = racoon.number().allowNaN();

      expect(schema.validate(1)).to.eq(1);
      expect(schema.validate(NaN)).to.be.NaN;
    });

    it('with required', () => {
      const schema = racoon
        .number()
        .allowNaN()
        .required();
      const errorMsg = 'value is required and should not be undefined/null';

      expect(schema.validate(1)).to.eq(1);
      expect(() => schema.validate(NaN)).to.throw('value is required and should not be NaN');
      expect(() => schema.validate()).to.throw(errorMsg);
      expect(() => schema.validate(null)).to.throw(errorMsg);
    });
  });

  describe('`allowInfinity` should make number allow Infinity', () => {
    it('without required', () => {
      const schema = racoon.number().allowInfinity();

      expect(schema.validate(Infinity)).to.eq(Infinity);
      expect(schema.validate(-Infinity)).to.eq(-Infinity);
    });

    it('with required', () => {
      const schema = racoon
        .number()
        .allowInfinity()
        .required();

      expect(schema.validate(Infinity)).to.eq(Infinity);
      expect(schema.validate(-Infinity)).to.eq(-Infinity);
    });
  });

  describe('`allowString` should make number schema preparse string', () => {
    const errorMsg = 'value should be a type of number';

    it('empty string or string only includes white spaces', () => {
      const schema = racoon.number().allowString();

      expect(() => schema.validate('')).to.throw(errorMsg);
      expect(() => schema.validate('  ')).to.throw(errorMsg);
    });

    it('string exceeds max number', () => {
      const schema = racoon.number().allowString();

      const string = '9'.repeat(99999);
      expect(() => schema.validate(string)).to.throw('value is not allowed to be Infinity');

      schema.allowInfinity();
      expect(schema.validate(string)).to.eq(Infinity);
    });

    it('string unparsable', () => {
      const schema = racoon.number().allowString();

      expect(() => schema.validate('abc')).to.throw(errorMsg);

      schema.allowNaN();
      // Number schema doesn't parse non-number like string.
      expect(() => schema.validate('abc')).to.throw(errorMsg);
    });
  });

  it('`error` should deny non-function and non-string param', () => {
    expect(() => racoon.number().error(1)).throw('`message` should be a type of string or function');
  });

  it('`error` should add custom error to the right restrict', () => {
    const schema = racoon
      .number()
      .error('error1')
      .min(1)
      .error('error2')
      .max(10, false)
      .error('error3')
      .int()
      .error('error4')
      .required()
      .error('error5');

    expect(schema.validate(1)).to.eq(1);
    expect(schema.validate(9)).to.eq(9);
    expect(() => schema.validate('abc')).to.throw('error1');
    expect(() => schema.validate(0)).to.throw('error2');
    expect(() => schema.validate(10)).to.throw('error3');
    expect(() => schema.validate(1.2)).to.throw('error4');
    expect(() => schema.validate(null)).to.throw('error5');
  });

  it('`errorForAll` should deny non-function and non-string param', () => {
    expect(() => racoon.number().errorForAll(1)).throw('`message` should be a type of string or function');
  });

  it('`errorForAll` should add custom error to all restricts when restrict has\'t custom error', () => {
    const schema = racoon
      .number()
      .error('error1')
      .min(1)
      .max(10, false)
      .error('error3')
      .int()
      .required()
      .error('error5')
      .errorForAll('error for all');

    expect(schema.validate(1)).to.eq(1);
    expect(schema.validate(9)).to.eq(9);
    expect(() => schema.validate('abc')).to.throw('error1');
    expect(() => schema.validate(0)).to.throw('error for all');
    expect(() => schema.validate(10)).to.throw('error3');
    expect(() => schema.validate(1.2)).to.throw('error for all');
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
      .number()
      .error(obj.getMessage, obj)
      .min(1)
      .max(10, false)
      .error(obj.getMessage, obj)
      .int()
      .required()
      .error('error5')
      .errorForAll(obj.getMessage, obj);

    expect(schema.validate(1)).to.eq(1);
    expect(schema.validate(9)).to.eq(9);
    expect(() => schema.validate('abc')).to.throw('PREFIX value should be a type of number');
    expect(() => schema.validate(0)).to.throw('PREFIX value should be greater than or equal to 1');
    expect(() => schema.validate(1.2)).to.throw('PREFIX value should be an integer');
  });

  describe('`validateSilent` should work', () => {
    const schema = racoon.number().min(2);

    it('has error', () => {
      const { error } = schema.validateSilent(1);

      expect(error.message).to.eq('value should be greater than or equal to 2');
    });

    it('has no error', () => {
      const { error, value } = schema.validateSilent(2);

      expect(error).to.be.undefined;
      expect(value).to.eq(2);
    });
  });
});
