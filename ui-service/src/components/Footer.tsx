import React from 'react';
import classNames from 'classnames';

import {
  Link
} from 'react-router-dom';

import Emitter from '../Emitter';
import autobind from "../autobind";

interface Props {
}

export class Footer extends React.Component<Props> {
  constructor(props: any) {
    super(props);

    autobind(this);
  }

  render() {
    return (
      <footer className="fixed-bottom">
        <ul className="list-group list-group-horizontal">
          <li className="list-group-item">
            <Link to={`/start`}>Start Rock</Link>
          </li>
          <li className="list-group-item">
            <Link to="/lobby">New Rock</Link>
          </li>
          <li className="list-group-item">
            <Link to={'/game'}>Start Rocking</Link>
          </li>
          <li className="list-group-item">
            <Link to={`/statistics`}>Rock of fame</Link>
          </li>
          <li className="list-group-item">
            <Link to={`/about`}>About Rock</Link>
          </li>
        </ul>
      </footer>
    );
  }
}
