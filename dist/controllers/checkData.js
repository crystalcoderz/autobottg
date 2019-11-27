"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _base = _interopRequireDefault(require("telegraf/scenes/base"));

var _actions = require("../actions");

var _config = require("../config");

var _helpers = require("../helpers");

var _keyboards = require("../keyboards");

var _messages = require("../messages");

// Amount scene
var checkData = new _base["default"]('check');
checkData.enter(
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(ctx) {
    var curFromInfo, curToInfo, pair, hasPair;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            curFromInfo = ctx.session.curFromInfo;
            curToInfo = ctx.session.curToInfo;
            pair = "".concat(curFromInfo.ticker, "_").concat(curToInfo.ticker);
            _context.next = 5;
            return (0, _helpers.validatePair)(pair);

          case 5:
            hasPair = _context.sent;

            if (!hasPair) {
              _context.next = 12;
              break;
            }

            _context.next = 9;
            return ctx.scene.enter('amount');

          case 9:
            return _context.abrupt("return");

          case 12:
            (0, _helpers.deleteFromSession)(ctx, 'curFrom');
            (0, _helpers.deleteFromSession)(ctx, 'curTo');
            (0, _helpers.deleteFromSession)(ctx, 'curFromInfo');
            (0, _helpers.deleteFromSession)(ctx, 'curToInfo');
            _context.next = 18;
            return ctx.reply(_messages.messages.invalidPair);

          case 18:
            _context.next = 20;
            return (0, _helpers.pause)(1000);

          case 20:
            _context.next = 22;
            return ctx.scene.enter('curr_from');

          case 22:
            return _context.abrupt("return");

          case 23:
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
checkData.command('start',
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
checkData.hears([/[A-Za-z0-9]/gi, _config.config.kb.back, _config.config.kb.cancel, _config.config.kb.help],
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
            return ctx.scene.enter('amount');

          case 4:
            return _context3.abrupt("return");

          case 5:
            if (!(_config.config.kb.next === txt)) {
              _context3.next = 9;
              break;
            }

            _context3.next = 8;
            return ctx.scene.enter('agree');

          case 8:
            return _context3.abrupt("return");

          case 9:
            if (!(_config.config.kb.cancel === txt)) {
              _context3.next = 15;
              break;
            }

            _context3.next = 12;
            return ctx.reply(_messages.messages.cancel, (0, _keyboards.getReplyKeyboard)(ctx));

          case 12:
            _context3.next = 14;
            return (0, _actions.cancelTradeAction)(ctx);

          case 14:
            return _context3.abrupt("return");

          case 15:
            if (!(_config.config.kb.help === txt)) {
              _context3.next = 23;
              break;
            }

            _context3.next = 18;
            return ctx.reply(_messages.messages.support);

          case 18:
            _context3.next = 20;
            return (0, _helpers.pause)(500);

          case 20:
            _context3.next = 22;
            return ctx.reply(_config.config.email);

          case 22:
            return _context3.abrupt("return");

          case 23:
            _context3.next = 25;
            return (0, _actions.inputAdditionalDataAction)(ctx);

          case 25:
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
var _default = checkData;
exports["default"] = _default;