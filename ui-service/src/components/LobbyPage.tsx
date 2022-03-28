import React from 'react';
import classNames from 'classnames';

import {
  Link
} from 'react-router-dom';

import Emitter from '../Emitter';
import autobind from "../autobind";

import PlayerList from '../components/PlayerList';
import GameList from '../components/GameList';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

interface Props {
}

export class LobbyPage extends React.Component<Props> {
  constructor(props: any) {
    super(props);

    autobind(this);
  }

  render() {
    return (
      <div>
        <Header />
        <h1>Rock is waiting for you</h1>

        <PlayerList />
        <GameList />

        <Footer />
      </div>
    );
  }
}
