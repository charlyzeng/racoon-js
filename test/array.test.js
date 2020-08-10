import { expect } from 'chai';
import racoon from '../lib';

describe('`array` function test', () => {
  it('should restrict the basic type', () => {
    const schema = racoon.array();
    expect(schema.validate([])).to.deep.eq([]);
    const array = [1, 'abc', { a: 1 }, [2, '3']];
    expect(schema.validate(array)).to.deep.eq(array);
    expect(() => schema.validate(1)).to.throw('value should be typeof array');
  });

  it('`default` should make a default return when value is undefined/null/empty', () => {
    const schema = racoon.array().default(() => [1, 2]);
    expect(schema.validate()).to.deep.eq([1, 2]);
    expect(schema.validate(undefined)).to.deep.eq([1, 2]);
    expect(schema.validate(null)).to.deep.eq([1, 2]);
    expect(() => schema.validate(NaN)).to.throw('value should be typeof array');
    expect(schema.validate([])).to.deep.eq([]);
    expect(schema.validate([1, 2, 3])).to.deep.eq([1, 2, 3]);

    const schema2 = racoon.array().default(() => ([1, 2]), true);
    expect(schema2.validate()).to.deep.eq([1, 2]);
    expect(schema2.validate(undefined)).to.deep.eq([1, 2]);
    expect(schema2.validate(null)).to.deep.eq([1, 2]);
    expect(schema2.validate([])).to.deep.eq([1, 2]);
    expect(schema2.validate([1, 2, 3])).to.deep.eq([1, 2, 3]);
  });

  it('`format` should set return value formatter', () => {
    const schema = racoon.array().default([1, 2]).format(value => ({ code: 100, value }));
    expect(schema.validate([1])).to.deep.eq({ code: 100, value: [1] });
    expect(schema.validate(undefined)).to.deep.eq({ code: 100, value: [1, 2] });
    expect(schema.validate(null)).to.deep.eq({ code: 100, value: [1, 2] });
    expect(schema.validate([])).to.deep.eq({ code: 100, value: [] });

    const schema2 = racoon.array().default([1, 2], true).format(value => ({ code: 100, value }));
    expect(schema2.validate([1])).to.deep.eq({ code: 100, value: [1] });
    expect(schema2.validate(undefined)).to.deep.eq({ code: 100, value: [1, 2] });
    expect(schema2.validate(null)).to.deep.eq({ code: 100, value: [1, 2] });
    expect(schema2.validate([])).to.deep.eq({ code: 100, value: [1, 2] });
  });

  it('`min` should restrict the min length of array', () => {
    const schema = racoon.array().min(3);
    expect(schema.validate([1, 2, 3])).to.deep.eq([1, 2, 3]);
    expect(schema.validate(['a', 'b', 'c', 'd'])).to.deep.eq(['a', 'b', 'c', 'd']);
    expect(() => schema.validate([1, 2])).to.throw('value length should greater than or equal 3');

    const schema2 = racoon.array().min(3, false);
    expect(() => schema2.validate([1, 2, 3])).to.throw('value length should greater than 3');
    expect(schema2.validate([1, 2, 3, 4])).to.deep.eq([1, 2, 3, 4]);
  });

  it('`max` mshould restrict the max length of array', () => {
    const schema = racoon.array().max(3);
    expect(schema.validate([1, 2, 3])).to.deep.eq([1, 2, 3]);
    expect(schema.validate([1, 2])).to.deep.eq([1, 2]);
    expect(() => schema.validate([1, 2, 3, 4])).to.throw('value length should less than or equal 3');

    const schema2 = racoon.array().max(3, false);
    expect(() => schema2.validate([1, 2, 3])).to.throw('value length should less than 3');
    expect(schema2.validate([1, 2])).to.deep.eq([1, 2]);
  });

  it('`custom` should restrict by user custom function', () => {
    const schema = racoon.array().custom((array) => {
      if (array.join('').startsWith('ab')) {
        return true;
      }
      throw new Error('value should starts with "ab"');
    });
    expect(schema.validate(['a', 'b'])).to.deep.eq(['a', 'b']);
    expect(schema.validate(['a', 'b', 'c'])).to.deep.eq(['a', 'b', 'c']);
    expect(() => schema.validate(['b', 'c'])).to.throw('value should starts with "ab"');
  });

  it('`required` should restrict the data is required', () => {
    const schema = racoon.array().required();
    expect(schema.validate([])).to.deep.eq([]);
    expect(schema.validate([1, 'abc'])).to.deep.eq([1, 'abc']);
    expect(() => schema.validate()).to.throw('value is required and should not be undefined/null');
    expect(() => schema.validate(null)).to.throw('value is required and should not be undefined/null');

    const schema2 = racoon.array().required(true);
    expect(schema2.validate([1, 'abc'])).to.deep.eq([1, 'abc']);
    expect(() => schema2.validate()).to.throw('value is required and should not be empty');
    expect(() => schema2.validate(null)).to.throw('value is required and should not be empty');
    expect(() => schema2.validate([])).to.throw('value is required and should not be empty');
  });

  it('`items` should restrict the type of array item', () => {
    const schema = racoon.array(
      racoon.number().int().min(1).max(6, false)
    );
    expect(schema.validate([1, 2, 3, 4, 5])).to.deep.eq([1, 2, 3, 4, 5]);
    expect(
      () => schema.validate([1, 2, 3, 4, 5, 6])
    ).to.throw('"[5]": value should less than 6');

    const schema2 = racoon.array(
      racoon.object({
        name: racoon.string().min(3).max(5).required(),
        age: racoon.number().int().min(1).max(199),
        friends: racoon.array(
          racoon.object({
            gender: racoon.boolean().required(),
            age: racoon.number().max(199)
          })
        )
      })
    );
    const array = [
      {
        name: 'Tom',
        age: 22,
        friends: [
          {
            age: 2,
            gender: false
          }
        ]
      },
      {
        name: 'Jack',
        age: 36,
        friends: [
          {
            age: 2,
            gender: true
          },
          {
            gender: false,
            age: 199
          }
        ]
      }
    ];
    const clone = JSON.parse(JSON.stringify(array));
    expect(schema2.validate(array)).to.deep.eq(clone);
    array[1].friends[1].age = 200;
    expect(() => schema2.validate(array)).to.throw('"[1].friends[1].age": value should less than or equal 199');
  });
});
