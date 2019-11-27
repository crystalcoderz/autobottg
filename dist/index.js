"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

<<<<<<< HEAD
=======
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startApp = startApp;

>>>>>>> [65]Added pwd and ssl connection
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

<<<<<<< HEAD
require("dotenv/config");

var _connectDB = require("./connectDB");

var _routes = _interopRequireDefault(require("./routes"));

var app = (0, _express["default"])();
app.use('/', _routes["default"]);
app.listen(process.env.APP_PORT,
/*#__PURE__*/
(0, _asyncToGenerator2["default"])(
/*#__PURE__*/
_regenerator["default"].mark(function _callee() {
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log("Server listening on ".concat(process.env.APP_PORT));
          _context.next = 3;
          return (0, _connectDB.connectDatabase)(process.env.DB_HOST, process.env.DB_PORT, process.env.DB_NAME);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
=======
var _morgan = _interopRequireDefault(require("morgan"));

var _requestPromise = _interopRequireDefault(require("request-promise"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

require("dotenv/config");

var _session = _interopRequireDefault(require("telegraf/session"));

var _markup = _interopRequireDefault(require("telegraf/markup"));

var _extra = _interopRequireDefault(require("telegraf/extra"));

var _stage = _interopRequireDefault(require("telegraf/stage"));

var _telegrafInlineMenu = _interopRequireDefault(require("telegraf-inline-menu"));

var _messages = require("./messages");

var _config2 = require("./config");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _connectDB = require("./connectDB");

var _api = require("./api");

var _helpers = require("./helpers");

var _keyboards = require("./keyboards");

var _actions = require("./actions");

var _start = _interopRequireDefault(require("./controllers/start"));

var _currFrom = _interopRequireDefault(require("./controllers/currFrom"));

var _curTo = _interopRequireDefault(require("./controllers/curTo"));

var _amount = _interopRequireDefault(require("./controllers/amount"));

var _checkData = _interopRequireDefault(require("./controllers/checkData"));

var _estimateExchange = _interopRequireDefault(require("./controllers/estimateExchange"));

var _checkAgree = _interopRequireDefault(require("./controllers/checkAgree"));

var _getAddr = _interopRequireDefault(require("./controllers/getAddr"));

var _addInfo = _interopRequireDefault(require("./controllers/addInfo"));

var Telegram = require('telegraf/telegram');

var enter = _stage["default"].enter,
    leave = _stage["default"].leave;
var expressApp = (0, _express["default"])();

var Telegraf = require('telegraf');

var bot = new Telegraf(process.env.API_BOT_KEY); //  ------------------ APPLICATION ------------------

_mongoose["default"].connection.on('open', function () {
  var stage = new _stage["default"]([_start["default"], _currFrom["default"], _curTo["default"], _amount["default"], _addInfo["default"], _checkData["default"], _estimateExchange["default"], _checkAgree["default"], _getAddr["default"]]);
  bot.use((0, _session["default"])());
  bot.use(stage.middleware()); // const logger = async (ctx, next) => {
  //   console.log(ctx.from.first_name);
  //   await next(ctx);
  // };
  // bot.use(logger);

  bot.start(function (ctx) {
    return ctx.reply(_messages.messages.startMsg, (0, _keyboards.getMainKeyboard)(ctx));
  });
  bot.hears(/Start exchange/, function (ctx) {
    return ctx.scene.enter('curr_from');
  });
  bot.hears(/Start new exchange/, function (ctx) {
    return ctx.scene.enter('curr_from');
  });
  bot.hears(/Read and Accept/, function (ctx) {
    return (0, _actions.handleStartAction)(ctx);
  });
  bot.hears(_config2.config.kb.cancel, function (ctx) {
    return (0, _actions.cancelTradeAction)(ctx);
  });
  bot["catch"](function (err) {
    console.log(err); // bot.telegram.sendMessage('Something went wrong, please press "/start"');
    // bot.telegram.sendChatAction('414191651', bot.telegram.sendMessage('Something went wrong'));
  });
}); //--------------------------- Server -----------------------------------------------


function startApp() {
  return _startApp.apply(this, arguments);
}

function _startApp() {
  _startApp = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _connectDB.connectDatabase)(process.env.DB_HOST, process.env.DB_PORT, process.env.DB_NAME);

          case 2:
            bot.startPolling();
            expressApp.use((0, _morgan["default"])('combined'));
            expressApp.listen(process.env.APP_PORT, '127.0.0.1', function () {
              console.log("Server listening on ".concat(process.env.APP_PORT));
            });

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _startApp.apply(this, arguments);
}

startApp();

var getHandle =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var replyKeyboard;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            replyKeyboard = {
              reply_markup: {
                resize_keyboard: true,
                one_time_keyboard: true,
                keyboard: [['Start exchange']]
              }
            };
            _context.next = 3;
            return (0, _actions.getIpAction)(req);

          case 3:
            _context.next = 5;
            return (0, _helpers.pause)(1000);

          case 5:
            bot.telegram.sendMessage(req.query.id, _messages.messages.agreed, replyKeyboard);
            res.redirect(302, 'https://changenow.io/terms-of-use');
            return _context.abrupt("return");

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getHandle(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

expressApp.get('/terms-of-use/:id', getHandle);
expressApp.get('*', function (req, res) {
  res.sendFile('404.html', {
    root: _path["default"].join(__dirname, '../public')
  });
});
>>>>>>> [65]Added pwd and ssl connection
