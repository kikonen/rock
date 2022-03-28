import React from 'react';

import {
  useNavigate,
} from 'react-router-dom';

import Emitter from '../Emitter';
import autobind from "../autobind";

import { AppContext } from "../AppContext";


interface Props {
  navigate: any
}

interface State {
  users: Array<any>
}

function withNavigation(Component: any) {
  return (props: any) => <Component {...props} navigate={useNavigate()} />;
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
    console.log("context", this.context);
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

    console.log("select user: " + userId);

    Emitter.emit('game.select.user', { playerId: userId });

    this.props.navigate('/lobby');
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

export default withNavigation(UserList);
