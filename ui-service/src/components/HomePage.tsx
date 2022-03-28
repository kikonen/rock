import React from 'react';

import {
  Link
} from 'react-router-dom';

import autobind from "../autobind";

type Props = {
}

export class HomePage extends React.Component<Props> {
  constructor(props: any) {
    super(props);

    autobind(this);
  }

  render() {
    return (
      <div>
        <h1>Rock</h1>

        <ul className="list-group list-group-vertical">
          <li className="list-group-item">
            <Link to={`/new`}>Select Rocker</Link>
          </li>

          <li className="list-group-item">
            <Link to={`/statistics`}>Rock of fame</Link>
          </li>

          <li className="list-group-item">
            <Link to={`/about`}>About Rock</Link>
          </li>
        </ul>
      </div>
    );
  }
}
