import React from 'react';
import classNames from 'classnames';

import {
  Link
} from 'react-router-dom';

import Emitter from '../Emitter';
import autobind from "../autobind";

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

import UserList from '../components/UserList';

interface Props {
}

export class NewPage extends React.Component<Props> {
  constructor(props: any) {
    super(props);

    autobind(this);
  }

  render() {
    return (
      <div>
        <Header />
        <h1>Start your rocking journey</h1>

        <UserList />

        <Footer />
      </div>
    );
  }
}
