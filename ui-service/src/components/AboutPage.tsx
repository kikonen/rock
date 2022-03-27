import React from 'react';
import classNames from 'classnames';

import {
  Link
} from 'react-router-dom';

import Emitter from '../Emitter';
import autobind from "../autobind";

interface Props {
}

export class AboutPage extends React.Component<Props> {
  constructor(props: any) {
    super(props);

    autobind(this);
  }

  render() {
    return (
      <div>
        <h2>Hello from KI-productions!</h2>

        Read more about rock at:
        <a href="https://www.ikari.fi">
          https://www.ikari.fi/
        </a>

         <ul>
          <li>
            <Link to={`/start`}>Start Rock</Link>
          </li>
          <li>
            <Link to={`/statistics`}>Rock of fame</Link>
          </li>
        </ul>
      </div>
    );
  }
}
