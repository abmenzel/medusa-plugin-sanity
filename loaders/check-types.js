"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var checkContentTypes = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(container) {
    var sanityService, products, t;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          sanityService = container.resolve('sanityService');
          _context.next = 3;
          return sanityService.getDocumentsOfType('product');
        case 3:
          products = _context.sent;
          _context.next = 6;
          return sanityService.getAllMedusaProducts();
        case 6:
          t = _context.sent;
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function checkContentTypes(_x) {
    return _ref.apply(this, arguments);
  };
}();
var _default = checkContentTypes;
exports["default"] = _default;