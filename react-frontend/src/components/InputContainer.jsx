/*jslint esversion:6*/
import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import '../../public/css/client-glos.css';

//eslint-disable-next-line
class InputBox extends Component {
  render(){
    return (
      <div className="input-box">
        <input className="the-input" tabIndex="1"/>
      </div>
    );
  }
}

//eslint-disable-next-line
class InputContainer extends Component {
  renderSubmitButton(){
    return(
      <div className="submit-button" onClick={this.props.onClickProp}> Submit! </div>
    );
  }

  submitButtonOnClick(){
    alert('click!')
  }

  renderInputboxes(){
    let boxes = new Array(this.props.numberOfBoxes).fill(null);
    return boxes.map((x, index) => {
      return <InputBox key={ index } />;
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
