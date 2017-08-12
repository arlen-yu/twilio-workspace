import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import queryString from 'query-string';
import Video from 'twilio-video';
import './App.css';
import Input from './components/Input';
import ChatContainer from './components/ChatContainer';


injectTapEventPlugin();

let token;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      actionText: '',
      localTracks: [],
      remoteTracks: [],
    };
  }


  handleOnSubmit() {
    fetch(`/token?${queryString.stringify({ identity: this.state.username })}`)
      .then(res => res.json())
      .then((res) => {
        token = res.token;
        this.setState({ actionText: 'Got token!' });
      })
      .then(() => {
        this.initialize();
      });
    this.setState({ username: '', actionText: `Joining room as ${this.state.username}...` });
  }

  initialize() {
    // Initial connection to room
    Video.connect(token, { name: 'test' }).then((room) => {
      // Create local audio and video
      Video.createLocalTracks({ audio: true, video: { width: 300 } })
        .then((localTracks) => {
          this.setState({ localTracks });
        });

      room.on('trackAdded', (track) => {
        this.setState({ remoteTracks: [...this.state.remoteTracks, track] });
      });

      // When someone else connects
      room.on('participantConnected', (participant) => {
        this.setState({ actionText: `participant connected: ${participant.identity}` });
      });

      // When someone disconnects
      room.on('participantDisconnected', (participant) => {
        this.setState({ actionText: `participant disconnected: ${participant.identity}` });
      });
    });
  }

  render() {
    return (
      <div>
        <div className="App">
          <h2>Twilio Proof of Concept</h2>
          <h4>{this.state.actionText}</h4>
          <Input
            value={this.state.username}
            onChange={(ev, username) => { this.setState({ username }); }}
            onSubmit={() => {
              this.handleOnSubmit();
            }}
          />
          <ChatContainer
            localTracks={this.state.localTracks}
            remoteTracks={this.state.remoteTracks}
          />
        </div>
      </div>
    );
  }
}

export default App;
