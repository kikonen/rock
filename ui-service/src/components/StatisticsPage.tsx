import React from 'react';

import autobind from "../autobind";

import { StatisticsList } from '../components/StatisticsList';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

type Props = {
}

export class StatisticsPage extends React.Component<Props> {
  constructor(props: any) {
    super(props);

    autobind(this);
  }

  render() {
    return (
      <div>
        <Header />
        <h1>Rock of fame</h1>

        <StatisticsList />

        <Footer />
      </div>
    );
  }
}
