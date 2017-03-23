

import React from "react";
import ReactDOM from "react-dom";
import Radium from "radium";


import GazeDetector from "./detector.js";
const buffer = require("./buffer.js");
const speaker = require("./speaker.js");

const Message = require("./message-component.js");
const CommBoard = require("./commboard-component.js");
const Video = require("./video-component.js");
const Diagnostics = require("./diagnostic-component.js");

const langEN = {
    blinkSpeed: "Blink Speed",
    capture: "Capture",
    gaze: "Gaze",
    language: "Language",
    lastEvent: "Last Event",
    layout: "Layout",
    rest: "Rest",
    scanSpeed: "Scan Speed",
    settings: "Settings",
    start: "Start",
    stop: "Stop",
    videofeed: "Video Feed"
}
//Ryan Campbell
//The root view component, as well as the app controller
class App extends React.Component {
    constructor() {
        super();
        
        this.sp = speaker();

        this.row = null;
        this.button = null;
        this.scan = null;

        this.state = {
            buf: buffer(this.sp),
            det: null,
            i: 7
        }
    }
    //RC- listen for gaze events from the detector.
    listener() {
        const LONG_GAZE = 2000;

        let length = this.state.det.getLastEvent();
        if(length > LONG_GAZE) {
            this.longGaze();
        } else if(length > this.settings.state.gazeSliderValue * 1000) {
            this.gaze();
        }
    }
    //RC- start scanning or back out.
    longGaze() {
        if(this.row != null) {
            if(this.button != null) {
                this.button = null;
                this.commBoard.clearHighlight();
            } else {
                this.stopScan();
            }
        } else {
            this.startScan();
        }
    }
    //RC- do a selection on a row or button.
    gaze() {
        if(this.row != null) {
            if(this.button != null) {
                this.commBoard.selectButton(this.button);
                this.row = this.button = null;
            } else {
                this.button = this.row * this.commBoard.columns - 1;
            }
        }
    }
    //RC- move to the next row or the next button in the scan.
    proceed() {
        this.sp.beep(200, 50);

        if(this.row != null) {
            if(this.button != null) {//scan through buttons.
                this.button += 1;
                if(Math.floor(this.button / this.commBoard.columns) != this.row) {
                    this.button -= this.commBoard.columns;
                }
                this.commBoard.highlightButton(this.button);

            } else {//scan through rows.
                this.row = (this.row + 1) % this.commBoard.rows;
                this.commBoard.highlightRow(this.row);
            }
        } else {//start a fresh scan.
            this.row = 0;
            this.commBoard.highlightRow(this.row);
        }
    }
    //RC
    startScan() {
        this.proceed();
        this.scan = window.setInterval(() => this.proceed(), 1000 * this.settings.state.scanSliderValue);
    }
    //RC
    stopScan() {
        window.clearInterval(this.scan);
        this.commBoard.clearHighlight();
        this.row = this.button = null;
    }
    //RC- listen for the start button.
    start() {
        if(this.state.det) {//start listening for the detector events.
            this.state.det.addBeginListener(() => this.sp.toneStart(this.settings.state.gazeSliderValue * 1000));
            this.state.det.addEndListener(() => this.sp.toneStop());
            this.state.det.addEndListener(() => this.listener());
        }
    }
    //RC- listen for the stop button.
    stop() {
        if(this.state.det) {
            this.state.det.removeBeginListener(() => this.sp.toneStart(this.settings.gazeSliderValue * 1000));
            this.state.det.removeEndListener(() => this.sp.toneStop());
            this.state.det.removeEndListener(() => this.listener());
        }

        this.stopScan();
    }
    //RC
    componentDidMount() {
        let detector = new GazeDetector();
        this.setState({
            det: detector
        });
    }
    //RC
    render() {
        return (
            <div>
                <div style={{width: "70em", float: "left"}}>
                    <Message buffer={this.state.buf} />
                </div>
                <CommBoard ref={(input) => this.commBoard = input} buffer={this.state.buf} />
                <div style={{float: "right"}}>
                    <Video lang={this.props.lang} />
                    <Diagnostics lang={this.props.lang} det={this.state.det} ref={(i) => this.settings = i} />
                </div>
                <div style={{position: "absolute", bottom: "0px", right: "0px"}}>
                    <input type="button" name="start" value={this.props.lang.start} onClick={() => this.start()} />
                    <input type="button" name="stop" value={this.props.lang.stop} onClick={() => this.stop()} />
                </div>
            </div>
        );
    }
}
App = Radium(App);

ReactDOM.render(<App lang={langEN}/>, document.getElementById('content'));