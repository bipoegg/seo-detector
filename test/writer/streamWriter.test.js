'use strict'

var assert = require('chai').assert;
var StreamWriter = require('../../lib/writer/streamWriter');

describe('StreamWriter class', function () {

  it('error if path not be assigned', function () {
    assert.throws(() => new StreamWriter(), 'path not exist');
  });

  it('set path success', function () {
    const path = './output.html';
    const streamWriter = new StreamWriter(path);
    assert.equal(streamWriter.path, path);
  });

  it('test if write stream successful', function () {
    const path = __dirname + '/output.html';
    const streamWriter = new StreamWriter(path);
    streamWriter
      .write('testWriter')
      .then(() => {
          const fs = require('fs');
          fs.readFile(path, (err, data) => {
            assert.equal(data, 'testWriter');
          });
        }
      );
  });
});
