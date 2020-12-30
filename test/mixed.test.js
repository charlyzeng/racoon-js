import { expect } from 'chai';
import racoon from '../lib';

describe('schema#mixed', () => {
  describe('should restrict value to be one of types', () => {
    it('it should deny empty arguments', () => {
      expect(() => racoon.mixed()).to.throw('mixed arguments should not be empty');
    });

    it('only simple schemas', () => {
      const schema = racoon.mixed(
        racoon.number(),
        racoon.array(racoon.number()),
      );

      expect(schema.validate(123)).to.eq(123);
      expect(schema.validate([123])).to.deep.eq([123]);
      expect(() => schema.validate('abc')).to.throw('value should be a type of array');
    });
  });
});
