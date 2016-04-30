import React, { Component } from 'react';
import { connect } from 'react-redux';

import { toggleFogMode } from '../actions';

class PlayerSettings extends Component {
  constructor(){
    super()
    this.handleChange = this.handleChange.bind(this);
  }
  render(){
    return (
      <div className='panel'>
        <div className="score-item">
        <input
        onChange={() => this.handleChange()}
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
  handleChange(){
    this.props.toggleFogMode()
  }
}

const mapStateToProps = (state) => {
  return {ui: state.ui}
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleFogMode: () => dispatch(toggleFogMode())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerSettings);
