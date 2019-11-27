"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _base = _interopRequireDefault(require("telegraf/scenes/base"));

var _helpers = require("../helpers");

var _actions = require("../actions");

var _keyboards = require("../keyboards");

var _config = require("../config");

var _messages = require("../messages");

//estimateExchange  scene
var estimateExchange = new _base["default"]('est_exch');
estimateExchange.enter(
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(ctx) {
    var amount, curFrom, curTo, fromTo, amountTotal;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            amount = ctx.session.amount;
            curFrom = ctx.session.curFrom;
            curTo = ctx.session.curTo;
            fromTo = "".concat(curFrom, "_").concat(curTo);
            _context.next = 6;
            return (0, _helpers.getAmountTotal)(amount, fromTo);

          case 6:
            amountTotal = _context.sent;
            (0, _helpers.saveToSession)(ctx, 'amountTotal', amountTotal);
            _context.next = 10;
            return (0, _helpers.pause)(1000);

          case 10:
            _context.next = 12;
            return ctx.replyWithHTML("You\u2019re sending <b>".concat(amount, " ").concat(curFrom.toUpperCase(), "</b>; you\u2019ll get ~<b>").concat(amountTotal, " ").concat(curTo.toUpperCase(), "</b>.\nEnter the recipient <b>").concat(curTo.toUpperCase(), "</b> wallet address."), (0, _keyboards.getAmountKeyboard)(ctx));

          case 12:
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
estimateExchange.command('start',
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
estimateExchange.hears([/(.*)/gi, _config.config.kb.back, _config.config.kb.cancel, _config.config.kb.help],
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
            if (!txt.match(/[^()A-Za-z0-9\s]+/gi)) {
              _context3.next = 23;
              break;
            }

            _context3.next = 22;
            return ctx.reply(_messages.messages.validErr);

          case 22:
            return _context3.abrupt("return");

          case 23:
            if (!txt.match(/[()A-Za-z0-9\s]+/gi)) {
              _context3.next = 26;
              break;
            }

            _context3.next = 26;
            return (0, _actions.typeWalletAction)(ctx);

          case 26:
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
var _default = estimateExchange;
exports["default"] = _default;