"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _base = _interopRequireDefault(require("telegraf/scenes/base"));

var _keyboards = require("../keyboards");

var _config = require("../config");

var _helpers = require("../helpers");

var _messages = require("../messages");

// Amount scene
var getAddress = new _base["default"]('get_addr');
getAddress.enter(
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(ctx) {
    var uId, payinData, amount, curFrom, curTo, fromTo, amountTotal;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            uId = ctx.session.userId;
            payinData = ctx.session.response;
            amount = ctx.session.amount;
            curFrom = ctx.session.curFrom;
            curTo = ctx.session.curTo;
            fromTo = "".concat(curFrom, "_").concat(curTo);
            _context.next = 8;
            return (0, _helpers.getAmountTotal)(amount, fromTo);

          case 8:
            amountTotal = _context.sent;

            if (!payinData) {
              _context.next = 14;
              break;
            }

            _context.next = 12;
            return (0, _helpers.addTransactionToDB)(payinData.id, uId);

          case 12:
            _context.next = 14;
            return ctx.replyWithHTML("You\u2019re sending <b>".concat(amount, " ").concat(curFrom.toUpperCase(), "</b>; you\u2019ll get ~<b>").concat(amountTotal, " ").concat(curTo.toUpperCase(), "</b>.\nHere is the deposit address for your exchange.\nIn order to start the exchange, use your wallet to send your deposit to this address."), (0, _keyboards.getBackKeyboard)(ctx));

          case 14:
            _context.next = 16;
            return (0, _helpers.pause)(500);

          case 16:
            _context.next = 18;
            return ctx.reply("".concat(payinData.payinAddress));

          case 18:
            _context.next = 20;
            return (0, _helpers.intervalRequire)(ctx, payinData);

          case 20:
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
getAddress.command('start',
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
getAddress.hears(_config.config.kb.startNew,
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(ctx) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _helpers.breakTransaction)(ctx);

          case 2:
            return _context3.abrupt("return", _context3.sent);

          case 3:
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
getAddress.hears(_config.config.kb.help,
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(ctx) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return ctx.reply(_messages.messages.support);

          case 2:
            _context4.next = 4;
            return (0, _helpers.pause)(500);

          case 4:
            _context4.next = 6;
            return ctx.reply(_config.config.email);

          case 6:
            return _context4.abrupt("return");

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x4) {
    return _ref4.apply(this, arguments);
  };
}());
var _default = getAddress;
exports["default"] = _default;