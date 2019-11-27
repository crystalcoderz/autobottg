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

var backAgreeHandler = function backAgreeHandler(ctx) {
  (0, _helpers.deleteFromSession)(ctx, 'addData');
  (0, _helpers.deleteFromSession)(ctx, 'addDataName');
  ctx.scene.enter('est_exch');
};

checkAgree.command('start', function (ctx) {
  return (0, _helpers.startHandler)(ctx);
});
checkAgree.hears(_config.config.kb.confirm, function (ctx) {
  return (0, _actions.agreePressAction)(ctx);
});
checkAgree.hears(_config.config.kb.back, backAgreeHandler);
checkAgree.hears(_config.config.kb.help,
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
var _default = checkAgree;
exports["default"] = _default;