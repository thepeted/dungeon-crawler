import React, { Component } from 'react';
import { connect } from 'react-redux';

import { toggleFogMode } from '../actions';

class PlayerSettings extends Component {
  constructor(){
    super()
  }
  render(){
    return (
      <div className='panel'>
        <div className="score-item">
          <input
          onChange={this.props.toggleFogMode}
          id="toggle"
          type="checkbox"
          checked={this.props.ui.fogMode}
          />
          <label htmlFor="toggle">
          Toggle fog mode
          </label>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {ui: state.ui}
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleFogMode: () => dispatch(toggleFogMode()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerSettings);
