'use strict'

var Fs = require("fs");
var BaseReader = require('./baseReader');

class streamReader extends BaseReader {
  constructor(path) {
    if (!path) {
      throw new Error('path not exist');
    } else {
      super();
      this.path = path;
    }
  };

  readStream () {
    var readerStream = Fs.createReadStream(this.path);
    readerStream.setEncoding('UTF8');
    var readData = '';

    return new Promise(function(resolve, reject) {

      readerStream.on('data', function(chunk) {
        readData += chunk;
      });

      readerStream.on('end', function(){
        resolve(readData);
      });

      readerStream.on('error', function(err){
        reject(err);
      });
    });
  };

  async read() {
    var data = await this.readStream();
    return data;
  }
}

module.exports = streamReader;