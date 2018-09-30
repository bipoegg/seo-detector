'use restrict'

var assert = require('chai').assert;
var FileReader = require('../../lib/reader/fileReader');

describe('FileReader class', function () {

  it('error if path not be assigned', function () {
    assert.throws(() => new FileReader(), 'path not exist');
  });

  it('set path success', function () {
    const path = './test.html';
    const fileReader = new FileReader(path);
    assert.equal(fileReader.path, path);
  });

  it('error for not existing file', function () {
    const fileReader = new FileReader(__dirname + '/notExist.html');
    fileReader
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
