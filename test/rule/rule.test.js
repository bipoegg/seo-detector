'use strict'

var assert = require('chai').assert;
var Rule = require('../../lib/rule/rule');
var DefaultRuleType = require('../../lib/rule/defaultRuleType');

describe('Rule class', function () {

  it('error if rule option not assign', function () {
    assert.throws(() => new Rule(), 'need rule option');
  });

  for (var i in DefaultRuleType) {
    it( DefaultRuleType[i].name + ' ruleFn will not be null' , function () {

      var rule = new Rule(DefaultRuleType[i]);
      assert.isNotNull(rule.ruleFn);
    });
  }

  it('ruleFn will be null when rule engine is not support', function () {
    var ruleOption = {
      name: null,
      engine: 'not_support'
    };
    var rule = new Rule(ruleOption);
    assert.isNull(rule.ruleFn);
  });

  it('ruleFn will be null when rule engine parameter not assign', function () {
    var ruleOption = {
      name: null,
      engine: 'tagExistence'
    };
    var rule = new Rule(ruleOption);
    assert.isNull(rule.ruleFn);
  });

  it('ruleFn will be null when rule engine and ruleFn not assign', function () {
    var ruleOption = {
      name: null,
      engine: null,
      ruleFn: null
    };

    var rule = new Rule(ruleOption);
    assert.isNull(rule.ruleFn);
  });

  it('if not use support rule function, it will use customized ruleFn', function () {
    var ruleFn = function () {};
    var ruleOption = {
      name: null,
      engine: null,
      'ruleFn': ruleFn
    };

    var rule = new Rule(ruleOption);
    assert.equal(rule.ruleFn, ruleFn);
  });
});
