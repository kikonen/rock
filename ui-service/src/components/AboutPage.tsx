import React from 'react';

import autobind from "../autobind";

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

interface Props {
}

export class AboutPage extends React.Component<Props> {
  constructor(props: any) {
    super(props);

    autobind(this);
  }

  render() {
    return (
      <div>
        <Header />
        <h2>Hello from KI-productions!</h2>

        Read more about rock at:
        <a href="https://www.ikari.fi">
          https://www.ikari.fi/
        </a>

        <Footer />
      </div>
    );
  }
}
