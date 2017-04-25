"use strict";

const EventEmitter = require("events");
const util = require("./util.js");

// ************************************************************************** //

// This module exposes a function called detector, which creates a detector
// object. Since different users will have different needs and abilities, this
// object can be set to detect different types of gestures.
// At present two gestures are implemented: a detector recognizing an upward
// gaze can be constructed using makeGazeDetector, while a detector for
// recognizing the pressing of the "shift" key can be constructed using
// makeKeyDetector. This detector is of most use for debugging.
// New detector constructors can be registered using registerConstructor.
// The UI presents a dropdown menu allowing for the selection of a detection
// mode. It generates that menu based on all available constructors in the
// global "constructors" table.
// The exported detector constructor creates an object that encapsulates a
// specific detector type. When the user selects a new detector type from the
// dropdown, the constructor for that specific detector is called, and the newly
// created object is set as the prototype for the wrapper object created by
// "detector".



// ************************************************************************** //
//Ryan Campbell
//the base detector class
class Detector {
    constructor() {
        this.emitter = new EventEmitter();
    }
    addBeginListener(listener) {
        this.emitter.addListener("gestureBegin", listener);
    }
    removeBeginListener(listener) {
        this.emitter.removeListener("gestureBegin", listener);
    }
    addEndListener(listener) {
        this.emitter.addListener("gestureEnd", listener);
    }
    removeEndListener(listener) {
        this.emitter.removeListener("gestureEnd", listener);
    }
}


   // Constants
    const REFRESH_RATE_LISTEN = 5; // When listening, check the camera 5 times a second.
    const REFRESH_RATE_SCAN = 20; // When scanning, check 20 times a second.

//RC
//the camera based gaze detector
class GazeDetector extends Detector {
    constructor() {
        super();
        this.stream = makeVideoStream();
        this.rest = makeTemplate("rest", this.stream);
        this.gaze = makeTemplate("gaze", this.stream);
        this.resting = true;
        this.interval = null;
        this.lastEvent = null;
        this.eventStart = null;

        window.setInterval(() => this.detect(), 1000 / REFRESH_RATE_SCAN);
    }
    //RC- capture a rest reference image
    captureRest() {
        this.rest.capture();
    }
    //RC- capture a gaze reference image
    captureGaze() {
        this.gaze.capture();
    }
    //RC- return the length of the last event detected.
    getLastEvent() {
        return this.lastEvent;
    }
    //RC- detect when the user does a "gaze" 
    detect() {
        // Compares current video frame to templates. Emits events if change occurred.
        let streamPixels = this.stream.getPixels();
        let dRest = l1Distance(streamPixels, this.rest.getPixels());
        let dGaze = l1Distance(streamPixels, this.gaze.getPixels());
        let newState = (dGaze < dRest) ? "gaze" : "rest";

        if (this.resting && newState === "gaze") {
            this.eventStart = new Date();
            this.emitter.emit("gestureBegin");    // If we went from resting to gazing, then the gaze started.

        }
        if (!this.resting && newState === "rest") {
            this.lastEvent = new Date() - this.eventStart;
            this.emitter.emit("gestureEnd");
        }
        this.resting = newState == "rest";
    }
}

function makeVideoStream() {
    // Create an object that wraps the incoming video stream.
    // Enables the user to select the video source using the dropdown menu in
    // the DOM.
    // Returns an object that exposes the video DON element, and the pixels for
    // the current video frame.

    // Private variables and methods.
    let video = document.querySelector("video");
    let cc = makeCanvasContainer("video");
    let sourceElem = getVideoSource();
    let stream;

    function stopCurrentStream() {
        // When a camera switch happens, stop getting data from the old camera.
        if (stream !== undefined) {
            stream.getTracks()[0].stop();
        }
    }

    function initStream() {
        // Initialize a new camera stream (and stop the old one if it exists).
        function handleVideo(videoStream) {
            // Keep a pointer the video stream around so it can be stopped later.
            stream = videoStream;
            video.src = window.URL.createObjectURL(videoStream);
        }
        function videoError(e) {
            throw new Error("Something went wrong with the video feed.");
        }
        let constraints = { video: {
            optional: [{
                sourceId: sourceElem.value
            }]
        }};
        stopCurrentStream();
        navigator.webkitGetUserMedia(constraints, handleVideo, videoError);
    }

    // The exposed object.
    let that = {
        getVideo: () => video,
        getPixels: function() {
            // Write the current video frame to an invisible canvas and grab its pixels.
            cc.context.drawImage(video, 0, 0, cc.getWidth(), cc.getHeight());
            return cc.context.getImageData(0, 0, cc.getWidth(), cc.getHeight());
        }
    };

    // Bind event handlers, initialize, return
    sourceElem.addEventListener("change", initStream);
    initStream();
    return that;
}

