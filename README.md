<h1 align="center">seo-detect</h1>
<h5 align="center">A Node.js package scan a HTML content and show all of SEO defects.</h5>

<br />

```js
const {
 detector,
 ReaderType,
 WriteType,
 DefaultRule,
 SupportedRuleEngine
} = require('seo-detector-demo');

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

var ruleOptions = [];
// Filter default rule with index.
for (var i in DefaultRule) {
  var index = Object.keys(DefaultRule).indexOf(i);
  if (index >= 0) {
    ruleOptions.push({name: i});
  }
}

// customized rule with supported rule engine
ruleOptions.push({name: 'customized1',
                  engine: SupportedRuleEngine.tagWithoutAttrCount,
                  param: {root: '', tag:'foo', attr:'123'}});
ruleOptions.push({name: 'customized2',
                  engine: SupportedRuleEngine.tagExistence,
                  param: {root: '', tag:'foo'}});
ruleOptions.push({name: 'customized3',
                  engine: SupportedRuleEngine.tagExistenceWithAttrValue,
                  param: {root: '', tag:'foo', attr:'name', value:'seo'}});
ruleOptions.push({name: 'customized4',
                  engine: SupportedRuleEngine.tagLimitCount,
                  param: {root: '', tag:'foo', limit:1}});

// customized rule with customized rule engine
ruleOptions.push({name: 'customizedRuleEngine', ruleFn : $ => {
    var errors = '';
    if (!$('aaa').length) {
      errors = 'This html does not contains <aaa> tag!';
    }
   return errors;
}});

var seoDetector = new detector(fileOption.input, fileOption.output, ruleOptions);

seoDetector
  .detect()
  .then(async() => await seoDetector.writeResult())
  .catch(err => console.error(err));
```

## Requirements
Node.js 8.9.1 or greater

## Installation
`npm install seo-detector-demo`

## Predefined Rules
1. Detect if there are any `<img />` tags without `alt` attribute<br />
2. Detect if there are any `<a />` tags without `rel` attribute<br />
3. Detect if there is any header that doesn’t have `<title>` tag<br />
4. Detect if there is any header that doesn’t have `<meta name="descriptions" … />` tag<br />
5. Detect if there is any header that doesn’t have `<meta name="keywords" … />` tag<br />
6. Detect if there are more than 15 `<strong>` tag in HTML <br />
7. Detect if a HTML have more than one `<h1>` tag<br />


### Default rule option
```js
const { DefaultRule } = require('seo-detector-demo');

/** Default rule name
 * imgWithoutAlt,
 * aWithoutRel,
 * headerNoTitle,
 * headerNoMetaDescription,
 * headerNoMetaKeywords,
 * moreThan15Strong,
 * moreThan1H1
 */

var ruleOptions = [];
for (var i in DefaultRule) {
  var index = Object.keys(DefaultRule).indexOf(i);
  if (index >= 0) {
    ruleOptions.push({name: i});
  }
}
```

### Customized rule option with default rule engine
```js
const { SupportedRuleEngine } = require('seo-detector-demo');

/** Default rule engine name
 * tagWithoutAttrCount,
 * tagExistence,
 * tagExistenceWithAttrValue,
 * tagLimitCount
 */

var ruleOptions = [];
ruleOptions.push({name: 'customized1',
                  engine: SupportedRuleEngine.tagWithoutAttrCount,
                  param: {root: '', tag:'foo', attr:'123'}});
ruleOptions.push({name: 'customized2',
                  engine: SupportedRuleEngine.tagExistence,
                  param: {root: '', tag:'foo'}});
ruleOptions.push({name: 'customized3',
                  engine: SupportedRuleEngine.tagExistenceWithAttrValue,
                  param: {root: '', tag:'foo', attr:'name', value:'seo'}});
ruleOptions.push({name: 'customized4',
                  engine: SupportedRuleEngine.tagLimitCount,
                  param: {root: '', tag:'foo', limit:1}});
```

### Customized rule option with customized rule engine
```js
var ruleOptions = [];
ruleOptions.push({name: 'customizedRuleEngine', ruleFn : $ => {
    var errors = '';
    if (!$('aaa').length) {
      errors = 'This html does not contains <aaa> tag!';
    }
   return errors;
}});
```

### Reader
There are 2 reader types: FILE and STREAM.
```js
const { ReaderType } = require('seo-detector-demo');

var inputOption = {
    type : ReaderType.FILE,
    path: __dirname + '/exampleInput.html'
};
```

### Writer
There are 3 writer types: FILE, STREAM, CONSOLE.
```js
const { WriterType } = require('seo-detector-demo');

var inputOption = {
    type : Writer.FILE,
    path: __dirname + '/exampleOutput.html'
};
```

### Detector
#### constructor(inputOption, outputOption, ruleOptions)
User can choose which pre-defined rule will be used through ruleOptions
```js
const { detector } = require('seo-detector-demo');
const seoDetector = new detector(inputOption, outputOption, ruleOptions);
// skip pre-defined rules if it doesn't add into ruleOptions
```

#### detect() && writeResult()
```js
seoDetector
  .detect()
  .then(async () => await seoDetector.writeResult())
  .catch(err => console.error(err));
```

## Unit testing
Run `npm test` in the seo-detector-demo.