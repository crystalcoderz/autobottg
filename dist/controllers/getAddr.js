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

var _api = require("../api");

var _keyboards = require("../keyboards");

var _config = require("../config");

var _helpers = require("../helpers");

var _messages = require("../messages");

var _User = _interopRequireDefault(require("../models/User"));

// Amount scene
var leave = _stage["default"].leave;
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
            _context.next = 2;
            return ctx.session.userId;

          case 2:
            uId = _context.sent;
            _context.next = 5;
            return ctx.session.response;

          case 5:
            payinData = _context.sent;
            amount = ctx.session.amount;
            curFrom = ctx.session.curFrom;
            curTo = ctx.session.curTo;
            fromTo = "".concat(curFrom, "_").concat(curTo);
            _context.next = 12;
            return (0, _helpers.getAmountTotal)(amount, fromTo);

          case 12:
            amountTotal = _context.sent;
            payinData && (0, _helpers.addTransactionToDB)(payinData.id, uId);
            _context.t0 = payinData;

            if (!_context.t0) {
              _context.next = 18;
              break;
            }

            _context.next = 18;
            return ctx.replyWithHTML("You\u2019re sending <b>".concat(amount, " ").concat(curFrom.toUpperCase(), "</b>; you\u2019ll get ~<b>").concat(amountTotal, " ").concat(curTo.toUpperCase(), "</b>.\nHere is the deposit address for your exchange.\nIn order to start the exchange, use your wallet to send your deposit to this address."), (0, _keyboards.getBackKeyboard)(ctx));

          case 18:
            _context.next = 20;
            return (0, _helpers.pause)(500);

          case 20:
            ctx.reply("".concat(payinData.payinAddress));
            _context.next = 23;
            return (0, _helpers.intervalRequire)(ctx, payinData);

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
getAddress.command('start', function (ctx) {
  return (0, _helpers.startHandler)(ctx);
});
getAddress.hears(_config.config.kb.startNew, function (ctx) {
  return (0, _helpers.breakTransaction)(ctx);
});
getAddress.hears(_config.config.kb.help,
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(ctx) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            ctx.reply(_messages.messages.support);
            _context2.next = 3;
            return (0, _helpers.pause)(500);

          case 3:
            ctx.reply(process.env.CN_EMAIL);
            return _context2.abrupt("return");

          case 5:
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
var _default = getAddress;
exports["default"] = _default;