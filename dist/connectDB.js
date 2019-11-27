"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectDatabase = connectDatabase;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true // ssl: true,

};

function connectDatabase(_x, _x2, _x3) {
  return _connectDatabase.apply(this, arguments);
}

function _connectDatabase() {
  _connectDatabase = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(host, port, database) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _mongoose["default"].connect("mongodb://".concat(process.env.DB_USERNAME, ":").concat(process.env.DB_PASS, "@").concat(host, ":").concat(port, "/").concat(database), options);

          case 3:
            console.log("Database connection successful on ".concat(host, ":").concat(port, "/").concat(database));
            _context.next = 9;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 6]]);
  }));
  return _connectDatabase.apply(this, arguments);
}