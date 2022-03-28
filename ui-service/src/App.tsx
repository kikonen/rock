import React from 'react';
import { Provider } from 'react-redux'
import { connect } from "react-redux";

import './App.css';

import Emitter from './Emitter';
import autobind from './autobind'
import store from './store'

import {AppContext} from "./AppContext";

import { RootContainer } from './components/RootContainer';

type AppProps = {
};

type AppState = {
};

function mapStateToProps(state: any) {
  return {
    user: state.user,
    opponent: state.opponent,
  };
}

const ConnectedRoot = connect(mapStateToProps)(RootContainer);

export default class App extends React.Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      user: null,
      opponent: null,
    };

    autobind(this);
  }

  componentDidMount() {
  }

  render() {
    return (
      <Provider store={store}>
        <ConnectedRoot />
      </Provider>
    );
  }
}
