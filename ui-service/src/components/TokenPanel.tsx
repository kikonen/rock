import React from 'react';

import Emitter from '../Emitter';
import autobind from "../autobind";


interface Props {
  playerId: string
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

  onSelectToken(event: any , tokenId: string) {
    e.preventDefault();

    console.log("Selected", token);

    Emitter.emit('game.select.token', { playerId: playerId, token: tokenId });
  }

  render() {
    const baseUrl = process.env.PUBLIC_URL;

    return (
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
    );
  }
}
