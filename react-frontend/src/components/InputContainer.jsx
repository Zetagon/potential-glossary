/*jslint esversion:6*/
import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import '../../public/css/client-glos.css';

//eslint-disable-next-line
class InputBox extends Component {
  constructor(props){
    super(props);
    this.focus = this.focus.bind(this);
  }


  focus() {
    this.textInput.focus();
  }


  render(){
    let divStyle = {
      background: this.props.background_color
    };
    return (
      <div
        className="input-box"
        style={divStyle}>
        <input
          className="the-input"
          tabIndex="1"
          ref={ this.props.inputRef}
        />
      </div>
    );
  }
}

const CorrectColorMap = {
  Incorrect:'red',
  Correct:'green',
  NotSet:'white'
}

//eslint-disable-next-line
class InputContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      inputBoxStatus: new Array(this.props.numberOfBoxes).fill('NotSet')
    }
    this.inputBoxRef = [];/* An array of references to inputbox dom-elements */ 
    this.highLightInputBoxes = this.highLightInputBoxes.bind(this);
  }

  focusFirstIncorrect() {
    for( let i = 0; i < this.inputBoxRef.length; i++) {
      if ( this.state.inputBoxStatus[i] != 'Correct') {
        this.inputBoxRef[i].focus();
        return
      }
    }
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
    this.highLightInputBoxes([
      'Correct',
      'Correct',
      'Correct',
      'NotSet',
      'Incorrect'
    ], () => this.focusFirstIncorrect());
  }

  renderInputboxes(){
    let boxes = new Array(this.props.numberOfBoxes).fill(null);
    boxes = boxes.map((x, index) => {
      return <InputBox
               key={ index }
               /* give a callback so that we can get a reference to the inputbox DOM element */
               inputRef={ el => this.inputBoxRef.push(el)} 
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
