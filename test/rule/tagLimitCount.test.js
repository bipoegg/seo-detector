'use strict'

var assert = require('chai').assert;
var cheerio = require('cheerio');
var RuleDetectLogic = require('../../lib/rule/ruleDetectLogic');

describe('tagLimitCount method', function () {

  var rootTag = '';
  var tag = 'h1';
  var limit = 1;

  it('input tag is empty', function () {
    const dom = cheerio.load(
      `<html>
          <head></head>
      </html>`
    );

    var ruleFn = RuleDetectLogic.detectLimitOfTagCount(rootTag, '', limit);
    assert.equal(ruleFn(dom), '');
  });

  it('input limit is negative', function () {
    const dom = cheerio.load(
      `<html>
          <head></head>
      </html>`
    );

    var ruleFn = RuleDetectLogic.detectLimitOfTagCount(rootTag, tag, -1);
    assert.equal(ruleFn(dom), '');
  });

  it('input tag has 0 h1 ', function () {
    const dom = cheerio.load(
      `<html>
          <head></head>
      </html>`
    );

    var ruleFn = RuleDetectLogic.detectLimitOfTagCount(rootTag, tag, limit);
    assert.equal(ruleFn(dom), '');
  });

  it('input tag has 1 h1 ', function () {
    const dom = cheerio.load(
      `<html>
          <head></head>
          <body>
            <h1>SEO example HTML</h1>
          </body>
      </html>`
    );

    var ruleFn = RuleDetectLogic.detectLimitOfTagCount(rootTag, tag, limit);
    assert.equal(ruleFn(dom), '');
  });

  it('input tag has 2 h1 ', function () {
    const dom = cheerio.load(
      `<html>
          <head></head>
          <body>
              <h1>SEO example HTML</h1>
              <h1>SEO example HTML</h1>
          </body>
      </html>`
    );

    var ruleFn = RuleDetectLogic.detectLimitOfTagCount(rootTag, tag, limit);
    assert.equal(ruleFn(dom), 'This HTML has more than ' + limit + ' <' + tag + '> tag');
  });

});