"use strict";
const EventEmitter = require("events");
const bs = require('browser-storage');
// Words used in program and translations
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
	var lang = "langEN";
	var scanSpeed=null;
	var gazeSpeed=null;
	
	
	let emitter = new EventEmitter;
	var defaltSettings={
    		lang: "langEN",
    		scanSpeed: 2,
    		gazeSpeed:.2
    		}
    	
    let data=bs.getItem('settings');
    let dataSplit= data.split(" ");
    lang= dataSplit[0];
    scanSpeed = parseFloat(dataSplit[1],10);
    gazeSpeed = parseFloat(dataSplit[2],10);
    	
    if( scanSpeed ==null)
    	{
    	   lang=defaltSettings.lang;
    	   scanSpeed=defaltSettings.scanSpeed;
    	   gazeSpeed=defaltSettings.gazeSpeed;
    	}
  
    let settings = {
        get scanSpeed() {return scanSpeed},
        set scanSpeed(v) {scanSpeed = v;
        let json = lang +" "+ scanSpeed+ " "+ gazeSpeed;
		bs.setItem('settings', json);
		emitter.emit("change");},

        get gazeSpeed() {return gazeSpeed},
        set gazeSpeed(v) {gazeSpeed = v;
        let json = lang +" "+ scanSpeed+ " "+ gazeSpeed;
		bs.setItem('settings', json);
		emitter.emit("change");},

        get languages() {return ["English"];},
        get lang() {return lang;},
        set lang(v) {switch(v) {
            case "English":
                lang = langEN;
                break;
            case "Spanish":
                lang = langES;
                break;
            default:
                throw new Error("invalid language: " + v);
        }
        let json = lang +" "+ scanSpeed+ " "+ gazeSpeed;
		bs.setItem('settings', json);
		emitter.emit("change");},

        addListener: (l) => emitter.addListener("change", l),
        removeListener: (l) => emitter.removeListener("change", l)
    };
  
    
    return settings;
}
module.exports = settings;
