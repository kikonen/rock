import React from 'react';
import classNames from 'classnames';

import {
  Link
} from 'react-router-dom';

import Emitter from '../Emitter';
import autobind from "../autobind";

import Player from '../models/Player';

interface Props {
}

interface State {
  players: Array<any>
}

export class PlayerListComponent extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      players: [],
    };

    autobind(this);
  }

  componentDidMount() {
    this.fetchPlayers();
  }

  async fetchPlayers() {
    const url = `../api/players`;
    const response = await fetch(url);
    let rs = await response.json();

    this.setState((state, props) => ({
      players: rs,
    }));
  }

  async onSelectPlayer(e: any, playerId: string) {
    e.preventDefault();

    // const url = `../api/channels/${channelId}/actions/join`;
    // const response = await fetch(url, { method: 'post' });
    // let rs = await response.json();
    // console.log("JOINED", rs);

    // $('#channel_selector_dialog').modal('hide');
    // Emitter.emit('user.refresh.channels');
  }

  render() {
    return (
      <div>
        {this.state.players.map((player) => (
          <div key={player.id} className="col-12">
            <button className='btn-outline-primary btn-sm mt-1 mb-1 sl-w-100'
              onClick={(e) => this.onSelectPlayer(e, player.id)}>
              <b>{player.name}</b>
            </button>
          </div>
        ))}
      </div>
    );
  }
}