function makeTemplate(name, videoStream) {
    // Constructor for a template object.
    // Binds an event handler to the relevant "capture" button in the DOM, so
    // that when pressed it will create a template from the current video frame.
    // Exposes a method to retrieve the captured template's pixels.

    // Local variables and methods
    let cc = makeCanvasContainer(name);
    let selector = `input[type=button][data-canvas-id=${name}]`;
    let button = document.querySelector(selector);

    function capture() {
        // Procedure to capture the current video image as a template.
        cc.context.drawImage(videoStream.getVideo(), 0, 0, cc.getWidth(), cc.getHeight());
    }

    // The returned object.
    let that = {
        getPixels: () => cc.context.getImageData(0, 0, cc.getWidth(), cc.getHeight()),
        capture: () => capture()
    };

    // Bind event handler and return.
    button.addEventListener("click", capture);
    return that;
}

function getVideoSource() {
    // Detects all available video input sources (e.g. MacBook pro camera, USB
    // cameras if attached, etc). Adds them as options in the relevant drop-down
    // menu in the app. Returns the DOM object for this menu.

    let sourceElem = document.querySelector("select[name=videoSource]");
    function success(devices) {
        // Invoked if the browser successfully enumerates all available media devices.
        function appendIfVideo(device) {
            // Add video devices to the dropdown list of available input sources.
            if (device.kind === "videoinput") {
                let option = document.createElement("option");
                option.value = device.deviceId;
                option.text = device.label.replace(/ \(.*/, "");
                sourceElem.appendChild(option);
            }
        }
        devices.forEach(appendIfVideo);
    }
    function failure(err) {
        throw new Error("Video sources not correctly detected.");
    }

    // Initialize the list of available devices, and return the DOM object.
    navigator.mediaDevices.enumerateDevices().then(success).catch(failure);
    return sourceElem;
}

function makeCanvasContainer(name) {
    // Initialize a canvas. Return the canvas, its context, and getters for its dimenions.

    // Constants
    const VIDEO_HEIGHT = 120;   // Values here should match up with values in cbstyle.css
    const VIDEO_WIDTH = 160;    // Input camera should have a 4:3 aspect ratio.

    let canvas = document.querySelector(`canvas[data-canvas-id=${name}]`);
    canvas.setAttribute("height", VIDEO_HEIGHT);
    canvas.setAttribute("width", VIDEO_WIDTH);
    let context = canvas.getContext("2d");

    let that = { canvas,
                 context,
                 getWidth: () => canvas.width,
                 getHeight: () => canvas.height };
    return that;
}

function l1Distance(img1, img2) {
    // Compute the L1 distance between two imageData objects. Used by the gaze
    // detector.
    // Info on imageData object here: https://developer.mozilla.org/en-US/docs/Web/API/ImageData
    let { width, height } = checkDimensions(img1, img2);
    let x1 = img1.data;
    let x2 = img2.data;
    let distance = 0;
    let ixMax = width * height * 4;
    for (let i = 0; i < ixMax; i += 1) {
        if (i % 4 === 3) {
            continue;           // Don't compare the alpha values.
        }
        else {
            distance += Math.abs(x1[i] - x2[i]);
        }
    }
    return distance;
}

function checkDimensions(img1, img2) {
    // Make sure that the image dimensions match up. If so, return width and height.
    let matchWidth = img1.width === img2.width;
    let matchHeight = img1.height === img2.height;
    if (matchWidth & matchHeight) {
        return { width: img1.width, height: img1.height };
    }
    else {
        throw new Error("Image dimensions do not match.");
    }
}

module.exports = GazeDetector;