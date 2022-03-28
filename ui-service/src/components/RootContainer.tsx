import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Emitter from '../Emitter';
import autobind from "../autobind";

import store from '../store'

import { Navigator } from '../components/Navigator';
import { HomePage } from '../components/HomePage';
import { NewPage } from '../components/NewPage';
import { LobbyPage } from '../components/LobbyPage';
import { GamePage } from '../components/GamePage';
import { StatisticsPage } from '../components/StatisticsPage';
import { AboutPage } from '../components/AboutPage';

import {
  setUser,
} from '../userReducer';

import {
  setOpponent,
} from '../opponentReducer';


type Props = {
  dispatch: any,
}

export class RootContainer extends React.Component<Props> {
  constructor(props: any) {
    super(props);

    autobind(this);
  }

  componentDidMount() {
    Emitter.on('game.select.user', this.eventSelectUser);
    Emitter.on('game.select.opponent', this.eventSelectOpponent);
    Emitter.on('game.select.game', this.eventSelectGame);
  }

  componentWillUnmount() {
    Emitter.off('game.select.user');
    Emitter.off('game.select.opponent');
    Emitter.off('game.select.game');
  }

  async eventSelectUser(e: any) {
    console.log(e);

    const userInfo = await this.fetchPlayer(e.playerId);
    console.log("user", userInfo);

    this.props.dispatch(setUser(userInfo));

    console.log("store-user", store.getState().user);

    Emitter.emit('game.navigate', { route: '/lobby' });
  }

  async eventSelectOpponent(e: any) {
    console.log(e);
    // TODO KI find pending game
    // TODO KI create game if no pending
    // activate "game"

    const opponentInfo = await this.fetchPlayer(e.playerId);
    console.log("opponent", opponentInfo);

    this.props.dispatch(setOpponent(opponentInfo));

    console.log("store-opponent", store.getState().opponent);

    Emitter.emit('game.navigate', { route: '/game' });
  }

  async eventSelectGame(e: any) {
    console.log(e);

    const gameInfo = await this.fetchGame(e.gameId);
    console.log("game", gameInfo);

    let user = store.getState().user?.user;
    let opponent = store.getState().opponent?.opponent;

    const player1 = gameInfo.gameStates[0].player;
    const player2 = gameInfo.gameStates[1].player;

    if (player1.id === user.id) {
      user = player1;
      opponent = player2;
    } else {
      user = player2;
      opponent = player1;
    }

    this.props.dispatch(setUser(user));
    this.props.dispatch(setOpponent(opponent));

    console.log("store-user", store.getState().user);
    console.log("store-opponent", store.getState().opponent);

    Emitter.emit('game.navigate', { route: '/game' });
  }

  async fetchPlayer(playerId: string) {
    const url = `../api/players/${playerId}`;
    const response = await fetch(url);
    return response.json();
  }

  async fetchGame(gameId: string) {
    const url = `../api/games/${gameId}`;
    const response = await fetch(url);
    return response.json();
  }

  render() {
    return (
      <div className="App">
        <Router basename={process.env.PUBLIC_URL}>
          <Navigator />
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
    );
  }
}
