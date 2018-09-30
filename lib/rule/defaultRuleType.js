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
                }},
  headerNoTitle: {  name: 'headerNoTitle',
                    engine: RuleEngine.tagExistence,
                    param: {
                      root: 'head',
                      tag: 'title'
                 }},
  headerNoMetaDescription: {  name: 'headerNoMetaDescription',
                              engine: RuleEngine.tagExistenceWithAttrValue,
                              param: {
                                root: 'head',
                                tag: 'meta',
                                attr: 'name',
                                value: 'description'
                           }},
  headerNoMetaKeywords: { name: 'headerNoMetaKeywords',
                          engine: RuleEngine.tagExistenceWithAttrValue,
                          param: {
                            root: 'head',
                            tag: 'meta',
                            attr: 'name',
                            value: 'keywords'
                          }},
  moreThan15Strong: { name: 'moreThan15Strong',
                      engine: RuleEngine.tagLimitCount,
                      param: {
                        root: '',
                        tag: 'strong',
                        limit: 15
                    }},
  moreThan1H1: {  name: 'moreThan1H1',
                  engine: RuleEngine.tagLimitCount,
                  param: {
                    root: '',
                    tag: 'h1',
                    limit: 1
                }}
};
