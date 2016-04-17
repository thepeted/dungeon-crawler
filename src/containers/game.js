import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { playerMove } from '../actions/'


import { STARTING_ROOM_POSITION, VIEWPORT_HEIGHT, VIEWPORT_WIDTH } from '../constants/settings';

class Game extends Component {
  constructor(){
    super();
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount(){
    window.addEventListener('keydown', this.handleKeyPress);
  }

  render() {
    //must be divisible by 2
    let viewportHeight = VIEWPORT_HEIGHT - VIEWPORT_HEIGHT % 2;
    let viewportWidth = VIEWPORT_WIDTH - VIEWPORT_WIDTH % 2;

    let top = _.clamp(this.props.game.playerPosition.y - viewportHeight / 2, 0, this.props.game.entities.length - viewportHeight);
    let bottom = Math.max(this.props.game.playerPosition.y + viewportHeight / 2, viewportHeight);
    let left = _.clamp(this.props.game.playerPosition.x - viewportWidth / 2, 0, this.props.game.entities[0].length - viewportWidth);
    let right = Math.max(this.props.game.playerPosition.x + viewportWidth / 2, viewportWidth);

    return (
      <table>
        <caption>(Use WASD to move)</caption>
        <tbody>
        {
          this.props.game.entities.filter((row, i) => i >= top && i <= bottom)
            .map((row , i) => {
              return (
                <tr key={i}>{
                  row.filter((cell, i) => i >= left && i <= right)
                    .map((cell, j) => {
                      return <td key={j} className={`entity${cell}`} />
                    })
                  }</tr>
              )
            })
        }
        </tbody>
      </table>
    )
  }

  handleKeyPress(e){
    switch(e.keyCode) {
        //north
      case 87:
        this.props.playerMove([0,-1]);
        break;
        //east
      case 68:
        this.props.playerMove([1,0]);
        break;
      case 83:
        this.props.playerMove([0,1]);
        break;
      case 65:
        this.props.playerMove([-1,0]);
        break;
      default:
        return
    }
  }
}

const mapStateToProps = ({ game }) => {
  return { game };
}

const mapDispatchToProps = (dispatch) => {
  return {
    playerMove: (vector) => dispatch(playerMove(vector))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
