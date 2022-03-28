import React from 'react';
import classNames from 'classnames';

import Emitter from '../Emitter';
import autobind from "../autobind";

import store from '../store'

type Props = {
  playerInfo: any | null,
  remote: boolean,
}

type State = {
  showRemote: boolean
  game: any | null,
  selectedId: string | null,
  tokens: Array<any>,
}

export class TokenPanel extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      showRemote: false,
      game: store.getState().game?.game,
      tokens: [
        {
          id: 'rock',
          name: 'Rock',
          iconUrl: '/icons/hand-back-fist-solid.svg',
        },
        {
          id: 'paper',
          name: 'Paper',
          iconUrl: '/icons/hand-holding-solid.svg',
        },
        {
          id: 'scissors',
          name: 'Scirrors',
          iconUrl: '/icons/hand-scissors-solid.svg',
        },
      ],
    };

    autobind(this);
  }

  componentDidMount() {
    const playerId = this.props.playerInfo?.id;

    if (this.state.game) {
      const game = this.state.game;
      const gs = game.gameStates.find((gs: any) => gs.player.id === playerId);

      let showRemote = (game.gameStates[0].hand && game.gameStates[1].hand);
      this.setState({
        showRemote: showRemote,
      });

      Emitter.on('game.select.token', this.eventSelectToken);
      Emitter.on('game.update.game', this.eventUpdateGame);

      if (gs.hand) {
        Emitter.emit('game.select.token', { playerId: this.props.playerInfo?.id, tokenId: gs.hand });
      }
    }
  }

  componentWillUnmount() {
    Emitter.off('game.select.token');
    Emitter.off('game.update.game');
  }

  async eventUpdateGame(e: any) {
    const game = e.game;

    this.setState({
      game: game
    });

    this.updateShowRemote();
  }

  async eventSelectToken(e: any) {
    if (!this.props.playerInfo) {
      return;
    }

    if (e.playerId !== this.props.playerInfo.id) {
      return;
    }

    this.setState({
      selectedId: e.tokenId,
    });

    this.updateShowRemote();
  }

  updateShowRemote() {
    const game = this.state.game;
    let showRemote = (game.gameStates[0].hand && game.gameStates[1].hand);

    this.setState({
      showRemote: showRemote,
    });
  }

  onSelectToken(e: any , tokenId: string) {
    e.preventDefault();

    if (this.state.selectedId) {
      return;
    }

    Emitter.emit('game.select.token', { playerId: this.props.playerInfo?.id, tokenId: tokenId });
  }

  render() {
    const baseUrl = process.env.PUBLIC_URL;
    const isRemote = this.props.remote === "true";

    return (
      <div>
        <h2>{this.props.playerInfo?.name || 'N/A'}</h2>
        <div className="btn-group btn-group-vertical">
          {this.state.tokens.map((token) => (
            <button
                key={token.id}
                className={ classNames("btn", {
                  'btn-success': this.state.selectedId === token.id && (!isRemote || this.state.showRemote),
                  'btn-outline-light': (this.state.selectedId && this.state.selectedId !== token.id),
                  'btn-outline-secondary': !this.state.selectedId,
                })}
                disabled={this.state.selectedId || isRemote}
                onClick={(e) => this.onSelectToken(e, token.id)}>
              <img src={baseUrl + token.iconUrl} alt={token.name}></img>
              <strong>{token.name}</strong>
            </button>
          ))}
        </div>
      </div>
    );
  }
}
