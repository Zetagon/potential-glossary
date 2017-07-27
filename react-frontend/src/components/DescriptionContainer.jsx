/*jslint esversion:6*/
import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import '../../public/css/client-glos.css';

//eslint-disable-next-line
class DescriptionContainer extends Component {
    render(){
      let styleObj = {
        "backgroundImage": "url(" + this.props.descriptionImage + ")"
      }
      return (
        <div className="description-container">
            <div className="description-box">
              <div className="description-text"> { this.props.descriptionText } </div>
              <div className="description-image" style={ styleObj }></div>
            </div>
        </div>
      );
    }
}

export { DescriptionContainer }
