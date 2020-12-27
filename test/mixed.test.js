import { expect } from 'chai';
import racoon from '../lib';

describe('schema#mixed', () => {
  it('base', () => {
    const schema = racoon.mixed(
      racoon.number(),
      racoon.array(racoon.number()),
    );
    expect(schema.validate(123)).to.eq(123);
    expect(schema.validate([123])).to.deep.eq([123]);
  });
});
