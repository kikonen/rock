import React from 'react';

import autobind from "../autobind";
import Emitter from '../Emitter';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

import { UserList } from '../components/UserList';
import { PlayerCreateDialog } from '../components/PlayerCreateDialog';

type Props = {
}

export class NewPage extends React.Component<Props> {
  constructor(props: any) {
    super(props);

    autobind(this);
  }

  onPlayerCreate(e: any) {
    Emitter.emit('game.player.create.show');
  }

  render() {
    return (
      <div>
        <Header />

        <h1>Select Rocker</h1>

        <button className="btn btn-success" onClick={this.onPlayerCreate}>
          New Rocker
        </button>

        <h2>Existing Rockers</h2>
        <UserList />

        <PlayerCreateDialog />

        <Footer />
      </div>
    );
  }
}
