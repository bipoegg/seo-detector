'use strict';

var FileWriter = require('./fileWriter');
var StreamWriter = require('./streamWriter');

const writerStore = {
  'FILE' : function (path) {
    return new FileWriter(path);
  },
  'STREAM' : function (path) {
    return new StreamWriter(path);
  },
  }
}

class writerFactory {

  static getWriter(option) {
    const writerFn = writerStore[option.type];

    if (writerFn) {
      return writerFn(option.path);
    } else {
      throw new Error('not supported reader type');
    }
  }
}

module.exports = writerFactory;
