'use strict'

const {
  detector,
  ReaderType,
  WriteType,
} = require('./../lib/detector');

var fileOption = {
  input: {
    type : ReaderType.FILE,
    path: __dirname + '/exampleInput.html'
  },
  output: {
    type: WriteType.FILE,
    path: __dirname + '/exampleOutput.html'
  }
};

var streamOption = {
  input: {
    type : ReaderType.STREAM,
    path: __dirname + '/exampleInput.html'
  },
  output: {
    type: WriteType.STREAM,
    path: __dirname + '/exampleOutput.html'
  }
};

var consoleOption = {
  output: {
    type: WriteType.CONSOLE,
    path: ''
  }
};


var seoDetector = new detector(streamOption.input, streamOption.output);

seoDetector
  .detect()
  .then(async() => await seoDetector.writeResult())
  .catch(err => console.error(err));
