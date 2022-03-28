import React from 'react';
import classNames from 'classnames';

import {
  Link
} from 'react-router-dom';

import Emitter from '../Emitter';
import autobind from "../autobind";

import PlayerList from '../components/PlayerList';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

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
        <Header />
        <h1>Start your rocking journey</h1>

        <PlayerList />

        <Footer />
      </div>
    );
  }
}
