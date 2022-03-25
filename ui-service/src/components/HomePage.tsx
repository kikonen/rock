import React from 'react';
import classNames from 'classnames';

import {
  Link
} from 'react-router-dom';

import Emitter from '../Emitter';
import autobind from "../autobind";

interface Props {
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

        <ul>
          <li>
            <Link to={`./start`}>Start page</Link>
          </li>
          <li>
            <Link to={`./about`}>About Us</Link>
          </li>
        </ul>
      </div>
    );
  }
}
