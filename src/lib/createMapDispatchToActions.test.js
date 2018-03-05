import createMapDispatchToActions from './createMapDispatchToActions';

const asyncAction = {};
const syncAction = (a, b, c, { props, state } = {}) => ({ a, b, c, props, state });

const actions = {
  async: asyncAction,
  sync: syncAction,
};

const dispatch = cb => a => cb(a);

const actionsForDispatch = createMapDispatchToActions(actions);

describe('createMapDispatchToActions', () => {
  it('should return a function', () => {
    (typeof actionsForDispatch).should.equal('function');
  });
  it('should give me the correct result when calling dispatch on a sync action', () => {
    const mappedActions = actionsForDispatch(dispatch((r) => {
      const endResult = r.end({ state: { test: 1 } });
      endResult.a.should.equal('a');
      endResult.b.should.equal('b');
      endResult.c.should.equal('c');
      (typeof endResult.props).should.equal('object');
      endResult.state.test.should.equal(1);
    }));
    mappedActions.storeActions.sync('a', 'b', 'c');
  });
});
