import React from 'react';
import renderer from 'react-test-renderer';
import { GlossaryTrainer } from '../GlossaryTrainer.jsx'


test('test',()=>{
    const component = renderer.create(
      <GlossaryTrainer/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    component.getInstance().setCorrectionString('this is a test string');
    tree = component.toJSON();
    expect( tree ).toMatchSnapshot();
})
