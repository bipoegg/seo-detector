'use strict'

var assert = require('chai').assert;
var cheerio = require('cheerio');
var RuleDetectLogic = require('../../lib/rule/ruleDetectLogic');

describe('tagExistence method', function () {

  var rootTag = 'head';
  var tag = 'title';

  it('input head has no title', function () {
    const dom = cheerio.load(
      `<html>
          <head></head>
      </html>`
    );

    var ruleFn = RuleDetectLogic.detectExistTag(rootTag, tag);
    assert.equal(ruleFn(dom), 'This HTML without <' + tag + '> tag');

  });

  it('input head has title', function () {
    const dom = cheerio.load(
      `<html>
          <head>
            <title>aaa</title>
          </head>
      </html>`
    );

    var ruleFn = RuleDetectLogic.detectExistTag(rootTag, tag);
    assert.equal(ruleFn(dom), '');
  });
});
