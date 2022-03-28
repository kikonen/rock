import React from 'react';

import autobind from "../autobind";


interface Props {
}

interface State {
  players: Array<any>
}


export class StatisticsList extends React.Component<Props, State> {
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

  render() {
    return (
      <div>
        {this.state.players.map((player) => (
          <div key={player.id} className="col-12">
            <button className='btn-outline-primary btn-sm mt-1 mb-1 sl-w-100'>
              <b>{player.name}</b>
            </button>
          </div>
        ))}
      </div>
    );
  }
}
