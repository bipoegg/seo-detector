'use strict'

const {
  detector,
  ReaderType,
  WriteType,
  DefaultRule,
  SupportedRuleEngine
} = require('./../lib/detector');

var fileOption = {
  input: {
    type : ReaderType.FILE,
    path: __dirname + '/exampleInput.html'
  },
  output: {
    type: WriteType.FILE,
    path: __dirname + '/exampleOutput.html'
  }
};

var streamOption = {
  input: {
    type : ReaderType.STREAM,
    path: __dirname + '/exampleInput.html'
  },
  output: {
    type: WriteType.STREAM,
    path: __dirname + '/exampleOutput.html'
  }
};

var consoleOption = {
  output: {
    type: WriteType.CONSOLE,
    path: ''
  }
};

var ruleOptions = [];
for (var i in DefaultRule) {
  var index = Object.keys(DefaultRule).indexOf(i);

  // Can filter index of default rule.
  if (index >= 0) {
    ruleOptions.push({name: i});
  }
}

// TODO: it needs detailed document, or need to extract these part as class to export.
// customized parameter with supported rule engine
ruleOptions.push({name: 'customized1', engine: SupportedRuleEngine.tagWithoutAttrCount,
                  param: {root: '', tag:'foo', attr:'123'}});
ruleOptions.push({name: 'customized2', engine: SupportedRuleEngine.tagExistence,
                  param: {root: '', tag:'foo'}});
ruleOptions.push({name: 'customized3', engine: SupportedRuleEngine.tagExistenceWithAttrValue,
                  param: {root: '', tag:'foo', attr:'name', value:'seo'}});
ruleOptions.push({name: 'customized4', engine: SupportedRuleEngine.tagLimitCount,
                  param: {root: '', tag:'foo', limit:1}});
ruleOptions.push({name: 'customized5', engine: 'bbb',
                  param: {root: '', tag:'foo'}});

// customized rule with customized rule engine
ruleOptions.push({name: 'customizedRuleEngine', ruleFn : $ => {
    var errors = '';
    if (!$('aaa').length) {
      errors = 'This html does not contains <aaa> tag!';
    }
   return errors;
}});

var seoDetector = new detector(streamOption.input, consoleOption.output, ruleOptions);

seoDetector
  .detect()
  .then(async() => await seoDetector.writeResult())
  .catch(err => console.error(err));
