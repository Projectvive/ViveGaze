import React from "react";
import ReactDOM from "react-dom";
const radium = require("radium");
//Ryan Campbell
//the video capture component
class Video extends React.Component {
	render() {
		return (
	        <div id="camContainer" style={{width:"12em"}}>
		                <span>{this.props.lang.videofeed}</span>
		                <video autoPlay="true" style={{height: "9em", width: "12em"}} />
		                <select name="videoSource">
		                </select>
		                <br/>
		                <span>{this.props.lang.rest}</span>
		                <canvas data-canvas-id="rest" style={{height: "9em", width: "12em"}}></canvas>
		                <input type="button" data-canvas-id="rest" value={this.props.lang.capture} />
		                <br/>
		                <span>{this.props.lang.gaze}</span>
		                <canvas data-canvas-id="gaze" style={{height: "9em", width: "12em"}}></canvas>
		                <input type="button" data-canvas-id="gaze" value={this.props.lang.capture} />
	            <canvas data-canvas-id="video" hidden></canvas>
	          </div>
			);
	}
}

module.exports = Video;