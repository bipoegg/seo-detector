'use strict';

var ReaderFactory = require('./reader/readerFactory');
var WriterFactory = require('./writer/writerFactory');

class detector {

  constructor (inputOption, outputOption, ruleOptions) {

    // result array
    this.detectErrors = [];

    // setup reader / writer
    this.reader = ReaderFactory.getReader(inputOption);
    this.writer = WriterFactory.getWriter(outputOption);
  }

  async detect() {

    // read data with reader
    var readData = await this.reader.read();

    if (!readData) {
      return;
    }
  }

  async writeResult() {
    await this.writer.write(this.detectErrors.length ? this.detectErrors.join('\r\n') : '');
  }
}

module.exports = detector;
