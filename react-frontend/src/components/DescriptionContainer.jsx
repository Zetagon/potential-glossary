/*jslint esversion:6*/
import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import '../../public/css/client-glos.css';

//eslint-disable-next-line
class DescriptionContainer extends Component {
    render(){
      let descriptions = new Array(this.props.descriptions.length);
      let style;
      for (let i = 0; i < descriptions.length; i++) {
        style = {  backgroundImage: 'url(' + this.props.descriptions[i].url + ')'};
        console.log(this.props.descriptions[i])
        console.log(style)
        descriptions[i] =
        <div className="description-box" key={i}>
          <div className="description-text"> { this.props.descriptions[i].text} </div>
          <div className="description-image" style={style} ></div>
        </div>
      }
      return (
        <div className="description-container">
          { descriptions}
        </div>
      );
    }
}

export { DescriptionContainer }
