'use strict';

var DefaultRule = require('./defaultRuleType');
var DetectLogic = require('./ruleDetectLogic');

class rule {
  constructor (ruleType) {
    this.type = ruleType;
    this.errMsg = '';
  }

  detect (dom) {
    // detect rule by type;
    this.detectRuleByType(dom);
  };

  getDetectError () {
    return this.errMsg;
  };

  detectRuleByType(dom) {
    var ruleFunction = null;
    switch (this.type) {
      case DefaultRule.imgWithoutAlt:
        ruleFunction = DetectLogic.detectTagWithoutAttributeCount('', 'img', 'alt');
        break;
      case DefaultRule.aWithoutRel:
        ruleFunction = DetectLogic.detectTagWithoutAttributeCount('', 'a', 'rel');
        break;
      default:
        break;
    }

    if (ruleFunction) {
      this.errMsg = ruleFunction(dom);
    }
  };
}

module.exports = rule;
