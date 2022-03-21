import React from 'react';
import logo from './logo.svg';
import './App.css';

import Emitter from './Emitter';
import autobind from './autobind'

type AppState = {
  userName: String,
  userInfo: any,
  message: String,
};

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      userName: 'React',
      userInfo: { name: 'Not logged in', id: null, valid: false },
      message: null,
    };

    autobind(this);
  }

  componentDidMount() {
    this.fetchUserInfo();
  }

  async fetchUserInfo() {
    const url = `../api/greeting?name=${this.state.userName}`;
    const response = await fetch(url);
    let rs = await response.json();
    console.log(rs);

    let fn = () => this.startGame();

    this.setState((state, props) => ({
      message: rs.message,
    }),
    fn);
  }

  startGame() {
  }

  render() {
    return (
      <div className="App">
        <div>
          {this.state.message}
        </div>
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
