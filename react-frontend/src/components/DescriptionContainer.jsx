/*jslint esversion:6*/
import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import '../../public/css/client-glos.css';

//eslint-disable-next-line
class DescriptionContainer extends Component {
    constructor(){
        super();
        this.state = {
            descriptionText: "Hej"
        };
    }
    render(){
        return (
                <div className="description-container">
                <div className="description-box">
                <div className="description-text"> { this.state.descriptionText } </div>
                <div className="description-image" >  </div>
                </div>
                </div>
        );
    }
}

export { DescriptionContainer }
