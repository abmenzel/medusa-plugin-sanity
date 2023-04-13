"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createImageField = void 0;
var createImageField = function createImageField(image) {
  return {
    _key: image._id,
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: image._id
    }
  };
};
exports.createImageField = createImageField;