"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.someCollection = exports.simpleMedusaProduct = exports.productWithVariants = exports.productWithImage = exports.productWithCollection = void 0;
var simpleMedusaProduct = {
  title: 'Simple Product',
  subtitle: 'Simple Product Subtitle',
  description: 'Simple Product Description',
  tags: [{
    value: 'some-tag'
  }, {
    value: 'other-tag'
  }],
  type: {
    value: 'physical'
  },
  is_giftcard: false,
  discountable: true
};
exports.simpleMedusaProduct = simpleMedusaProduct;
var productWithImage = {
  title: 'Product with image',
  subtitle: 'Product with Image',
  description: 'Description',
  tags: [{
    value: 'some-tag'
  }],
  type: {
    value: 'physical'
  },
  is_giftcard: false,
  discountable: true,
  thumbnail: 'https://picsum.photos/200',
  images: ['https://picsum.photos/200']
};
exports.productWithImage = productWithImage;
var productWithVariants = {
  title: 'Product with variants',
  subtitle: 'Product with variants',
  description: 'Description',
  tags: [{
    value: 'some-tag'
  }],
  type: {
    value: 'physical'
  },
  is_giftcard: false,
  discountable: true,
  options: [{
    title: 'Option 1'
  }],
  variants: [{
    title: 'Variant 1',
    prices: [{
      currency_code: 'EUR',
      amount: 1000
    }],
    options: [{
      value: 'some-option-1'
    }]
  }, {
    title: 'Variant 2',
    prices: [{
      currency_code: 'EUR',
      amount: 1000
    }],
    options: [{
      value: 'some-option-2'
    }]
  }]
};
exports.productWithVariants = productWithVariants;
var productWithCollection = {
  title: 'Product with collection',
  subtitle: 'Product with collection',
  description: 'Description',
  tags: [{
    value: 'some-tag'
  }],
  type: {
    value: 'physical'
  },
  is_giftcard: false,
  discountable: true,
  collection_id: 'some-collection'
};
exports.productWithCollection = productWithCollection;
var someCollection = {
  title: 'Some Collection',
  handle: 'some-collection'
};
exports.someCollection = someCollection;