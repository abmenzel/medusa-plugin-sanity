"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformMedusaPrices = exports.transformMedusaOptions = void 0;
var transformMedusaPrices = function transformMedusaPrices(prices) {
  return prices.map(function (price) {
    return {
      _key: price.id,
      currency_code: price.currency_code,
      amount: price.amount
    };
  });
};
exports.transformMedusaPrices = transformMedusaPrices;
var transformMedusaOptions = function transformMedusaOptions(variant, options) {
  return options.map(function (option) {
    return {
      _key: option.id,
      value: {
        en: option.value
      },
      option_id: option.id,
      variant_id: variant.id
    };
  });
};
exports.transformMedusaOptions = transformMedusaOptions;