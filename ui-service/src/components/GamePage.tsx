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
    Emitter.on('game.select.token', this.eventTokenSelect);

    if (!this.state.user && !this.state.opponent) {
      setTimeout(() => Emitter.emit('game.navigate', { route: '/new' }) );
    }
  }

  async eventTokenSelect(e: any) {
    console.log(e);
  }

  render() {
    return (
      <div>
        <Header />
        <h1>Rock to victory</h1>

        <div className="d-flex">
          <div>
            <TokenPanel playerInfo={this.state.user} />
          </div>

          <div>
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
