import React, { Component } from 'react';
import { connect } from 'react-redux';

import { toggleFogMode } from '../actions';

class Controls extends Component {
  constructor(){
    super()
    this.handleClick = this.handleClick.bind(this);
  }
  render(){
    return (
      <div>
        <button onClick={() => this.handleClick()}>Fog Mode</button>
      </div>
    )
  }
  handleClick(){
    this.props.toggleFogMode()
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleFogMode: () => dispatch(toggleFogMode())
  }
}

export default connect(null, mapDispatchToProps)(Controls);
