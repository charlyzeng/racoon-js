import { expect } from 'chai';
import racoon from '../lib';

describe('schema#object', () => {
  describe('should restrict the detected value to be a type of object', () => {
    it('without custom error', () => {
      const schema = racoon.object();

      expect(schema.validate({ a: 1 })).to.deep.eq({ a: 1 });
      expect(schema.validate(null)).to.be.null;
      expect(schema.validate(undefined)).to.be.undefined;
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

  // ============== here

  it('scene the contains unknown field', () => {
    const schema1 = racoon.object({
      name: racoon.string().required(),
      age: racoon.number().int()
        .min(1)
        .max(99),
    }).stripUnknown()
      .required();
    const data = {
      name: 'Tom',
      age: null,
      gender: 'this is a unknown field',
    };
    const dataClone = JSON.parse(JSON.stringify(data));
    expect(schema1.validate(data)).to.deep.eq({ name: 'Tom', age: null });

    const schema2 = racoon.object({
      name: racoon.string().required(),
      age: racoon.number().int()
        .min(1)
        .max(99),
    }).allowUnknown()
      .required();
    expect(schema2.validate(data)).to.deep.eq(dataClone);

    const schema3 = racoon.object({
      name: racoon.string().required(),
      age: racoon.number().int()
        .min(1)
        .max(99),
    }).required();
    expect(() => schema3.validate(data)).to.throw('the key `gender` is not allowed');

    const schema4 = racoon.object({
      name: racoon.string().required(),
      age: racoon.number().int()
        .min(1)
        .max(99),
      cars: racoon.array(racoon.object({
        price: racoon.number().min(0)
          .required(),
        brand: racoon.object({
          year: racoon.number().int()
            .required(),
        }),
      })),
      book: racoon.object({
        title: racoon.string().required(),
      }),
    }).required();
    expect(schema4.validate({
      name: 'Tom',
      age: undefined,
      cars: [
        {
          price: 120000,
          brand: {
            year: 1992,
          },
        },
      ],
      book: {
        title: 'War And Peace',
      },
    })).to.deep.eq({
      name: 'Tom',
      age: undefined,
      cars: [
        {
          price: 120000,
          brand: {
            year: 1992,
          },
        },
      ],
      book: {
        title: 'War And Peace',
      },
    });

    expect(() => schema4.validate({
      name: 'Tom',
      age: undefined,
      cars: [
        {
          price: 120000,
          brand: {
            year: 1992,
            name: 'this is a unknown field',
          },
        },
      ],
      book: {
        title: 'War And Peace',
      },
    })).to.throw('"cars[0].brand": the key `name` is not allowed');

    expect(() => schema4.validate({
      name: 'Tom',
      age: undefined,
      cars: [
        {
          price: 120000,
          brand: {
            year: 1992,
          },
        },
      ],
      book: {
        title: 'War And Peace',
        author: 'Lev Nikolayevich Tolstoy',
      },
    })).to.throw('"book": the key `author` is not allowed');

    const schema5 = racoon.object({
      name: racoon.string().required(),
      age: racoon.number().int()
        .min(1)
        .max(99),
      cars: racoon.array(racoon.object({
        price: racoon.number().min(0)
          .required(),
        'prop.with.dot': racoon.object({
          year: racoon.number().int()
            .required(),
        }),
      })),
      book: racoon.object({
        title: racoon.string().required(),
      }),
    }).required();
    expect(() => schema5.validate({
      name: 'Tom',
      age: undefined,
      cars: [
        {
          price: 120000,
          'prop.with.dot': {
            year: 1992,
            name: 'this is a unknown field',
          },
        },
      ],
      book: {
        title: 'War And Peace',
      },
    })).to.throw('"cars[0][\'prop.with.dot\']": the key `name` is not allowed');

    const schema6 = racoon.object({
      name: racoon.string(),
      age: racoon.number().int(),
    }).stripUnknown();
    expect(schema6.validate({ name: 'Tom' })).to.deep.eq({ name: 'Tom' });

    const schema7 = racoon.object({
      name: racoon.string(),
      age: racoon.number().int(),
    }).allowUnknown()
      .stripUnknown();
    expect(schema7.validate({ name: 'Tom' })).to.deep.eq({ name: 'Tom' });

    const schema8 = racoon.object({
      name: racoon.string(),
      age: racoon.number().int(),
    }).allowUnknown();
    expect(schema8.validate({ name: 'Tom' })).to.deep.eq({ name: 'Tom' });

    const schema9 = racoon.object({
      name: racoon.string(),
      age: racoon.number().int(),
    });
    expect(schema9.validate({ name: 'Tom' })).to.deep.eq({ name: 'Tom' });
  });

  it('complex scene 1', () => {
    const schema = racoon.object({
      name: racoon.string().min(3)
        .max(9)
        .required(),
      age: racoon.number().int()
        .min(0)
        .max(199),
      isDanger: racoon.boolean().required(),
    }).required(true);
    expect(schema.validate({
      name: 'Tom',
      age: 22,
      isDanger: false,
    })).to.deep.eq({
      name: 'Tom',
      age: 22,
      isDanger: false,
    });
    expect(() => schema.validate({})).to.throw('value is required and should not be empty');
    expect(() => schema.validate()).to.throw('value is required and should not be empty');
    expect(() => schema.validate({
      name: 'Tom',
      age: 200,
      isDanger: true,
    })).to.throw('"age": value should be less than or equal to 199');
  });

  it('complex scene 2', () => {
    const schema = racoon.object({
      name: racoon.string().min(3)
        .max(9)
        .required(),
      age: racoon.number().int()
        .min(0)
        .max(199),
      isDanger: racoon.boolean().required(),
      friend: racoon.object({
        name: racoon.string().required(),
        age: racoon.number().int(),
      }).required(),
    }).required(true);
    expect(schema.validate({
      name: 'Tom',
      age: 22,
      isDanger: false,
      friend: {
        name: 'Jack',
        age: 20,
      },
    })).to.deep.eq({
      name: 'Tom',
      age: 22,
      isDanger: false,
      friend: {
        name: 'Jack',
        age: 20,
      },
    });
    expect(() => schema.validate({
      name: 'Tom',
      age: 22,
      isDanger: true,
      friend: {
        name: 'Jack',
        age: 22.3,
      },
    })).to.throw('"friend.age": value should be an integer');
  });

  it('complex scene 3', () => {
    const schema = racoon.object({
      prop1: racoon.array(racoon.object({
        prop2: racoon.object({
          prop3: racoon.array(racoon.array(racoon.object({
            prop4: racoon
              .number()
              .int()
              .min(1)
              .max(3, false)
              .required(),
          }))),
        }),
      })),
    }).required(true);
    const data = {
      prop1: [
        {
          prop2: {
            prop3: [
              [],
              [
                {
                  prop4: 3,
                },
              ],
            ],
          },
        },
      ],
    };
    expect(() => schema.validate(data)).to.throw('"prop1[0].prop2.prop3[1][0].prop4": value should be less than 3');
    data.prop1[0].prop2.prop3[1][0].prop4 = 2;
    const clone = JSON.parse(JSON.stringify(data));
    expect(schema.validate(data)).to.deep.eq(clone);
  });

  it('complex scene 4', () => {
    const schema = racoon.object({
      user: racoon.object({
        name: racoon.string(),
      }),
    }).required(true);
    const data = {
      user: null,
    };
    expect(schema.validate(data)).to.deep.eq({ user: null });
  });

  it('complex scene 5', () => {
    const schema1 = racoon.object({
      prop1: racoon.object({
        prop2: racoon.array(racoon.object({
          prop4: racoon.number().int()
            .required(),
        }).required(true)),
      }),
    }).required(true);
    const data1 = {
      prop1: {
        prop2: [{ prop4: 1 }, { prop4: 1.2 }],
      },
    };
    expect(() => schema1.validate(data1)).to.throw('"prop1.prop2[1].prop4": value should be an integer');

    const schema2 = racoon.object({
      prop1: racoon.object({
        prop2: racoon.array(racoon.object({
          prop4: racoon
            .number()
            .error('error1')
            .int()
            .error('error2')
            .required()
            .error('error3'),
        }).required(true)),
      }),
    }).required(true);
    const data2 = {
      prop1: {
        prop2: [{ prop4: 1 }, { prop4: 1.2 }],
      },
    };
    expect(() => schema2.validate(data2)).to.throw('error2');
    data2.prop1.prop2[1].prop4 = 'abc';
    expect(() => schema2.validate(data2)).to.throw('error1');
    data2.prop1.prop2[1].prop4 = null;
    expect(() => schema2.validate(data2)).to.throw('error3');

    data2.prop1.prop2[1] = null;
    expect(() => schema2.validate(data2)).to.throw('"prop1.prop2[1]": value is required and should not be empty');

    const schema3 = racoon.object({
      prop1: racoon.object({
        prop2: racoon.array(racoon.object({
          prop4: racoon
            .number()
            .error('error1')
            .int()
            .error('error2')
            .required()
            .error('error3'),
        }).required(true)
          .error('error4')
          .errorForAll('error for all')),
      }),
    }).required(true);

    const data3 = {
      prop1: {
        prop2: [null],
      },
    };
    expect(() => schema3.validate(data3)).to.throw('error4');
    expect(() => schema3.validate([])).to.throw('value should be a type of object');
    data3.prop1.prop2[0] = [];
    expect(() => schema3.validate(data3)).to.throw('error for all');
  });

  it('complex scene 6', () => {
    const data = {
      style: {
        color: 'red',
      },
    };
    const schema = racoon.object({
      style: racoon
        .object({
          color: racoon.string(),
        })
        .format(s => (s && s.color ? JSON.stringify(s) : undefined)),
    });
    expect(schema.validate(data)).to.deep.eq({
      style: '{"color":"red"}',
    });
  });

  it('complex scene 7', () => {
    const data = {
      prop1: {
        prop2: {
          prop3: [
            [
              {
                prop4: 'abc',
              },
            ],
          ],
        },
      },
    };
    const schema = racoon.object({
      prop1: racoon.object({
        prop2: racoon.object({
          prop3: racoon.array(racoon.array(racoon.object({
            prop4: racoon.string(),
          })).format(a => JSON.stringify(a))),
        }).format(obj => JSON.stringify(obj)),
      }),
    });
    expect(schema.validate(data)).to.deep.eq({
      prop1: {
        prop2: '{"prop3":["[{\\"prop4\\":\\"abc\\"}]"]}',
      },
    });

    data.prop1.prop2.prop3[0].push(null, undefined);
    expect(schema.validate(data)).to.deep.eq({
      prop1: {
        prop2: '{"prop3":["[{\\"prop4\\":\\"abc\\"},null,null]"]}',
      },
    });
  });
});
