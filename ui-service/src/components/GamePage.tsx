import React from 'react';

import Emitter from '../Emitter';
import autobind from "../autobind";

import { TokenPanel } from '../components/TokenPanel';
import { GameStatePanel } from '../components/GameStatePanel';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

interface Props {
}

export class GamePage extends React.Component<Props> {
  constructor(props: any) {
    super(props);

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

        <TokenPanel playerId={this.context.userId} />

        <GameStatePanel />
        <TokenPanel playerId={this.context.opponentId} />

        <Footer />
      </div>
    );
  }
}
