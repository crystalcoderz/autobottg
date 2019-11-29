"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHelpKeyboard = exports.getBackKeyboard = exports.getAgreeKeyboard = exports.getExtraIDKeyboard = exports.getAmountKeyboard = exports.getToKeyboard = exports.getFromKeyboard = exports.getReplyKeyboard = exports.getMainKeyboard = void 0;

var _markup = _interopRequireDefault(require("telegraf/markup"));

var _extra = _interopRequireDefault(require("telegraf/extra"));

var _config = require("./config");

//----------------- Keyboards ---------------------------------------------------------
var getMainKeyboard = function getMainKeyboard(ctx) {
  return _markup["default"].keyboard([_config.config.kb.accept]).oneTime().resize().extra();
};

exports.getMainKeyboard = getMainKeyboard;

var getReplyKeyboard = function getReplyKeyboard(ctx) {
  return _markup["default"].keyboard([_config.config.kb.start]).oneTime().resize().extra();
};

exports.getReplyKeyboard = getReplyKeyboard;

var getFromKeyboard = function getFromKeyboard(currs) {
  var _config$popularCurrs = _config.config.popularCurrs,
      btc = _config$popularCurrs.btc,
      eth = _config$popularCurrs.eth,
      bch = _config$popularCurrs.bch,
      ltc = _config$popularCurrs.ltc,
      xmr = _config$popularCurrs.xmr,
      zec = _config$popularCurrs.zec;
  var fullKb = [[btc, eth], [bch, ltc], [xmr, zec], [_config.config.kb.cancel], [_config.config.kb.help]];
  return _markup["default"].keyboard(fullKb).resize().extra();
};

exports.getFromKeyboard = getFromKeyboard;

var getToKeyboard = function getToKeyboard(ctx) {
  var curFrom = ctx.session.curFrom;
  var popularCurrs = {};
  Object.keys(_config.config.popularCurrs).forEach(function (tiker) {
    tiker === curFrom ? popularCurrs[tiker] = "\u2705 ".concat(_config.config.popularCurrs[tiker]) : popularCurrs[tiker] = _config.config.popularCurrs[tiker];
  });
  var btc = popularCurrs.btc,
      eth = popularCurrs.eth,
      bch = popularCurrs.bch,
      ltc = popularCurrs.ltc,
      xmr = popularCurrs.xmr,
      zec = popularCurrs.zec;
  var fullKb = [[btc, eth], [bch, ltc], [xmr, zec], [_config.config.kb.back, _config.config.kb.cancel], [_config.config.kb.help]];
  return _markup["default"].keyboard(fullKb).resize().extra();
};

exports.getToKeyboard = getToKeyboard;

var getAmountKeyboard = function getAmountKeyboard(ctx) {
  return _markup["default"].keyboard([[_config.config.kb.back, _config.config.kb.cancel], [_config.config.kb.help]]).resize().extra();
};

exports.getAmountKeyboard = getAmountKeyboard;

var getExtraIDKeyboard = function getExtraIDKeyboard(ctx) {
  return _markup["default"].keyboard([[_config.config.kb.back, _config.config.kb.next], [_config.config.kb.cancel], [_config.config.kb.help]]).resize().extra();
};

exports.getExtraIDKeyboard = getExtraIDKeyboard;

var getAgreeKeyboard = function getAgreeKeyboard(ctx) {
  return _markup["default"].keyboard([[_config.config.kb.confirm, _config.config.kb.back], [_config.config.kb.help]]).resize().extra();
};

exports.getAgreeKeyboard = getAgreeKeyboard;

var getBackKeyboard = function getBackKeyboard(ctx) {
  return _markup["default"].keyboard([[_config.config.kb.startNew], [_config.config.kb.help]]).resize().extra();
};

exports.getBackKeyboard = getBackKeyboard;

var getHelpKeyboard = function getHelpKeyboard(ctx) {
  return _markup["default"].keyboard([[_config.config.kb.cancel]]).resize().extra();
};

exports.getHelpKeyboard = getHelpKeyboard;