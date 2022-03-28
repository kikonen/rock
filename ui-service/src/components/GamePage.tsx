import React from 'react';

import Emitter from '../Emitter';
import autobind from "../autobind";

import { TokenPanel } from '../components/TokenPanel';
import { GameStatePanel } from '../components/GameStatePanel';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

type Props = {
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

        <div className="d-flex">
          <div>
            <TokenPanel playerInfo={this.context.userInfo} />
          </div>

          <div>
            <GameStatePanel />
          </div>

          <div>
            <TokenPanel playerInfo={this.context.opponentInfo} />
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}
