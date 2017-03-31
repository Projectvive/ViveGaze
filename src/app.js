

import React from "react";
import ReactDOM from "react-dom";
import Radium from "radium";


import GazeDetector from "./detector.js";
const buffer = require("./buffer.js");
const speaker = require("./speaker.js");
const settings = require("./settings.js");

const Message = require("./message-component.js");
const CommBoard = require("./commboard-component.js");
const Video = require("./video-component.js");
const Diagnostics = require("./diagnostic-component.js");

//Ryan Campbell
//The root view component, as well as the app controller
class App extends React.Component {
    constructor() {
        super();
      
        this.sp = speaker();
          
        

        this.row = null;
        this.button = null;
        this.scan = null;
        //do { i like do while but it breaks EVERYTHING 
        let set = settings();
        this.scanSpeed = set.scanSpeed;

        this.state = {
            settings: set,
            lang: set.lang,
            buf: buffer(this.sp),
            det: null
        }
     // }while(this.state.scanSpeed==null); 
        //protect the scope of the listeners
        this.startTone = this.startTone.bind(this);
        this.stopTone = this.stopTone.bind(this);
        this.settingsListener = this.settingsListener.bind(this);
        this.detectorListener = this.detectorListener.bind(this);

        set.addListener(this.settingsListener);
    }

    //LISTENERS
    //RC- start the rising tone at gazeBegin events
    startTone() {
        this.sp.toneStart(this.state.settings.gazeSpeed * 1000);
    }
    //RC- stop the rising tone at gazeEnd events
    stopTone() {
        this.sp.toneStop();
    }
    //RC- listen for changes to the settings
    settingsListener() {
        if(this.state.lang != this.state.settings.lang) {//maybe change the language
            this.setState({lang: this.state.settings.lang});
        }

        if(this.scanSpeed != this.state.settings.scanSpeed) {
            this.scanSpeed = this.state.settings.scanSpeed;
            this.stopScan();
            this.startScan();
        }
    }
    //RC- listen for gaze events from the detector.
    detectorListener() { //protect the scope
        const LONG_GAZE = 1500;
        const fudge = 10;

        let length = this.state.det.getLastEvent();
        if(length > LONG_GAZE - fudge) {
            this.longGaze();
        } else if(length > this.state.settings.gazeSpeed * 1000 - fudge) {
            this.gaze();
        }
    }
    //RC- listen for the set button and start the calibration procedure
    set() {
        this.calibrate();
    }
    //RC- listen for the start button and start listening to the user
    start() {
        if(this.state.det) {//start listening for the detector events.
            this.state.det.addBeginListener(this.startTone);
            this.state.det.addEndListener(this.stopTone);
            this.state.det.addEndListener(this.detectorListener);
        }
    }
    //RC- listen for the stop button and stop listening
    stop() {
        if(this.state.det) {
            this.state.det.removeBeginListener(this.startTone);
            this.state.det.removeEndListener(this.stopTone);
            this.state.det.removeEndListener(this.detectorListener);
        }

        this.stopScan();
    }
    //END LISTENERS

    //SCANNING FUNCTIONS
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
                this.button = this.row * this.commBoard.columns;
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
                    this.button -= this.commBoard.columns - 1;
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
    //RC- capture a set of reference images
    calibrate() {
        const WAIT_TIME = 1000;
        if(this.state.det) {
            this.sp.speakAsync(this.state.lang.openEye, () => {
                this.sp.toneStart(WAIT_TIME);
                setTimeout(() => {
                    this.state.det.captureRest();

                    this.sp.speakAsync(this.state.lang.closeEye, () => {
                        this.sp.toneStart(WAIT_TIME);
                        setTimeout(() => {
                            this.state.det.captureGaze();
                        }, WAIT_TIME);
                    });
                }, WAIT_TIME);
            });
        } else {
            this.sp.speakAsync(this.state.lang.noCamera, () => 1);
        }
    }
    //RC
    startScan() {
        this.proceed();
        this.scan = window.setInterval(() => this.proceed(), 1000 * this.scanSpeed);
    }
    //RC
    stopScan() {
        window.clearInterval(this.scan);
        this.commBoard.clearHighlight();
        this.row = this.button = null;
    }
    //END SCANNING FUNCTIONS

    //REACT STUFF
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
                <div style={{width: "87em", float: "left"}}>
                    <Message buffer={this.state.buf} />
                </div>
                <div style={{position: "absolute", bottom: "0px", width: "87em"}}>
                        <CommBoard ref={(input) => this.commBoard = input} buffer={this.state.buf} />
                    <div style={{position: "absolute", bottom: "0px", right: "0px", width: "6em"}}>
                        <input type="button" style={{width: "6em", height: "3em", fontWeight: "bold"}} name="set" value={this.state.lang.set} onClick={() => this.set()} />
                        <input type="button" style={{width: "6em", height: "3em", fontWeight: "bold"}} name="start" value={this.state.lang.start} onClick={() => this.start()} />
                        <input type="button" style={{width: "6em", height: "3em", fontWeight: "bold"}} name="stop" value={this.state.lang.stop} onClick={() => this.stop()} />
                    </div>
                </div>
                <div style={{float: "right"}}>
                    <Video lang={this.state.lang} />
                    <Diagnostics set={this.state.settings} lang={this.state.lang} det={this.state.det}/>
                </div>
            </div>
        );
    }
}
App = Radium(App);

ReactDOM.render(<App />, document.getElementById('content'));