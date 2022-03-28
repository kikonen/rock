import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Emitter from '../Emitter';
import autobind from "../autobind";

import store from '../store'

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
  setUser: any,
}

export class RootContainer extends React.Component<Props> {
  constructor(props: any) {
    super(props);

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

//    const fn = () => { console.log("SET"); setUser(this.state.user); }

    this.props.dispatch(setUser(userInfo));
//    this.props.setUser(userInfo);

    console.log(store.getState().user);
    console.log(store.getState().user.user);

    // this.setState((state, props) => ({
    //   user: userInfo,
    // }),
    // fn);
  }

  async eventSelectOpponent(e: any) {
    console.log(e);
    // TODO KI find pending game
    // TODO KI create game if no pending
    // activate "game"

    const opponentInfo = await this.fetchPlayer(e.playerId);
    console.log("opponent", opponentInfo);

    this.setState((state, props) => ({
      opponent: opponentInfo,
    }));
  }

  async fetchPlayer(playerId: string) {
    const url = `../api/players/${playerId}`;
    const response = await fetch(url);
    return response.json();
  }

  render() {
    return (
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
    );
  }
}
