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

import {
  setGame,
} from '../gameReducer';


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
    Emitter.on('game.update.game', this.eventUpdateGame);
  }

  componentWillUnmount() {
    Emitter.off('game.select.user');
    Emitter.off('game.select.opponent');
    Emitter.off('game.select.game');
  }

  async eventSelectUser(e: any) {
    const userInfo = await this.fetchPlayer(e.playerId);

    this.props.dispatch(setUser(userInfo));

    Emitter.emit('game.navigate', { route: '/lobby' });
  }

  async eventSelectOpponent(e: any) {
    const user = store.getState().user.user;
    const opponent = await this.fetchPlayer(e.playerId);

    this.startGame({ user, opponent });
  }

  async eventSelectGame(e: any) {
    const game = await this.fetchGame(e.gameId);

    let user = store.getState().user?.user;
    let opponent = store.getState().opponent?.opponent;

    const player1 = game.gameStates[0].player;
    const player2 = game.gameStates[1].player;

    if (player1.id === user.id) {
      user = player1;
      opponent = player2;
    } else {
      user = player2;
      opponent = player1;
    }

    this.props.dispatch(setUser(user));
    this.props.dispatch(setOpponent(opponent));
    this.props.dispatch(setGame(game));

    Emitter.emit('game.navigate', { route: '/game' });
  }

  async eventUpdateGame(e: any) {
    const game = e.game;
    this.props.dispatch(setGame(game));
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

  async fetchPendingGames(gameInfo: any) {
    const userId = gameInfo.user.id;
    const opponentId = gameInfo.opponent.id;
    const response = await fetch(`../api/games`);
    const games = await response.json();

    return games.filter((game) => {
      let state1 = game.gameStates[0];
      let state2 = game.gameStates[1];

      let r = !(state1.hand && state2.hand);
      if (r) {
        r = (state1.player.id === userId && state2.player.id === opponentId)
          || (state2.player.id === userId && state1.player.id === opponentId);
      }
      return r;
    });
  }

  async startGame(gameInfo: any) {
    const pendingGames = this.fetchPendingGames(gameInfo);

    if (pendingGames.length > 0) {
      Emitter.emit('game.select.game', { gameId: pendingGames[0].id });
      return;
    }

    let data = {
      status: 'pending',
      gameStates: [
        {
          status: 'pending',
          player: {
            id: gameInfo.user.id,
          }
        },
        {
          status: 'pending',
          player: {
            id: gameInfo.opponent.id,
          }
        },
      ]
    }

    const response = await fetch(`../api/games`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      let rs = await response.json();

      Emitter.emit('game.select.game', { gameId: rs.id });
    }
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
