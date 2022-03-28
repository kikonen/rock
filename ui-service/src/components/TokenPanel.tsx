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
  game: any | null,
  selectedId: string | null,
  tokens: Array<any>,
}

export class TokenPanel extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
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
    Emitter.on('game.select.token', this.eventSelectToken);

    const playerId = this.props.playerInfo?.id;

    if (this.state.game) {
      const gs = this.state.game.gameStates.find((gs: any) => gs.player.id === playerId);

      if (gs.hand) {
        Emitter.emit('game.select.token', { playerId: this.props.playerInfo?.id, tokenId: gs.hand });
      }
    }
  }

  componentWillUnmount() {
    Emitter.off('game.select.token');
  }

  async eventSelectToken(e: any) {
    console.log(e);

    if (!this.props.playerInfo) {
      return;
    }

    if (e.playerId !== this.props.playerInfo.id) {
      return;
    }

    this.setState({
      selectedId: e.tokenId,
    });
  }

  onSelectToken(e: any , tokenId: string) {
    e.preventDefault();

    if (this.state.selectedId) {
      return;
    }

    console.log("Selected", tokenId);

    Emitter.emit('game.select.token', { playerId: this.props.playerInfo?.id, tokenId: tokenId });
  }

  render() {
    const baseUrl = process.env.PUBLIC_URL;

    return (
      <div>
        <h2>{this.props.playerInfo?.name || 'N/A'}</h2>
        <div className="btn-group btn-group-vertical">
          {this.state.tokens.map((token) => (
            <button
                key={token.id}
                className={ classNames("btn", {
                  'btn-success': this.state.selectedId === token.id,
                  'btn-outline-light': (this.state.selectedId && this.state.selectedId !== token.id),
                  'btn-outline-secondary': !this.state.selectedId,
                })}
                disabled={this.state.selectedId || this.props.remote === "true"}
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
