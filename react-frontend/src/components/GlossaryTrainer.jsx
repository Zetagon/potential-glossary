/*jslint esversion:6*/
import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import '../../public/css/client-glos.css';
import {DescriptionContainer} from './DescriptionContainer.jsx'
import {InputContainer, InputBox } from './InputContainer.jsx'

class GlossaryTrainer extends Component {
  constructor(){
    super();
    this.state = {
      correctionMessage: "Correction!" 
    }
  }

  getCorrectAnswers(){
    return {
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
  }

  renderCorrectionArea(){
    return(
      <div className="correction-container">
        <div>
          <div className="error-text"> {this.state.correctionMessage} </div>
        </div>
      </div>
    );
  }

  handleSubmit(){
    alert('hello!');
  }

  render(){
    return (
      <div className="App">
        <DescriptionContainer/>
        <InputContainer numberOfBoxes={ 5 } onClickProp={this.handleSubmit}/>
        { this.renderCorrectionArea() }
      </div>
    );
  }
}
export {GlossaryTrainer}
