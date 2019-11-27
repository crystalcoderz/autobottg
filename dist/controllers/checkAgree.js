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

var _keyboards = require("../keyboards");

var _config = require("../config");

var _helpers = require("../helpers");

var _messages = require("../messages");

//checkAgree scene
var checkAgree = new _base["default"]('agree');
checkAgree.enter(
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(ctx) {
    var amount, curFrom, curTo, walletCode, addData, addDataName, fromTo, amountTotal, addMsg;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            amount = ctx.session.amount;
            curFrom = ctx.session.curFrom;
            curTo = ctx.session.curTo;
            walletCode = ctx.session.walletCode;
            addData = ctx.session.addData;
            addDataName = ctx.session.addDataName;
            fromTo = "".concat(curFrom, "_").concat(curTo);
            _context.next = 9;
            return (0, _helpers.getAmountTotal)(amount, fromTo);

          case 9:
            amountTotal = _context.sent;
            addMsg = addData ? "Your ".concat(addDataName, " is <b>").concat(addData, "</b>.\n") : '';
            _context.next = 13;
            return ctx.replyWithHTML("\n    You\u2019re sending <b>".concat(amount, " ").concat(curFrom.toUpperCase(), "</b>; you\u2019ll get ~<b>").concat(amountTotal, " ").concat(curTo.toUpperCase(), "</b>.\nYour recipient <b>").concat(curTo.toUpperCase(), "</b> wallet address is <b>").concat(walletCode, "</b>\n").concat(addMsg, "\nPlease make sure all the information you\u2019ve entered is correct. Then tap the Confirm button below."), (0, _keyboards.getAgreeKeyboard)(ctx));

          case 13:
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

var backAgreeHandler =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(ctx) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            (0, _helpers.deleteFromSession)(ctx, 'addData');
            (0, _helpers.deleteFromSession)(ctx, 'addDataName');
            _context2.next = 4;
            return ctx.scene.enter('est_exch');

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function backAgreeHandler(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

checkAgree.command('start', function (ctx) {
  return (0, _helpers.startHandler)(ctx);
}); // checkAgree.hears(config.kb.confirm, async ctx => await agreePressAction(ctx));
// checkAgree.hears(config.kb.back, backAgreeHandler);
// checkAgree.hears(config.kb.help, async ctx => {
//   await ctx.reply(messages.support);
//   await pause(500);
//   await ctx.reply(config.email);
//   return;
// });

checkAgree.hears([_config.config.kb.confirm, _config.config.kb.back, _config.config.kb.help],
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

            if (!(_config.config.kb.confirm === txt)) {
              _context3.next = 5;
              break;
            }

            _context3.next = 4;
            return (0, _actions.agreePressAction)(ctx);

          case 4:
            return _context3.abrupt("return");

          case 5:
            if (!(_config.config.kb.back === txt)) {
              _context3.next = 9;
              break;
            }

            _context3.next = 8;
            return backAgreeHandler(ctx);

          case 8:
            return _context3.abrupt("return");

          case 9:
            if (!(_config.config.kb.help === txt)) {
              _context3.next = 17;
              break;
            }

            _context3.next = 12;
            return ctx.reply(_messages.messages.support);

          case 12:
            _context3.next = 14;
            return (0, _helpers.pause)(500);

          case 14:
            _context3.next = 16;
            return ctx.reply(_config.config.email);

          case 16:
            return _context3.abrupt("return");

          case 17:
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
var _default = checkAgree;
exports["default"] = _default;