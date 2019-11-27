"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addTransactionToDB = exports.startHandler = exports.breakTransaction = exports.intervalRequire = exports.getMinimumAmount = exports.getAmountTotal = exports.validatePair = exports.convertCurrency = exports.prepareName = exports.deleteFromSession = exports.saveToSession = exports.getCurrencyName = exports.pause = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _api = require("./api");

var _keyboards = require("./keyboards");

var _messages = require("./messages");

var _config = require("./config");

var _User = _interopRequireDefault(require("./models/User"));

//------------------------------- HELPERS -------------------------------------------
var intervalStatus;

var pause = function pause(time) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, time);
  });
};

exports.pause = pause;

var getCurrencyName = function getCurrencyName(ctx) {
  return ctx.message.text.replace('✅', '').split('(')[0].trim();
};

exports.getCurrencyName = getCurrencyName;

var saveToSession = function saveToSession(ctx, field, data) {
  ctx.session[field] = data;
};

exports.saveToSession = saveToSession;

var deleteFromSession = function deleteFromSession(ctx, field) {
  var hasField = ctx.session[field];
  hasField && delete ctx.session[field];
};

exports.deleteFromSession = deleteFromSession;

var prepareName = function prepareName(name) {
  if (typeof name === 'string') {
    return name.trim().toLowerCase();
  }
};

exports.prepareName = prepareName;

var convertCurrency =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(ctx, curName) {
    var curAbbr, allCurrs, currAvailable;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = ctx.session.currs;

            if (_context.t0) {
              _context.next = 5;
              break;
            }

            _context.next = 4;
            return (0, _api.getAllCurrencies)();

          case 4:
            _context.t0 = _context.sent;

          case 5:
            allCurrs = _context.t0;
            currAvailable = allCurrs.find(function (item) {
              return prepareName(item.ticker) === prepareName(curName) || prepareName(item.name) === prepareName(curName);
            });
            return _context.abrupt("return", curAbbr = currAvailable ? currAvailable.ticker : null);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function convertCurrency(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.convertCurrency = convertCurrency;

var validatePair =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(pair) {
    var availablePairs, hasPair;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _api.getPairs)();

          case 2:
            availablePairs = _context2.sent;
            hasPair = availablePairs.includes(pair);
            return _context2.abrupt("return", hasPair);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function validatePair(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.validatePair = validatePair;

var getAmountTotal =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(amount, fromTo) {
    var amountReq, amountTotal;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _api.getExchAmount)(amount, fromTo);

          case 2:
            amountReq = _context3.sent;
            amountTotal = amountReq.estimatedAmount;
            return _context3.abrupt("return", amountTotal);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getAmountTotal(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getAmountTotal = getAmountTotal;

var getMinimumAmount =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(pair) {
    var getMin;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _api.getMinimum)(pair);

          case 2:
            getMin = _context4.sent;
            return _context4.abrupt("return", getMin.minAmount);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getMinimumAmount(_x6) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getMinimumAmount = getMinimumAmount;

var processStatus =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(ctx, status, payinData) {
    var newStatus;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!(status === 'waiting')) {
              _context5.next = 3;
              break;
            }

            ctx.replyWithHTML("Transaction ID - <b>".concat(payinData.id, "</b>"));
            return _context5.abrupt("return");

          case 3:
            if (!(status === 'finished')) {
              _context5.next = 12;
              break;
            }

            _context5.next = 6;
            return (0, _api.getTransactionStatus)(payinData.id);

          case 6:
            newStatus = _context5.sent;
            ctx.replyWithHTML(' The transaction hash is');
            _context5.next = 10;
            return pause(500);

          case 10:
            ctx.reply("".concat(newStatus.payoutHash));
            return _context5.abrupt("return");

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function processStatus(_x7, _x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();

var intervalRequire =
/*#__PURE__*/
function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee7(ctx, payinData) {
    var curTo, statusMap, status;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return ctx.session.curTo;

          case 2:
            curTo = _context7.sent;
            statusMap = {
              "new": '',
              waiting: 'We are waiting for your coins to be received. No pressure, though.',
              confirming: 'We have received your deposit. Nice!',
              exchanging: 'The exchange process has been initiated. Just a little bit left...',
              finished: "Yay! The transaction is successfully finished. Your ".concat(curTo, " have been sent to your wallet.\nThank you for choosing ChangeNOW - hope to see you again soon!"),
              failed: 'We weren’t able to start the transaction process. Please, try again later.',
              expired: 'We didn’t get your deposit. :(\nWould you like to start a new exchange?'
            };
            status = '';
            intervalStatus = setInterval(
            /*#__PURE__*/
            (0, _asyncToGenerator2["default"])(
            /*#__PURE__*/
            _regenerator["default"].mark(function _callee6() {
              var getStatus;
              return _regenerator["default"].wrap(function _callee6$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      _context6.next = 2;
                      return (0, _api.getTransactionStatus)(payinData.id);

                    case 2:
                      getStatus = _context6.sent;

                      if (!(status !== getStatus.status)) {
                        _context6.next = 10;
                        break;
                      }

                      ctx.reply(statusMap[getStatus.status]);
                      status = getStatus.status;
                      _context6.next = 8;
                      return pause(1000);

                    case 8:
                      _context6.next = 10;
                      return processStatus(ctx, status, payinData);

                    case 10:
                    case "end":
                      return _context6.stop();
                  }
                }
              }, _callee6);
            })), _config.config.interval);

          case 6:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function intervalRequire(_x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}();

exports.intervalRequire = intervalRequire;

var breakTransaction =
/*#__PURE__*/
function () {
  var _ref8 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee8(ctx) {
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            clearInterval(intervalStatus);
            _context8.next = 3;
            return ctx.scene.enter('curr_from');

          case 3:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function breakTransaction(_x12) {
    return _ref8.apply(this, arguments);
  };
}();

exports.breakTransaction = breakTransaction;

var startHandler =
/*#__PURE__*/
function () {
  var _ref9 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee9(ctx) {
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return ctx.scene.leave();

          case 2:
            _context9.next = 4;
            return ctx.reply(_messages.messages.startMsg, (0, _keyboards.getMainKeyboard)(ctx));

          case 4:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function startHandler(_x13) {
    return _ref9.apply(this, arguments);
  };
}();

exports.startHandler = startHandler;

var addTransactionToDB =
/*#__PURE__*/
function () {
  var _ref10 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee10(trID, uId) {
    var user;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return _User["default"].findOne({
              id: uId
            });

          case 2:
            user = _context10.sent;

            if (!(user && user.transactions)) {
              _context10.next = 7;
              break;
            }

            user.transactions.push({
              transactionId: trID
            });
            _context10.next = 7;
            return _User["default"].updateOne({
              id: uId
            }, {
              transactions: user.transactions
            });

          case 7:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function addTransactionToDB(_x14, _x15) {
    return _ref10.apply(this, arguments);
  };
}();

exports.addTransactionToDB = addTransactionToDB;