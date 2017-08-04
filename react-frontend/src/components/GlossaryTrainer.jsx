/**
 * @fileOverview Main file for glossary trainer
 * @name GlossaryTrainer.jsx
 * @author 
 * @license 
 */
/*jslint esversion:6*/
import React, { Component } from 'react';
import io from 'socket.io-client'
import logo from '../logo.svg';
import '../App.css';
import '../../public/css/client-glos.css';
import {DescriptionContainer} from './DescriptionContainer.jsx'
import {InputContainer, InputBox } from './InputContainer.jsx'
import CorrectionArea from './CorrectionArea.jsx'

class GlossaryTrainer extends Component {
  constructor(props){
    super(props);
    this.setCorrectionString = this.setCorrectionString.bind(this);
    this.state = {
      correctionMessage: "Correction!",
      descriptions: []
    }
    this.socket = io('/');
    this.socket.emit('getDescription');
    this.socket.on('getDescriptionResponse', (data) => {
      console.log('description received!' + data)
      this.setState({descriptions:data});
    })

  }

  setCorrectionString(correction){
    this.setState({correctionMessage:correction});
  }


  handleSubmit(){
    this.setCorrectionString('fel svar!');
  }

  render(){
    return (
      <div className="App">
        <DescriptionContainer
          descriptions={this.state.descriptions}
        />
        <InputContainer
          socket={this.socket}
          numberOfBoxes={ 5 }
          onClickProp={this.handleSubmit.bind(this)}
        />
        <CorrectionArea message={this.state.correctionMessage}/>
      </div>
    );
  }
}
export {GlossaryTrainer}
