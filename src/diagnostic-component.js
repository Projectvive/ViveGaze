import React from "react";
import ReactDOM from "react-dom";
const radium = require("radium");

//Ryan Campbell
//the settings and troubleshooting info panel
class Diagnostics extends React.Component {
  constructor(props) {
    super(props);

    this.settings = props.set;

    this.state = {
      scanSliderValue: this.settings.scanSpeed,
      gazeSliderValue: this.settings.gazeSpeed,
      language: this.settings.language,
      lastEventLength: null
    }

  }
  //RC- update settings ui without changing the actual settings(to save disk writes)
  update(elem) {
    switch(elem) {
      case "scanspeed":
        this.setState({scanSliderValue: this.scanSlider.value});
        break;
      case "gazespeed":
        this.setState({gazeSliderValue: this.gazeSlider.value});
        break;
      default:
        console.log("update: unidendified setting: " + elem);
    }
  }
  //RC- change a setting.
  set(elem) {
    switch(elem) {
      case "scanspeed":
        this.settings.scanSpeed = this.scanSlider.value;
        this.setState({scanSliderValue: this.settings.scanSpeed});
        break;
      case "gazespeed":
        this.settings.gazeSpeed = this.gazeSlider.value;
        this.setState({gazeSliderValue: this.settings.gazeSpeed});
        break;
      case "language":
        this.setState({language: this.langSelector.value});
        this.settings.language = this.langSelector.value;
        break;
      default:
        console.log("set: unidendified setting: " + elem);
    }
  }

  //REACT STUFF
  //RC
  componentWillReceiveProps(props) {
    if(!this.det) {//if the detector isn't initialized accept the new one and add an event listener.
      this.det = props.det;
      if(this.det) {
        this.det.addEndListener(() => this.setState({lastEventLength: this.det.getLastEvent()}));
      }
    }
  }
  //RC
  componentDidMount() {
    this.scanSlider.value = this.state.scanSliderValue;
    this.gazeSlider.value = this.state.gazeSliderValue;
    this.langSelector.value = this.state.language;
  }
  populateLanguageSelector() {
    let r = [];
    let ls = this.settings.languages;
    for(let i = 0; i < ls.length; i++) {
      r[i] = <option key={i} value={ls[i]}>{this.props.lang[ls[i]]}</option>
    }
    return r;
  }
	render() {
		return (
      <div>
  			<div id="generalSettings" >
          <h4>{this.props.lang.settings}</h4>
          <span>{this.props.lang.scanSpeed}: {this.state.scanSliderValue}</span>
          <div id="scanSliderContainer">
            <div id="scanSliderValue"></div>
            <input type="range" min="1" max="3" step=".1" ref={(i) => this.scanSlider = i} onMouseMove={() => this.update("scanspeed")} onMouseUp={() => this.set("scanspeed")} />
          </div>
          <br/>
          <span>{this.props.lang.blinkSpeed}: {this.state.gazeSliderValue}</span>
          <div id="gazeSliderContainer">
            <div id="gazeSliderValue"></div>
            <input type="range" min=".1" max="1" step=".05" ref={(i) => this.gazeSlider = i} onMouseMove={() => this.update("gazespeed")} onMouseUp={() => this.set("gazespeed")} />
            <div id="eventLengthValue">{this.props.lang.lastEvent}: {this.state.lastEventLength}</div>
          </div>
          <br/>
          <span>{this.props.lang.language}</span>
          <select name="language" ref={(i) => this.langSelector = i} onChange={() => this.set("language")}>
            {this.populateLanguageSelector()}
          </select>
        </div>
      </div>
		);
	}
}

module.exports = Diagnostics;