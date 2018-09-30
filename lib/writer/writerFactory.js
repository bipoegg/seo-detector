'use strict';

var FileWriter = require('./fileWriter');
var StreamWriter = require('./streamWriter');
var ConsoleWriter = require('./consoleWriter');

const writerStore = {
  'FILE' : function (path) {
    return new FileWriter(path);
  },
  'STREAM' : function (path) {
    return new StreamWriter(path);
  },
  'CONSOLE' : function (path) {
    return new ConsoleWriter(path);
  }
}

class writerFactory {

  static getWriter(option) {
    if (!option) {
      throw new Error('Need pass writer option');
    }

    const writerFn = writerStore[option.type];

    if (writerFn) {
      return writerFn(option.path);
    } else {
      throw new Error('not supported writer type');
    }
  }
}

module.exports = writerFactory;
