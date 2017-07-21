import React from "react";
import ReactDOM from "react-dom";
import Radium from "radium";


import GazeDetector from "./detector.js";
const buffer = require("./buffer.js");
const speaker = require("./speaker.js");
const settings = require("./settings.js");
const EventEmitter = require("events");

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
		let set = settings();
		this.scan = null;
		this.stopped = true;
		this.scanSpeed = set.scanSpeed;
		this.startKeyListen = true; 
		this.opMode = set.opMode;

		this.state = {
			settings: set,
			lang: set.lang,
			opMode: set.opMode,
			buf: buffer(this.sp),
			language:set.language,
			det: null,
			cblayout: CommBoard.layout_es,
			fontSize: Math.floor((window.innerWidth / 1420) * 100).toString() + "%"
		}

		//protect the scope of the listeners
		this.startTone = this.startTone.bind(this);
		this.stopTone = this.stopTone.bind(this);
		this.settingsListener = this.settingsListener.bind(this);
		this.keydownListener = this.keydownListener.bind(this);
		this.keyupListener = this.keyupListener.bind(this);
		//this.keydownStart = this.keydownStart.bind(this);
		//this.keystrokeLength = this.keystrokeLength.bind(this);
		this.detectorBeginListener = this.detectorBeginListener.bind(this);
		this.detectorEndListener = this.detectorEndListener.bind(this);

		set.addListener(this.settingsListener);
		window.addEventListener("resize", () => {
			this.setState({fontSize: Math.floor((window.innerWidth / 1420) * 100).toString() + "%"})
		}, false);
		
		//PK- keystroke listeners
		document.addEventListener('keydown',(event) => {this.keydownListener(event.keyCode);}); 
		document.addEventListener('keyup',(event) => {this.keyupListener(event.keyCode);});
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
	//PK functions for key stroke event listener 
	keydownListener(aCode){ 
	if(this.state.settings.opMode == "clickMode"){
		if(aCode == 220) {		
			if(this.startKeyListen){
				this.keydownStart = new Date(); 
				this.startKeyListen = false;
				console.log("here");
			}
			this.sp.toneStart(this.state.settings.gazeSpeed * 1000);
		}
	}
	}
	keyupListener(aCode){
		if(this.state.settings.opMode == "clickMode"){		
			if(aCode == 220) {
				this.keystrokeLength = new Date() - this.keydownStart; 
				this.startKeyListen = true;
				const LONG_GAZE = 2000;
				const fudge = 20;
				let programStarted = false; 
				this.stopTone();
				console.log(this.keystrokeLength);
			if((this.keystrokeLength > LONG_GAZE - fudge)) {
				if(this.scan != null) {
					window.clearInterval(this.scan);
					window.clearTimeout(this.scan);
					this.scan = null;
					this.startScan();
				}
				this.longGaze();

			} else if(this.keystrokeLength > this.state.settings.gazeSpeed * 1000 - fudge) {
				if(this.scan != null) {
					window.clearInterval(this.scan);
					window.clearTimeout(this.scan);
					this.scan = null; 
					this.startScan();
					//this.scan = window.setTimeout(() => {this.scan = null; this.startScan()}, 1000 * this.scanSpeed);
				}
				this.gaze();
				//window.setTimeout(() => this.startScan(), 1000 * this.scanSpeed);

			} else {
				this.resumeScan();
			}
			}			
		}
	}
	/*keystrokeLen(){
		document.addEventListener('keydown',(event) => {this.keydownListener(event.keyCode);}); 
		document.addEventListener('keyup',(event) => {this.keyupListener(event.keyCode);});
		return this.keystrokeLength; 	
	}*/
	//document.addEventListener('keydown', (event) => {keydownListener(event.keyCode);}); 
	//RC- listen for gazeBegin events from the detector
	detectorBeginListener() {
		this.pauseScan();
	}
	//RC- listen for gazeEnd events from the detector.
	detectorEndListener() {
		
		
		
		
		if(this.state.settings.opMode == "blinkMode"){
			const LONG_GAZE = 2000;
		const fudge = 10;
		let programStarted = false; 
		let length = this.state.det.getLastEvent();
		//this.keyLen = this.keystrokeLen();
		//console.log(this.keyLen);
		console.log(this.state.settings.opMode);
		
		if((length > LONG_GAZE - fudge)) {
			if(this.scan != null) {
				window.clearInterval(this.scan);
				window.clearTimeout(this.scan);
				this.scan = null;
				this.startScan();
			}
			this.longGaze();

		} else if((length > this.state.settings.gazeSpeed * 1000 - fudge)) {
			if(this.scan != null) {
				window.clearInterval(this.scan);
				window.clearTimeout(this.scan);
				this.scan = null; 
				this.startScan();
				//this.scan = window.setTimeout(() => {this.scan = null; this.startScan()}, 1000 * this.scanSpeed);
			}
			this.gaze();
			//window.setTimeout(() => this.startScan(), 1000 * this.scanSpeed);

		} else {
			this.resumeScan();
		}
		}
	}
	//RC- listen for changes to the settings
	settingsListener() {
		if(this.state.lang != this.state.settings.lang) {//maybe change the language
			if(this.state.settings.language == "english") {
				this.setState({cblayout: CommBoard.layout_en});
			} else {
				this.setState({cblayout: CommBoard.layout_es});
			}
			this.setState({lang: this.state.settings.lang, language: this.state.settings.language});
		}

		if(this.scanSpeed != this.state.settings.scanSpeed) {
			this.scanSpeed = this.state.settings.scanSpeed;
			if(!this.stopped) {
				this.stopScan();
				this.startScan();
			}
		}
		
		if(this.state.opMode != this.state.settings.opMode) {//maybe change the language
		    //console.log(this.state.settings.opMode);
			this.setState = this.state.settings.opMode;
			this.stop(); 
			//({opMode: this.state.settings.opMode, operatingMode: this.state.settings.operatingMode});
		}
		
	}

	//RC- listen for the set button and start the calibration procedure
	set() {
		this.calibrate();
	}
	
	//RC- listen for the start button and start listening to the user
	start() {
		if(this.state.det && this.stopped) {//start listening for the detector events.
			this.stopped = false;
			this.state.det.addBeginListener(this.startTone);
			this.state.det.addBeginListener(this.detectorBeginListener);
			this.state.det.addEndListener(this.stopTone);
			this.state.det.addEndListener(this.detectorEndListener);
		}
	}
	//PK- pasue the program when desired
	pause(){
		if(this.state.det && !this.stopped) {
			this.start();
		}
	}
	
	//RC- listen for the stop button and stop listening
	stop() {
		if(this.state.det) {
			this.state.det.removeBeginListener(this.startTone);
			this.state.det.removeBeginListener(this.detectorBeginListener);
			this.state.det.removeEndListener(this.stopTone);
			this.state.det.removeEndListener(this.detectorEndListener);
		}
		this.stopped = true;
		this.stopScan();
	}
	
	//END LISTENERS

	//SCANNING FUNCTIONS

	//RC- start scanning or back out.
	longGaze() {
		//if((this.commBoard.getState() == "stopped") || (this.commBoard.getPaused() == true)) {
		console.log(this.commBoard.getPaused());
		this.paused = this.commBoard.getPaused();
		//this.commBoard.setPaused(false); 	
		if((this.commBoard.getState() == "stopped")||(this.paused)){
			this.commBoard.setPaused(false); 
			this.sp.beep(350, 500);
			this.startScan();
			console.log("here");
		}
		else {
			this.commBoard.backOut();
		}
		
	}
	
	//RC- do a selection on a row or button.
	gaze() {
		if(!this.commBoard.getPaused()){
			let button = this.commBoard.select();
			this.sp.toneStop();
		 
			try{		
				this.sp.speakAsync(button.value, () => 1);
			}
			catch(err){
				this.startScan();
			}
		}
	}

	//RC- move to the next row or the next button in the scan.
	proceed() {
		this.intervalStart = new Date();
		let button = this.commBoard.proceed();
		try{
			if(button != " "){
			this.sp.speakAsync(button.value, () => 1);
			}
		}
		catch(err){
			this.startScan();
		}
	}
	//RC
	switchMode(mode) {
		switch(mode) {
			case "letters":
				this.setState({cblayout: CommBoard.layout_en});
				break;
			case "phrases":
				this.setState({cblayout: CommBoard.layout_phrases});
				break;
			default:
				throw new Error("invalid mode: " + mode);
		}
	}
	//RC
	startScan() {
		if(this.scan == null) {
			this.commBoard.startScan();
			this.scan = window.setInterval(() => this.proceed(), 1000 * this.scanSpeed);
		
		}
	}
	//RC
	stopScan() {
		this.sp.beep(350, 500);
		window.clearInterval(this.scan);
		window.clearTimeout(this.scan);
		this.scan = null;
		this.commBoard.stopScan();
	}
	//RC
	pauseScan() {
		if(this.scan != null) {
			window.clearInterval(this.scan);
			window.clearTimeout(this.scan);
			this.scan = "paused";
		}
	}
	//RC
	resumeScan() {
		if(this.scan == "paused") {
			this.scan = window.setTimeout(() => {
					this.proceed(); 
					this.scan = window.setInterval(() => this.proceed(), 1000 * this.scanSpeed);
				}, Math.max(1000 * this.scanSpeed - (new Date() - this.intervalStart), 0));
		}
	}
	//RC- capture a set of reference images
	calibrate() {
		const WAIT_TIME = 500;
		if(this.state.det) {
			this.sp.speakAsync(this.state.lang.openEye, () => {
				this.sp.calibrationTone(WAIT_TIME);
				setTimeout(() => {
					this.state.det.captureRest();

					this.sp.speakAsync(this.state.lang.closeEye, () => {
						this.sp.calibrationTone(WAIT_TIME);
						setTimeout(() => {
							this.state.det.captureGaze();
						}, WAIT_TIME);
					}, 50);
				}, WAIT_TIME);
			}, 50);
		} else {
			this.sp.speakAsync(this.state.lang.noCamera, () => 1);
		}
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
			<div style={{fontSize: this.state.fontSize}}>
				<div style={{width: "85em", float: "left"}}>
					<Message buffer={this.state.buf} />
				</div>
				<div style={{position: "absolute", bottom: "0px", width: "87em"}}>
					<CommBoard.CommBoard ref={(i) => this.commBoard = i} buffer={this.state.buf} language={this.state.language} stop={() => this.stopScan()} lettermode={() => this.switchMode("letters")} phrasemode={() =>this.switchMode("phrases")} layout={this.state.cblayout}/>
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