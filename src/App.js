import React, { Component } from 'react';
import Login from './view/login.js';
import MainPage from './view/main.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { displayed: 1 };

    this.change_state = this.change_state.bind(this);
  }

  change_state(value) {
    this.setState({
      displayed: value
    });
  }

  render() {
    if (this.state['displayed'] === 0) {
      return (
        <div class="container-fluid h-100">
          <Login change_state = { this.change_state } />
        </div>
      );
    }
    if (this.state['displayed'] === 1) {
      return (
        <div class="container-fluid h-100">
          <MainPage change_state = { this.change_state } />
        </div>
      );
    }
    else {
      return (
        <div class="container-fluid d-flex h-100 justify-content-center align-items-center flex-column">
          <h1>Oops, this state has not been implemented yet!</h1>
        </div>
      );
    }
    
  }
}

export default App;
