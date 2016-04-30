import React, { Component } from 'react';
import {connect} from 'react-redux';
import Score from '../components/score';

class Scoreboard extends Component {
  constructor(){
    super()
  }

  render(){
    return (
      <div className="panel scoreboard">
        <Score
          iconClass="potion"
          title="Health"
          value={this.props.player.playerHealth}
          />
        <Score
          iconClass={`back-${this.props.grid.dungeonLevel}`}
          title="Zone"
          value={this.props.grid.dungeonLevel}
          />
        <Score
          iconClass="weapon"
          title={"Weapon"}
          value={`${this.props.player.playerWeapon.name} (Damage: ${this.props.player.playerWeapon.damage})`}
          />
        <Score
          iconClass="player"
          title="Level"
          value={Math.floor(this.props.player.playerXP / 100)}
          />
        <Score
          iconClass=""
          title="XP to level up"
          value={100 - this.props.player.playerXP % 100}
          />
       </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {player: state.player, grid: state.grid}
}

export default connect(mapStateToProps)(Scoreboard);
