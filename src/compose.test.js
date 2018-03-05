import React from 'react';
import { mount } from 'enzyme';
import { compose, create } from 'App';

const props = () => ({ one: 1 });
const actions = {
  whatever: () => {},
};
const ComponentToCompose = () => <div className="select" />;
const ComposedComponent = compose(ComponentToCompose, { props, actions });

const Component = () => <ComposedComponent someProp={false} />;

describe('compose', () => {
  it('should assign props to a component in the correct fashion', () => {
    const wrapper = mount(create(Component));
    const composedNode = wrapper.find('.select').parent();
    const cnProps = composedNode.props();
    cnProps.someProp.should.equal(false);
    cnProps.renderProps.someProp.should.equal(false);
    (typeof cnProps.routerProps.match === 'object').should.equal(true);
    (typeof cnProps.routerProps.location === 'object').should.equal(true);
    (typeof cnProps.routerProps.history === 'object').should.equal(true);
    cnProps.storeProps.one.should.equal(1);
    (typeof cnProps.storeActions.whatever === 'function').should.equal(true);
  });
});
