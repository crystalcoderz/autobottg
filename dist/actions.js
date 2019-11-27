"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIpAction = exports.cancelTradeAction = exports.agreePressAction = exports.typeWalletAction = exports.selectAmountAction = exports.inputAdditionalDataAction = exports.selectToCurrencyAction = exports.selectFromCurrencyAction = exports.handleStartAction = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

<<<<<<< HEAD
=======
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _stage = _interopRequireDefault(require("telegraf/stage"));

var _requestPromise = _interopRequireDefault(require("request-promise"));

>>>>>>> [65]Added pwd and ssl connection
var _messages = require("./messages");

var _helpers = require("./helpers");

var _User = _interopRequireDefault(require("./models/User"));

var _api = require("./api");

//--------------------------- Actions -----------------------------------------------
<<<<<<< HEAD
=======
var enter = _stage["default"].enter,
    leave = _stage["default"].leave;

var Transaction = function Transaction() {
  (0, _classCallCheck2["default"])(this, Transaction);
  this.date = Number(new Date()), this.from = '', this.to = '', this.address = '', this.amount = 0, this.extraId = '';
};

>>>>>>> [65]Added pwd and ssl connection
var handleStartAction =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(ctx) {
    var user, userInDB;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = ctx.message.from;
            (0, _helpers.saveToSession)(ctx, 'userId', user.id);
            _context.next = 4;
            return _User["default"].findOne({
              id: user.id
            });

          case 4:
            userInDB = _context.sent;

<<<<<<< HEAD
            if (userInDB) {
              _context.next = 8;
              break;
            }

            _context.next = 8;
            return _User["default"].create({
              id: user.id,
              username: user.username,
              visits: [],
              transactions: []
            });

          case 8:
            _context.next = 10;
            return ctx.scene.enter('start');

          case 10:
=======
            if (!userInDB) {
              _User["default"].insertMany({
                id: user.id,
                username: user.username,
                visits: [],
                transactions: []
              });
            }

            ctx.scene.enter('start');

          case 7:
>>>>>>> [65]Added pwd and ssl connection
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function handleStartAction(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.handleStartAction = handleStartAction;

var selectFromCurrencyAction =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(ctx) {
    var getFrom, validFrom, curInfo;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            getFrom = (0, _helpers.getCurrencyName)(ctx); // берем имя из сообщения

            _context2.next = 3;
            return (0, _helpers.convertCurrency)(ctx, getFrom);

          case 3:
            validFrom = _context2.sent;
            // делаем сокращение имени
            (0, _helpers.saveToSession)(ctx, 'curFrom', validFrom); // сохраняем в сессию сокращение

            _context2.t0 = validFrom;

            if (!_context2.t0) {
              _context2.next = 10;
              break;
            }

            _context2.next = 9;
            return (0, _api.getCurrInfo)(validFrom);

          case 9:
            _context2.t0 = _context2.sent;

          case 10:
            curInfo = _context2.t0;

            if (!curInfo) {
<<<<<<< HEAD
              _context2.next = 21;
=======
              _context2.next = 20;
>>>>>>> [65]Added pwd and ssl connection
              break;
            }

            (0, _helpers.saveToSession)(ctx, 'curFromInfo', curInfo);
<<<<<<< HEAD
            _context2.next = 15;
            return ctx.replyWithHTML("Selected currency - <b>".concat(getFrom, "</b>."));

          case 15:
            _context2.next = 17;
            return (0, _helpers.pause)(1000);

          case 17:
            _context2.next = 19;
            return ctx.scene.enter('curr_to');

          case 19:
            _context2.next = 28;
            break;

          case 21:
            _context2.next = 23;
            return ctx.reply(_messages.messages.notFound);

          case 23:
            _context2.next = 25;
            return (0, _helpers.pause)(1000);

          case 25:
            _context2.next = 27;
            return ctx.scene.reenter();

          case 27:
            (0, _helpers.deleteFromSession)(ctx, 'curFrom');

          case 28:
=======
            ctx.replyWithHTML("Selected currency - <b>".concat(getFrom, "</b>."));
            _context2.next = 16;
            return (0, _helpers.pause)(1000);

          case 16:
            ctx.scene.leave('curr_from');
            ctx.scene.enter('curr_to');
            _context2.next = 25;
            break;

          case 20:
            ctx.reply(_messages.messages.notFound);
            _context2.next = 23;
            return (0, _helpers.pause)(1000);

          case 23:
            ctx.scene.reenter();
            (0, _helpers.deleteFromSession)(ctx, 'curFrom');

          case 25:
>>>>>>> [65]Added pwd and ssl connection
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function selectFromCurrencyAction(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.selectFromCurrencyAction = selectFromCurrencyAction;

var selectToCurrencyAction =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(ctx) {
    var curTo, getTo, validTo, curInfo;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            curTo = (0, _helpers.getCurrencyName)(ctx);
            getTo = (0, _helpers.getCurrencyName)(ctx); // берем имя из сообщения

            _context3.next = 4;
            return (0, _helpers.convertCurrency)(ctx, getTo);

          case 4:
            validTo = _context3.sent;
            // делаем сокращение имени
            (0, _helpers.saveToSession)(ctx, 'curTo', validTo); // сохраняем в сессию сокращение

            _context3.t0 = validTo;

            if (!_context3.t0) {
              _context3.next = 11;
              break;
            }

            _context3.next = 10;
            return (0, _api.getCurrInfo)(validTo);

          case 10:
            _context3.t0 = _context3.sent;

          case 11:
            curInfo = _context3.t0;

            if (!curInfo) {
<<<<<<< HEAD
              _context3.next = 22;
=======
              _context3.next = 21;
>>>>>>> [65]Added pwd and ssl connection
              break;
            }

            (0, _helpers.saveToSession)(ctx, 'curToInfo', curInfo);
<<<<<<< HEAD
            _context3.next = 16;
            return ctx.replyWithHTML("Selected currency - <b>".concat(curTo, "</b>."));

          case 16:
            _context3.next = 18;
            return (0, _helpers.pause)(1000);

          case 18:
            _context3.next = 20;
            return ctx.scene.enter('check');

          case 20:
            _context3.next = 29;
            break;

          case 22:
            _context3.next = 24;
            return ctx.reply(_messages.messages.notFound);

          case 24:
            _context3.next = 26;
            return (0, _helpers.pause)(1000);

          case 26:
            _context3.next = 28;
            return ctx.scene.reenter();

          case 28:
            (0, _helpers.deleteFromSession)(ctx, 'curTo');

          case 29:
=======
            ctx.replyWithHTML("Selected currency - <b>".concat(curTo, "</b>."));
            _context3.next = 17;
            return (0, _helpers.pause)(1000);

          case 17:
            ctx.scene.leave('curr_to');
            ctx.scene.enter('check');
            _context3.next = 26;
            break;

          case 21:
            ctx.reply(_messages.messages.notFound);
            _context3.next = 24;
            return (0, _helpers.pause)(1000);

          case 24:
            ctx.scene.reenter();
            (0, _helpers.deleteFromSession)(ctx, 'curTo');

          case 26:
>>>>>>> [65]Added pwd and ssl connection
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function selectToCurrencyAction(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.selectToCurrencyAction = selectToCurrencyAction;

var inputAdditionalDataAction =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(ctx) {
    var inputData;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            inputData = ctx.message.text;
            (0, _helpers.saveToSession)(ctx, 'addData', inputData);
            _context4.next = 4;
<<<<<<< HEAD
            return ctx.scene.enter('agree');

          case 4:
=======
            return ctx.scene.leave('add_info');

          case 4:
            _context4.next = 6;
            return ctx.scene.enter('agree');

          case 6:
>>>>>>> [65]Added pwd and ssl connection
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function inputAdditionalDataAction(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.inputAdditionalDataAction = inputAdditionalDataAction;

var selectAmountAction =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(ctx) {
    var amount, minValue;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            amount = Number(ctx.message.text.replace(',', '.'));

            if (!(!amount || isNaN(amount) || ctx.message.text.match(/0x[\da-f]/i))) {
<<<<<<< HEAD
              _context5.next = 9;
              break;
            }

            _context5.next = 4;
            return ctx.reply(_messages.messages.numErr);

          case 4:
            _context5.next = 6;
            return (0, _helpers.pause)(1000);

          case 6:
            _context5.next = 8;
            return ctx.scene.reenter();

          case 8:
            return _context5.abrupt("return");

          case 9:
            minValue = ctx.session.minValue;
=======
              _context5.next = 7;
              break;
            }

            ctx.reply(_messages.messages.numErr);
            _context5.next = 5;
            return (0, _helpers.pause)(1000);

          case 5:
            ctx.scene.reenter();
            return _context5.abrupt("return");

          case 7:
            _context5.next = 9;
            return ctx.session.minValue;

          case 9:
            minValue = _context5.sent;
>>>>>>> [65]Added pwd and ssl connection

            if (!(amount >= minValue)) {
              _context5.next = 16;
              break;
            }

            (0, _helpers.saveToSession)(ctx, 'amount', amount);
<<<<<<< HEAD
            _context5.next = 14;
            return ctx.scene.enter('est_exch');

          case 14:
            _context5.next = 22;
            break;

          case 16:
            _context5.next = 18;
            return ctx.reply("Oops! Wrong amount.");

          case 18:
            _context5.next = 20;
            return (0, _helpers.pause)(1000);

          case 20:
            _context5.next = 22;
            return ctx.scene.reenter();

          case 22:
=======
            ctx.scene.leave('amount');
            ctx.scene.enter('est_exch');
            _context5.next = 20;
            break;

          case 16:
            ctx.reply("Oops! Wrong amount.");
            _context5.next = 19;
            return (0, _helpers.pause)(1000);

          case 19:
            ctx.scene.reenter();

          case 20:
>>>>>>> [65]Added pwd and ssl connection
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function selectAmountAction(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

exports.selectAmountAction = selectAmountAction;

<<<<<<< HEAD
var typeWalletAction =
/*#__PURE__*/
function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6(ctx) {
    var walletCode;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            walletCode = ctx.message.text;
            (0, _helpers.saveToSession)(ctx, 'walletCode', walletCode);
            _context6.next = 4;
            return ctx.scene.enter('add_info');

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function typeWalletAction(_x6) {
    return _ref6.apply(this, arguments);
  };
}();
=======
var typeWalletAction = function typeWalletAction(ctx) {
  var walletCode = ctx.message.text;
  (0, _helpers.saveToSession)(ctx, 'walletCode', walletCode);
  ctx.scene.leave('est_exch');
  ctx.scene.enter('add_info');
};
>>>>>>> [65]Added pwd and ssl connection

exports.typeWalletAction = typeWalletAction;

var agreePressAction =
/*#__PURE__*/
function () {
<<<<<<< HEAD
  var _ref7 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee8(ctx) {
    var uId, curFrom, curTo, walletCode, amount, extraId, getIpFromDB, data, response;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            uId = ctx.session.userId || ctx.message.from.id;
            curFrom = ctx.session.curFrom;
            curTo = ctx.session.curTo;
            walletCode = ctx.session.walletCode;
            amount = ctx.session.amount;
            extraId = ctx.session.addData;
=======
  var _ref6 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee7(ctx) {
    var uId, curFrom, curTo, walletCode, amount, extraId, getIpFromDB, data, response;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return ctx.session.userId;

          case 2:
            uId = _context7.sent;
            _context7.next = 5;
            return ctx.session.curFrom;

          case 5:
            curFrom = _context7.sent;
            _context7.next = 8;
            return ctx.session.curTo;

          case 8:
            curTo = _context7.sent;
            _context7.next = 11;
            return ctx.session.walletCode;

          case 11:
            walletCode = _context7.sent;
            _context7.next = 14;
            return ctx.session.amount;

          case 14:
            amount = _context7.sent;
            _context7.next = 17;
            return ctx.session.addData;

          case 17:
            extraId = _context7.sent;
>>>>>>> [65]Added pwd and ssl connection

            getIpFromDB =
            /*#__PURE__*/
            function () {
<<<<<<< HEAD
              var _ref8 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee7() {
                var userInDB, visits;
                return _regenerator["default"].wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.next = 2;
=======
              var _ref7 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee6() {
                var userInDB, visits, lastVisitIP;
                return _regenerator["default"].wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        _context6.next = 2;
>>>>>>> [65]Added pwd and ssl connection
                        return _User["default"].findOne({
                          id: uId
                        });

                      case 2:
<<<<<<< HEAD
                        userInDB = _context7.sent;
                        visits = userInDB && userInDB.visits;

                        if (userInDB.visits.length) {
                          _context7.next = 6;
                          break;
                        }

                        return _context7.abrupt("return", '');

                      case 6:
                        return _context7.abrupt("return", visits[visits.length - 1].userIp);

                      case 7:
                      case "end":
                        return _context7.stop();
                    }
                  }
                }, _callee7);
              }));

              return function getIpFromDB() {
                return _ref8.apply(this, arguments);
              };
            }();

            _context8.t0 = uId;
            _context8.t1 = curFrom;
            _context8.t2 = curTo;
            _context8.t3 = walletCode;
            _context8.t4 = amount;
            _context8.t5 = extraId || '';
            _context8.next = 15;
            return getIpFromDB();

          case 15:
            _context8.t6 = _context8.sent;
            data = {
              userId: _context8.t0,
              from: _context8.t1,
              to: _context8.t2,
              address: _context8.t3,
              amount: _context8.t4,
              extraId: _context8.t5,
              ip: _context8.t6
            };
            _context8.prev = 17;
            _context8.next = 20;
            return (0, _api.sendTransactionData)(data);

          case 20:
            response = _context8.sent;
            (0, _helpers.saveToSession)(ctx, 'response', response);
            _context8.next = 24;
            return ctx.scene.enter('get_addr');

          case 24:
            _context8.next = 34;
            break;

          case 26:
            _context8.prev = 26;
            _context8.t7 = _context8["catch"](17);
            _context8.next = 30;
            return ctx.reply("Sorry, the address you\u2019ve entered is invalid.");

          case 30:
            _context8.next = 32;
            return (0, _helpers.pause)(1000);

          case 32:
            _context8.next = 34;
            return ctx.scene.enter('est_exch');

          case 34:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[17, 26]]);
  }));

  return function agreePressAction(_x7) {
    return _ref7.apply(this, arguments);
=======
                        userInDB = _context6.sent;
                        visits = userInDB && userInDB.visits;

                        if (userInDB.visits.length) {
                          _context6.next = 6;
                          break;
                        }

                        return _context6.abrupt("return", '');

                      case 6:
                        lastVisitIP = visits[visits.length - 1].userIp;
                        return _context6.abrupt("return", lastVisitIP);

                      case 8:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6);
              }));

              return function getIpFromDB() {
                return _ref7.apply(this, arguments);
              };
            }();

            _context7.t0 = uId;
            _context7.t1 = curFrom;
            _context7.t2 = curTo;
            _context7.t3 = walletCode;
            _context7.t4 = amount;
            _context7.t5 = extraId || '';
            _context7.next = 27;
            return getIpFromDB();

          case 27:
            _context7.t6 = _context7.sent;
            data = {
              userId: _context7.t0,
              from: _context7.t1,
              to: _context7.t2,
              address: _context7.t3,
              amount: _context7.t4,
              extraId: _context7.t5,
              ip: _context7.t6
            };
            _context7.prev = 29;
            _context7.next = 32;
            return (0, _api.sendTransactionData)(data);

          case 32:
            response = _context7.sent;
            (0, _helpers.saveToSession)(ctx, 'response', response);
            _context7.next = 36;
            return ctx.scene.leave('agree');

          case 36:
            _context7.next = 38;
            return ctx.scene.enter('get_addr');

          case 38:
            _context7.next = 50;
            break;

          case 40:
            _context7.prev = 40;
            _context7.t7 = _context7["catch"](29);
            _context7.next = 44;
            return ctx.reply("Sorry, the address you\u2019ve entered is invalid.");

          case 44:
            _context7.next = 46;
            return (0, _helpers.pause)(1000);

          case 46:
            _context7.next = 48;
            return ctx.scene.leave('agree');

          case 48:
            _context7.next = 50;
            return ctx.scene.enter('est_exch');

          case 50:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[29, 40]]);
  }));

  return function agreePressAction(_x6) {
    return _ref6.apply(this, arguments);
>>>>>>> [65]Added pwd and ssl connection
  };
}();

