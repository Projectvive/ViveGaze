# Wedjat

Wedjat is an app designed to aid communication for individuals with disabilities.

## Installation

### Prerequisites

Wedjat requires [Node.js](http://nodejs.org/)

### Package dependencies

Clone the repository. Change to the repository directory and execute the following in the command prompt to install the requisite packages from npm:

```
npm install
```

## Running the program

Before you can run the program, you must bundle the source files by typing the command:
```
npm run prebuild
```

then, you can enter the following to start:

```
./node_modules/.bin/electron .
```
## Building the program

First Install electron-zip-packager in the command prompt while in the appropriate directory
```
npm install electron-zip-packager
```
You can create the .exe from the source code by typing the following command
```
npm run build
```

A 'dist' folder will be created in the directory with folders made specifically for various types of OS
