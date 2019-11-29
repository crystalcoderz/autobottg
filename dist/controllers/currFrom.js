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

var _keyboards = require("../keyboards");

var _actions = require("../actions");

var _config = require("../config");

var _markup = _interopRequireDefault(require("telegraf/markup"));

var _extra = _interopRequireDefault(require("telegraf/extra"));

// Currency From scene
var enter = _stage["default"].enter,
    leave = _stage["default"].leave;
var currFrom = new _base["default"]('curr_from');
currFrom.enter(function (ctx) {
  var currs = ctx.session.currs;
  ctx.replyWithHTML(_messages.messages.selectFromMsg, (0, _keyboards.getFromKeyboard)(currs));
});
currFrom.command('start', function (ctx) {
  return (0, _helpers.startHandler)(ctx);
});
currFrom.hears([/(.*)/gi, _config.config.kb.cancel, _config.config.kb.help],
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(ctx) {
    var txt;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            txt = ctx.message.text;

            if (!(_config.config.kb.cancel === txt)) {
              _context.next = 5;
              break;
            }

            ctx.reply(_messages.messages.cancel, (0, _keyboards.getReplyKeyboard)(ctx));
            (0, _actions.cancelTradeAction)(ctx);
            return _context.abrupt("return");

          case 5:
            if (!(_config.config.kb.help === txt)) {
              _context.next = 11;
              break;
            }

            ctx.reply(_messages.messages.support);
            _context.next = 9;
            return (0, _helpers.pause)(500);

          case 9:
            ctx.reply(process.env.CN_EMAIL);
            return _context.abrupt("return");

          case 11:
            if (!txt.match(/[^()A-Za-z\s]+/gi)) {
              _context.next = 14;
              break;
            }

            ctx.reply(_messages.messages.validErr);
            return _context.abrupt("return");

          case 14:
            if (!txt.match(/[()A-Za-z\s]+/gi)) {
              _context.next = 17;
              break;
            }

            _context.next = 17;
            return (0, _actions.selectFromCurrencyAction)(ctx);

          case 17:
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
currFrom.command('start', leave());
var _default = currFrom;
exports["default"] = _default;