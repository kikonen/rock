import React from 'react';
import classNames from 'classnames';

import {
  Link
} from 'react-router-dom';

import Emitter from '../Emitter';
import autobind from "../autobind";

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

        <ul>
          <li>
            <Link to="/">Home page</Link>
          </li>
        </ul>
      </div>
    );
  }
}
