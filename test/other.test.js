import { expect } from 'chai';
import racoon from '../lib';

describe('other test', () => {
  it('`format` should bind ctx', () => {
    const obj = {
      formatNum(num) {
        return this.abs(num).toFixed(2);
      },
      abs(num) {
        return Math.abs(num);
      }
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
      }
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
      }
    };
    const schema1 = racoon.number().allowNaN().default(obj.getDefault, obj);
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
});
