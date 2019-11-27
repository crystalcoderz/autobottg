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

var _extra = _interopRequireDefault(require("telegraf/extra"));

var _markup = _interopRequireDefault(require("telegraf/markup"));

>>>>>>> [65]Added pwd and ssl connection
var _api = require("../api");

var _helpers = require("../helpers");

<<<<<<< HEAD
// Start scene
var start = new _base["default"]('start');
=======
var _messages = require("../messages");

var _config = require("../config");

// Start scene
var start = new _base["default"]('start');
var leave = _stage["default"].leave;
>>>>>>> [65]Added pwd and ssl connection
start.enter(
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(ctx) {
    var hash, uid, opts, currs;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            hash = +new Date();
            uid = ctx.session.userId;
            opts = {
              parse_mode: 'HTML',
              disable_web_page_preview: true
            };
<<<<<<< HEAD
            _context.next = 5;
            return ctx.reply("Please follow this <a href=\"".concat(process.env.APP_HOST_PORT, "/terms-of-use/").concat(hash, "?id=").concat(uid, "\">link</a> to accept our Terms of Use and Privacy Policy. Then, return to the bot to proceed."), opts);

          case 5:
            _context.prev = 5;
            _context.next = 8;
            return (0, _api.getAllCurrencies)();

          case 8:
            currs = _context.sent;

            if (!(!currs || !currs.length)) {
              _context.next = 13;
              break;
            }

            _context.next = 12;
            return ctx.reply('Server error. Try later.');

          case 12:
            return _context.abrupt("return");

          case 13:
            (0, _helpers.saveToSession)(ctx, 'currs', currs);
            _context.next = 21;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](5);
            _context.next = 20;
            return ctx.reply('Server error. Try later.');

          case 20:
            return _context.abrupt("return");

          case 21:
=======
            ctx.reply("Please follow this <a href=\"".concat(process.env.APP_HOST_PORT, "/terms-of-use/").concat(hash, "?id=").concat(uid, "\">link</a> to accept our Terms of Use and Privacy Policy. Then, return to the bot to proceed."), opts);
            _context.prev = 4;
            _context.next = 7;
            return (0, _api.getAllCurrencies)();

          case 7:
            currs = _context.sent;

            if (!(!currs || !currs.length)) {
              _context.next = 12;
              break;
            }

            _context.next = 11;
            return ctx.reply();

          case 11:
            return _context.abrupt("return");

          case 12:
            (0, _helpers.saveToSession)(ctx, 'currs', currs);
            _context.next = 20;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](4);
            _context.next = 19;
            return ctx.reply('Server error. Try later.');

          case 19:
            return _context.abrupt("return");

          case 20:
>>>>>>> [65]Added pwd and ssl connection
          case "end":
            return _context.stop();
        }
      }
<<<<<<< HEAD
    }, _callee, null, [[5, 16]]);
=======
    }, _callee, null, [[4, 15]]);
>>>>>>> [65]Added pwd and ssl connection
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
<<<<<<< HEAD
start.hears(/Start exchange/,
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
            return ctx.scene.enter('curr_from');

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
=======
start.hears(/Start exchange/, function (ctx) {
  return ctx.scene.enter('curr_from');
});
>>>>>>> [65]Added pwd and ssl connection
var _default = start;
exports["default"] = _default;