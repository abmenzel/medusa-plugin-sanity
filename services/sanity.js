"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _client = require("@sanity/client");
var _medusaInterfaces = require("medusa-interfaces");
var _createBlock = require("./util/create-block");
var _mappers = require("./util/mappers");
var _path = require("path");
var _createImageField = require("./util/create-image-field");
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var SanityService = /*#__PURE__*/function (_BaseService) {
  (0, _inherits2["default"])(SanityService, _BaseService);
  var _super = _createSuper(SanityService);
  function SanityService(_ref, options) {
    var _this;
    var productService = _ref.productService,
      productCollectionService = _ref.productCollectionService,
      productVariantService = _ref.productVariantService;
    (0, _classCallCheck2["default"])(this, SanityService);
    _this = _super.call(this);
    _this.productService_ = productService;
    _this.productVariantService_ = productVariantService;
    _this.productCollectionService_ = productCollectionService;
    _this.sanityClient = (0, _client.createClient)({
      projectId: options.projectId,
      dataset: options.dataset,
      token: options.token,
      apiVersion: options.apiVersion,
      useCdn: options.useCdn
    });
    return _this;
  }
  (0, _createClass2["default"])(SanityService, [{
    key: "getAllMedusaProducts",
    value: function () {
      var _getAllMedusaProducts = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var _this2 = this;
        var products;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.productService_.list({});
            case 2:
              products = _context3.sent;
              products.map( /*#__PURE__*/function () {
                var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(p) {
                  var pp;
                  return _regenerator["default"].wrap(function _callee2$(_context2) {
                    while (1) switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return _this2.productService_.retrieve(p.id, {
                          relations: ['images']
                        });
                      case 2:
                        pp = _context2.sent;
                        pp.images.map( /*#__PURE__*/function () {
                          var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(i) {
                            return _regenerator["default"].wrap(function _callee$(_context) {
                              while (1) switch (_context.prev = _context.next) {
                                case 0:
                                  _context.next = 2;
                                  return _this2.getImageInSanity(i);
                                case 2:
                                case "end":
                                  return _context.stop();
                              }
                            }, _callee);
                          }));
                          return function (_x2) {
                            return _ref3.apply(this, arguments);
                          };
                        }());
                      case 4:
                      case "end":
                        return _context2.stop();
                    }
                  }, _callee2);
                }));
                return function (_x) {
                  return _ref2.apply(this, arguments);
                };
              }());
              return _context3.abrupt("return", products);
            case 5:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function getAllMedusaProducts() {
        return _getAllMedusaProducts.apply(this, arguments);
      }
      return getAllMedusaProducts;
    }()
  }, {
    key: "getDocumentsOfType",
    value: function () {
      var _getDocumentsOfType = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(type) {
        var query, documents;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              query = "*[_type == '".concat(type, "']");
              _context4.next = 3;
              return this.sanityClient.fetch(query);
            case 3:
              documents = _context4.sent;
              return _context4.abrupt("return", documents);
            case 5:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function getDocumentsOfType(_x3) {
        return _getDocumentsOfType.apply(this, arguments);
      }
      return getDocumentsOfType;
    }()
  }, {
    key: "getImageInSanity",
    value: function () {
      var _getImageInSanity = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(image) {
        var parsedUrl, parsedId, sanityImage;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              parsedUrl = (0, _path.parse)(image.url);
              parsedId = "image-".concat(parsedUrl.name).concat(parsedUrl.ext.replace('.', '-'));
              _context5.next = 4;
              return this.sanityClient.getDocument(parsedId);
            case 4:
              sanityImage = _context5.sent;
              return _context5.abrupt("return", sanityImage);
            case 6:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function getImageInSanity(_x4) {
        return _getImageInSanity.apply(this, arguments);
      }
      return getImageInSanity;
    }()
  }, {
    key: "getImagesInSanity",
    value: function () {
      var _getImagesInSanity = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(images) {
        var _this3 = this;
        var sanityImages;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return Promise.all(images.map( /*#__PURE__*/function () {
                var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(image) {
                  var existingSanityImage;
                  return _regenerator["default"].wrap(function _callee6$(_context6) {
                    while (1) switch (_context6.prev = _context6.next) {
                      case 0:
                        _context6.next = 2;
                        return _this3.getImageInSanity(image);
                      case 2:
                        existingSanityImage = _context6.sent;
                        if (!existingSanityImage) {
                          _context6.next = 7;
                          break;
                        }
                        return _context6.abrupt("return", existingSanityImage);
                      case 7:
                        console.error('Image not found in Sanity');
                      case 8:
                      case "end":
                        return _context6.stop();
                    }
                  }, _callee6);
                }));
                return function (_x6) {
                  return _ref4.apply(this, arguments);
                };
              }()));
            case 2:
              sanityImages = _context7.sent;
              return _context7.abrupt("return", sanityImages);
            case 4:
            case "end":
              return _context7.stop();
          }
        }, _callee7);
      }));
      function getImagesInSanity(_x5) {
        return _getImagesInSanity.apply(this, arguments);
      }
      return getImagesInSanity;
    }()
  }, {
    key: "createProductInSanity",
    value: function () {
      var _createProductInSanity = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(product) {
        var _this4 = this;
        var _medusaProduct$type, _medusaProduct$tags, _medusaProduct$option, medusaProduct, sanityVariants, sanityProductFields, sanityImages;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              _context9.next = 3;
              return this.productService_.retrieve(product.id, {
                relations: ['variants', 'options', 'tags', 'type', 'collection', 'images']
              });
            case 3:
              medusaProduct = _context9.sent;
              if (!medusaProduct.variants) {
                _context9.next = 10;
                break;
              }
              _context9.next = 7;
              return Promise.all(medusaProduct.variants.map( /*#__PURE__*/function () {
                var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(variant) {
                  var sanityVariant;
                  return _regenerator["default"].wrap(function _callee8$(_context8) {
                    while (1) switch (_context8.prev = _context8.next) {
                      case 0:
                        _context8.next = 2;
                        return _this4.createProductVariantInSanity(variant);
                      case 2:
                        sanityVariant = _context8.sent;
                        return _context8.abrupt("return", {
                          _key: sanityVariant._id,
                          _type: 'reference',
                          _ref: sanityVariant._id,
                          _weak: true
                        });
                      case 4:
                      case "end":
                        return _context8.stop();
                    }
                  }, _callee8);
                }));
                return function (_x8) {
                  return _ref5.apply(this, arguments);
                };
              }()));
            case 7:
              _context9.t0 = _context9.sent;
              _context9.next = 11;
              break;
            case 10:
              _context9.t0 = [];
            case 11:
              sanityVariants = _context9.t0;
              sanityProductFields = {
                _type: 'product',
                _id: medusaProduct.id,
                title: {
                  en: medusaProduct.title
                },
                subtitle: {
                  en: medusaProduct.subtitle
                },
                description: {
                  en: medusaProduct.description ? (0, _createBlock.createBlock)(medusaProduct.description) : undefined
                },
                handle: medusaProduct.handle,
                type: (_medusaProduct$type = medusaProduct.type) === null || _medusaProduct$type === void 0 ? void 0 : _medusaProduct$type.value,
                tags: ((_medusaProduct$tags = medusaProduct.tags) === null || _medusaProduct$tags === void 0 ? void 0 : _medusaProduct$tags.map(function (tag) {
                  return tag.value;
                })) || [],
                options: ((_medusaProduct$option = medusaProduct.options) === null || _medusaProduct$option === void 0 ? void 0 : _medusaProduct$option.map(function (option) {
                  return option.title;
                })) || [],
                variants: sanityVariants
              };
              if (medusaProduct.collection) {
                sanityProductFields['collection'] = {
                  _key: medusaProduct.collection.id,
                  _type: 'reference',
                  _ref: medusaProduct.collection.id,
                  _weak: true
                };
              }
              if (!medusaProduct.images) {
                _context9.next = 19;
                break;
              }
              _context9.next = 17;
              return this.getImagesInSanity(medusaProduct.images);
            case 17:
              sanityImages = _context9.sent;
              if (sanityImages.length > 0) {
                sanityProductFields['thumbnail'] = (0, _createImageField.createImageField)(sanityImages[0]);
                sanityProductFields['images'] = sanityImages.map(function (image) {
                  return (0, _createImageField.createImageField)(image);
                });
              }
            case 19:
              return _context9.abrupt("return", this.sanityClient.createOrReplace(sanityProductFields));
            case 22:
              _context9.prev = 22;
              _context9.t1 = _context9["catch"](0);
              throw _context9.t1;
            case 25:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this, [[0, 22]]);
      }));
      function createProductInSanity(_x7) {
        return _createProductInSanity.apply(this, arguments);
      }
      return createProductInSanity;
    }() // TODO: thumbnails
  }, {
    key: "updateProductInSanity",
    value: function () {
      var _updateProductInSanity = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(product) {
        var _this5 = this;
        var _medusaProduct$type2, _medusaProduct$tags2, _medusaProduct$option2, productEntry, medusaProduct, sanityVariants, updatedFields;
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              _context11.prev = 0;
              _context11.next = 3;
              return this.sanityClient.getDocument(product.id);
            case 3:
              _context11.t0 = _context11.sent;
              if (_context11.t0) {
                _context11.next = 8;
                break;
              }
              _context11.next = 7;
              return this.createProductInSanity(product);
            case 7:
              _context11.t0 = _context11.sent;
            case 8:
              productEntry = _context11.t0;
              _context11.next = 11;
              return this.productService_.retrieve(product.id, {
                relations: ['variants', 'options', 'tags', 'type', 'collection', 'images']
              });
            case 11:
              medusaProduct = _context11.sent;
              if (!medusaProduct.variants) {
                _context11.next = 18;
                break;
              }
              _context11.next = 15;
              return Promise.all(medusaProduct.variants.map( /*#__PURE__*/function () {
                var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(variant) {
                  var sanityVariant;
                  return _regenerator["default"].wrap(function _callee10$(_context10) {
                    while (1) switch (_context10.prev = _context10.next) {
                      case 0:
                        _context10.next = 2;
                        return _this5.createProductVariantInSanity(variant);
                      case 2:
                        sanityVariant = _context10.sent;
                        return _context10.abrupt("return", {
                          _key: sanityVariant._id,
                          _type: 'reference',
                          _ref: sanityVariant._id,
                          _weak: true
                        });
                      case 4:
                      case "end":
                        return _context10.stop();
                    }
                  }, _callee10);
                }));
                return function (_x10) {
                  return _ref6.apply(this, arguments);
                };
              }()));
            case 15:
              _context11.t1 = _context11.sent;
              _context11.next = 19;
              break;
            case 18:
              _context11.t1 = [];
            case 19:
              sanityVariants = _context11.t1;
              updatedFields = {
                title: {
                  en: medusaProduct.title
                },
                subtitle: {
                  en: medusaProduct.subtitle
                },
                description: {
                  en: (0, _createBlock.createBlock)(medusaProduct.description)
                },
                handle: medusaProduct.handle,
                type: (_medusaProduct$type2 = medusaProduct.type) === null || _medusaProduct$type2 === void 0 ? void 0 : _medusaProduct$type2.value,
                tags: ((_medusaProduct$tags2 = medusaProduct.tags) === null || _medusaProduct$tags2 === void 0 ? void 0 : _medusaProduct$tags2.map(function (tag) {
                  return tag.value;
                })) || [],
                options: ((_medusaProduct$option2 = medusaProduct.options) === null || _medusaProduct$option2 === void 0 ? void 0 : _medusaProduct$option2.map(function (option) {
                  return option.title;
                })) || [],
                variants: sanityVariants
              };
              if (medusaProduct.collection) {
                updatedFields['collection'] = {
                  _key: medusaProduct.collection.id,
                  _type: 'reference',
                  _ref: medusaProduct.collection.id,
                  _weak: true
                };
              }
              return _context11.abrupt("return", this.sanityClient.patch(productEntry._id).set(updatedFields).commit());
            case 25:
              _context11.prev = 25;
              _context11.t2 = _context11["catch"](0);
              throw _context11.t2;
            case 28:
            case "end":
              return _context11.stop();
          }
        }, _callee11, this, [[0, 25]]);
      }));
      function updateProductInSanity(_x9) {
        return _updateProductInSanity.apply(this, arguments);
      }
      return updateProductInSanity;
    }()
  }, {
    key: "createProductVariantInSanity",
    value: function () {
      var _createProductVariantInSanity = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(variant) {
        var medusaVariant, sanityVariantFields;
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              _context12.prev = 0;
              _context12.next = 3;
              return this.productVariantService_.retrieve(variant.id, {
                relations: ['prices', 'options']
              });
            case 3:
              medusaVariant = _context12.sent;
              sanityVariantFields = {
                _type: 'productVariant',
                _id: medusaVariant.id,
                title: {
                  en: medusaVariant.title
                },
                sku: medusaVariant.sku,
                inventory_quantity: medusaVariant.inventory_quantity,
                prices: (0, _mappers.transformMedusaPrices)(medusaVariant.prices),
                options: (0, _mappers.transformMedusaOptions)(medusaVariant, medusaVariant.options),
                variant_id: medusaVariant.id
              };
              return _context12.abrupt("return", this.sanityClient.createOrReplace(sanityVariantFields));
            case 8:
              _context12.prev = 8;
              _context12.t0 = _context12["catch"](0);
              throw _context12.t0;
            case 11:
            case "end":
              return _context12.stop();
          }
        }, _callee12, this, [[0, 8]]);
      }));
      function createProductVariantInSanity(_x11) {
        return _createProductVariantInSanity.apply(this, arguments);
      }
      return createProductVariantInSanity;
    }()
  }, {
    key: "updateProductVariantInSanity",
    value: function () {
      var _updateProductVariantInSanity = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(variant) {
        var variantEntry, medusaVariant, updatedFields;
        return _regenerator["default"].wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              _context13.prev = 0;
              _context13.next = 3;
              return this.sanityClient.getDocument(variant.id);
            case 3:
              _context13.t0 = _context13.sent;
              if (_context13.t0) {
                _context13.next = 8;
                break;
              }
              _context13.next = 7;
              return this.createProductVariantInSanity(variant);
            case 7:
              _context13.t0 = _context13.sent;
            case 8:
              variantEntry = _context13.t0;
              _context13.next = 11;
              return this.productVariantService_.retrieve(variant.id, {
                relations: ['prices', 'options']
              });
            case 11:
              medusaVariant = _context13.sent;
              updatedFields = {
                title: {
                  en: medusaVariant.title
                },
                sku: medusaVariant.sku,
                inventory_quantity: medusaVariant.inventory_quantity,
                prices: (0, _mappers.transformMedusaPrices)(medusaVariant.prices),
                options: (0, _mappers.transformMedusaOptions)(medusaVariant, medusaVariant.options)
              };
              return _context13.abrupt("return", this.sanityClient.patch(variantEntry._id).set(updatedFields).commit());
            case 16:
              _context13.prev = 16;
              _context13.t1 = _context13["catch"](0);
              throw _context13.t1;
            case 19:
            case "end":
              return _context13.stop();
          }
        }, _callee13, this, [[0, 16]]);
      }));
      function updateProductVariantInSanity(_x12) {
        return _updateProductVariantInSanity.apply(this, arguments);
      }
      return updateProductVariantInSanity;
    }()
  }, {
    key: "deleteDocumentInSanity",
    value: function () {
      var _deleteDocumentInSanity = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(document) {
        return _regenerator["default"].wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              _context14.prev = 0;
              _context14.next = 3;
              return this.sanityClient["delete"](document.id);
            case 3:
              _context14.next = 8;
              break;
            case 5:
              _context14.prev = 5;
              _context14.t0 = _context14["catch"](0);
              throw _context14.t0;
            case 8:
            case "end":
              return _context14.stop();
          }
        }, _callee14, this, [[0, 5]]);
      }));
      function deleteDocumentInSanity(_x13) {
        return _deleteDocumentInSanity.apply(this, arguments);
      }
      return deleteDocumentInSanity;
    }()
  }, {
    key: "createCollectionInSanity",
    value: function () {
      var _createCollectionInSanity = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(collection) {
        var medusaCollection, sanityCollection;
        return _regenerator["default"].wrap(function _callee15$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              _context15.prev = 0;
              _context15.next = 3;
              return this.productCollectionService_.retrieve(collection.id);
            case 3:
              medusaCollection = _context15.sent;
              _context15.next = 6;
              return this.sanityClient.createOrReplace({
                _type: 'productCollection',
                _id: collection.id,
                name: {
                  en: medusaCollection.title
                },
                handle: medusaCollection.handle
              });
            case 6:
              sanityCollection = _context15.sent;
              return _context15.abrupt("return", sanityCollection);
            case 10:
              _context15.prev = 10;
              _context15.t0 = _context15["catch"](0);
              throw _context15.t0;
            case 13:
            case "end":
              return _context15.stop();
          }
        }, _callee15, this, [[0, 10]]);
      }));
      function createCollectionInSanity(_x14) {
        return _createCollectionInSanity.apply(this, arguments);
      }
      return createCollectionInSanity;
    }()
  }, {
    key: "updateCollectionInSanity",
    value: function () {
      var _updateCollectionInSanity = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(collection) {
        var medusaCollection, existingCollection;
        return _regenerator["default"].wrap(function _callee16$(_context16) {
          while (1) switch (_context16.prev = _context16.next) {
            case 0:
              _context16.prev = 0;
              _context16.next = 3;
              return this.productCollectionService_.retrieve(collection.id);
            case 3:
              medusaCollection = _context16.sent;
              _context16.next = 6;
              return this.sanityClient.getDocument(medusaCollection.id);
            case 6:
              _context16.t0 = _context16.sent;
              if (_context16.t0) {
                _context16.next = 11;
                break;
              }
              _context16.next = 10;
              return this.createCollectionInSanity(medusaCollection);
            case 10:
              _context16.t0 = _context16.sent;
            case 11:
              existingCollection = _context16.t0;
              return _context16.abrupt("return", this.sanityClient.patch(existingCollection._id).set({
                name: {
                  en: medusaCollection.title
                },
                handle: medusaCollection.handle
              }).commit());
            case 15:
              _context16.prev = 15;
              _context16.t1 = _context16["catch"](0);
              throw _context16.t1;
            case 18:
            case "end":
              return _context16.stop();
          }
        }, _callee16, this, [[0, 15]]);
      }));
      function updateCollectionInSanity(_x15) {
        return _updateCollectionInSanity.apply(this, arguments);
      }
      return updateCollectionInSanity;
    }()
  }]);
  return SanityService;
}(_medusaInterfaces.BaseService);
var _default = SanityService;
exports["default"] = _default;