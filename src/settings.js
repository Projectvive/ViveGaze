"use strict";
const EventEmitter = require("events");
const bs = require('browser-storage');

// Words used in program and translations
const languages = ["english", "spanish","portuguese"]; //enumerate available languages here

const langEN = { //English do keep this alphabetized
	blinkSpeed: "Blink Speed",
	capture: "Capture",
	closeEye: "Please hold your eye shut",
	english: "English",
	gaze: "Gaze",
	guess: "Guess",
	language: "Language",
	lastEvent: "Last Event",
	layout: "Layout",
	noCamera: "No camera detected",
	openEye: "Please hold your eye open",
	portuguese:"Portuguese",
	rest: "Rest",
	scanSpeed: "Scan Speed",
	set: "Set",
	settings: "Settings",
	spanish: "Spanish",
	start: "Start",
	stop: "Stop",
	videofeed: "Video Feed"
}
//Added by MEM 3/28/2017
const langES = { //Spanish do keep this alphabetized
	blinkSpeed: "Velocidad de parpadeo",
	capture: "Captura",
	closeEye: "Por favor cierra su ojo",
	english: "Inglés",
	gaze: "Mirada",
	guess: "Adivina",
	language: "Idioma",
	lastEvent: "Último evento",
	layout: "Diseño",
	noCamera: "No se ha detectado ninguna cámara",
	openEye: "Por favor abra su ojo",
	portuguese:"Português",
	rest: "Descansa",
	scanSpeed: "Velocidad de exploración",
	set: "Establece",
	settings: "Ajustes",
	spanish: "Español",
	start: "Comienzo",
	stop: "Deténgase",
	videofeed: "Video en vivo"
}
const langPOR={ //portuguese
	blinkSpeed: "Velocidade de piscar",
	capture: " Captura",
	closeEye: "Por favor, aguarde a fechada de olho",
	english: "Inglés",
	gaze: "Olhar",
	guess: "Acho que",
	language: "Linguagem",
	lastEvent: "Último evento",
	layout: "Layout",
	noCamera: "Nenhuma câmera detectada",
	openEye: "Por favor mantenha o olho aberto",
	portuguese:"Português",
	rest: "Resto",
	scanSpeed: "Velocidade, de digitalização",
	set: "Conjunto",
	settings: "Configurações",
	spanish: "Espanhol",
	start: "Começar",
	stop: "Parar",
	videofeed: "Vídeo alimentação"
}
//Ryan Campbell
function settings() {
	let emitter = new EventEmitter;
	
	//default settings
	let prefs={
		lang: "english",
		scanSpeed: 2,
		gazeSpeed: .2,
	}
	//pull settings data from local storage and apply it
	let data = bs.getItem('settings');
	let storedPrefs = JSON.parse(data);
	Object.assign(prefs, storedPrefs);

	let settings = { //the settings interface object
		get scanSpeed() {return prefs.scanSpeed},
		set scanSpeed(v) {prefs.scanSpeed = v; update();},

		get gazeSpeed() {return prefs.gazeSpeed},
		set gazeSpeed(v) {prefs.gazeSpeed = v; update();},

		get languages() {return languages;},
		get language() {return prefs.lang},
		set language(v) {prefs.lang = v; update();},
		get lang() {switch(prefs.lang) {
			case "english":
			return langEN;
			break;
			case "spanish":
			return langES;
			break;
			case "portuguese":
			return langPOR;
			break;
			default:
			console.error("invalid language: " + prefs.lang)
			return langEN;
		}},

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
