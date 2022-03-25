import React from 'react';
import classNames from 'classnames';

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
      <div className="btn-group sl-w-100" role="group" aria-label="Channel">
        <h1>Rock</h1>
      </div>
    );
  }
}
