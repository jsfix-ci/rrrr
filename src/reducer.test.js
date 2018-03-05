import { reducer } from 'App';

describe('reducer', () => {
  it('should give me a basic new state', () => {
    const r = reducer({ test: 1 }, {
      type: 'ACTION',
      end: () => ({
        test: 2,
        testTwo: 2,
      }),
    });
    r.test.should.equal(2);
    r.testTwo.should.equal(2);
  });
});
