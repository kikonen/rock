import React from 'react';
import { connect } from "react-redux";

import Emitter from '../Emitter';
import autobind from "../autobind";

import store from '../store'

import { OpponentList } from '../components/OpponentList';
import { GameList } from '../components/GameList';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

type Props = {
}

type State = {
  user: any | null,
}

class LobbyPageImpl extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      user: store.getState().user?.user
    };

    autobind(this);
  }

  componentDidMount() {
    if (!this.state.user) {
      setTimeout(() => Emitter.emit('game.navigate', { route: '/new' }) );
    }
  }

  render() {
    const user = this.state.user
    return (
      <div>
        <Header />
        <h1>Select your opponent</h1>

        <b>User: {user?.name || 'N/A'}</b>

        <h2>Select opponent</h2>
        <OpponentList userId={this.state.user?.id }/>

        <h2>Pending challenges</h2>
        <GameList userInfo={this.state.user} />

        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    user: state.user,
    opponent: state.opponent,
  };
}

//export default App;
export const LobbyPage = connect(mapStateToProps)(LobbyPageImpl);
