"use strict";
const EventEmitter = require("events");
const bs = require('browser-storage');

// Words used in program and translations
const languages = ["English", "Spanish"]; //enumerate available languages here

const langEN = { //English do keep this alphabetized
	blinkSpeed: "Blink Speed",
	capture: "Capture",
	closeEye: "Please hold your eye shut",
	gaze: "Gaze",
	guess: "Guess",
	language: "Language",
	lastEvent: "Last Event",
	layout: "Layout",
	noCamera: "No camera detected",
	openEye: "Please hold your eye open",
	rest: "Rest",
	scanSpeed: "Scan Speed",
	set: "Set",
	settings: "Settings",
	start: "Start",
	stop: "Stop",
	videofeed: "Video Feed"
}
//Added by MEM 3/28/2017
const langES = { //Spanish do keep this alphabetized
	blinkSpeed: "Velocidad de parpadeo",
	capture: "Captura",
	closeEye: "Por favor cierra su ojo",
	gaze: "Mirada",
	guess: "Adivina",
	language: "Idioma",
	lastEvent: "Último evento",
	layout: "Diseño",
	noCamera: "No se ha detectado ninguna cámara",
	openEye: "Por favor abra su ojo",
	rest: "Descansa",
	scanSpeed: "Velocidad de exploración",
	set: "Establece",
	settings: "Ajustes",
	start: "Comienzo",
	stop: "Deténgase",
	videofeed: "Video en vivo"
}
//Ryan Campbell
function settings() {
	//default settings
	let prefs={
		lang: "English",
		scanSpeed: 2,
		gazeSpeed: .2,
	}

	//pull settings data from local storage and apply it
	let data = bs.getItem('settings');
	let storedPrefs = JSON.parse(data);
	Object.assign(prefs, storedPrefs);

	let emitter = new EventEmitter;

	let settings = { //the settings interface object
		get scanSpeed() {return prefs.scanSpeed},
		set scanSpeed(v) {prefs.scanSpeed = v; update();},

		get gazeSpeed() {return prefs.gazeSpeed},
		set gazeSpeed(v) {prefs.gazeSpeed = v; update();},

		get languages() {return languages;}, 
		get lang() {switch(prefs.lang) {
			case "English":
			return langEN;
			break;
			case "Spanish":
			return langES;
			break;
			default:
			console.error("invalid language: " + prefs.lang)
			return langEN;
		}},
		set lang(v) {prefs.lang = v; update();},

		addListener: (l) => emitter.addListener("change", l),
		removeListener: (l) => emitter.removeListener("change", l)
	};

	//RC- store the settings and emit that there has been a change
	function update() {
		let json = JSON.stringify(prefs);
		bs.setItem('settings', json);

		emitter.emit("change");
	}


	return settings;
}
module.exports = settings;