exports.agreePressAction = agreePressAction;

<<<<<<< HEAD
var cancelTradeAction =
/*#__PURE__*/
function () {
  var _ref9 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee9(ctx) {
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            (0, _helpers.deleteFromSession)(ctx, 'curFrom');
            (0, _helpers.deleteFromSession)(ctx, 'curTo');
            (0, _helpers.deleteFromSession)(ctx, 'curFromInfo');
            (0, _helpers.deleteFromSession)(ctx, 'curToInfo');
            (0, _helpers.deleteFromSession)(ctx, 'addData');
            (0, _helpers.deleteFromSession)(ctx, 'addDataName');
            (0, _helpers.deleteFromSession)(ctx, 'amount');
            (0, _helpers.deleteFromSession)(ctx, 'minValue');
            (0, _helpers.deleteFromSession)(ctx, 'walletCode');
            (0, _helpers.deleteFromSession)(ctx, 'response');
            ctx.session = null;
            _context9.next = 13;
            return ctx.scene.leave();

          case 13:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function cancelTradeAction(_x8) {
    return _ref9.apply(this, arguments);
  };
}();
=======
var cancelTradeAction = function cancelTradeAction(ctx) {
  (0, _helpers.deleteFromSession)(ctx, 'curFrom');
  (0, _helpers.deleteFromSession)(ctx, 'curTo');
  (0, _helpers.deleteFromSession)(ctx, 'curFromInfo');
  (0, _helpers.deleteFromSession)(ctx, 'curToInfo');
  (0, _helpers.deleteFromSession)(ctx, 'addData');
  (0, _helpers.deleteFromSession)(ctx, 'addDataName');
  (0, _helpers.deleteFromSession)(ctx, 'amount');
  (0, _helpers.deleteFromSession)(ctx, 'minValue');
  (0, _helpers.deleteFromSession)(ctx, 'walletCode');
  (0, _helpers.deleteFromSession)(ctx, 'response');
  ctx.scene.leave();
};
>>>>>>> [65]Added pwd and ssl connection

exports.cancelTradeAction = cancelTradeAction;

var getIpAction =
/*#__PURE__*/
function () {
<<<<<<< HEAD
  var _ref10 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee10(req) {
    var ip, user;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
=======
  var _ref8 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee8(req) {
    var ip, user;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
>>>>>>> [65]Added pwd and ssl connection
          case 0:
            if (req.headers['x-forwarded-for']) {
              ip = req.headers['x-forwarded-for'].split(',')[0];
            } else if (req.connection && req.connection.remoteAddress) {
              ip = req.connection.remoteAddress;
            } else {
              ip = req.ip;
            }

<<<<<<< HEAD
            _context10.next = 3;
=======
            _context8.next = 3;
>>>>>>> [65]Added pwd and ssl connection
            return _User["default"].findOne({
              id: req.query.id
            });

          case 3:
<<<<<<< HEAD
            user = _context10.sent;

            if (user) {
              _context10.next = 8;
              break;
            }

            _context10.next = 7;
            return _User["default"].create({
              id: req.query.id
            }, {
              visits: user.visits
            });

          case 7:
            return _context10.abrupt("return");

          case 8:
            if (!(user && user.visits)) {
              _context10.next = 12;
=======
            user = _context8.sent;

            if (!(user && user.visits)) {
              _context8.next = 8;
>>>>>>> [65]Added pwd and ssl connection
              break;
            }

            user.visits.push({
              userIp: ip,
              ipParsed: new Date().toJSON()
            });
<<<<<<< HEAD
            _context10.next = 12;
            return user.save();

          case 12:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function getIpAction(_x9) {
    return _ref10.apply(this, arguments);
=======
            _context8.next = 8;
            return _User["default"].updateOne({
              id: req.query.id
            }, {
              visits: user.visits
            });

          case 8:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function getIpAction(_x7) {
    return _ref8.apply(this, arguments);
>>>>>>> [65]Added pwd and ssl connection
  };
}();

exports.getIpAction = getIpAction;