"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

require("dotenv/config");

var _connectDB = require("./connectDB");

var _routes = _interopRequireDefault(require("./routes"));

var app = (0, _express["default"])();
app.use('/', _routes["default"]);
app.listen(process.env.APP_PORT,
/*#__PURE__*/
(0, _asyncToGenerator2["default"])(
/*#__PURE__*/
_regenerator["default"].mark(function _callee() {
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log("Server listening on ".concat(process.env.APP_PORT));
          _context.next = 3;
          return (0, _connectDB.connectDatabase)(process.env.DB_HOST, process.env.DB_PORT, process.env.DB_NAME);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));