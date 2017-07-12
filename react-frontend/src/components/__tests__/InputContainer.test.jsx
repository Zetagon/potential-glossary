import React from 'react';
import {InputContainer, InputBox } from '../InputContainer.jsx'
import renderer from 'react-test-renderer';

test('number of boxes equal to synonyms', ()=> {
  let answer = {
    synonyms: [
      {
        alternatives: [
          {text: "hej"},
          {text: "hejsan"}
        ]
      },
      {
        alternatives: [
          {text: "god kväll"},
          {text: "god afton"}
        ]
      }
    ]
  } 

  const component = renderer.create(
    <InputContainer numberOfBoxes={ answer.synonyms.length }/>
  )

  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  answer = {
    synonyms: [
      {
        alternatives: [
          {text: "hallao"},
          {text: "nej"}
        ]
      },
      {
        alternatives: [
          {text: "hallao"},
          {text: "hejsan"}
        ]
      },
      {
        alternatives: [
          {text: "hej"},
          {text: "hejsan"}
        ]
      },
      {
        alternatives: [
          {text: "god kväll"},
          {text: "god afton"}
        ]
      }
    ]
  } 

  const component1 = renderer.create(
    <InputContainer numberOfBoxes={ answer.synonyms.length }/>
  )

  let tree = component1.toJSON();
  expect(tree).toMatchSnapshot();
});
