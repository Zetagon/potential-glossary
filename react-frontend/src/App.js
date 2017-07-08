import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '../public/css/client-glos.css';


class App extends Component {
  render() {
    return (
      <GlossaryTrainer/>
    );
  }
}

class GlossaryTrainer extends Component {
  renderCorrectionArea(){
    return(
      <div className="correction-container">
        <div>
          <div className="error-text"> Correction! </div>
        </div>
      </div>
    );
  }


  render(){
    return (
      <div className="App">
        <DescriptionContainer/>
        <InputContainer
          numberOfBoxes={ 5 }/>
        { this.renderCorrectionArea() }
      </div>
    );
  }
}

//eslint-disable-next-line
class DescriptionContainer extends Component {
  render(){
    return (
      <div className="description-container">
        <div className="description-box">
          <div className="description-text">Hej </div>
          <div className="description-image" >  </div>
        </div>
      </div>
    );
  }
}

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
      <div className="submit-button"> Submit! </div>
    );
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

export default App;
