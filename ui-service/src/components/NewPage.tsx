import React from 'react';

import autobind from "../autobind";

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

import UserList from '../components/UserList';

type Props = {
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
        <h1>Select Rocker</h1>

        <UserList />

        <Footer />
      </div>
    );
  }
}
