"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTransactionStatus = exports.sendTransactionData = exports.getExchAmount = exports.getCurrInfo = exports.getMinimum = exports.getPairs = exports.getAllCurrencies = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _requestPromise = _interopRequireDefault(require("request-promise"));

var _config = require("./config");

//------------------------------- API -------------------------------------------
var _apiRequest =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(options) {
    var resp;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _requestPromise["default"])(options);

          case 3:
            resp = _context.sent;
            return _context.abrupt("return", resp);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0.error.error);
            throw new Error(_context.t0.error.error);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function _apiRequest(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getAllCurrencies =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    var options, currs;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            options = {
              uri: "".concat(process.env.CN_API_URL, "/currencies?active=true?api_key=").concat(process.env.CN_API_KEY),
              headers: {
                'Content-Type': 'application/json'
              },
              json: true
            };
            _context2.next = 3;
            return _apiRequest(options);

          case 3:
            currs = _context2.sent;
            return _context2.abrupt("return", currs);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getAllCurrencies() {
    return _ref2.apply(this, arguments);
  };
}();

exports.getAllCurrencies = getAllCurrencies;

var getPairs =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3() {
    var options, currs;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            options = {
              uri: "".concat(process.env.CN_API_URL, "/market-info/available-pairs/?api_key=").concat(process.env.CN_API_KEY),
              headers: {
                'Content-Type': 'application/json'
              },
              json: true
            };
            _context3.next = 3;
            return _apiRequest(options);

          case 3:
            currs = _context3.sent;
            return _context3.abrupt("return", currs);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getPairs() {
    return _ref3.apply(this, arguments);
  };
}();

exports.getPairs = getPairs;

var getMinimum =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(pair) {
    var options, amount;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            options = {
              uri: "".concat(process.env.CN_API_URL, "/min-amount/").concat(pair, "?api_key=").concat(process.env.CN_API_KEY),
              headers: {
                'Content-Type': 'application/json'
              },
              json: true
            };
            _context4.next = 3;
            return _apiRequest(options);

          case 3:
            amount = _context4.sent;
            return _context4.abrupt("return", amount);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getMinimum(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getMinimum = getMinimum;

var getCurrInfo =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(cur) {
    var options, curr;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            options = {
              uri: "".concat(process.env.CN_API_URL, "/currencies/").concat(cur, "?api_key=").concat(process.env.CN_API_KEY),
              headers: {
                'Content-Type': 'application/json'
              },
              json: true
            };
            _context5.next = 3;
            return _apiRequest(options);

          case 3:
            curr = _context5.sent;
            return _context5.abrupt("return", curr);

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function getCurrInfo(_x3) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getCurrInfo = getCurrInfo;

var getExchAmount =
/*#__PURE__*/
function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6(amount, fromTo) {
    var options, summ;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            options = {
              uri: "".concat(process.env.CN_API_URL, "/exchange-amount/").concat(amount, "/").concat(fromTo, "?api_key=").concat(process.env.CN_API_KEY),
              headers: {
                'Content-Type': 'application/json'
              },
              json: true
            };
            _context6.next = 3;
            return _apiRequest(options);

          case 3:
            summ = _context6.sent;
            return _context6.abrupt("return", summ);

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function getExchAmount(_x4, _x5) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getExchAmount = getExchAmount;

var sendTransactionData =
/*#__PURE__*/
function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee7(data) {
    var options, curr;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            options = {
              method: 'POST',
              uri: "".concat(process.env.CN_API_URL, "/transactions/").concat(process.env.CN_API_KEY),
              body: data,
              headers: {
                'Content-Type': 'application/json'
              },
              json: true
            };
            _context7.next = 3;
            return _apiRequest(options);

          case 3:
            curr = _context7.sent;
            return _context7.abrupt("return", curr);

          case 5:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function sendTransactionData(_x6) {
    return _ref7.apply(this, arguments);
  };
}();

exports.sendTransactionData = sendTransactionData;

var getTransactionStatus =
/*#__PURE__*/
function () {
  var _ref8 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee8(id) {
    var options, status;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            options = {
              uri: "".concat(process.env.CN_API_URL, "/transactions/").concat(id, "/").concat(process.env.CN_API_KEY),
              json: true
            };
            _context8.next = 3;
            return _apiRequest(options);

          case 3:
            status = _context8.sent;
            return _context8.abrupt("return", status);

          case 5:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function getTransactionStatus(_x7) {
    return _ref8.apply(this, arguments);
  };
}();

exports.getTransactionStatus = getTransactionStatus;