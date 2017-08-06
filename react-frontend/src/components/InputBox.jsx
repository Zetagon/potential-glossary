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
    this.handleChange = this.handleChange.bind(this);
    this.state = {value: ''};
  }


  focus() {
    this.textInput.focus();
  }


  handleKeyEvent(event){
    this.props.onKeyPressProp(event, this.props.index);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.props.saveInput(this.props.index, event.target.value);
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
          onChange={ this.handleChange }
          value={ this.state.value}
          className="the-input"
          tabIndex="1"
          onKeyPress={this.handleKeyEvent}
          ref={ this.props.inputRef}
        />
      </div>
    );
  }
}
