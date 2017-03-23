import React from "react";
import ReactDOM from "react-dom";
const radium = require("radium");
//Ryan Campbell
//the video capture component
class Video extends React.Component {
	render() {
		return (
	        <div id="camContainer" style={{width:"160px"}}>
		                <span>{this.props.lang.videofeed}</span>
		                <video autoPlay="true" style={{height: "120px", width: "160px"}}/>
		                <select name="videoSource">
		                </select>
		                <br/>
		                <span>{this.props.lang.rest}</span>
		                <canvas data-canvas-id="rest"></canvas>
		                <input type="button" data-canvas-id="rest" value={this.props.lang.capture} />
		                <br/>
		                <span>{this.props.lang.gaze}</span>
		                <canvas data-canvas-id="gaze"></canvas>
		                <input type="button" data-canvas-id="gaze" value={this.props.lang.capture} />
	            <canvas data-canvas-id="video" hidden></canvas>
	          </div>
			);
	}
}

module.exports = Video;