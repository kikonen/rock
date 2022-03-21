import React from 'react';
import {Client} from "@stomp/stompjs";

import logo from './logo.svg';
import './App.css';

import Emitter from './Emitter';
import autobind from './autobind'

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
      <div className="App">
        <div>
          {this.state.message}
        </div>
        <div>
          {this.state.event}
        </div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
           >
             Learn React
           </a>
         </header>
       </div>
    );
  }
}

export default App;
