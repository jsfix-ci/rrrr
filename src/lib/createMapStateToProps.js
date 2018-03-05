import warning from 'warning';

const createMapStateToProps = propsFn => (state, props) => {
  const mappedProps = propsFn(state, props) || {};
  ['history', 'location', 'match'].forEach((key) => {
    if (key in mappedProps) {
      warning(
        true,
        `attempted to define a 'React Router' reserved prop name: ${key} -- overwriting this key can cause unexpected behavior and has been unset`,
      );
      delete mappedProps[key];
    }
  });
  return {
    ...mappedProps,
    storeProps: mappedProps,
  };
};

export default createMapStateToProps;
