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
curTo.enter(function (ctx) {
  ctx.replyWithHTML(_messages.messages.selectToMsg, (0, _keyboards.getToKeyboard)(ctx));
});
curTo.command('start', function (ctx) {
  return (0, _helpers.startHandler)(ctx);
});
curTo.hears([/(.*)/gi, _config.config.kb.back, _config.config.kb.cancel, _config.config.kb.help],
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
  };
}());
var _default = curTo;
exports["default"] = _default;