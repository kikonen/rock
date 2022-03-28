import React from 'react';
import {Client} from "@stomp/stompjs";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import Emitter from './Emitter';
import autobind from './autobind'

import {AppContext} from "./AppContext";

import { HomePage } from './components/HomePage';
import { NewPage } from './components/NewPage';
import { LobbyPage } from './components/LobbyPage';
import { GamePage } from './components/GamePage';
import { StatisticsPage } from './components/StatisticsPage';
import { AboutPage } from './components/AboutPage';

type AppState = {
  userId?: string,
  userInfo: any,
};


class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      userId: '40170e10-9b3e-419e-ac17-00c5d107bebc',
      userInfo: { id: null, name: 'Not logged in', valid: false },
    };

    autobind(this);
  }

  componentDidMount() {
    this.fetchUserInfo();
  }

  async fetchUserInfo() {
    const url = `../api/players/${this.state.userId}`;
    const response = await fetch(url);
    const rs = await response.json();
    console.log(rs);

    let fn = () => this.startGame();

    this.setState((state, props) => ({
      userInfo: rs,
    }),
    fn);
  }

  startGame() {
  }

  render() {
    return (
      <AppContext.Provider value={ this.state }>
        <div className="App">
          <Router basename={process.env.PUBLIC_URL}>
            <Routes>
              <Route path='/' element={< HomePage />}></Route>
              <Route path='/new' element={< NewPage />}></Route>
              <Route path='/lobby' element={< LobbyPage />}></Route>
              <Route path='/game' element={< GamePage />}></Route>
              <Route path='/statistics' element={< StatisticsPage />}></Route>
              <Route path='/about' element={< AboutPage />}></Route>
            </Routes>
          </Router>
       </div>
     </AppContext.Provider>
    );
  }
}

export default App;
