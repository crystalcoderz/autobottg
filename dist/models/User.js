"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.UserSchema = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var UserSchema = new _mongoose["default"].Schema({
  id: Number,
  username: String,
  visits: Array,
  transactions: Array
});
exports.UserSchema = UserSchema;

var UserModel = _mongoose["default"].model('User', UserSchema);

var _default = UserModel;
exports["default"] = _default;