import React from 'react';
import { Provider } from 'react-redux'
import { connect } from "react-redux";

import './App.css';

import Emitter from './Emitter';
import autobind from './autobind'
import store from './store'

import {AppContext} from "./AppContext";

import { RootContainer } from './components/RootContainer';

import {
  setUser,
} from './userReducer';

import {
  setOpponent,
} from './opponentReducer';

type AppProps = {
  setUser?: any,
  setOpponent?: any,
};

type AppState = {
  user: any | null,
  opponent: any | null,
};

function mapStateToProps(state: any) {
  return {
    user: state.user,
    opponent: state.opponent,
  };
}

//export default App;
const ConnectedRoot = connect(mapStateToProps, { setUser, setOpponent })(RootContainer);

export default class App extends React.Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      user: null,
      opponent: null,
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

    const fn = () => { console.log("SET"); setUser(this.state.user); }

    this.setState((state, props) => ({
      user: userInfo,
    }),
    fn);
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
      <Provider store={store}>
        <ConnectedRoot />
      </Provider>
    );
  }
}
