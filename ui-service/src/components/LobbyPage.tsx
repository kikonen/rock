import React from 'react';
import { connect } from "react-redux";

import autobind from "../autobind";

import store from '../store'

import OpponentList from '../components/OpponentList';
import GameList from '../components/GameList';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

type Props = {
}

type State = {
  user: any | null,
}

export class LobbyPageImpl extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    console.log("STATE", store.getState());

    const user = store.getState().user?.user || { name: 'N/A' }

    this.state ={
      user: user
    };

    autobind(this);
  }

  componentDidMount() {
    console.log("lobby", this.props);
  }

  render() {
    const user = this.state.user
    return (
      <div>
        <Header />
        <h1>Select your opponent</h1>

        <b>User: {user.name}</b>

        <h2>Select opponent</h2>
        <OpponentList userId={this.state.user.id }/>

        <h2>Pending challenges</h2>
        <GameList />

        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  console.log("WTF", state);
  return {
    user: state.user,
    opponent: state.opponent,
  };
}

//export default App;
export const LobbyPage = connect(mapStateToProps)(LobbyPageImpl);
