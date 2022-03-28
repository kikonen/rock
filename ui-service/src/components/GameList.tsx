import React from 'react';

import Emitter from '../Emitter';
import autobind from "../autobind";


type Props = {
}

type State = {
  games: Array<any>
}

export class GameList extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      games: [],
    };

    autobind(this);
  }

  componentDidMount() {
    this.fetchGames();
  }

  async fetchGames() {
    const url = `../api/games`;
    const response = await fetch(url);
    let rs = await response.json();

    this.setState((state, props) => ({
      games: rs,
    }));
  }

  async onSelectGame(e: any, gameId: string) {
    e.preventDefault();

    console.log("select game: " + gameId);
    console.log(this.props);

    Emitter.emit('game.select.game', { gameId: gameId });
  }

  render() {
    return (
      <div>
        {this.state.games.map((game) => (
          <div key={game.id} className="col-12">
            <button className='btn-outline-primary btn-sm mt-1 mb-1 sl-w-100'
              onClick={(e) => this.onSelectGame(e, game.id)}>
              <b>{game.id}</b>
            </button>
          </div>
        ))}
      </div>
    );
  }
}
