import React from "react";
import ReactDOM from "react-dom";
const radium = require("radium");
//Ryan Campbell
//the component that holds the users composition
class Message extends React.Component {
	constructor(props) {
		super(props);

		this.buffer = props.buffer

		this.state = {
			text: this.buffer.getText()
		}

		this.buffer.addChangeListener(this.listener(this));
	}
	//RC- listen for changes in the text buffer.
	listener(out) {
		return (() => {
			out.setState({
				text: out.buffer.getText()
			});
		})
	}
	render() {
		return (
			<div id="bufferContainer" style={{fontSize: "40pt"}}>
	          <p>{this.state.text}</p>
	        </div>);
	}
}
module.exports = Message;
