import { expect } from 'chai';
import racoon from '../lib';

describe('`boolean` function test', () => {
  it('should restrict the basic type', () => {
    const schema = racoon.boolean();
    expect(schema.validate(true)).to.be.true;
    expect(schema.validate(false)).to.be.false;
    expect(() => schema.validate(1)).to.throw('value should be typeof boolean');
  });

  it('should restrict the basic type and accept custom error', () => {
    const schema = racoon.boolean().error('custom error');
    expect(schema.validate(true)).to.be.true;
    expect(schema.validate(false)).to.be.false;
    expect(() => schema.validate(1)).to.throw(/^custom error$/);
  });

  it('`enum` should restrict the enum type', () => {
    const schema = racoon.boolean().enum(false);
    expect(schema.validate(false)).to.be.false;
    expect(() => schema.validate(true)).to.throw('value should be one of [false]');
  });

  it('`enum` should restrict the enum type and accept custom error', () => {
    const schema = racoon.boolean().enum(false).error('custom error');
    expect(schema.validate(false)).to.be.false;
    expect(() => schema.validate(true)).to.throw(/^custom error$/);
  });

  it('`default` should deny empty arguments', () => {
    expect(() => racoon.boolean().default()).to.throw('`default` args can not be empty');
  });

  it('`default` should make a default return when value is undefined/null', () => {
    const schema = racoon.boolean().default(true);
    expect(schema.validate()).to.be.true;
    expect(schema.validate(undefined)).to.be.true;
    expect(schema.validate(null)).to.be.true;
    expect(schema.validate(false)).to.be.false;
    expect(schema.validate(true)).to.be.true;
  });

  it('`custom` should restrict by user custom function', () => {
    const schema = racoon.boolean().custom((val) => {
      if (val === false) {
        return true;
      }
      throw new Error('value should can be false');
    });
    expect(schema.validate(false)).to.be.false;
    expect(() => schema.validate(true)).to.throw('value should can be false');
  });

  it('complex scene 1', () => {
    const schema = racoon.boolean().required();
    expect(schema.validate(true)).to.be.true;
    expect(schema.validate(false)).to.be.false;
    expect(() => schema.validate(undefined)).to.throw('value is required and should not be undefined/null');
    expect(() => schema.validate(null)).to.throw('value is required and should not be undefined/null');
  });

  it('complex scene 2', () => {
    const schema = racoon.boolean().required().error('custom error');
    expect(schema.validate(true)).to.be.true;
    expect(schema.validate(false)).to.be.false;
    expect(() => schema.validate(undefined)).to.throw(/^custom error$/);
    expect(() => schema.validate(null)).to.throw(/^custom error$/);
  });

  it('complex scene 3', () => {
    const schema = racoon
      .boolean()
      .error('error1')
      .required()
      .error('error2');
    expect(schema.validate(true)).to.be.true;
    expect(schema.validate(false)).to.be.false;
    expect(() => schema.validate(1)).to.throw(/^error1$/);
    expect(() => schema.validate(null)).to.throw(/^error2$/);
  });
});
