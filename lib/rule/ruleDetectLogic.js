'use strict';

var _ = require('underscore');

module.exports = {

  /**
   * counting specific attribute of tag.
   * @param {string} root - root tag
   * @param {string} tag - tag
   * @param {string} attribute - attribute
   */
  detectTagWithoutAttributeCount: function(root, tag, attribute){
    // validate function
    return function(dom){

      var errMsg = '';

      if (!tag || !attribute) {
        return errMsg;
      }

      var count = dom(`${root} ${tag}:not([${attribute}])`).length;
      if (count > 0) {
        errMsg = `There are ${count} <${tag}> without ${attribute} attribute`;
      }
      return errMsg;
    };
  },
  /**
   * detect if tag exist
   * @param {string} root - root tag name
   * @param {string} tag - tag name
   */
  detectExistTag: function(root, tag){
    // validate function
    return function(dom){
      var errMsg = '';

      if (!tag) {
        return errMsg;
      }

      var count = dom(`${root} ${tag}`).length;
      if (count <= 0) {
        errMsg = `This HTML without <${tag}> tag`;
      }

      return errMsg;
    };
  },
  /**
   * detect tag with attribute and specific value
   * @param {string} root - root tag name
   * @param {string} tag - tag name
   * @param {string} attr - attribute name
   * @param {string} value - value
   */
  detectTagWithAttributeValue: function(root, tag, attr, value){
    // validate function
    return function(dom){
      var errMsg = '';

      if (!tag || !attr || !value) {
        return errMsg;
      }

      var count = dom(`${root} ${tag}[${attr}*=${value}]`).length;
      if (count <= 0) {
        errMsg = `This HTML without <${tag} ${attr}='${value}'> tag`;
      }
      return errMsg;
    };
  },
  /**
   * detect if the count of tag exceeds the limit
   * @param {string} root - root tag name
   * @param {string} tag - tag name
   * @param {number} limit - number of limit
   */
  detectLimitOfTagCount: function(root, tag, limit){
    // validate function
    return function(dom){
      var errMsg = '';

      if (!tag || limit < 0) {
        return errMsg;
      }

      var count = dom(`${root} ${tag}`).length;
      if (count > limit) {
        errMsg = `This HTML has more than ${limit} <${tag}> tag`;
      }
      return errMsg;
    };
  },
}
