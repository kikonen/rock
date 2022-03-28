import React from 'react';

import Emitter from '../Emitter';
import autobind from "../autobind";


interface Props {
  playerInfo: any | null
}

interface State {
  tokens: Array<any>
}

export class TokenPanel extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
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

  onSelectToken(e: any , tokenId: string) {
    e.preventDefault();

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
                className="btn btn-outline-secondary"
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
