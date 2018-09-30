'use strict';

var FileReader = require('./fileReader');
var StreamReader = require('./streamReader');

const readerStore = {
  'FILE' : function (path) {
    return new FileReader(path);
  },
  'STREAM' : function (path) {
    return new StreamReader(path);
  }
}

class readerFactory {

    static getReader(option) {
      if (!option) {
        throw new Error('Need pass reader option');
      }

      const readerFn = readerStore[option.type];

      if (readerFn) {
        return readerFn(option.path);
      } else {
        throw new Error('not supported reader type');
      }
    }
}

module.exports = readerFactory;
