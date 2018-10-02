'use strict';

var DefaultRule = require('./defaultRuleType');
var DetectLogic = require('./ruleDetectLogic');

const ruleEngineStore = {
  'tagWithoutAttrCount': function (param) {
    return DetectLogic.detectTagWithoutAttributeCount(param.root, param.tag, param.attr);
  },
  'tagExistence': function (param) {
    return DetectLogic.detectExistTag(param.root, param.tag);
  },
  'tagExistenceWithAttrValue': function (param) {
    return DetectLogic.detectTagWithAttributeValue(param.root, param.tag, param.attr, param.value);
  },
  'tagLimitCount': function (param) {
    return DetectLogic.detectLimitOfTagCount(param.root, param.tag, param.limit);
  }
};

class rule {
  constructor (ruleOption) {
    if(!ruleOption) {
      throw new Error('need rule option');
    }

    this.name = ruleOption.name;
    this.ruleFn = this.getRuleFn(ruleOption);
    this.errMsg = '';
  }

  detect (dom) {
    if (this.ruleFn) {
      this.errMsg = this.ruleFn(dom);
    }
  };

  getDetectError () {
    return this.errMsg;
  };

  getRuleFn(ruleOption) {

    var ruleFunction = null;
    var defaultRule = DefaultRule[ruleOption.name];

    var ruleEngine = defaultRule ? defaultRule.engine : ruleOption.engine;
    var param = defaultRule ? defaultRule.param : ruleOption.param;

    // use assigned rule engine and need to check if it is supported.
    if (ruleEngine) {
      var ruleEngineFn = ruleEngineStore[ruleEngine];

      if (ruleEngineFn && param) {
        ruleFunction = ruleEngineFn(param);
      }

    } else {
      // use real customized rule fn;
      ruleFunction = ruleOption.ruleFn;
    }

    return ruleFunction;
  };
}

module.exports = rule;
