import React from 'react';

import Emitter from '../Emitter';
import autobind from "../autobind";

import { AppContext } from "../AppContext";


type Props = {
}

type State = {
  users: Array<any>
}

export class UserList extends React.Component<Props, State> {
  static contextType = AppContext;

  constructor(props: any) {
    super(props);

    this.state = {
      users: [],
    };

    autobind(this);
  }

  componentDidMount() {
    this.fetchUsers();
  }

  async fetchUsers() {
    const url = `../api/players`;
    const response = await fetch(url);
    let rs = await response.json();

    const userId = this.context.userId;
    rs = rs.filter((user: any) => user.id !== userId );

    this.setState((state, props) => ({
      users: rs,
    }));
  }

  async onSelectUser(e: any, userId: string) {
    e.preventDefault();

    Emitter.emit('game.select.user', { playerId: userId });
  }

  render() {
    return (
      <div>
        {this.state.users.map((user) => (
          <div key={user.id} className="col-12">
            <button className='btn-outline-primary btn-sm mt-1 mb-1 sl-w-100'
              onClick={(e) => this.onSelectUser(e, user.id)}>
              <b>{user.name}</b>
            </button>
          </div>
        ))}
      </div>
    );
  }
}
