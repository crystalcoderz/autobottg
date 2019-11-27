"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _base = _interopRequireDefault(require("telegraf/scenes/base"));

var _stage = _interopRequireDefault(require("telegraf/stage"));

var _helpers = require("../helpers");

var _messages = require("../messages");

var _api = require("../api");

var _keyboards = require("../keyboards");

var _actions = require("../actions");

var _config = require("../config");

// Currency From scene
var leave = _stage["default"].leave;
var currFrom = new _base["default"]('curr_from');
currFrom.enter(
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(ctx) {
    var currs;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = ctx.session.currs;

            if (_context.t0) {
              _context.next = 5;
              break;
            }

            _context.next = 4;
            return (0, _api.getAllCurrencies)();

          case 4:
            _context.t0 = _context.sent;

          case 5:
            currs = _context.t0;
            _context.next = 8;
            return ctx.replyWithHTML(_messages.messages.selectFromMsg, (0, _keyboards.getFromKeyboard)(currs));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
currFrom.command('start',
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(ctx) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _helpers.startHandler)(ctx);

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}());
currFrom.hears([/(.*)/gi, _config.config.kb.cancel, _config.config.kb.help],
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(ctx) {
    var txt;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            txt = ctx.message.text;

            if (!(_config.config.kb.cancel === txt)) {
              _context3.next = 7;
              break;
            }

            _context3.next = 4;
            return ctx.reply(_messages.messages.cancel, (0, _keyboards.getReplyKeyboard)(ctx));

          case 4:
            _context3.next = 6;
            return (0, _actions.cancelTradeAction)(ctx);

          case 6:
            return _context3.abrupt("return");

          case 7:
            if (!(_config.config.kb.help === txt)) {
              _context3.next = 15;
              break;
            }

            _context3.next = 10;
            return ctx.reply(_messages.messages.support);

          case 10:
            _context3.next = 12;
            return (0, _helpers.pause)(500);

          case 12:
            _context3.next = 14;
            return ctx.reply(_config.config.email);

          case 14:
            return _context3.abrupt("return");

          case 15:
            if (!txt.match(/[^()A-Za-z\s]+/gi)) {
              _context3.next = 19;
              break;
            }

            _context3.next = 18;
            return ctx.reply(_messages.messages.validErr);

          case 18:
            return _context3.abrupt("return");

          case 19:
            if (!txt.match(/[()A-Za-z\s]+/gi)) {
              _context3.next = 22;
              break;
            }

            _context3.next = 22;
            return (0, _actions.selectFromCurrencyAction)(ctx);

          case 22:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}());
currFrom.command('start', leave());
var _default = currFrom;
exports["default"] = _default;