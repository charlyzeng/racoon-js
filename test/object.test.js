import { expect } from 'chai';
import racoon from '../lib';
import { getObject } from './data/mock';

describe('schema#object', () => {
  describe('should restrict the detected value to be a type of object', () => {
    it('without custom error', () => {
      const schema = racoon.object();
      const obj = { a: 1 };

      expect(schema.validate(null)).to.be.null;
      expect(schema.validate(undefined)).to.be.undefined;
      expect(schema.validate(obj)).to.eq(obj);
      expect(() => schema.validate(1)).to.throw('value should be a type of object');
      expect(() => schema.validate([])).to.throw('value should be a type of object');
    });

    it('with custom error', () => {
      const schema = racoon.object().error('custom error');

      expect(() => schema.validate([])).to.throw('custom error');
    });
  });

  it('`config` should ignore non-schema props', () => {
    const schema = racoon.object({
      name: String,
      age: racoon.number(),
    });

    expect(() => schema.validate({ name: 'Tom', age: 22 })).to.throw('the key `name` is not allowed');
  });

  describe('`custom` should restrict object by a custom function', () => {
    const errorMsg = 'object should has include name and age';

    it('can throw an error', () => {
      const schema = racoon
        .object()
        .custom((obj) => {
          if (!obj.name || !obj.age) {
            throw new Error(errorMsg);
          }
        });

      expect(schema.validate({ name: 'Jack', age: 20 })).to.deep.eq({ name: 'Jack', age: 20 });
      expect(() => schema.validate({ name: 'Jack' })).to.throw(errorMsg);
    });

    it('can return a non-empty string', () => {
      const schema = racoon
        .object()
        .custom((obj) => {
          if (!obj.name || !obj.age) {
            throw new Error(errorMsg);
          }
        });

      expect(schema.validate({ name: 'Jack', age: 20 })).to.deep.eq({ name: 'Jack', age: 20 });
      expect(() => schema.validate({ name: 'Jack' })).to.throw(errorMsg);
    });

    it('can accept custom error too', () => {
      const schema = racoon
        .object()
        .custom((obj) => {
          if (!obj.name || !obj.age) {
            throw new Error(errorMsg);
          }
        })
        .error('custom error');

      expect(schema.validate({ name: 'Jack', age: 20 })).to.deep.eq({ name: 'Jack', age: 20 });
      expect(() => schema.validate({ name: 'Jack' })).to.throw('custom error');
    });
  });

  describe('`required` should restrict value to be required', () => {
    it('non-strict mode', () => {
      const schema = racoon.object().required();
      const errorMsg = 'value is required and should not be undefined/null';

      expect(schema.validate({})).to.deep.eq({});
      expect(schema.validate({ a: 1 })).to.deep.eq({ a: 1 });
      expect(() => schema.validate(undefined)).to.throw(errorMsg);
      expect(() => schema.validate(null)).to.throw(errorMsg);
    });

    it('strict mode', () => {
      const schema = racoon.object().required(true);
      const errorMsg = 'value is required and should not be empty';

      expect(schema.validate({ a: 1 })).to.deep.eq({ a: 1 });
      expect(() => schema.validate(undefined)).to.throw(errorMsg);
      expect(() => schema.validate(null)).to.throw(errorMsg);
      expect(() => schema.validate({})).to.throw(errorMsg);
    });

    it('should accept custom error', () => {
      const schema = racoon
        .object()
        .required()
        .error('custom error');

      expect(schema.validate({ a: 1 })).to.deep.eq({ a: 1 });
      expect(() => schema.validate(undefined)).to.throw('custom error');
      expect(() => schema.validate(null)).to.throw('custom error');
    });
  });

  describe('`default` should make an default return when value is emtpy', () => {
    it('should deny empty arguments', () => {
      expect(() => racoon.object().default()).to.throw('default arguments should not be empty');
    });

    it('non-strict mode', () => {
      const schema = racoon.object().default(() => ({ a: 1 }));

      expect(schema.validate(undefined)).to.deep.eq({ a: 1 });
      expect(schema.validate(null)).to.deep.eq({ a: 1 });
      expect(schema.validate({})).to.deep.eq({});
    });

    it('strict mode', () => {
      const schema = racoon.object().default(() => ({ a: 1 }), true);

      expect(schema.validate(undefined)).to.deep.eq({ a: 1 });
      expect(schema.validate(null)).to.deep.eq({ a: 1 });
      expect(schema.validate({})).to.deep.eq({ a: 1 });
    });
  });

  describe('`format` should format the final return value', () => {
    it('should deny empty non-function param', () => {
      expect(() => racoon.object().format(1)).to.throw('`formatter` should be a type of function');
    });

    it('without default return value', () => {
      const schema = racoon
        .object()
        .format(value => ({ code: 100, value }));

      expect(schema.validate(undefined)).to.deep.eq({ code: 100, value: undefined });
      expect(schema.validate(null)).to.deep.eq({ code: 100, value: null });
      expect(schema.validate({})).to.deep.eq({ code: 100, value: {} });
      expect(schema.validate({ a: 2 })).to.deep.eq({ code: 100, value: { a: 2 } });
    });

    it('with default non-strict return value', () => {
      const schema = racoon
        .object()
        .default({ a: 1 })
        .format(value => ({ code: 100, value }));

      expect(schema.validate(undefined)).to.deep.eq({ code: 100, value: { a: 1 } });
      expect(schema.validate(null)).to.deep.eq({ code: 100, value: { a: 1 } });
      expect(schema.validate({})).to.deep.eq({ code: 100, value: {} });
      expect(schema.validate({ a: 2 })).to.deep.eq({ code: 100, value: { a: 2 } });
    });

    it('with default strict return value', () => {
      const schema = racoon
        .object()
        .default({ a: 1 }, true)
        .format(value => ({ code: 100, value }));

      expect(schema.validate(undefined)).to.deep.eq({ code: 100, value: { a: 1 } });
      expect(schema.validate(null)).to.deep.eq({ code: 100, value: { a: 1 } });
      expect(schema.validate({})).to.deep.eq({ code: 100, value: { a: 1 } });
      expect(schema.validate({ a: 2 })).to.deep.eq({ code: 100, value: { a: 2 } });
    });
  });

  describe('`allowUnknowns` should work', () => {
    it('with shallow unknown keys', () => {
      const schema = racoon.object({
        name: racoon.string(),
        age: racoon.number(),
      });
      const obj = getObject(0, ['name', 'age', 'gender']);

      expect(() => schema.validate(obj)).to.throw('the key `gender` is not allowed');

      schema.allowUnknown();
      expect(schema.validate(obj)).to.deep.eq({
        name: 'Natalia Peterson',
        age: 32,
        gender: 'female',
      });
    });

    it('with deep unknown keys', () => {
      const sightSpotSchema = racoon.object({
        addressName: racoon.string(),
      });
      const schema = racoon.object({
        name: racoon.string(),
        hometown: racoon.object({
          province: racoon.string(),
          city: racoon.string(),
          sightSpots: racoon.array(sightSpotSchema),
        }),
      });
      const obj = getObject(0, ['name', 'hometown']);

      expect(() => schema.validate(obj))
        .to.throw('"hometown.sightSpots[0]": the key `starCount` is not allowed');

      sightSpotSchema.allowUnknown();
      expect(schema.validate(obj)).to.deep.eq(getObject(0, ['name', 'hometown']));
    });
  });

  describe('`stripUnkowns`, should work', () => {
    const schema = racoon.object({
      name: racoon.string(),
      age: racoon.number(),
    }).stripUnknown();

    it('with shallow unknown keys', () => {
      const obj = getObject(0, ['name', 'age', 'gender']);

      expect(schema.validate(obj)).to.deep.eq({
        name: 'Natalia Peterson',
        age: 32,
      });
    });

    it('with deep unknown keys', () => {
      const sightSpotSchema = racoon.object({
        addressName: racoon.string(),
      });
      const schema = racoon.object({
        name: racoon.string(),
        hometown: racoon.object({
          province: racoon.string(),
          city: racoon.string(),
          sightSpots: racoon.array(sightSpotSchema),
        }),
      });
      const obj = getObject(0, ['name', 'age', 'hometown']);
      const expectedObj = getObject(0, ['name', 'hometown']);
      delete expectedObj.hometown.sightSpots[0].starCount;

      expect(() => schema.validate(obj))
        .to.throw('"hometown.sightSpots[0]": the key `starCount` is not allowed');

      schema.stripUnknown();
      sightSpotSchema.stripUnknown();
      expect(schema.validate(obj)).to.deep.eq(expectedObj);
    });
  });

  describe('schema config includes some keys that detected object doesn\'t include', () => {
    it('key has default value', () => {
      const schema = racoon.object({
        name: racoon.string(),
        age: racoon.number().default(20),
      });
      const detectedValue = {
        name: 'Jack',
      };
      const expectedValue = {
        name: 'Jack',
        age: 20,
      };

      expect(schema.validate(detectedValue)).to.deep.eq(expectedValue);
    });

    it('key doesn\'t have default value', () => {
      const schema = racoon.object({
        name: racoon.string(),
        age: racoon.number(),
      });
      const detectedValue = {
        name: 'Jack',
      };
      const expectedValue = {
        name: 'Jack',
      };

      expect(schema.validate(detectedValue)).to.deep.eq(expectedValue);
    });
  });

  it('`error` should deny non-function and non-string param', () => {
    expect(() => racoon.object().error(1)).throw('`message` should be a type of string or function');
  });

  it('`error` should add custom error to the right restrict', () => {
    const schema = racoon
      .object({
        name: racoon.string().error('innner error'),
      })
      .error('error1')
      .required()
      .error('error2');

    expect(() => schema.validate(9)).to.throw('error1');
    expect(() => schema.validate(null)).to.throw('error2');
    expect(() => schema.validate({ name: 1 })).to.throw(/^innner error$/);
  });

  it('`error` message should trim key chain prefix', () => {
    const nameSchema = racoon
      .string()
      .required(true);
    const schema = racoon.object({
      hometown: racoon.object({
        name: nameSchema,
      }),
    });
    const mockData = getObject(0, ['hometown']);

    expect(() => schema.validate(mockData)).to.throw('"hometown.name": value is required and should not be empty');

    nameSchema.error('custom error');
    expect(() => schema.validate(mockData)).to.throw(/^custom error$/);
  });

  it('`errorForAll` should deny non-function and non-string param', () => {
    expect(() => racoon.object().errorForAll(1)).throw('`message` should be a type of string or function');
  });

  it('`errorForAll` should add custom error to all restricts when restrict has\'t custom error', () => {
    const schema = racoon
      .object()
      .error('error1')
      .required(true)
      .errorForAll('error for all');

    expect(() => schema.validate(9)).to.throw('error1');
    expect(() => schema.validate(null)).to.throw('error for all');
    expect(() => schema.validate({})).to.throw('error for all');
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
      .object()
      .error(obj.getMessage, obj)
      .required(true)
      .errorForAll(obj.getMessage, obj);

    expect(() => schema.validate(1)).to.throw('PREFIX value should be a type of object');
    expect(() => schema.validate(null)).to.throw('PREFIX value is required and should not be empty');
    expect(() => schema.validate({})).to.throw('PREFIX value is required and should not be empty');
  });

  describe('`validateSilent` should work', () => {
    const schema = racoon.object().required(true);

    it('has error', () => {
      const { error } = schema.validateSilent({});

      expect(error.message).to.eq('value is required and should not be empty');
    });

    it('has no error', () => {
      const { error, value } = schema.validateSilent({ a: 1 });

      expect(error).to.be.undefined;
      expect(value).to.deep.eq({ a: 1 });
    });
  });
});
