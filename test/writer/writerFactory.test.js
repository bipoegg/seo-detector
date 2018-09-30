'use strict'

var assert = require('chai').assert;
var WriterType = require('../../lib/writer/writerType');
var WriterFactory = require('../../lib/writer/writerFactory');
var FileWriter = require('../../lib/writer/fileWriter');
var StreamWriter = require('../../lib/writer/streamWriter');
var ConsoleWriter = require('../../lib/writer/consoleWriter');

describe('WriterFactory class', function () {

  it('error if option not be assigned', function () {
    assert.throws(() => WriterFactory.getWriter(), 'Need pass writer option');
  });

  it('error when the writer type not assign', function () {
    var writerOption = {
      path: null
    }
    assert.throws(() => WriterFactory.getWriter(writerOption), 'not supported writer type');
  });

  it('error when the writer type is assign right', function () {
    var writerOption = {
      type: null,
      path: null
    }
    assert.throws(() => WriterFactory.getWriter(writerOption), 'not supported writer type');
  });

  it('error when the writer type is not support', function () {
    var writerOption = {
      type: 'not_support',
      path: null
    }
    assert.throws(() => WriterFactory.getWriter(writerOption), 'not supported writer type');
  });

  it('error when the writer path not assign', function () {
    var writerOption = {
      type: WriterType.FILE
    }
    assert.throws(() => WriterFactory.getWriter(writerOption), 'path not exist');
  });

  it('error when the writer path not assign right', function () {
    var writerOption = {
      type: WriterType.FILE,
      path: null
    }
    assert.throws(() => WriterFactory.getWriter(writerOption), 'path not exist');
  });

  it('fileWriter will be generated successfully when option is right', function () {
    var writerOption = {
      type: WriterType.FILE,
      path: __dirname + '/test.html'
    }
    var fileWriter = WriterFactory.getWriter(writerOption);
    assert.instanceOf(fileWriter, FileWriter, 'fileWriter is instance of FileWriter');
  });

  it('streamWriter will be generated successfully when option is right', function () {
    var writerOption = {
      type: WriterType.STREAM,
      path: __dirname + '/test.html'
    }
    var streamWriter = WriterFactory.getWriter(writerOption);
    assert.instanceOf(streamWriter, StreamWriter, 'streamWriter is instance of StreamWriter');
  });

  it('consoleWriter will be generated successfully when option is right', function () {
    var writerOption = {
      type: WriterType.CONSOLE,
      path: __dirname + '/test.html'
    }
    var consoleWriter = WriterFactory.getWriter(writerOption);
    assert.instanceOf(consoleWriter, ConsoleWriter, 'consoleWriter is instance of ConsoleWriter');
  });
});
