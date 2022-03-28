import React from 'react';
import { Provider } from 'react-redux'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import './App.css';

import Emitter from './Emitter';
import autobind from './autobind'
import store from './store'

import {AppContext} from "./AppContext";

import { HomePage } from './components/HomePage';
import { NewPage } from './components/NewPage';
import { LobbyPage } from './components/LobbyPage';
import { GamePage } from './components/GamePage';
import { StatisticsPage } from './components/StatisticsPage';
import { AboutPage } from './components/AboutPage';

type AppState = {
  userId: string | null,
  userInfo: any,

  opponentId: string | null,
  opponentInfo: any,
};


class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      userId: null,
      userInfo: { id: null, name: 'N/A' },
      opponentId: null,
      opponentInfo: { id: null, name: 'N/A' },
    };

    autobind(this);
  }

  componentDidMount() {
    Emitter.on('game.select.user', this.eventSelectUser);
    Emitter.on('game.select.opponent', this.eventSelectOpponent);
  }

  async eventSelectUser(e: any) {
    console.log(e);

    const userInfo = await this.fetchPlayer(e.playerId);
    console.log("user", userInfo);

    this.setState((state, props) => ({
      userId: e.playerId,
      userInfo: userInfo,
    }));
  }

  async eventSelectOpponent(e: any) {
    console.log(e);
    // TODO KI find pending game
    // TODO KI create game if no pending
    // activate "game"

    const opponentInfo = await this.fetchPlayer(e.playerId);
    console.log("opponent", opponentInfo);

    this.setState((state, props) => ({
      opponentId: e.playerId,
      opponentInfo: opponentInfo,
    }));
  }

  async fetchPlayer(playerId: string) {
    const url = `../api/players/${playerId}`;
    const response = await fetch(url);
    return response.json();
  }

  render() {
    return (
      //<Provider context={AppContext} store={store}>
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
      //</Provider>
    );
  }
}

export default App;
