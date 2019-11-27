"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _base = _interopRequireDefault(require("telegraf/scenes/base"));

<<<<<<< HEAD
=======
var _stage = _interopRequireDefault(require("telegraf/stage"));

>>>>>>> [65]Added pwd and ssl connection
var _actions = require("../actions");

var _helpers = require("../helpers");

var _keyboards = require("../keyboards");

var _config = require("../config");

var _messages = require("../messages");

<<<<<<< HEAD
=======
var leave = _stage["default"].leave;
>>>>>>> [65]Added pwd and ssl connection
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
<<<<<<< HEAD
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
=======

            if (!(curToInfo.isAnonymous || curToInfo.hasExternalId)) {
              _context.next = 8;
              break;
            }

            ctx.reply("Enter the ".concat(curToInfo.externalIdName), (0, _keyboards.getExtraIDKeyboard)(ctx));
            (0, _helpers.saveToSession)(ctx, 'addDataName', curToInfo.externalIdName);
            _context.next = 6;
            return (0, _helpers.pause)(1000);

          case 6:
            _context.next = 10;
            break;

          case 8:
            ctx.scene.leave('add_info');
            ctx.scene.enter('agree');

          case 10:
>>>>>>> [65]Added pwd and ssl connection
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
<<<<<<< HEAD
addInfo.command('start',
=======
addInfo.command('start', function (ctx) {
  return (0, _helpers.startHandler)(ctx);
});
addInfo.hears([/(.*)/gi, _config.config.kb.back, _config.config.kb.next, _config.config.kb.cancel, _config.config.kb.help],
>>>>>>> [65]Added pwd and ssl connection
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(ctx) {
<<<<<<< HEAD
=======
    var txt;
>>>>>>> [65]Added pwd and ssl connection
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
<<<<<<< HEAD
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
=======
            txt = ctx.message.text;

            if (!(_config.config.kb.back === txt)) {
              _context2.next = 4;
              break;
            }

            ctx.scene.enter('est_exch');
            return _context2.abrupt("return");

          case 4:
            if (!(_config.config.kb.next === txt)) {
              _context2.next = 7;
              break;
            }

            ctx.scene.enter('agree');
            return _context2.abrupt("return");

          case 7:
            if (!(_config.config.kb.cancel === txt)) {
              _context2.next = 11;
              break;
            }

            ctx.reply(_messages.messages.cancel, (0, _keyboards.getReplyKeyboard)(ctx));
            (0, _actions.cancelTradeAction)(ctx);
            return _context2.abrupt("return");

          case 11:
            if (!(_config.config.kb.help === txt)) {
              _context2.next = 17;
              break;
            }

            ctx.reply(_messages.messages.support);
            _context2.next = 15;
            return (0, _helpers.pause)(500);

          case 15:
            ctx.reply(process.env.CN_EMAIL);
            return _context2.abrupt("return");

          case 17:
            if (!txt.match(/[^A-Za-z0-9\s]+/gi)) {
              _context2.next = 20;
              break;
            }

            ctx.reply(_messages.messages.validErr);
            return _context2.abrupt("return");

          case 20:
            if (!txt.match(/[A-Za-z0-9\s]+/gi)) {
              _context2.next = 23;
              break;
            }

            _context2.next = 23;
            return (0, _actions.inputAdditionalDataAction)(ctx);

          case 23:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
>>>>>>> [65]Added pwd and ssl connection
  };
}());
var _default = addInfo;
exports["default"] = _default;