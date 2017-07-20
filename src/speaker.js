"use strict";

// This module exposes a function called speaker. This function creates a
// speaker object, which speaks text passed in from other parts of the
// program. The speaker is multilingual. If it is given a string to speak, it
// just speaks the string. If it is given an object, it assumes it is a table
// keyed by language. It speaks the correct phrase for the language that the
// user has selected.

const _ = require("underscore");


// A shared audio context
function speaker() {
    // Constructor function that creates a speaker object. The constructor takes
    // a settings object so that the speaker can determine the current language
    // being spoken. The speaker will update itself, and the list of available
    // voices, when it detects that the user has changed languages.
    // The returned object exposes methods to speak text both synchronously and
    // asynchronously.

    // Private variables
    const audioContext = new window.AudioContext();
    let voice;           // The current voice being used by the speaker.
    let voices;          // All available voices for the current language.
    // Private methods
    const getLanguage = () => "en";

    function initVoices() {
        const correctLanguage = (voice) => voice.lang.includes(getLanguage());

        voices = window.speechSynthesis.getVoices().filter(correctLanguage);
        setVoice(voices);
    }
    function setVoice() {
        voice = voices[0];
    }

    // Public methods
    function speakSync(text) {
        // Speak the text, synchronously.
        // There are two input types that are handled seperately.
        //   string: The input text is read directly.
        //   object: The input is assumed to be a map from languages to
        //           text. The speaker asks the settings object for the current
        //           language and looks up the correct text for this langauge.
        let toSpeak = _.isString(text) ? text : text[getLanguage()];
        let utterance = new window.SpeechSynthesisUtterance(toSpeak.toLowerCase());
        utterance.lang = getLanguage();
        utterance.voice = voice;
        window.speechSynthesis.speak(utterance);
        return utterance;
    }

    let utterancehandle;
    function speakAsync(text, cb, delay = 1000) {
        // Speak the text, asynchronously. When finished, this procedure invokes a
        // callback to continue the program.
        // Note that a DOM element is passed in. The speech event is stored on the
        // DOM element. Without this, the event could be garbage-collected before
        // its callback is invoked.
        function afterRead() {
            setTimeout(cb, delay);
        }

        window.speechSynthesis.cancel()
        let utterance = speakSync(text);
        utterance.addEventListener("end", afterRead);
        utterancehandle = utterance;
    }

    function beep(freq, duration) {
        // Emit a pure tone of the requested frequency and duration.
        let oscillator = audioContext.createOscillator();
        oscillator.frequency.value = freq;
        oscillator.connect(audioContext.destination);
        oscillator.start();
        setTimeout(() => oscillator.stop(), duration);
    }

    let risingTone = new Audio('rise.mp3');
	let fallingTone = new Audio('fall.mp3');
    let tonePlaying = false;
    let timeout;

    //Ryan Campbell 2/27/2017
    //Start playing the rising tone and end with a beep after duration ms.
    function toneStart(duration) {
        const fudge = 50;

        if(!tonePlaying) {
            //timeout = setTimeout(() => {toneStop(); beep(600, 100);}, duration - fudge);
			timeout = setTimeout(() => {risingTone.pause(); beep(600, 100);fallingTone.play();}, duration - fudge);
            risingTone.play();
            tonePlaying = true;
        }
    }
	
	//PK add a seperate calibration tone to aviod fallingtone bug
	function calibrationTone(duration) {
        const fudge = 50;
        if(!tonePlaying) {
            timeout = setTimeout(() => {toneStop(); beep(600, 100);}, duration - fudge);
            risingTone.play();
            tonePlaying = true;
        }
    }


    //Ryan Campbell 2/27/2017
    //Silence the rising tone.
    function toneStop() {
        clearTimeout(timeout);
        risingTone.pause();
		fallingTone.pause();
        risingTone.currentTime = 0;
		fallingTone.currentTime = 0; 
        tonePlaying = false;
    }

    // Register event listeners.
    // settings.getLanguageSettings().addChangeListener(updateVoices); // If the user changes the language, change the voices.
    window.speechSynthesis.addEventListener("voiceschanged", initVoices); // Initialize voices once the page has loaded them.

    // Return an object with the relevant methods
    return { speakSync,
             speakAsync,
             beep,
             toneStart,
             toneStop, 
			 calibrationTone};
}

// Exports.
module.exports = speaker;