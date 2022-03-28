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

    const user = store.getState().user?.user || { name: 'N/A' }
    const opponent = store.getState().opponent?.opponent || { name: 'N/A' }

    this.state = {
      user: user,
      opponent: opponent,
    };
    console.log("GAME", this.state);

    autobind(this);
  }

  componentDidMount() {
    Emitter.on('game.token.select', this.eventTokenSelect);
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
