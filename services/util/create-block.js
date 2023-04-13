"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBlock = void 0;
var createBlock = function createBlock(text) {
  return [{
    _key: '1',
    style: 'normal',
    _type: 'block',
    markDefs: [],
    children: [{
      _type: 'span',
      _key: '1',
      text: text,
      marks: []
    }]
  }];
};
exports.createBlock = createBlock;