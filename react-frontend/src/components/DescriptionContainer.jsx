/*jslint esversion:6*/
import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import '../../public/css/client-glos.css';

//eslint-disable-next-line
class DescriptionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptions: []
    }

    this.props.socket.on('getDescriptionResponse', (data) => {
      console.log('description received!' + data)
      this.setState({descriptions:data});
    })
  }
    render(){
      let descriptions = new Array(this.state.descriptions.length);
      let style;
      for (let i = 0; i < descriptions.length; i++) {
        style = {  backgroundImage: 'url(' + this.state.descriptions[i].url + ')'};
        console.log(this.state.descriptions[i])
        console.log(style)
        descriptions[i] =
        <div className="description-box" key={i}>
          <div className="description-text"> { this.state.descriptions[i].text} </div>
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
