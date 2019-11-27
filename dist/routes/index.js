"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _bot = _interopRequireDefault(require("./../bot"));

var _actions = require("../actions");

var _helpers = require("../helpers");

var _messages = require("../messages");

var _path = _interopRequireDefault(require("path"));

var routes = _express["default"].Router();

var getHandle =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var replyKeyboard;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            replyKeyboard = {
              reply_markup: {
                resize_keyboard: true,
                one_time_keyboard: true,
                keyboard: [['Start exchange']]
              }
            };
            _context.next = 3;
            return (0, _actions.getIpAction)(req);

          case 3:
            _context.next = 5;
            return (0, _helpers.pause)(1000);

          case 5:
            _context.next = 7;
            return _bot["default"].telegram.sendMessage(req.query.id, _messages.messages.agreed, replyKeyboard);

          case 7:
            res.redirect(302, 'https://changenow.io/terms-of-use');

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getHandle(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

routes.get('/terms-of-use/:id', getHandle);
routes.get('*', function (req, res) {
  res.sendFile(_path["default"].join(__dirname + '/../../public/404.html'));
});
var _default = routes;
exports["default"] = _default;