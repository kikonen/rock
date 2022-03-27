import React from 'react';
import classNames from 'classnames';

import {
  Link
} from 'react-router-dom';

import Emitter from '../Emitter';
import autobind from "../autobind";

import PlayerListComponent from '../components/PlayerListComponent';

interface Props {
}

export class StatisticsPage extends React.Component<Props> {
  constructor(props: any) {
    super(props);

    autobind(this);
  }

  render() {
    return (
      <div>
        <h1>Rock of fame</h1>

        <PlayerListComponent />

        <ul>
          <li>
            <Link to="/lobby">New rock</Link>
          </li>
          <li>
            <Link to="/">Intro to Rock</Link>
          </li>
        </ul>
      </div>
    );
  }
}
