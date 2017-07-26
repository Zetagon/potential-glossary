/*jslint esversion:6*/
import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import '../../public/css/client-glos.css';

//eslint-disable-next-line
class InputBox extends Component {
  render(){
    let divStyle = {
      background: this.props.background_color
    };
    return (
      <div className="input-box">
        <input className="the-input" tabIndex="1"/>
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
      inputBoxStatus: []
    }
    this.highLightInputBoxes = this.highLightInputBoxes.bind(this);
  }

  renderSubmitButton(){
    return(
      <div className="submit-button" onClick={this.props.onClickProp}> Submit! </div>
    );
  }

  submitButtonOnClick(){
    this.highLightInputBoxes([
      'Correct',
      'Correct',
      'Incorrect',
      'NotSet',
      'Incorrect'
    ]);
  }

  renderInputboxes(){
    let boxes = new Array(this.props.numberOfBoxes).fill(null);
    return boxes.map((x, index) => {
      return <InputBox key={ index } />;
    boxes = boxes.map((x, index) => {
      return <InputBox
               key={ index }
               background_color={
                 CorrectColorMap[this.state.inputBoxStatus[index]]
               } />;
    });
    return boxes;
  }

  highLightInputBoxes(ary) {
    this.setState({
      inputBoxStatus:ary
    });
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
