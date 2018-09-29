'use strict'

var SeoDetector = require('./../lib/detector');

var inputOption = {
  type: 'FILE',
  path: __dirname + '/exampleInput.html'
};

var outputOption = {
  type: 'FILE',
  path: __dirname + '/exampleOutput.html'
};

var seoDetector = new SeoDetector(inputOption, outputOption);

seoDetector
  .detect()
  .then(async() => await seoDetector.writeResult())
  .catch(err => console.error(err));
