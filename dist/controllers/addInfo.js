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

var addInfo = new _base["default"]('add_info');
addInfo.enter(
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(ctx) {
    var curToInfo;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            curToInfo = ctx.session.curToInfo;
            console.log("TCL: curToInfo", curToInfo); // const addMdg = curToInfo.externalIdName ? `Enter the ${curToInfo.externalIdName}` : 'Press next';

            if (!curToInfo.hasExternalId) {
              _context.next = 10;
              break;
            }

            _context.next = 5;
            return ctx.reply("Enter the ".concat(curToInfo.externalIdName), (0, _keyboards.getExtraIDKeyboard)(ctx));

          case 5:
            (0, _helpers.saveToSession)(ctx, 'addDataName', curToInfo.externalIdName);
            _context.next = 8;
            return (0, _helpers.pause)(1000);

          case 8:
            _context.next = 12;
            break;

          case 10:
            _context.next = 12;
            return ctx.scene.enter('agree');

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
addInfo.command('start',
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
addInfo.hears([/(.*)/gi, _config.config.kb.back, _config.config.kb.next, _config.config.kb.cancel, _config.config.kb.help],
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
            return ctx.scene.enter('est_exch');

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
            if (!txt.match(/[^A-Za-z0-9\s]+/gi)) {
              _context3.next = 27;
              break;
            }

            _context3.next = 26;
            return ctx.reply(_messages.messages.validErr);

          case 26:
            return _context3.abrupt("return");

          case 27:
            if (!txt.match(/[A-Za-z0-9\s]+/gi)) {
              _context3.next = 30;
              break;
            }

            _context3.next = 30;
            return (0, _actions.inputAdditionalDataAction)(ctx);

          case 30:
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
var _default = addInfo;
exports["default"] = _default;