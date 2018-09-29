'use strict';

var cheerio = require('cheerio');
var Rule = require('./rule/rule.js');
var DefaultRule = require('./rule/defaultRuleType');

var ReaderFactory = require('./reader/readerFactory');
var WriterFactory = require('./writer/writerFactory');

class detector {

  constructor (inputOption, outputOption) {

    // result array
    this.rules = [];
    this.detectErrors = [];

    // setup reader / writer
    this.reader = ReaderFactory.getReader(inputOption);
    this.writer = WriterFactory.getWriter(outputOption);

    // generate rule by pre-define rules.
    var ruleTypes = [];
    for(var i in DefaultRule) {
      ruleTypes.push(DefaultRule[i]);
    }
    this.generateRules(ruleTypes);
  }

  generateRules(ruleTypes) {
    ruleTypes.forEach( (rule) => {
      this.rules.push(new Rule(rule));
    });
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

module.exports = detector;
