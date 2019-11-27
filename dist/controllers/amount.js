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

var _helpers = require("../helpers");

var _keyboards = require("../keyboards");

var _config = require("../config");

var _messages = require("../messages");

// Amount scene
var amount = new _base["default"]('amount');
amount.enter(
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(ctx) {
    var selectedFrom, selectedTo, tradePair, minValue, minValueMsg;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            selectedFrom = ctx.session.curFrom;
            selectedTo = ctx.session.curTo;
            tradePair = "".concat(selectedFrom, "_").concat(selectedTo);
            _context.next = 5;
            return (0, _helpers.getMinimumAmount)(tradePair);

          case 5:
            minValue = _context.sent;
            (0, _helpers.saveToSession)(ctx, 'minValue', minValue);
            minValueMsg = minValue ? "Minimal amount - <b>".concat(minValue, "</b>") : '';
            _context.next = 10;
            return ctx.replyWithHTML("Enter the amount of <b>".concat(selectedFrom.toUpperCase(), "</b> you would like to exchange.\n").concat(minValueMsg), (0, _keyboards.getAmountKeyboard)(ctx));

          case 10:
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
amount.command('start',
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
amount.hears([/[.,0-9a-zA-Zа-яА-Я]+/gi, _config.config.kb.back, _config.config.kb.cancel, _config.config.kb.help],
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
            return ctx.scene.enter('curr_to');

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
            _context3.next = 21;
            return (0, _actions.selectAmountAction)(ctx);

          case 21:
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
var _default = amount;
exports["default"] = _default;