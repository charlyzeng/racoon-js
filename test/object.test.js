import { expect } from 'chai';
import racoon from '../lib';

describe('`object` function test', () => {
  it('should restrict the basic type', () => {
    const schema = racoon.object();
    expect(schema.validate()).to.be.undefined;
    expect(schema.validate(null)).to.be.null;
    expect(schema.validate({})).to.deep.eq({});
    expect(() => schema.validate(1)).to.throw('value should be typeof object');
    expect(
      () => schema.validate(Promise.resolve())
    ).to.throw('value should be typeof object');
    expect(
      () => schema.validate(() => {})
    ).to.throw('value should be typeof object');
  });

  it('should restrict the basic type and accept custom error message', () => {
    const schema = racoon.object('custom error');
    expect(schema.validate({ a: 1 })).to.deep.eq({ a: 1 });
    expect(() => schema.validate(1)).to.throw(/^custom error$/);

    const schema2 = racoon.array(
      {},
      'custom error 2'
    );
    expect(() => schema2.validate(1)).to.throw(/^custom error 2$/);
  });

  it('`default` should make a default return when value is undefined/null/empty', () => {
    const schema = racoon.object().default(() => ({ a: 1 }));
    expect(schema.validate()).to.deep.eq({ a: 1 });
    expect(schema.validate(undefined)).to.deep.eq({ a: 1 });
    expect(schema.validate(null)).to.deep.eq({ a: 1 });
    expect(() => schema.validate(NaN)).to.throw('value should be typeof object');
    expect(schema.validate({})).to.deep.eq({});
    expect(schema.validate({ a: 2 })).to.deep.eq({ a: 2 });

    const schema2 = racoon.object().default(() => ({ a: 1 }), true);
    expect(schema2.validate()).to.deep.eq({ a: 1 });
    expect(schema2.validate(undefined)).to.deep.eq({ a: 1 });
    expect(schema2.validate(null)).to.deep.eq({ a: 1 });
    expect(schema2.validate({})).to.deep.eq({ a: 1 });
    expect(schema2.validate({ a: 2 })).to.deep.eq({ a: 2 });
  });

  it('`format` should set return value formatter', () => {
    const schema = racoon.object().default({ c: 'c' }).format(value => ({ code: 100, value }));
    expect(schema.validate({ a: 1, b: 2 })).to.deep.eq({ code: 100, value: { a: 1, b: 2 } });
    expect(schema.validate(undefined)).to.deep.eq({ code: 100, value: { c: 'c' } });
    expect(schema.validate(null)).to.deep.eq({ code: 100, value: { c: 'c' } });
    expect(schema.validate({})).to.deep.eq({ code: 100, value: {} });

    const schema2 = racoon.object().default({ c: 'c' }, true).format(value => ({ code: 100, value }));
    expect(schema2.validate({ a: 1, b: 2 })).to.deep.eq({ code: 100, value: { a: 1, b: 2 } });
    expect(schema2.validate(undefined)).to.deep.eq({ code: 100, value: { c: 'c' } });
    expect(schema2.validate(null)).to.deep.eq({ code: 100, value: { c: 'c' } });
    expect(schema2.validate({})).to.deep.eq({ code: 100, value: { c: 'c' } });
  });

  it('`required` should restrict data is required', () => {
    const schema = racoon.object().required();
    expect(schema.validate({})).to.deep.eq({});
    expect(() => schema.validate(null)).to.throw('value is required and should not be undefined/null');

    const schema2 = racoon.object().required(true);
    expect(() => schema2.validate({})).to.throw('value is required and should not be empty');
    expect(schema2.validate({ a: 1 })).to.deep.eq({ a: 1 });
  });

  it('scene the contains unknown field', () => {
    const schema = racoon.object({
      name: racoon.string().required(),
      age: racoon.number().int().min(1).max(99)
    }).stripUnknown().required();
    const data = {
      name: 'Tom',
      age: null,
      gender: 'this is a unknown field'
    };
    const dataClone = JSON.parse(JSON.stringify(data));
    expect(schema.validate(data)).to.deep.eq({ name: 'Tom', age: null });

    const schema2 = racoon.object({
      name: racoon.string().required(),
      age: racoon.number().int().min(1).max(99)
    }).allowUnknown().required();
    expect(schema2.validate(data)).to.deep.eq(dataClone);

    const schema3 = racoon.object({
      name: racoon.string().required(),
      age: racoon.number().int().min(1).max(99)
    }).required();
    expect(() => schema3.validate(data)).to.throw('the key `gender` is not allowed');

    const schema4 = racoon.object({
      name: racoon.string().required(),
      age: racoon.number().int().min(1).max(99),
      cars: racoon.array(
        racoon.object({
          price: racoon.number().min(0).required(),
          brand: racoon.object({
            year: racoon.number().int().required()
          })
        })
      ),
      book: racoon.object({
        title: racoon.string().required()
      })
    }).required();
    expect(
      schema4.validate({
        name: 'Tom',
        age: undefined,
        cars: [
          {
            price: 120000,
            brand: {
              year: 1992
            }
          }
        ],
        book: {
          title: 'War And Peace'
        }
      })
    ).to.deep.eq({
      name: 'Tom',
      age: undefined,
      cars: [
        {
          price: 120000,
          brand: {
            year: 1992
          }
        }
      ],
      book: {
        title: 'War And Peace'
      }
    });

    expect(
      () => schema4.validate({
        name: 'Tom',
        age: undefined,
        cars: [
          {
            price: 120000,
            brand: {
              year: 1992,
              name: 'this is a unknown field'
            }
          }
        ],
        book: {
          title: 'War And Peace'
        }
      })
    ).to.throw('"cars[0].brand": the key `name` is not allowed');

    expect(
      () => schema4.validate({
        name: 'Tom',
        age: undefined,
        cars: [
          {
            price: 120000,
            brand: {
              year: 1992
            }
          }
        ],
        book: {
          title: 'War And Peace',
          author: 'Lev Nikolayevich Tolstoy'
        }
      })
    ).to.throw('"book": the key `author` is not allowed');

    const schema5 = racoon.object({
      name: racoon.string().required(),
      age: racoon.number().int().min(1).max(99),
      cars: racoon.array(
        racoon.object({
          price: racoon.number().min(0).required(),
          'prop.with.dot': racoon.object({
            year: racoon.number().int().required()
          })
        })
      ),
      book: racoon.object({
        title: racoon.string().required()
      })
    }).required();
    expect(
      () => schema5.validate({
        name: 'Tom',
        age: undefined,
        cars: [
          {
            price: 120000,
            'prop.with.dot': {
              year: 1992,
              name: 'this is a unknown field'
            }
          }
        ],
        book: {
          title: 'War And Peace'
        }
      })
    ).to.throw('"cars[0][\'prop.with.dot\']": the key `name` is not allowed');
  });

  it('complex scene 1', () => {
    const schema = racoon.object({
      name: racoon.string().min(3).max(9).required(),
      age: racoon.number().int().min(0).max(199),
      isDanger: racoon.boolean().required()
    }).required(true);
    expect(
      schema.validate({
        name: 'Tom',
        age: 22,
        isDanger: false
      })
    ).to.deep.eq({
      name: 'Tom',
      age: 22,
      isDanger: false
    });
    expect(() => schema.validate({})).to.throw('value is required and should not be empty');
    expect(() => schema.validate()).to.throw('value is required and should not be empty');
    expect(
      () => schema.validate({
        name: 'Tom',
        age: 200,
        isDanger: true
      })
    ).to.throw('"age": value should less than or equal 199');
  });

  it('complex scene 2', () => {
    const schema = racoon.object({
      name: racoon.string().min(3).max(9).required(),
      age: racoon.number().int().min(0).max(199),
      isDanger: racoon.boolean().required(),
      friend: racoon.object({
        name: racoon.string().required(),
        age: racoon.number().int()
      }).required()
    }).required(true);
    expect(
      schema.validate({
        name: 'Tom',
        age: 22,
        isDanger: false,
        friend: {
          name: 'Jack',
          age: 20
        }
      })
    ).to.deep.eq({
      name: 'Tom',
      age: 22,
      isDanger: false,
      friend: {
        name: 'Jack',
        age: 20
      }
    });
    expect(
      () => schema.validate({
        name: 'Tom',
        age: 22,
        isDanger: true,
        friend: {
          name: 'Jack',
          age: 22.3
        }
      })
    ).to.throw('"friend.age": value should be an int');
  });

  it('complex scene 3', () => {
    const schema = racoon.object({
      prop1: racoon.array(
        racoon.object({
          prop2: racoon.object({
            prop3: racoon.array(
              racoon.array(
                racoon.object({
                  prop4: racoon
                    .number()
                    .int()
                    .min(1)
                    .max(3, false)
                    .required()
                })
              )
            )
          })
        })
      )
    }).required(true);
    const data = {
      prop1: [
        {
          prop2: {
            prop3: [
              [],
              [
                {
                  prop4: 3
                }
              ]
            ]
          }
        }
      ]
    };
    expect(() => schema.validate(data)).to.throw('"prop1[0].prop2.prop3[1][0].prop4": value should less than 3');
    data.prop1[0].prop2.prop3[1][0].prop4 = 2;
    const clone = JSON.parse(JSON.stringify(data));
    expect(schema.validate(data)).to.deep.eq(clone);
  });
});
