import React from 'react';

import autobind from "../autobind";

type Props = {
}

export class Header extends React.Component<Props> {
  constructor(props: any) {
    super(props);

    autobind(this);
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <div className="navbar-brand">Rock</div>
      </nav>
    );
  }
}
