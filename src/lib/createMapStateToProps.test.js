import createMapStateToProps from './createMapStateToProps';

describe('createMapStateToProps', () => {
  it('should return a function', () => {
    const mapStateToProps = createMapStateToProps(() => {});
    (typeof mapStateToProps).should.equal('function');
  });
  it('should give me a map of props for the new state', () => {
    const mapStateToProps = createMapStateToProps(() => ({ test: 'one' }));
    const rv = mapStateToProps({ state: {}, props: {} });
    rv.test.should.equal('one');
    rv.storeProps.test.should.equal('one');
  });
});
