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
      lastEventLength: null
    }

  }
  //RC= change a setting.
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
      default:
        console.log("unidendified setting: " + elem);
    }
  }
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
  }
	render() {
		return (
      <div>
  			<div id="generalSettings" >
          <h4>{this.props.lang.settings}</h4>
          <span>{this.props.lang.scanSpeed}: {this.state.scanSliderValue}</span>
          <div id="scanSliderContainer">
            <div id="scanSliderValue"></div>
            <input type="range" min="1" max="3" step=".1" ref={(i) => this.scanSlider = i} onClick={() => this.set("scanspeed")} />
          </div>
          <br/>
          <span>{this.props.lang.blinkSpeed}: {this.state.gazeSliderValue}</span>
          <div id="gazeSliderContainer">
            <div id="eventLengthValue">{this.props.lang.lastEvent}: {this.state.lastEventLength}</div>
            <div id="gazeSliderValue"></div>
            <input type="range" min=".1" max="1" step=".05" ref={(i) => this.gazeSlider = i} onClick={() => this.set("gazespeed")} />
          </div>
          <br/>
          <span>{this.props.lang.language}</span>
          <select name="language">
            <option value="en">English</option>
            <option value="fr">Français</option>
          </select>
        </div>
      </div>
		);
	}
}

module.exports = Diagnostics;