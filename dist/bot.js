"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _telegraf = _interopRequireDefault(require("telegraf"));

var _telegrafSessionRedis = _interopRequireDefault(require("telegraf-session-redis"));

var _stage = _interopRequireDefault(require("telegraf/stage"));

var _start = _interopRequireDefault(require("./controllers/start"));

var _currFrom = _interopRequireDefault(require("./controllers/currFrom"));

var _curTo = _interopRequireDefault(require("./controllers/curTo"));

var _amount = _interopRequireDefault(require("./controllers/amount"));

var _addInfo = _interopRequireDefault(require("./controllers/addInfo"));

var _checkData = _interopRequireDefault(require("./controllers/checkData"));

var _estimateExchange = _interopRequireDefault(require("./controllers/estimateExchange"));

var _checkAgree = _interopRequireDefault(require("./controllers/checkAgree"));

var _getAddr = _interopRequireDefault(require("./controllers/getAddr"));

var _messages = require("./messages");

var _keyboards = require("./keyboards");

var _actions = require("./actions");

var _config = require("./config");

var _telegrafRatelimit = _interopRequireDefault(require("telegraf-ratelimit"));

var bot = new _telegraf["default"](process.env.API_BOT_KEY);
var stage = new _stage["default"]([_start["default"], _currFrom["default"], _curTo["default"], _amount["default"], _addInfo["default"], _checkData["default"], _estimateExchange["default"], _checkAgree["default"], _getAddr["default"]]);
var session = new _telegrafSessionRedis["default"]({
  store: {
    host: process.env.DB_SESSION_HOST || '127.0.0.1',
    port: process.env.DB_SESSION_PORT || 6379
  }
});
var limitConfig = {
  window: 1500,
  limit: 1
};
bot.use((0, _telegrafRatelimit["default"])(limitConfig));
bot.use(session);
bot.use(stage.middleware());
bot.start(function (ctx) {
  return ctx.reply(_messages.messages.startMsg, (0, _keyboards.getMainKeyboard)(ctx));
});
bot.hears(/Start exchange/, function (ctx) {
  return ctx.scene.enter('curr_from');
});
bot.hears(/Start new exchange/, function (ctx) {
  return ctx.scene.enter('curr_from');
});
bot.hears(/Read and Accept/,
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(ctx) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _actions.handleStartAction)(ctx);

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
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
bot.hears(_config.config.kb.cancel, function (ctx) {
  return (0, _actions.cancelTradeAction)(ctx);
});
bot["catch"](function (err) {
  process.stderr.write("".concat(err));
});
bot.startPolling();
var _default = bot;
exports["default"] = _default;