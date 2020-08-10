import { expect } from 'chai';
import racoon from '../lib';

describe('`number` function test', () => {
  it('should restrict the basic type', () => {
    const schema = racoon.number();
    expect(schema.validate(0.1)).to.eq(0.1);
    expect(() => schema.validate(NaN)).to.throw('value is not allowed to be NaN');
    expect(() => schema.validate('abc')).to.throw('value should be typeof number');
  });

  it('`required` should restrict value to be required', () => {
    const schema1 = racoon.number().required();
    expect(schema1.validate(1)).to.eq(1);
    expect(() => schema1.validate()).to.throw('value is required and should not be undefined/null');
    expect(() => schema1.validate(null)).to.throw('value is required and should not be undefined/null');
    expect(() => schema1.validate(NaN)).to.throw('value is not allowed to be NaN');

    const schema2 = racoon.number().allowNaN().required();
    expect(schema2.validate(1)).to.eq(1);
    expect(schema2.validate(NaN)).to.be.NaN;
    expect(() => schema2.validate()).to.throw('value is required and should not be undefined/null');
    expect(() => schema2.validate(null)).to.throw('value is required and should not be undefined/null');
  });

  it('`enum` should restrict enum type', () => {
    const schema = racoon.number().enum(1, 5, 7).required();
    expect(schema.validate(1)).to.eq(1);
    expect(schema.validate(5)).to.eq(5);
    expect(schema.validate(7)).to.eq(7);
    expect(() => schema.validate(3)).to.throw('value should be one of [1,5,7]');
    expect(() => schema.validate(null)).to.throw('value is required and should not be undefined/null');
  });

  it('`min` should restrict the min value', () => {
    const schema = racoon.number().min(1);
    expect(schema.validate(1)).to.eq(1);
    expect(schema.validate(2)).to.eq(2);
    expect(() => schema.validate(0)).to.throw('value should greater than or equal 1');

    const schema2 = racoon.number().min(1, false);
    expect(() => schema2.validate(1)).to.throw('value should greater than 1');
    expect(schema2.validate(2)).to.eq(2);
  });

  it('`max` should restrict the max value', () => {
    const schema = racoon.number().max(1);
    expect(schema.validate(1)).to.eq(1);
    expect(schema.validate(0)).to.eq(0);
    expect(() => schema.validate(2)).to.throw('value should less than or equal 1');

    const schema2 = racoon.number().max(1, false);
    expect(() => schema2.validate(1)).to.throw('value should less than 1');
    expect(schema2.validate(0)).to.eq(0);
  });

  it('`int` should restrict the number be integer', () => {
    const schema = racoon.number().int();
    expect(schema.validate(0)).to.eq(0);
    expect(schema.validate(-1)).to.eq(-1);
    expect(schema.validate(-0)).to.eq(0);
    expect(schema.validate(2.0)).to.eq(2);
    expect(() => schema.validate(NaN)).to.throws('value is not allowed to be NaN');
    expect(() => schema.validate(2.01)).to.throw('value should be an int');
  });

  it('`custom` should restrict by user custom function', () => {
    const schema = racoon.number().custom((val) => {
      if (val % 2 === 0 || val % 3 === 0) {
        return true;
      }
      throw new Error('value should can be devided by 2 or 3');
    });
    expect(schema.validate(4)).to.eq(4);
    expect(schema.validate(9)).to.eq(9);
    expect(() => schema.validate(5)).to.throw('value should can be devided by 2 or 3');
  });

  it('`default` should make a default return when value is undefined/null/NaN', () => {
    const schema1 = racoon.number().default(100);
    expect(schema1.validate()).to.eq(100);
    expect(schema1.validate(undefined)).to.eq(100);
    expect(schema1.validate(null)).to.eq(100);
    expect(schema1.validate(0)).to.eq(0);
    expect(() => schema1.validate(NaN)).to.throw('value is not allowed to be NaN');

    const schema2 = racoon.number().allowNaN().default(100);
    expect(schema2.validate()).to.eq(100);
    expect(schema2.validate(undefined)).to.eq(100);
    expect(schema2.validate(null)).to.eq(100);
    expect(schema2.validate(NaN)).to.eq(100);
    expect(schema2.validate(0)).to.eq(0);
  });

  it('`format` should set return value formatter', () => {
    const schema1 = racoon.number().format(num => num * 2);
    expect(schema1.validate(1)).to.be.eq(2);
    expect(schema1.validate(3)).to.be.eq(6);
    expect(schema1.validate(undefined)).to.be.NaN;

    const schema2 = racoon.number().default(5).format(num => num * 2);
    expect(schema2.validate(1)).to.be.eq(2);
    expect(schema2.validate(3)).to.be.eq(6);
    expect(schema2.validate()).to.be.eq(10);
    expect(schema2.validate(undefined)).to.be.eq(10);
    expect(schema2.validate(null)).to.be.eq(10);
    expect(() => schema2.validate(NaN)).to.throw('value is not allowed to be NaN');

    const schema3 = racoon.number().allowNaN().default(5).format(num => num * 2);
    expect(schema3.validate(undefined)).to.be.eq(10);
    expect(schema3.validate(null)).to.be.eq(10);
    expect(schema3.validate(NaN)).to.be.eq(10);
  });

  it('complex scene 1', () => {
    const schema = racoon.number().min(-1).max(1, false).required();
    expect(schema.validate(-1)).to.eq(-1);
    expect(schema.validate(0)).to.eq(0);
    expect(() => schema.validate(1)).to.throw('value should less than 1');
    expect(() => schema.validate(-2)).to.throw('value should greater than or equal -1');
    expect(() => schema.validate()).to.throw('value is required and should not be undefined/null');
  });

  it('complex scene 2', () => {
    const schema = racoon.number().max(1, false).required().min(-1);
    expect(schema.validate(-1)).to.eq(-1);
    expect(schema.validate(0)).to.eq(0);
    expect(() => schema.validate(1)).to.throw('value should less than 1');
    expect(() => schema.validate(-2)).to.throw('value should greater than or equal -1');
    expect(() => schema.validate()).to.throw('value is required and should not be undefined/null');
  });

  it('complex scene 3', () => {
    const schema1 = racoon.number().min(-1).max(1, false);
    expect(schema1.validate(undefined)).to.undefined;
    expect(schema1.validate(null)).to.be.null;
    expect(schema1.validate(null)).to.be.null;
    expect(schema1.validate(-1)).to.eq(-1);
    expect(schema1.validate(0)).to.eq(0);
    expect(() => schema1.validate(NaN)).to.throw('value is not allowed to be NaN');
    expect(() => schema1.validate(1)).to.throw('value should less than 1');
    expect(() => schema1.validate(-2)).to.throw('value should greater than or equal -1');

    const schema2 = racoon.number().allowNaN();
    expect(schema2.validate(NaN)).to.be.NaN;
  });
});
