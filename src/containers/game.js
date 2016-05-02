import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import playerInput from '../actions/';
import Cell from '../components/cell';

const V_OFFSET = 5; // in ems to match any elements above component in page layout

class grid extends Component {
  constructor(){
    super();
    this.state = {
      viewportWidth: 0,
      viewportHeight: 0
    }
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  componentWillMount(){
    let viewportWidth = window.innerWidth / 30;
    let viewportHeight = Math.max(15, (window.innerHeight / 21) - V_OFFSET);
    this.setState({ viewportWidth, viewportHeight });
  }

  componentDidMount(){
    window.addEventListener('keydown', _.throttle(this.handleKeyPress,100));
    window.addEventListener('resize', _.debounce(this.handleResize,500));
  }

  render() {

    //must be divisible by 2
    let viewportHeight = this.state.viewportHeight - this.state.viewportHeight % 2;
    let viewportWidth = this.state.viewportWidth - this.state.viewportWidth % 2;
    const { entities } = this.props.grid;
    let [ playerX, playerY ] = this.props.grid.playerPosition;


    let top = _.clamp(playerY - viewportHeight / 2, 0, entities.length - viewportHeight);
    let bottom = Math.max(playerY + viewportHeight / 2, viewportHeight);
    let left = _.clamp(playerX - viewportWidth / 2, 0, entities[0].length - viewportWidth);
    let right = Math.max(playerX + viewportWidth / 2, viewportWidth);

    let newEntities = entities.map((row, i) => row.map((cell, j) => {
      cell.distanceFromPlayer = (Math.abs(playerY - i)) + (Math.abs(playerX - j));
      return cell;
    }))

    const cells = newEntities.
    filter((row, i) => i >= top && i <= bottom).
    map((row, i) => {
      return (
        <div key={i} className="row">
          {
            row.
            filter((row, i) => i >= left && i <= right).
            map((cell, j) => {
              return (
                <Cell
                  key={j}
                  cell={cell}
                  distance={cell.distanceFromPlayer}
                  zone={this.props.grid.dungeonLevel}
                  visible={this.props.fogMode}
                  />
              )
            })
          }
        </div>
      )
    });

    return (
      <div className="grid-wrapper">
          {cells}
      </div>
    )
  }

  handleKeyPress(e){
    if (typeof(this.props.grid.dungeonLevel) === "number") {
      switch(e.keyCode) {
          //north
        case 87:
          this.props.playerInput([0,-1]);
          break;
          //east
        case 68:
          this.props.playerInput([1,0]);
          break;
        case 83:
          this.props.playerInput([0,1]);
          break;
        case 65:
          this.props.playerInput([-1,0]);
          break;
        default:
          return
      }
    }
  }

  handleResize(e){

    let viewportWidth = e.target.innerWidth / 30;
    let viewportHeight = Math.max(15, (e.target.innerHeight / 21) - V_OFFSET);
    this.setState({ viewportWidth, viewportHeight });
  }
}

const mapStateToProps = ({ ui, grid, player }) => {
  return { fogMode: ui.fogMode, grid, player };
}

const mapDispatchToProps = (dispatch) => {
  return {
    playerInput: (vector) => dispatch(playerInput(vector))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(grid);
