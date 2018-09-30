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
      var count = dom(`${root} ${tag}`).length;
      if (count <= 0) {
        errMsg = `This HTML without <${tag}> tag`;
      }

      return errMsg;
    };
  }
}
