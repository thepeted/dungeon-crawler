import React, { Component } from 'react';
import {connect} from 'react-redux';

class Messages extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div className="panel messages">
        <ul onClick={() => this.handleClick()}>
          {
            this.props.ui.messages.slice(-3).map((msg, i) => {
            return <li key={i}>{msg}</li>
            })
          }
        </ul>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {ui: state.ui}
}

export default connect(mapStateToProps)(Messages);
