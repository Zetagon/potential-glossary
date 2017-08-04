/*jslint esversion:6*/
import React, { Component } from 'react';

export default function CorrectionArea(props){
  return(
    <div className="correction-container">
      <div>
        <div className="error-text"> { props.message } </div>
      </div>
    </div>
  );
}
