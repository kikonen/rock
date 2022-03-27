import React from 'react';
import classNames from 'classnames';

import {
  Link
} from 'react-router-dom';

import Emitter from '../Emitter';
import autobind from "../autobind";

import { PlayerListComponent } from '../components/PlayerListComponent';

interface Props {
}

export class StartPage extends React.Component<Props> {
  constructor(props: any) {
    super(props);

    autobind(this);
  }

  render() {
    return (
      <div>
        <h1>Start your rocking journey</h1>

        <PlayerListComponent />

        <ul>
          <li>
            <Link to="/lobby">New Rock</Link>
          </li>
          <li>
            <Link to={`/statistics`}>Rock of fame</Link>
          </li>
          <li>
            <Link to="/">Intro to Rock</Link>
          </li>
        </ul>
      </div>
    );
  }
}
