const { isArray } = Array;

export default (namespace, withDefault = {}) => (state = {}, values = {}) => {
  const current = state[namespace];
  if (isArray(values)) {
    return { [namespace]: [...values] };
  }
  return {
    [namespace]: {
      ...withDefault,
      ...current,
      ...values,
    },
  };
};
