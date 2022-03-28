import React from 'react';

import Emitter from '../Emitter';
import autobind from "../autobind";

import store from '../store'

import { TokenPanel } from '../components/TokenPanel';
import { GameStatePanel } from '../components/GameStatePanel';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

type Props = {
}

type State = {
  user: any | null,
  opponent: any | null,
}


export class GamePage extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      user: store.getState().user?.user ,
      opponent: store.getState().opponent?.opponent,
    };
    console.log("GAME", this.state);

    autobind(this);
  }

  componentDidMount() {
    Emitter.on('game.select.token', this.eventSelectToken);

    if (!this.state.user && !this.state.opponent) {
      setTimeout(() => Emitter.emit('game.navigate', { route: '/new' }) );
    }
  }

  componentWillUnmount() {
    Emitter.off('game.select.token');
  }

  componentWillUnmount() {
    Emitter.off('game.select.token');
  }

  async eventSelectToken(e: any) {
    console.log(e);
    Emitter.emit('game.state.change', { stateId: e.playerId == this.state.user.id ? 'win' : 'loss' });
  }

  render() {
    return (
      <div>
        <Header />
        <h1>Rock to victory</h1>

        <div className="d-flex justify-content-center">
          <div>
            <TokenPanel playerInfo={this.state.user} />
          </div>

          <div className="mr-4 ml-4">
            <GameStatePanel />
          </div>

          <div>
            <TokenPanel playerInfo={this.state.opponent} />
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}
