import React, { Component } from 'react';
import { connect } from 'react-redux';

const Header = ({level}) => {
	return (
		<div className='strip'>
        <h1>
					<span
						className={`title title-${level}`}
					>
					THE GRID
					</span> - Roguelike
				</h1>
    </div>
	)
}

const mapStateToProps = ({ grid }) => {
	return { level: grid.dungeonLevel }
}

export default connect(mapStateToProps)(Header);
