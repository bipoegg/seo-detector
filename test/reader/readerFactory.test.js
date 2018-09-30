'use strict'

var assert = require('chai').assert;
var ReaderType = require('../../lib/reader/readerType');
var ReaderFactory = require('../../lib/reader/readerFactory');
var FileReader = require('../../lib/reader/fileReader');
var StreamReader = require('../../lib/reader/streamReader');

describe('ReaderFactory class', function () {

  it('error if option not be assigned', function () {
    assert.throws(() => ReaderFactory.getReader(), 'Need pass reader option');
  });

  it('error when the reader type not assign', function () {
    var readerOption = {
      path: null
    }
    assert.throws(() => ReaderFactory.getReader(readerOption), 'not supported reader type');
  });

  it('error when the reader type is assign right', function () {
    var readerOption = {
      type: null,
      path: null
    }
    assert.throws(() => ReaderFactory.getReader(readerOption), 'not supported reader type');
  });

  it('error when the reader type is not support', function () {
    var readerOption = {
      type: 'not_support',
      path: null
    }
    assert.throws(() => ReaderFactory.getReader(readerOption), 'not supported reader type');
  });

  it('error when the reader path not assign', function () {
    var readerOption = {
      type: ReaderType.FILE
    }
    assert.throws(() => ReaderFactory.getReader(readerOption), 'path not exist');
  });

  it('error when the reader path not assign right', function () {
    var readerOption = {
      type: ReaderType.FILE,
      path: null
    }
    assert.throws(() => ReaderFactory.getReader(readerOption), 'path not exist');
  });

  it('fileReader will be generated successfully when option is right', function () {
    var readerOption = {
      type: ReaderType.FILE,
      path: __dirname + '/test.html'
    }
    var fileReader = ReaderFactory.getReader(readerOption);
    assert.instanceOf(fileReader, FileReader, 'fileReader is instance of FileReader');
  });

  it('streamReader will be generated successfully when option is right', function () {
    var readerOption = {
      type: ReaderType.STREAM,
      path: __dirname + '/test.html'
    }
    var streamReader = ReaderFactory.getReader(readerOption);
    assert.instanceOf(streamReader, StreamReader, 'streamReader is instance of StreamReader');
  });
});
