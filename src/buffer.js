"use strict";

// npm imports

const EventEmitter = require("events");

// File imports
const util = require("./util.js");

// This module exposes the procedure "buffer", the constructor for the buffer
// object. The buffer object all interactions with the text buffer. It typically
// recieves its instrutions from menu buttons. The buffer constructor is divided
// into a few sections.
//
// The first section defines elementary buffer operations, such as pushing text
// onto the buffer or retrieving the content of the buffer.
//
// The second section defines buffer write procedures. These are the types of
// operations that are exposed to enable clients (namely menu buttons to write
// their contents to the buffer). All procedures intended for external use are
// registered in the "writers" table.

// The third section defines buffer action procedures. These are similar to
// buffer write procedures. However, since they may need to execute
// asynchronously (e.g. for reading the buffer text), they take an extra
// callback argument. They perform their action, and then invoke the callback to
// return control to the caller (typically a menu button). They are registered
// in the "actions" table.

// The final section defines the object returned by the procedure. This object
// exposes methods to get the buffer text, add and remove listeners, write to
// the buffer, and execute actions. When the "write" method is invoked, a
// dispatch is performed based on the type of the text being entered. This type
// is passed in from the menu button that called the "write" method. Similar for
// the "executeAction" method, except that "write" executes synchronously while
// "executeAction" invokes a callback when finished.

// A convention: one-line procedures are expressed as arrow functions for
// brevity. Others use the older syntax.

// Exports
module.exports = buffer;

function buffer(speaker) {
    // Constructor for text buffer.

    // Constants
    const CURSOR = "_";          // Cursor character. Could be |, for instance.
    const BEEP_DURATION = 1000;  // Length in ms of beep signalling speech.
    const AFTER_BEEP_WAIT = 1000; // Time after beep before reading buffer text.
    const BEEP_FREQ = 350;       // Beep to announce buffer reading.
    const AFTER_READ_WAIT = 2000; // After reading buffer text, wait 2s before scanning.

    // Procedure dispatch tables.
    let writers = {};
    let actions = {};
    const registerWriter = (type, proc) => writers[type] = proc;
    const registerAction = (type, proc) => actions[type] = proc;

    // Local variables
    let emitter = new EventEmitter();
    let bufferText = CURSOR;

    // ********************************************************************** //

    // Elementary buffer operations

    const getText = () => bufferText.slice(0);

    const emitChange = () => emitter.emit("bufferChange");

    function push(str) {         // Push a string onto the buffer.
        bufferText += str;
    }

    function pop() {        // Pop a character off the end of the buffer.
        bufferText = bufferText.slice(0, -1);
    }

    const isTerminalPunctuation = (char) => char.match(/[.!?]/) !== null;

    const isBufferWordStart = () => getText() === "_" || getText().slice(-2) == " _";

    function isBufferSentenceStart() {
        let text = getText();
        return (text === "" ||
                (text.slice(-2) === " _" &&
                 isTerminalPunctuation(text.slice(-3))));
    }

    // ********************************************************************** //

    // Buffer writers

    function writeText(text) {         // Generic procedure to write to buffer.
        pop();                  // Get cursor out of the way
        push(text);
        push(CURSOR);           // Add the cursor back
    }

    function writeLetter(text) {
        // For letters, capitalize if at beginning of sentence
        let toWrite = isBufferSentenceStart() ? util.capitalize(text) : text;
        writeText(toWrite);
    }
    registerWriter("letter", writeLetter);

    const writeSpace = () => writeText(" ");
    registerWriter("space", writeSpace);

    function writeWord(text) {     // Write a whole word to the buffer. Used in word guessing.
        while (!isBufferWordStart()) // Clear out partial word.
            deleteText();
        let toWrite = isBufferSentenceStart() ? util.capitalize(text) : text;
        writeText(toWrite);
        writeSpace();
    }
    registerWriter("word", writeWord);

    // Do the same thing to write a non-terminal punctuation character as for generic text.
    registerWriter("nonTerminalPunctuation", writeText);

    function writeTerminalPunctuation(text) {
        if (isBufferWordStart() && !isBufferSentenceStart()) {
            // This covers the case where the last word was autocompleted and a space inserted.
            pop();
        }
        writeText(text);
        writeSpace();           // Add space to start new word
    }
    registerWriter("terminalPunctuation", writeTerminalPunctuation);

    // ********************************************************************** //

    // Buffer actions.

    function deleteText() {
        pop();                  // Need to pop the cursor and the last letter
        pop();
        push(CURSOR);           // Then add the cursor back
        emitChange();
    }
    registerAction("delete", deleteText);

    function readBuffer(cb) {
        let afterBeep = () => speaker.speakAsync(getText().slice(0, -1), cb, AFTER_READ_WAIT);
        speaker.beep(BEEP_FREQ, BEEP_DURATION);
        setTimeout(afterBeep, BEEP_DURATION + AFTER_BEEP_WAIT);
    }
    registerAction("read", readBuffer);

    function clearBuffer(cb) {
        // Clear the buffer. Invoke callback when finished.
        bufferText = CURSOR;
        emitChange();
        cb();
    }
    registerAction("clear", clearBuffer);

    // ********************************************************************** //

    // The returned object
    let that = {
        getText: getText,
        write: function(text, type) {
            // Write to the buffer, dispatching on category.
            let writer = writers[type];
            writer(text);
            emitChange();
        },
        executeAction: function(actionName, cbpressed) {
            // Perform buffer action, dispatching on action name.
            let action = actions[actionName];
            action(cbpressed);
        },
        addChangeListener: (listener) => emitter.addListener("bufferChange", listener),
        removeChangeListener: (listener) => emitter.removeListener("bufferChange", listener)
    };

    // Initialize and return
    return that;
}
