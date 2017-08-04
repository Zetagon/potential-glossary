/*jslint esversion:6*/
import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import '../../public/css/client-glos.css';

//eslint-disable-next-line
export default class InputBox extends Component {
  constructor(props){
    super(props);
    this.focus = this.focus.bind(this);
    this.handleKeyEvent = this.handleKeyEvent.bind(this);
  }


  focus() {
    this.textInput.focus();
  }


  handleKeyEvent(event){
    this.props.onKeyPressProp(event, this.props.index);
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
          onKeyPress={this.handleKeyEvent}
          ref={ this.props.inputRef}
        />
      </div>
    );
  }
}
