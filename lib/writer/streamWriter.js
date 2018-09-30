'use strict'

var Fs = require('fs');
var BaseWriter = require('./baseWriter');

class streamWriter extends BaseWriter {
  constructor (path) {
    if (!path) {
      throw new Error('path not exist');
    } else {
      super();
      this.path = path;
    }
  };

  writeStream (data) {
    var writerStream = Fs.createWriteStream(this.path);

    return new Promise(function (resolve, reject) {

      writerStream.write(data,'UTF8');
      writerStream.end();

      writerStream.on('finish', function() {
        resolve();
      });

      writerStream.on('error', function(err){
        reject(err);
      });
    })

  }

  async write (data) {
    await this.writeStream(data);
  }
}

module.exports = streamWriter;
