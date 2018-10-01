'use strict'

var assert = require('chai').assert;
var cheerio = require('cheerio');
var RuleDetectLogic = require('../../lib/rule/ruleDetectLogic');


describe('tagExistenceWithAttrValue method', function () {

  var rootTag = 'head';
  var tag = 'meta';
  var attr = 'name';
  var value = 'description';

  it('input root is not valid - I', function () {
    const dom = cheerio.load(
      `<html>
          <head></head>  
          <body></body>
      </html>`
    );

    var ruleFn = RuleDetectLogic.detectTagWithAttributeValue('', tag, attr, value);
    assert.equal(ruleFn(dom), 'This HTML without <' + tag  + ' ' + attr + '=\'' + value + '\'> tag');
  });

  it('input root is not valid - II', function () {
    const dom = cheerio.load(
      `<html>
          <head></head>  
          <body><meta name="description" content="" /></body>
      </html>`
    );

    var ruleFn = RuleDetectLogic.detectTagWithAttributeValue('', tag, attr, value);
    assert.equal(ruleFn(dom), '');
  });

  it('input tag is not valid', function () {
    const dom = cheerio.load(
      `<html>
          <head></head>
      </html>`
    );

    var ruleFn = RuleDetectLogic.detectTagWithAttributeValue(rootTag, '', attr, value);
    assert.equal(ruleFn(dom), '');
  });

  it('input attr is not valid', function () {
    const dom = cheerio.load(
      `<html>
          <head></head>
      </html>`
    );

    var ruleFn = RuleDetectLogic.detectTagWithAttributeValue(rootTag, tag, '', value);
    assert.equal(ruleFn(dom), '');
  });

  it('input value is not valid', function () {
    const dom = cheerio.load(
      `<html>
          <head></head>
      </html>`
    );

    var ruleFn = RuleDetectLogic.detectTagWithAttributeValue(rootTag, tag, attr, '');
    assert.equal(ruleFn(dom), '');
  });

  it('input head has no defined attr value', function () {
    const dom = cheerio.load(
      `<html>
          <head></head>
      </html>`
    );

    var ruleFn = RuleDetectLogic.detectTagWithAttributeValue(rootTag, tag, attr, value);
    assert.equal(ruleFn(dom), 'This HTML without <' + tag  + ' ' + attr + '=\'' + value + '\'> tag');
  });

  it('input head has title', function () {
    const dom = cheerio.load(
      `<html>
          <head>
            <meta name="description" content="" />
          </head>
      </html>`
    );

    var ruleFn = RuleDetectLogic.detectTagWithAttributeValue(rootTag, tag, attr, value);
    assert.equal(ruleFn(dom), '');
  });
});
