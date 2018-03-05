const isFunction = v => typeof v === 'function';

const defaultAction = {
  start: () => ({}),
  end: () => ({}),
  error: () => ({}),
};

// helper to create the object for the reducer
const makeAction = (append = '', action = {}, result = {}, ownProps = null) => ({
  type: `ACTION${append}`,
  ...defaultAction,
  ...action,
  result,
  props: ownProps,
});

const createMapDispatchToActions = actionsToMap => (dispatch) => {
  const actions = Object.keys(actionsToMap);
  const mappedActions = {};

  actions.forEach((action) => {
    const actionToPerform = actionsToMap[action];
    mappedActions[action] = (...ownProps) => {
      if (isFunction(actionToPerform)) {
        const syncAction = {
          end: ({ state = {} } = {}) => actionToPerform(...ownProps, { props: ownProps, state }),
        };
        dispatch(makeAction('_FULFILLED', syncAction));
        return;
      }
      if (isFunction(actionToPerform.start)) {
        dispatch(makeAction('_PENDING', actionToPerform, {}, ownProps));
      }
      Promise.resolve(actionToPerform.action(...ownProps))
        .then((result) => {
          dispatch(makeAction('_FULFILLED', actionToPerform, result, ownProps));
        })
        .catch((err) => {
          dispatch(makeAction('_REJECTED', actionToPerform, err, ownProps));
        });
    };
  });

  return { storeActions: mappedActions };
};

export default createMapDispatchToActions;
