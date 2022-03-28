import React from 'react';
import { connect } from "react-redux";

import autobind from "../autobind";

import OpponentList from '../components/OpponentList';
import GameList from '../components/GameList';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

type Props = {
  user?: any | null,
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
        <h1>Select your opponent</h1>

        <b>User: {this.props.user?.userId}</b>

        <h2>Select opponent</h2>
        <OpponentList />

        <h2>Pending challenges</h2>
        <GameList />

        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    user: state.user,
    opponent: state.opponent,
  };
}

//export default App;
export default connect(mapStateToProps)(LobbyPage);
