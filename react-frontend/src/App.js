/*jslint esversion:6*/
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '../public/css/client-glos.css';
import {InputContainer, InputBox } from './components/InputContainer.jsx'
import {DescriptionContainer} from './components/DescriptionContainer.jsx'
import {GlossaryTrainer} from './components/GlossaryTrainer.jsx'


class App extends Component {
  render() {
    return (
      <GlossaryTrainer/>
    );
  }
}


export default App;
