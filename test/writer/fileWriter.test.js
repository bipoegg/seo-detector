'use restrict'

var assert = require('chai').assert;
var FileWriter = require('../../lib/writer/fileWriter');

describe('FileWriter class', function () {

  it('error if path not be assigned', function () {
    assert.throws(() => new FileWriter(), 'path not exist');
  });

  it('set path success', function () {
    const path = './output.html';
    const fileWriter = new FileWriter(path);
    assert.equal(fileWriter.path, path);
  });

  it('test if write file successful', function () {
    const path = __dirname + '/output.html';
    const fileWriter = new FileWriter(path);
    fileWriter
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
