"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _base = _interopRequireDefault(require("telegraf/scenes/base"));

var _messages = require("../messages");

var _keyboards = require("../keyboards");

var _actions = require("../actions");

var _config = require("../config");

var _helpers = require("../helpers");

// Currency To scene
var curTo = new _base["default"]('curr_to');
<<<<<<< HEAD
curTo.enter(
=======
curTo.enter(function (ctx) {
  ctx.replyWithHTML(_messages.messages.selectToMsg, (0, _keyboards.getToKeyboard)(ctx));
});
curTo.command('start', function (ctx) {
  return (0, _helpers.startHandler)(ctx);
});
curTo.hears([/(.*)/gi, _config.config.kb.back, _config.config.kb.cancel, _config.config.kb.help],
>>>>>>> [65]Added pwd and ssl connection
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(ctx) {
<<<<<<< HEAD
=======
    var txt;
>>>>>>> [65]Added pwd and ssl connection
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
<<<<<<< HEAD
            _context.next = 2;
            return ctx.replyWithHTML(_messages.messages.selectToMsg, (0, _keyboards.getToKeyboard)(ctx));

          case 2:
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
curTo.command('start',
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
curTo.hears([/(.*)/gi, _config.config.kb.back, _config.config.kb.cancel, _config.config.kb.help],
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

            if (!(_config.config.kb.back === txt)) {
              _context3.next = 5;
              break;
            }

            _context3.next = 4;
            return ctx.scene.enter('curr_from');

          case 4:
            return _context3.abrupt("return");

          case 5:
            if (!(_config.config.kb.cancel === txt)) {
              _context3.next = 11;
              break;
            }

            _context3.next = 8;
            return ctx.reply(_messages.messages.cancel, (0, _keyboards.getReplyKeyboard)(ctx));

          case 8:
            _context3.next = 10;
            return (0, _actions.cancelTradeAction)(ctx);

          case 10:
            return _context3.abrupt("return");

          case 11:
            if (!(_config.config.kb.help === txt)) {
              _context3.next = 19;
              break;
            }

            _context3.next = 14;
            return ctx.reply(_messages.messages.support);

          case 14:
            _context3.next = 16;
            return (0, _helpers.pause)(500);

          case 16:
            _context3.next = 18;
            return ctx.reply(_config.config.email);

          case 18:
            return _context3.abrupt("return");

          case 19:
            if (!txt.match(/^\u2705/g)) {
              _context3.next = 23;
              break;
            }

            _context3.next = 22;
            return ctx.reply(_messages.messages.sameCurErr);

          case 22:
            return _context3.abrupt("return");

          case 23:
            if (!txt.match(/[^()A-Za-z\s]+/gi)) {
              _context3.next = 27;
              break;
            }

            _context3.next = 26;
            return ctx.reply(_messages.messages.validErr);

          case 26:
            return _context3.abrupt("return");

          case 27:
            if (!txt.match(/[()A-Za-z\s]+/gi)) {
              _context3.next = 30;
              break;
            }

            _context3.next = 30;
            return (0, _actions.selectToCurrencyAction)(ctx);

          case 30:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x3) {
    return _ref3.apply(this, arguments);
=======
            txt = ctx.message.text;

            if (!(_config.config.kb.back === txt)) {
              _context.next = 4;
              break;
            }

            ctx.scene.enter('curr_from');
            return _context.abrupt("return");

          case 4:
            if (!(_config.config.kb.cancel === txt)) {
              _context.next = 8;
              break;
            }

            ctx.reply(_messages.messages.cancel, (0, _keyboards.getReplyKeyboard)(ctx));
            (0, _actions.cancelTradeAction)(ctx);
            return _context.abrupt("return");

          case 8:
            if (!(_config.config.kb.help === txt)) {
              _context.next = 14;
              break;
            }

            ctx.reply(_messages.messages.support);
            _context.next = 12;
            return (0, _helpers.pause)(500);

          case 12:
            ctx.reply(process.env.CN_EMAIL);
            return _context.abrupt("return");

          case 14:
            if (!txt.match(/^\u2705/g)) {
              _context.next = 17;
              break;
            }

            ctx.reply(_messages.messages.sameCurErr);
            return _context.abrupt("return");

          case 17:
            if (!txt.match(/[^()A-Za-z\s]+/gi)) {
              _context.next = 20;
              break;
            }

            ctx.reply(_messages.messages.validErr);
            return _context.abrupt("return");

          case 20:
            if (!txt.match(/[()A-Za-z\s]+/gi)) {
              _context.next = 23;
              break;
            }

            _context.next = 23;
            return (0, _actions.selectToCurrencyAction)(ctx);

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
>>>>>>> [65]Added pwd and ssl connection
  };
}());
var _default = curTo;
exports["default"] = _default;