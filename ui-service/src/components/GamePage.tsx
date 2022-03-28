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
  game: any | null,
  user: any | null,
  opponent: any | null,
}


export class GamePage extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      game: store.getState().game?.game,
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

    this.started = true;
    this.pollGame();
  }

  componentWillUnmount() {
    this.started = false;
    Emitter.off('game.select.token');
  }

  componentWillUnmount() {
    Emitter.off('game.select.token');
  }

  async eventSelectToken(e: any) {
    console.log(e);
    Emitter.emit('game.state.change', { stateId: e.playerId == this.state.user.id ? 'win' : 'loss' });
  }

  async pollGame() {
    if (!this.started) {
      return;
    }

    const gameId = this.state.game?.id;
    if (!gameId) {
      return;
    }
    const game = await this.fetchGame(gameId);
    Emitter.emit('game.update.game', { game: game });
    setTimeout(this.pollGame, 2000);
  }

  async fetchGame(gameId: string) {
    const url = `../api/games/${gameId}`;
    const response = await fetch(url);
    return response.json();
  }

  render() {
    let gameTitle = 'N/A';
    let game = this.state.game;
    if (game) {
      gameTitle = `${game.gameStates[0].player.name} vs. ${game.gameStates[1].player.name}`
    }

    return (
      <div>
        <Header />
        <h1>Rock to victory</h1>

        <h2>{gameTitle}</h2>

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
