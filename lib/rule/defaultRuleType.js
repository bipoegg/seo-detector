const RuleEngine = require('./supportedRuleEngine');

module.exports = {
  imgWithoutAlt: { name: 'imgWithoutAlt',
                   engine: RuleEngine.tagWithoutAttrCount,
                   param: {
                     root: '',
                     tag: 'img',
                     attr: 'alt'
                   }},
  aWithoutRel: {  name: 'aWithoutRel',
                  engine: RuleEngine.tagWithoutAttrCount,
                  param: {
                    root: '',
                    tag: 'a',
                    attr: 'rel'
                }}
};
