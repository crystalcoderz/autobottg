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

var _actions = require("../actions");

var _helpers = require("../helpers");

var _keyboards = require("../keyboards");

var _config = require("../config");

var _messages = require("../messages");

// Amount scene
var leave = _stage["default"].leave;
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
            return _context.abrupt("return", ctx.replyWithHTML("Enter the amount of <b>".concat(selectedFrom.toUpperCase(), "</b> you would like to exchange.\n").concat(minValueMsg), (0, _keyboards.getAmountKeyboard)(ctx)));

          case 11:
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
amount.command('start', function (ctx) {
  return (0, _helpers.startHandler)(ctx);
});
amount.hears([/[.,0-9a-zA-Zа-яА-Я]+/gi, _config.config.kb.back, _config.config.kb.cancel, _config.config.kb.help],
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(ctx) {
    var txt;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            txt = ctx.message.text;

            if (!(_config.config.kb.back === txt)) {
              _context2.next = 4;
              break;
            }

            ctx.scene.enter('curr_to');
            return _context2.abrupt("return");

          case 4:
            if (!(_config.config.kb.cancel === txt)) {
              _context2.next = 8;
              break;
            }

            ctx.reply(_messages.messages.cancel, (0, _keyboards.getReplyKeyboard)(ctx));
            (0, _actions.cancelTradeAction)(ctx);
            return _context2.abrupt("return");

          case 8:
            if (!(_config.config.kb.help === txt)) {
              _context2.next = 14;
              break;
            }

            ctx.reply(_messages.messages.support);
            _context2.next = 12;
            return (0, _helpers.pause)(500);

          case 12:
            ctx.reply(process.env.CN_EMAIL);
            return _context2.abrupt("return");

          case 14:
            _context2.next = 16;
            return (0, _actions.selectAmountAction)(ctx);

          case 16:
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
var _default = amount;
exports["default"] = _default;