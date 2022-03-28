import React from 'react';

import {
  useNavigate,
} from 'react-router-dom';

import Emitter from '../Emitter';
import autobind from "../autobind";

import { AppContext } from "../AppContext";


type Props = {
  navigate: any
}

type State = {
  opponents: Array<any>
}

function withNavigation(Component: any) {
  return (props: any) => <Component {...props} navigate={useNavigate()} />;
}

export class OpponentList extends React.Component<Props, State> {
  static contextType = AppContext;

  constructor(props: any) {
    super(props);

    this.state = {
      opponents: [],
    };

    autobind(this);
  }

  componentDidMount() {
    console.log("context", this.context);
    this.fetchOpponents();
  }

  async fetchOpponents() {
    const url = `../api/players`;
    const response = await fetch(url);
    let rs = await response.json();

    const userId = this.context.userId;
    rs = rs.filter((opponent: any) => opponent.id !== userId );

    this.setState((state, props) => ({
      opponents: rs,
    }));
  }

  async onSelectOpponent(e: any, opponentId: string) {
    e.preventDefault();

    console.log("select opponent: " + opponentId);

    Emitter.emit('game.select.opponent', { playerId: opponentId });

    this.props.navigate('/game');
  }

  render() {
    return (
      <div>
        {this.state.opponents.map((opponent) => (
          <div key={opponent.id} className="col-12">
            <button className='btn-outline-primary btn-sm mt-1 mb-1 sl-w-100'
              onClick={(e) => this.onSelectOpponent(e, opponent.id)}>
              <b>{opponent.name}</b>
            </button>
          </div>
        ))}
      </div>
    );
  }
}

export default withNavigation(OpponentList);
