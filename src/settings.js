"use strict";
const EventEmitter = require("events");
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
    let scanSpeed = 2;
    let gazeSpeed = .2;
    let lang = langES;

    let emitter = new EventEmitter;

    let settings = {
        get scanSpeed() {return scanSpeed},
        set scanSpeed(v) {scanSpeed = v; emitter.emit("change")},

        get gazeSpeed() {return gazeSpeed},
        set gazeSpeed(v) {gazeSpeed = v; emitter.emit("change")},

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
        } emitter.emit("change");},

        addListener: (l) => emitter.addListener("change", l),
        removeListener: (l) => emitter.removeListener("change", l)
    };
    return settings;
}
module.exports = settings;
