import React from 'react';

import Emitter from '../Emitter';
import autobind from "../autobind";


type Props = {
}

type State = {
  tokens: Array<any>
}

export class GameStatePanel extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      tokens: [
        {
          id: 'wait',
          name: 'Waiting...',
          iconUrl: '/icons/arrows-rotate-solid.svg',
        },
        {
          id: 'victory',
          name: 'Win',
          iconUrl: '/icons/thumbs-up-solid.svg',
        },
        {
          id: 'loss',
          name: 'Lose',
          iconUrl: '/icons/thumbs-down-solid.svg',
        },
        {
          id: 'draw',
          name: 'Draw',
          iconUrl: '/icons/handshake-simple-slash-solid.svg',
        },
      ],
    };

    autobind(this);
  }

  componentDidMount() {
    Emitter.on('game.state.change', this.eventGameStateChange);
  }

  async eventGameStateChange(e: any) {
    console.log(e);
  }

  render() {
    const baseUrl = process.env.PUBLIC_URL;

    return (
      <div className="btn-group btn-group-vertical">
        {this.state.tokens.map((token) => (
          <button key={token.id} className="btn btn-outline-secondary">
            <img src={baseUrl + token.iconUrl} alt={token.name}></img>
            <strong>{token.name}</strong>
          </button>
        ))}
      </div>
    );
  }
}
