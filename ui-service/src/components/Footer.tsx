import React from 'react';

import {
  Link
} from 'react-router-dom';

import autobind from "../autobind";

type Props = {
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
            <Link to={`/new`}>Select Rocker</Link>
          </li>
          <li className="list-group-item">
            <Link to="/lobby">Select opponent</Link>
          </li>
          <li className="list-group-item">
            <Link to={`/statistics`}>Rock of fame</Link>
          </li>
          <li className="list-group-item">
            <Link to={`/about`}>About Rock</Link>
          </li>
          <li className="list-group-item">
            <a href="https://github.com/kikonen/rock">Github</a>
          </li>
        </ul>
      </footer>
    );
  }
}
