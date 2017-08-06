/*jslint esversion:6*/
import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import '../../public/css/client-glos.css';
import InputBox from './InputBox.jsx';

import {Correct, Incorrect, NotSet} from '../util/CorrectionStatusMap';
import CorrectColorMap from '../util/CorrectColorMap';


//eslint-disable-next-line
class InputContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      inputBoxStatus: new Array(this.props.numberOfBoxes).fill(NotSet)
    }
    this.userInputAry = new Array(this.props.numberOfBoxes);
    this.inputBoxRef = [];/* An array of references to inputbox dom-elements */ 

    //binds
    this.highLightInputBoxes = this.highLightInputBoxes.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.saveUserInputAry = this.saveUserInputAry.bind(this);
  }

  focusFirstIncorrect() {
    return this.focusIncorrectAfter(-1)
  }

  focusIncorrectAfter(index) {
    for( let i = index + 1; i < this.inputBoxRef.length; i++) {
      if ( this.state.inputBoxStatus[i] != Correct) {
        this.inputBoxRef[i].focus();
        return true;
      }
    }
    return false;
  }

  renderSubmitButton(){
    return(
      <div
        className="submit-button"
        onClick={() => this.submitButtonOnClick()
        }> Submit! </div>
    );
  }

  submitButtonOnClick(){
    this.props.handleSubmit(this.userInputAry).then( ( correctionAry ) => {
      this.answersAreMarked = true;
      this.highLightInputBoxes(correctionAry , () => this.focusFirstIncorrect());
    });
  }

  saveUserInputAry(index, value){
    this.userInputAry[index] = value;
    console.log(this.userInputAry)
  }

  handleKeyPress(event, index){
    if(event.key == 'Enter'){
      if(index + 1 < this.inputBoxRef.length){
        if (this.answersAreMarked)
          this.focusIncorrectAfter(index);
        else
          this.inputBoxRef[index + 1].focus();
      } else {
        this.submitButtonOnClick();
      }
    }
  }

  renderInputboxes(){
    let boxes = new Array(this.props.numberOfBoxes).fill(null);
    this.inputBoxRef = [];
    boxes = boxes.map((x, index) => {
      return <InputBox
               key={ index }
               index={ index }
               saveInput={ this.saveUserInputAry }
               onKeyPressProp={this.handleKeyPress}
               /* give a callback so that we can get a reference to the inputbox DOM element */
               inputRef={ el => this.inputBoxRef[index] = el} 
               background_color={
                 CorrectColorMap[this.state.inputBoxStatus[index]]
               } />;
    });
    return boxes;
  }

  highLightInputBoxes(ary, callback) {
    if (callback){
      this.setState({
        inputBoxStatus:ary
      }, callback);
    } else {
      this.setState({
        inputBoxStatus:ary
      })
    }
  }

  render(){
    let boxes = this.renderInputboxes();
    return(
      <div className="input-container">
        <div className="input-flex-container">
          { boxes }
        </div>
        {this.renderSubmitButton()}
      </div>);
  }
}

export {InputContainer, InputBox }
