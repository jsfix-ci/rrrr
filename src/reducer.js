/**
 * Our default reducer allowing redux to be more easily used without having to create one of these
 * for every action in the system, exposing a simple and concise interface
 * @param {*} state current redux store state
 * @param {*} action the action to perform, with its config
 */

const reducer = (state = {}, action = {}) => {
  const p = { result: action.result, state, props: action.props };
  const make = name => ({ ...state, ...action[name](p) });
  switch (action.type) {
    case 'ACTION':
    case 'ACTION_FULFILLED':
      return make('end');
    case 'ACTION_PENDING':
      return make('start');
    case 'ACTION_REJECTED':
      return make('error');
    default:
      return state;
  }
};

export default reducer;
