import React from 'react';
import { connect } from 'react-redux';

const Messages = ({ messages }) => {
	return (
		<div className="panel messages">
			<ul>
				{
					messages.slice(-3).map((msg, i) => {
						return <li key={i}>{msg}</li>;
					})
				}
			</ul>
		</div>
	);
};

const mapStateToProps = ({ ui }) => {
	return {messages: ui.messages};
};

export default connect(mapStateToProps)(Messages);
