import React from 'react';

import {
  useNavigate,
} from 'react-router-dom';

import Emitter from '../Emitter';
import autobind from "../autobind";

type Props = {
  navigate: any
}

class NavigatorImpl extends React.Component<Props> {
  constructor(props: any) {
    super(props);

    autobind(this);
  }

  componentDidMount() {
    Emitter.on('game.navigate', this.eventNavigate);
  }

  componentWillUnmount() {
    Emitter.off('game.navigate');
  }

  async eventNavigate(e: any) {
    console.log("ROUTE", e);
    this.props.navigate(e.route);
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

function withNavigation(Component: any) {
  return (props: any) => <Component {...props} navigate={useNavigate()} />;
}

export const Navigator = withNavigation(NavigatorImpl);
