import React from 'react';
import logo from './logo.svg';
import './App.css';

import Emitter from './Emitter';
import autobind from './autobind'

type AppState = {
  userName: String,
  userInfo: any,
};

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      userName: 'React',
      userInfo: { name: 'Not logged in', email: 'na', channels: [], valid: false },
    };

    autobind(this);
  }

  componentDidMount() {
    this.fetchUserInfo();
  }

  async fetchUserInfo() {
    const url = `../api/greeting?name=${this.state.userName}`;
    const response = await fetch(url);

    let fn = () => this.startGame();

    this.setState((state, props) => ({
      userInfo: response,
    }),
    fn);
  }

  startGame() {
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
           >
             Learn React
           </a>
         </header>
       </div>
    );
  }
}

export default App;
