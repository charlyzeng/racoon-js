import { expect } from 'chai';
import racoon from '../lib';
import { isInt } from '../lib/util/is';
import ValidateError from '../lib/util/validate-error';

describe('other test', () => {
  it('`format` should bind ctx', () => {
    const obj = {
      formatNum(num) {
        return this.abs(num).toFixed(2);
      },
      abs(num) {
        return Math.abs(num);
      },
    };
    const schema = racoon.number().format(obj.formatNum, obj);
    expect(schema.validate(1.2)).to.eq('1.20');
  });

  it('`custom` should bind ctx', () => {
    const obj = {
      isEven(num) {
        return num % 2 === 0;
      },
      isEvenOrOne(num) {
        return this.isEven(num) || num === 1;
      },
    };
    const schema = racoon.number().custom(obj.isEvenOrOne, obj);
    expect(schema.validate(2)).to.eq(2);
  });

  it('`default` should bind ctx', () => {
    const obj = {
      getDefault() {
        return this.getDefaultInner();
      },
      getDefaultInner() {
        return 1;
      },
    };
    const schema1 = racoon.number().allowNaN()
      .default(obj.getDefault, obj);
    expect(schema1.validate(undefined)).to.eq(1);
    expect(schema1.validate(null)).to.eq(1);
    expect(schema1.validate(NaN)).to.eq(1);

    const schema2 = racoon.boolean().default(obj.getDefault, obj);
    expect(schema2.validate(undefined)).to.eq(1);
    expect(schema2.validate(null)).to.eq(1);

    const schema3 = racoon.string().default(obj.getDefault, false, obj);
    expect(schema3.validate(undefined)).to.eq(1);
    expect(schema3.validate(null)).to.eq(1);
    expect(schema3.validate('')).to.eq('');

    const schema4 = racoon.string().default(obj.getDefault, true, obj);
    expect(schema4.validate(undefined)).to.eq(1);
    expect(schema4.validate(null)).to.eq(1);
    expect(schema4.validate('')).to.eq(1);

    const schema5 = racoon.object().default(obj.getDefault, false, obj);
    expect(schema5.validate(undefined)).to.eq(1);
    expect(schema5.validate(null)).to.eq(1);
    expect(schema5.validate({})).to.deep.eq({});

    const schema6 = racoon.object().default(obj.getDefault, true, obj);
    expect(schema6.validate(undefined)).to.eq(1);
    expect(schema6.validate(null)).to.eq(1);
    expect(schema6.validate({})).to.deep.eq(1);

    const schema7 = racoon.array().default(obj.getDefault, false, obj);
    expect(schema7.validate(undefined)).to.eq(1);
    expect(schema7.validate(null)).to.eq(1);
    expect(schema7.validate([])).to.deep.eq([]);

    const schema8 = racoon.array().default(obj.getDefault, true, obj);
    expect(schema8.validate(undefined)).to.eq(1);
    expect(schema8.validate(null)).to.eq(1);
    expect(schema8.validate([])).to.deep.eq(1);

    const schema9 = racoon.any().default(obj.getDefault, false, obj);
    expect(schema9.validate(undefined)).to.eq(1);
    expect(schema9.validate(null)).to.eq(1);
    expect(schema9.validate(NaN)).to.eq(1);

    const schema10 = racoon.any().default(obj.getDefault, true, obj);
    expect(schema10.validate(undefined)).to.eq(1);
    expect(schema10.validate(null)).to.eq(1);
    expect(schema10.validate(NaN)).to.eq(1);
    expect(schema10.validate('')).to.eq(1);
    expect(schema10.validate({})).to.eq(1);
    expect(schema10.validate([])).to.eq(1);
  });

  it('`error` should bind ctx', () => {
    let counter = 0;
    const obj = {
      getErrorMessage(message) {
        return this.getMessage(message);
      },
      getMessage(message) {
        counter += 1;
        return `${message}#${counter}`;
      },
    };

    const schema1 = racoon
      .number()
      .error(obj.getErrorMessage, obj)
      .int()
      .error(obj.getErrorMessage, obj)
      .min(1)
      .error(obj.getErrorMessage, obj)
      .max(5)
      .error(obj.getErrorMessage, obj)
      .required()
      .allowNaN()
      .error(obj.getErrorMessage, obj);

    expect(() => schema1.validate('abc')).to.throw('value should be typeof number#1');
    expect(() => schema1.validate(1.2)).to.throw('value should be an int#2');
    expect(() => schema1.validate(0)).to.throw('value should greater than or equal 1#3');
    expect(() => schema1.validate(6)).to.throw('value should less than or equal 5#4');
    expect(() => schema1.validate(null)).to.throw('value is required and should not be undefined/null#5');
    expect(() => schema1.validate(undefined)).to.throw('value is required and should not be undefined/null#6');
    expect(() => schema1.validate(NaN)).to.throw('value is required and should not be NaN#7');
  });

  it('`isInt` should work', () => {
    expect(isInt(NaN)).to.be.false;
    expect(isInt({})).to.be.false;
    expect(isInt(true)).to.be.false;
    expect(isInt('abc')).to.be.false;
    expect(isInt(1.2)).to.be.false;
    expect(isInt(2)).to.be.true;
  });

  it('object custom error should drop key chain', () => {
    const obj = {
      objProp: {
        name: 123,
      },
    };
    const schema = racoon.object({
      objProp: racoon.object({
        name: racoon
          .string()
          .error('custom error'),
      }),
    });
    expect(() => schema.validate(obj)).to.throw(/^custom error$/);
  });

  it('object validate error should be an instance of ValidateError', () => {
    const obj = {
      objProp: {
        name: 123,
      },
    };
    const schema = racoon.object({
      objProp: racoon.object({
        name: racoon
          .string()
          .error('custom error'),
      }),
    });
    const { error } = schema.validateSilent(obj);
    expect(error).instanceOf(ValidateError);
  });

  it('array custom error should drop key chain', () => {
    const obj1 = {
      objProp: {
        names: ['abc', 123],
      },
    };
    const obj2 = {
      objProp: {
        names: ['abc', null],
      },
    };
    const schema = racoon.object({
      objProp: racoon.object({
        names: racoon
          .array(racoon.string().error('custom error 1')
            .required()
            .error('custom error 2')),
      }),
    });
    expect(() => schema.validate(obj1)).to.throw(/^custom error 1$/);
    expect(() => schema.validate(obj2)).to.throw(/^custom error 2$/);
  });

  it('`custom` callback can return string to respect failure reason', () => {
    const schema1 = racoon.number().custom((num) => {
      if (num % 2 !== 0) {
        return 'value should be even';
      }
      return true;
    });
    expect(schema1.validate(2)).to.eq(2);
    expect(() => schema1.validate(3)).to.throw('value should be even');

    const schema2 = racoon.object().custom((obj) => {
      if (Object.keys(obj).length === 1) {
        return 'object keys can not be 1';
      }
      return true;
    });
    expect(schema2.validate({ a: 1, b: 2 })).to.deep.eq({ a: 1, b: 2 });
    expect(() => schema2.validate({ a: 1 })).to.throw('object keys can not be 1');
  });
});
