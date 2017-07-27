/**
 * @fileOverview Main file for glossary trainer
 * @name GlossaryTrainer.jsx
 * @author 
 * @license 
 */
/*jslint esversion:6*/
import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import '../../public/css/client-glos.css';
import {DescriptionContainer} from './DescriptionContainer.jsx'
import {InputContainer, InputBox } from './InputContainer.jsx'

class GlossaryTrainer extends Component {
  constructor(props){
    super(props);
    this.setCorrectionString = this.setCorrectionString.bind(this);
    this.state = {
      correctionMessage: "Correction!" 
    }

  }

  setCorrectionString(correction){
    this.setState({correctionMessage:correction});
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
    this.setCorrectionString('fel svar!');
  }

  render(){
    return (
      <div className="App">
        <DescriptionContainer
          descriptionText="hej"
          descriptionImage="https://upload.wikimedia.org/wikipedia/commons/6/6c/Tomato-global.png"
        />
        <InputContainer numberOfBoxes={ 5 } onClickProp={this.handleSubmit.bind(this)}/>
        { this.renderCorrectionArea() }
      </div>
    );
  }
}
export {GlossaryTrainer}
