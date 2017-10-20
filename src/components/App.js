import React from 'react';
import base from '../base';
import '../css/App.css';

class App extends React.Component {
  render() {
    return (
      <div className="soundaily">
        <header>
          <h1>SOUNDAILY</h1>
        </header>
        <content>
          <p>Upload your file</p>
        </content>
      </div>
    )
  }
}

export default App;
