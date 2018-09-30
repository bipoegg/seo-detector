'use strict'

var Fs = require('fs');
var BaseWriter = require('./baseWriter');

class consoleWriter extends BaseWriter {
  constructor () {
    super();
  };

  async write (data) {
    console.log(data);
  }
}

module.exports = consoleWriter;
