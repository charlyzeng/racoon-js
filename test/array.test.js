import { expect } from 'chai';
import racoon from '../lib';
import { getArray } from './data/mock';

describe('schema#array', () => {
  describe('should restrict the detected value to be a type of array', () => {
    it('without custom error', () => {
      const schema = racoon.array();
      const array = [1, 'abc', { a: 1 }, [2, '3']];

      expect(schema.validate([])).to.deep.eq([]);
      expect(schema.validate(array)).to.deep.eq(array);
      expect(() => schema.validate(1)).to.throw('value should be a type of array');

      // Validate method should return a shallow copy of array.
      expect(schema.validate(array)).not.eq(array);
    });

    it('with custom error', () => {
      const schema = racoon.array().error('custom error');
      const array = [1, 'abc', { a: 1 }, [2, '3']];

      expect(schema.validate([])).to.deep.eq([]);
      expect(schema.validate(array)).to.deep.eq(array);
      expect(() => schema.validate(1)).to.throw('custom error');
    });
  });

  describe('`min` should restrict the min length of array', () => {
    it('should deny non-number param', () => {
      expect(() => racoon.array().min('abc')).to.throw('`min` should be a type of number');
    });

    it('closed interval', () => {
      const schema = racoon.array().min(3);
      const errorMsg = 'value length should be greater than or equal to 3';

      expect(schema.validate([1, 2, 3])).to.deep.eq([1, 2, 3]);
      expect(() => schema.validate([1, 2])).to.throw(errorMsg);
    });

    it('opened interval', () => {
      const schema = racoon.array().min(3, false);
      const errorMsg = 'value length should greater than 3';

      expect(() => schema.validate([1, 2, 3])).to.throw(errorMsg);
      expect(schema.validate([1, 2, 3, 4])).to.deep.eq([1, 2, 3, 4]);
    });

    it('should accept custom error', () => {
      const schema = racoon
        .array()
        .min(3)
        .error('custom error');

      expect(schema.validate([1, 2, 3])).to.deep.eq([1, 2, 3]);
      expect(() => schema.validate([1, 2])).to.throw('custom error');
    });
  });

  describe('`max` should restrict the max length of array', () => {
    it('should deny non-number param', () => {
      expect(() => racoon.array().max('abc')).to.throw('`max` should be a type of number');
    });

    it('closed interval', () => {
      const schema = racoon.array().max(3);

      expect(schema.validate([1, 2])).to.deep.eq([1, 2]);
      expect(schema.validate([1, 2, 3])).to.deep.eq([1, 2, 3]);
      expect(() => schema.validate([1, 2, 3, 4])).to.throw('value length should be less than or equal to 3');
    });

    it('opened interval', () => {
      const schema = racoon.array().max(3, false);

      expect(schema.validate([1, 2])).to.deep.eq([1, 2]);
      expect(() => schema.validate([1, 2, 3])).to.throw('value length should be less than 3');
    });

    it('should accept custom error', () => {
      const schema = racoon
        .array()
        .max(3, false)
        .error('custom error');

      expect(schema.validate([1, 2])).to.deep.eq([1, 2]);
      expect(() => schema.validate([1, 2, 3])).to.throw('custom error');
    });
  });

  describe('`custom` should restrict array by a custom function', () => {
    const errorMsg = 'value should starts with "ab"';

    it('should deny non-function param', () => {
      expect(() => racoon.array().custom([])).to.throw('`restrictFn` should be a type of function');
    });

    it('can throw an error', () => {
      const schema = racoon
        .array()
        .custom((array) => {
          if (array.join('').startsWith('ab') === false) {
            throw new Error(errorMsg);
          }
        });

      expect(schema.validate(['a', 'b'])).to.deep.eq(['a', 'b']);
      expect(() => schema.validate(['b', 'c'])).to.throw(errorMsg);
    });

    it('can return a non-empty string', () => {
      const schema = racoon
        .array()
        .custom((array) => {
          if (array.join('').startsWith('ab') === false) {
            return errorMsg;
          }
        });

      expect(schema.validate(['a', 'b'])).to.deep.eq(['a', 'b']);
      expect(() => schema.validate(['b', 'c'])).to.throw(errorMsg);
    });

    it('can accept custom error too', () => {
      const schema = racoon
        .array()
        .custom((array) => {
          if (array.join('').startsWith('ab') === false) {
            throw new Error(errorMsg);
          }
        })
        .error('custom error');

      expect(schema.validate(['a', 'b'])).to.deep.eq(['a', 'b']);
      expect(() => schema.validate(['b', 'c'])).to.throw('custom error');
    });
  });

  describe('`required` should restrict value to be required', () => {
    it('non-strict mode', () => {
      const schema = racoon.array().required();
      const errorMsg = 'value is required and should not be undefined/null';

      expect(schema.validate([])).to.deep.eq([]);
      expect(schema.validate([1, 'abc'])).to.deep.eq([1, 'abc']);
      expect(() => schema.validate()).to.throw(errorMsg);
      expect(() => schema.validate(null)).to.throw(errorMsg);
    });

    it('strict mode', () => {
      const schema = racoon.array().required(true);
      const errorMsg = 'value is required and should not be empty';

      expect(schema.validate([1, 'abc'])).to.deep.eq([1, 'abc']);
      expect(() => schema.validate()).to.throw(errorMsg);
      expect(() => schema.validate(null)).to.throw(errorMsg);
      expect(() => schema.validate([])).to.throw(errorMsg);
    });

    it('should accept custom error', () => {
      const schema = racoon
        .array()
        .required()
        .error('custom error');

      expect(schema.validate([])).to.deep.eq([]);
      expect(schema.validate([1, 'abc'])).to.deep.eq([1, 'abc']);
      expect(() => schema.validate()).to.throw('custom error');
      expect(() => schema.validate(null)).to.throw('custom error');
    });
  });

  describe('`constructor` should accept a schema param to restrict every element of array', () => {
    it('`itemSchema` is a simple type schema', () => {
      const itemSchema = racoon
        .number()
        .int()
        .min(1)
        .max(6, false);
      const schema = racoon.array(itemSchema);
      const errorMsg = '"[5]": value should be less than 6';

      expect(schema.validate([1, 2, 3, 4, 5])).to.deep.eq([1, 2, 3, 4, 5]);
      expect(() => schema.validate([1, 2, 3, 4, 5, 6])).to.throw(errorMsg);
    });

    it('`itemSchema` is a complex object or array type schema', () => {
      const sightSpotSchema = racoon
        .object({
          addressName: racoon.string(),
          starCount: racoon.number().max(5),
        }).allowUnknown();
      const itemSchema = racoon
        .object({
          age: racoon.number(),
          name: racoon.string(),
          hometown: racoon.object({
            province: racoon.string(),
            sightSpots: racoon.array(sightSpotSchema),
          }).allowUnknown(),
        })
        .stripUnknown();
      const schema = racoon.array(itemSchema);

      const expectResult = [
        {
          age: 32,
          name: 'Natalia Peterson',
          hometown: {
            province: 'GuangDong',
            sightSpots: [
              {
                addressName: 'Front Sea',
                starCount: 4,
              },
            ],
            city: 'ShenZhen',
          },
        },
      ];
      const errorMsg = '"[1].hometown.sightSpots[0].starCount": value should be less than or equal to 5';

      expect(schema.validate(getArray().slice(0, 1))).to.deep.eq(expectResult);
      expect(() => schema.validate(getArray())).to.throw(errorMsg);
    });
  });

  describe('`default` should make an default return when value is emtpy', () => {
    it('should deny empty arguments', () => {
      expect(() => racoon.array().default()).to.throw('default arguments should not be empty');
    });

    it('non-strict mode', () => {
      const schema = racoon.array().default(() => [1, 2]);

      expect(schema.validate()).to.deep.eq([1, 2]);
      expect(schema.validate(undefined)).to.deep.eq([1, 2]);
      expect(schema.validate(null)).to.deep.eq([1, 2]);
      expect(schema.validate([])).to.deep.eq([]);
      expect(schema.validate([1, 2, 3])).to.deep.eq([1, 2, 3]);
      expect(() => schema.validate(NaN)).to.throw('value should be a type of array');
    });

    it('strict mode', () => {
      const schema = racoon.array().default(() => ([1, 2]), true);

      expect(schema.validate()).to.deep.eq([1, 2]);
      expect(schema.validate(undefined)).to.deep.eq([1, 2]);
      expect(schema.validate(null)).to.deep.eq([1, 2]);
      expect(schema.validate([])).to.deep.eq([1, 2]);
      expect(schema.validate([1, 2, 3])).to.deep.eq([1, 2, 3]);
    });
  });

  describe('`format` should format the final return value', () => {
    it('should deny empty non-function param', () => {
      expect(() => racoon.array().format(1)).to.throw('`formatter` should be a type of function');
    });

    it('without default return value', () => {
      const schema = racoon
        .array()
        .format(value => ({ code: 100, value }));

      expect(schema.validate(undefined)).to.deep.eq({ code: 100, value: undefined });
      expect(schema.validate(null)).to.deep.eq({ code: 100, value: null });
      expect(schema.validate([])).to.deep.eq({ code: 100, value: [] });
      expect(schema.validate([1])).to.deep.eq({ code: 100, value: [1] });
    });

    it('with default non-strict return value', () => {
      const schema = racoon
        .array()
        .default([1, 2])
        .format(value => ({ code: 100, value }));

      expect(schema.validate(undefined)).to.deep.eq({ code: 100, value: [1, 2] });
      expect(schema.validate(null)).to.deep.eq({ code: 100, value: [1, 2] });
      expect(schema.validate([])).to.deep.eq({ code: 100, value: [] });
      expect(schema.validate([1])).to.deep.eq({ code: 100, value: [1] });
    });

    it('with default strict return value', () => {
      const schema = racoon
        .array()
        .default([1, 2], true)
        .format(value => ({ code: 100, value }));

      expect(schema.validate(undefined)).to.deep.eq({ code: 100, value: [1, 2] });
      expect(schema.validate(null)).to.deep.eq({ code: 100, value: [1, 2] });
      expect(schema.validate([])).to.deep.eq({ code: 100, value: [1, 2] });
      expect(schema.validate([1])).to.deep.eq({ code: 100, value: [1] });
    });
  });

  it('`error` should deny non-function and non-string param', () => {
    expect(() => racoon.array().error(1)).throw('`message` should be a type of string or function');
  });

  it('`error` should add custom error to the right restrict', () => {
    const schema = racoon
      .array()
      .error('error1')
      .min(2)
      .error('error2')
      .max(3)
      .error('error3')
      .required(true)
      .error('error4');

    expect(schema.validate([1, 2])).to.deep.eq([1, 2]);
    expect(() => schema.validate({})).to.throw('error1');
    expect(() => schema.validate([1])).to.throw('error2');
    expect(() => schema.validate([1, 2, 3, 4])).to.throw('error3');
    expect(() => schema.validate(null)).to.throw('error4');
    expect(() => schema.validate([])).to.throw('error4');
  });

  it('`error` message should trim key chain prefix', () => {
    const numberSchema = racoon.number().min(2);
    const schema = racoon.array(numberSchema);

    expect(() => schema.validate([3, 1])).to.throw('"[1]": value should be greater than or equal to 2');

    numberSchema.error('custom error');
    expect(() => schema.validate([3, 1])).to.throw(/^custom error$/);
  });

  it('`errorForAll` should deny non-function and non-string param', () => {
    expect(() => racoon.array().errorForAll(1)).throw('`message` should be a type of string or function');
  });

  it('`errorForAll` should add custom error to all restricts when restrict has\'t custom error', () => {
    const schema = racoon
      .array()
      .error('error1')
      .min(2)
      .error('error2')
      .max(3)
      .error('error3')
      .required(true)
      .errorForAll('error for all');

    expect(schema.validate([1, 2])).to.deep.eq([1, 2]);
    expect(() => schema.validate({})).to.throw('error1');
    expect(() => schema.validate([1])).to.throw('error2');
    expect(() => schema.validate([1, 2, 3, 4])).to.throw('error3');
    expect(() => schema.validate(null)).to.throw('error for all');
    expect(() => schema.validate([])).to.throw('error for all');
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
      .array()
      .error('error1')
      .min(2)
      .error('error2')
      .max(3)
      .error(obj.getMessage, obj)
      .required(true)
      .errorForAll(obj.getMessage, obj);

    expect(schema.validate([1, 2])).to.deep.eq([1, 2]);
    expect(() => schema.validate({})).to.throw('error1');
    expect(() => schema.validate([1])).to.throw('error2');
    expect(() => schema.validate([1, 2, 3, 4])).to.throw('PREFIX value length should be less than or equal to 3');
    expect(() => schema.validate(null)).to.throw('value is required and should not be empty');
    expect(() => schema.validate([])).to.throw('value is required and should not be empty');
  });

  describe('`validateSilent` should work', () => {
    const schema = racoon.array().min(2);

    it('has error', () => {
      const { error } = schema.validateSilent([1]);

      expect(error.message).to.eq('value length should be greater than or equal to 2');
    });

    it('has no error', () => {
      const { error, value } = schema.validateSilent([1, 2]);

      expect(error).to.be.undefined;
      expect(value).to.deep.eq([1, 2]);
    });
  });
});
