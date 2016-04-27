import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import playerInput from '../actions/';
import Cell from './cell';
import Controls from './controls';


import { VIEWPORT_HEIGHT, VIEWPORT_WIDTH } from '../constants/settings';

class Game extends Component {
  constructor(){
    super();
    this.handleKeyPress = _.throttle(this.handleKeyPress.bind(this),150);
  }

  componentDidMount(){
    window.addEventListener('keydown', this.handleKeyPress);
  }

  render() {
    //must be divisible by 2
    let viewportHeight = VIEWPORT_HEIGHT - VIEWPORT_HEIGHT % 2;
    let viewportWidth = VIEWPORT_WIDTH - VIEWPORT_WIDTH % 2;
    let [playerX, playerY] = this.props.game.playerPosition;

    let top = _.clamp(playerY - viewportHeight / 2, 0, this.props.game.entities.length - viewportHeight);
    let bottom = Math.max(playerY + viewportHeight / 2, viewportHeight);
    let left = _.clamp(playerX - viewportWidth / 2, 0, this.props.game.entities[0].length - viewportWidth);
    let right = Math.max(playerX + viewportWidth / 2, viewportWidth);

    let newEntities = this.props.game.entities.map((row, i) => row.map((cell, j) => {
      cell.distanceFromPlayer = (Math.abs(playerY - i)) + (Math.abs(playerX - j));
      return cell;
    }))

    return (
      <div className="grid-wrapper clearfix">
        <div>
          Health: {this.props.game.playerHealth}
          Weapon: {this.props.game.playerWeapon.name}({this.props.game.playerWeapon.damage})
          Player Level: {Math.floor(this.props.game.playerXP / 100)}
          XP to LevelUp: {100 - this.props.game.playerXP % 100}
          <Controls />
        </div>
          {
            newEntities.filter((row, i) => i >= top && i <= bottom)
              .map((row , i) => {
                return (
                  <div key={i} className="row clearfix"> {
                    row.filter((cell, i) => i >= left && i <= right)
                      .map((cell, j) => {
                        return <Cell key={j} cell={cell} distance={cell.distanceFromPlayer} />
                      })
                    }</div>
                )
              })
          }
      </div>

    )
  }

  handleKeyPress(e){
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

const mapStateToProps = (state) => {
  return { game: state };
}

const mapDispatchToProps = (dispatch) => {
  return {
    playerInput: (vector) => dispatch(playerInput(vector))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
