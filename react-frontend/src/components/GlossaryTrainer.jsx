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

import {Correct, Incorrect, NotSet} from '../util/CorrectionStatusMap';

class GlossaryTrainer extends Component {
  constructor(props){
    super(props);
    this.setCorrectionString = this.setCorrectionString.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      correctionMessage: "Correction!",
      descriptions: [],
      toggle_status_key: true
    }
    this.socket = io('/');
    this.socket.emit('getDescription');
    this.socket.on('getDescriptionResponse', (data) => {
      console.log('description received!' + data)
      this.setState({
        descriptions:data,
        toggle_status_key: !this.state.toggle_status_key
      });
    })

  }

  setCorrectionString(correction){
    this.setState({correctionMessage:correction});
  }


  handleSubmit(){
    this.socket.emit('sendUserInput');

    return new Promise(( resolve , reject ) => {
      this.socket.on('sendUserInputResponse', (data) => {
        console.log(data)
        let ary = [];
        let number_of_correct = 0;
        for (let i = 0; i < data.length; i++) {
          if(data[i]) {
            ary.push(Correct);
            number_of_correct++;
          }
          else ary.push(Incorrect);
        }
        if( number_of_correct == data.length) {
          this.setCorrectionString("Correct");
        } else {
          this.setCorrectionString("Incorrect!")
        }
        resolve( ary );
      })
    });
  }

  render(){
    return (
      <div className="App">
        <button onClick={()=> this.socket.emit('getDescription')}/>
        <DescriptionContainer
          descriptions={this.state.descriptions}
        />
        <InputContainer
          key={this.state.toggle_status_key}
          handleSubmit={ this.handleSubmit }
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
