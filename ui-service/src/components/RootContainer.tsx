import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import autobind from "../autobind";

import { HomePage } from '../components/HomePage';
import { NewPage } from '../components/NewPage';
import { LobbyPage } from '../components/LobbyPage';
import { GamePage } from '../components/GamePage';
import { StatisticsPage } from '../components/StatisticsPage';
import { AboutPage } from '../components/AboutPage';


type Props = {
}

export class RootContainer extends React.Component<Props> {
  constructor(props: any) {
    super(props);

    autobind(this);
  }

  render() {
    return (
      <div className="App">
        <Router basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path='/' element={< HomePage />}></Route>
            <Route path='/new' element={< NewPage />}></Route>
            <Route path='/lobby' element={< LobbyPage />}></Route>
            <Route path='/game' element={< GamePage />}></Route>
            <Route path='/statistics' element={< StatisticsPage />}></Route>
            <Route path='/about' element={< AboutPage />}></Route>
          </Routes>
        </Router>
      </div>
    );
  }
}
