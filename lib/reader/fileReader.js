'use strict';

var Fs = require('fs');
var BaseReader = require('./baseReader');

class fileReader extends BaseReader {

  constructor (path) {
    if (!path) {
      throw new Error('path not exist');
    } else {
      super();
      this.path = path;
    }
  };

  readFile() {
    return new Promise((resolve, reject) => {
      Fs.readFile(this.path, 'utf8', (err, readData) => {
        if (err) {
          return reject(err);
        } else {
          resolve(readData);
        }
      });
    });
  }

  async read() {
    var data = await this.readFile();
    return data;
  }
}

module.exports = fileReader;
