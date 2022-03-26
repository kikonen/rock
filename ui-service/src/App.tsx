import React from 'react';
import {Client} from "@stomp/stompjs";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import Emitter from './Emitter';
import autobind from './autobind'

import { HomePage } from './components/HomePage';
import { StartPage } from './components/StartPage';
import { AboutPage } from './components/AboutPage';

type AppState = {
  userName: String,
  userInfo: any,
  message: String,
  event: String,
};

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      userName: 'React',
      userInfo: { name: 'Not logged in', id: null, valid: false },
      message: '',
      event: '',
    };

    autobind(this);
  }

  componentDidMount() {
    this.subscribeTopics();
    this.fetchUserInfo();
  }

  async fetchUserInfo() {
    const url = `../api/greeting?name=${this.state.userName}`;
    const response = await fetch(url);
    let rs = await response.json();
    console.log(rs);

    let fn = () => this.startGame();

    this.setState((state, props) => ({
      message: rs.message,
    }),
    fn);
  }

  subscribeTopics() {
    let stompClient = new Client();
    let app_key = 'todo';
    let app_token = 'todo';

    stompClient.configure({
      brokerURL: 'ws://localhost:8111/api/rock-websocket',
      connectHeaders: {
        login: 'guest',
        passcode: 'guest',
        accessToken: app_token,
        appKey: app_key,
      },
      reconnectDelay: 2000,
      heartbeatIncoming: 0,
      heartbeatOutgoing: 20000,
      onConnect: () => {
        console.log("On connect");
        stompClient.subscribe('/topic/messages', (message) => {
          console.log("message");
          console.log("Connected", "Connected");
        }, {appKey: app_key});

        stompClient.publish({
          destination: "/app/hello",
          headers: { priority: '9' },
          body: '"STOMP"' });
      },
      onStompError: (frame) => {
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
      },
      onDisconnect: (frame) => {
        console.log("Stomp Disconnect", frame);
      },
      onWebSocketClose: (frame) => {
        console.log("Stomp WebSocket Closed", frame);
      },
      debug: (str) => {
        console.log(new Date(), str);
      },
      onUnhandledMessage: (msg) => {
        console.log(msg);
      }
    });

    stompClient.activate();
  }

  startGame() {
  }

  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
          <Routes>
            <Route path='/' element={< HomePage />}></Route>
            <Route path='/start' element={< StartPage />}></Route>
            <Route path='/about' element={< AboutPage />}></Route>
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
