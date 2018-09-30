'use strict';

var FileReader = require('./fileReader');

const readerStore = {
  'FILE' : function (path) {
    return new FileReader(path);
  }
}

class readerFactory {

    static getReader(option) {
      const readerFn = readerStore[option.type];

      if (readerFn) {
        return readerFn(option.path);
      } else {
        throw new Error('not supported reader type');
      }
    }
}

module.exports = readerFactory;
