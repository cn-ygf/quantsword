import React, { Component } from 'react';
import './App.css';
import UITitleBar from './UITitleBar/TitleBar'


class App extends Component {
  
  render() {
    return (
      <div className="App">
        {<UITitleBar height="30px" color="rgb(204,204,204)" bkcolor="rgb(60,60,60)" icon="" title="QuantSword v1.0.1 Code by YGF" />}
      </div>
    )
  }
}
export default App;
