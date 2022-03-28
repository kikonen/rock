import React from 'react';
import classNames from 'classnames';

import Emitter from '../Emitter';
import autobind from "../autobind";


type Props = {
}

type State = {
  selectedId: string,
  tokens: Array<any>
}

export class GameStatePanel extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      selectedId: 'wait',
      tokens: [
        {
          id: 'wait',
          name: 'waiting...',
          cls: 'btn-outline-secondary',
          iconUrl: '/icons/arrows-rotate-solid.svg',
        },
        {
          id: 'win',
          name: 'Win',
          cls: 'btn-success',
          iconUrl: '/icons/thumbs-up-solid.svg',
        },
        {
          id: 'loss',
          name: 'Lose',
          cls: 'btn-danger',
          iconUrl: '/icons/thumbs-down-solid.svg',
        },
        {
          id: 'draw',
          name: 'Draw',
          cls: 'btn-warning',
          iconUrl: '/icons/handshake-simple-slash-solid.svg',
        },
      ],
    };

    autobind(this);
  }

  componentDidMount() {
    Emitter.on('game.state.change', this.eventGameStateChange);
  }

  componentWillUnmount() {
    Emitter.off('game.state.change');
  }

  async eventGameStateChange(e: any) {
    console.log(e);
    this.setState({
      selectedId: e.stateId,
    });
  }

  render() {
    const baseUrl = process.env.PUBLIC_URL;

    const token = this.state.tokens.find((token) => token.id === this.state.selectedId) || this.state.tokens[0];

    return (
      <div className="btn-group btn-group-vertical">
        <button key={token.id} className={"btn " + token.cls}>
          <img src={baseUrl + token.iconUrl} alt={token.name}></img>
          <strong>{token.name}</strong>
        </button>
      </div>
    );
  }
}
