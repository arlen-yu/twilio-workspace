import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styles = {
  container: {
    height: 1000,
    width: 1000,
  },
};

class ChatContainer extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.localTracks !== nextProps.localTracks) {
      nextProps.localTracks.forEach((track) => {
        this.localMedia.appendChild(track.attach());
      });
    }

    if (this.props.remoteTracks !== nextProps.remoteTracks) {
      console.log('updating remotetracks');
      nextProps.remoteTracks.forEach((track) => {
        this.remoteMedia.appendChild(track.attach());
      });
    }
  }

  render() {
    return (
      <div style={styles.container}>
        <div ref={(node) => { this.localMedia = node; }} />
        <div ref={(node) => { this.remoteMedia = node; }} />
      </div>
    );
  }
}

ChatContainer.propTypes = {
  localTracks: PropTypes.arrayOf(PropTypes.any).isRequired,
  remoteTracks: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default ChatContainer;
