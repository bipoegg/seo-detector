'use strict';

var cheerio = require('cheerio');
var Rule = require('./rule/rule.js');
var DefaultRule = require('./rule/defaultRuleType');

var ReaderType = require('./reader/readerType');
var ReaderFactory = require('./reader/readerFactory');

var WriteType = require('./writer/writerType');
var WriterFactory = require('./writer/writerFactory');

class detector {

  constructor (inputOption, outputOption, ruleOptions) {

    // result array
    this.rules = [];
    this.detectErrors = [];

    // setup reader / writer
    this.reader = ReaderFactory.getReader(inputOption);
    this.writer = WriterFactory.getWriter(outputOption);

    // generate rule by input rules.
    for(var i in ruleOptions) {
      this.rules.push(new Rule(ruleOptions[i]));
    }
  }

  async detect() {

    // read data with reader
    var readData = await this.reader.read();

    if (!readData) {
      return;
    }

    var dom = cheerio.load(readData);
    this.rules.forEach((ruleItem) => {
      ruleItem.detect(dom);
      var errMsg = ruleItem.getDetectError();
      if (errMsg) {
        this.detectErrors.push(errMsg);
      }
    });
  }

  async writeResult() {
    await this.writer.write(this.detectErrors.length ? this.detectErrors.join('\r\n') : '');
  }
}

module.exports = {
  detector,
  ReaderType,
  WriteType,
  DefaultRule,
};
