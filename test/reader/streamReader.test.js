'use strict'

var assert = require('chai').assert;
var StreamReader = require('../../lib/reader/streamReader');

describe('StreamReader class', function () {

  it('error if path not be assigned', function () {
    assert.throws(() => new StreamReader(), 'path not exist');
  });

  it('set path success', function () {
    const path = './test.html';
    const streamReader = new StreamReader(path);
    assert.equal(streamReader.path, path);
  });

  it('error for not existing file', function () {
    const streamReader = new StreamReader(__dirname + '/notExist.html');
    streamReader
      .read()
      .then(
        result => {
          throw new Error('File not exist, Error');
        },
        err => {
          assert.isDefined(err);
        });
  });
});
