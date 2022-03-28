import React from 'react';
import classNames from 'classnames';

import {
  Link,
} from 'react-router-dom';

import Emitter from '../Emitter';
import autobind from "../autobind";


interface Props {
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

  render() {
    const baseUrl = process.env.PUBLIC_URL;

    return (
      <div className="btn-group btn-group-vertical">
        {this.state.tokens.map((token) => (
          <button className="btn btn-outline-secondary">
            <img src={baseUrl + token.iconUrl}></img>
            <strong>{token.name}</strong>
          </button>
        ))}
      </div>
    );
  }
}
