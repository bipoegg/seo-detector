'use strict'

var assert = require('chai').assert;
var cheerio = require('cheerio');
var RuleDetectLogic = require('../../lib/rule/ruleDetectLogic');

describe('tagWithoutAttrCount method', function () {

  var rootTag = '';
  var tag = 'img';
  var attr = 'alt';

  it('input tag is not valid', function () {
    const dom = cheerio.load(
      `<html>
          <head></head>
          <body>
              <img src="." alt="seo desc" />
          </body>
      </html>`
    );

    var ruleFn = RuleDetectLogic.detectTagWithoutAttributeCount(rootTag, '', attr);
    assert.equal(ruleFn(dom), '');
  });

  it('input attr is not valid', function () {
    const dom = cheerio.load(
      `<html>
          <head></head>
          <body>
              <img src="." alt="seo desc" />
          </body>
      </html>`
    );

    var ruleFn = RuleDetectLogic.detectTagWithoutAttributeCount(rootTag, tag, '');
    assert.equal(ruleFn(dom), '');
  });

  it('input tag has specific attr', function () {
    const dom = cheerio.load(
      `<html>
          <head></head>
          <body>
              <img src="." alt="seo desc" />
          </body>
      </html>`
    );

    var ruleFn = RuleDetectLogic.detectTagWithoutAttributeCount(rootTag, tag, attr);
    assert.equal(ruleFn(dom), '');
  });

  it('input tag without 1 specific attr ', function () {
    const dom = cheerio.load(
      `<html>
          <head></head>
          <body>
              <img src="."/>
          </body>
      </html>`
    );

    var ruleFn = RuleDetectLogic.detectTagWithoutAttributeCount(rootTag, tag, attr);
    assert.equal(ruleFn(dom), 'There are 1 <' + tag + '> without ' + attr + ' attribute');
  });

  it('input tag without 5 specific attr ', function () {
    const dom = cheerio.load(
      `<html>
          <head></head>
          <body>
              <img src="."/>
              <img src="."/>
              <img src="."/>
              <img src="."/>
              <img src="."/>
          </body>
      </html>`
    );

    var ruleFn = RuleDetectLogic.detectTagWithoutAttributeCount(rootTag, tag, attr);
    assert.equal(ruleFn(dom), 'There are 5 <' + tag + '> without ' + attr + ' attribute');
  });

});