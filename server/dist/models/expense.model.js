"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ExpenseSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    trim: true,
    required: 'Title is required'
  },
  category: {
    type: String,
    trim: true,
    required: 'Category is required'
  },
  amount: {
    type: Number,
    min: 0,
    required: 'Amount is required'
  },
  incurred_on: {
    type: Date,
    "default": Date.now
  },
  notes: {
    type: String,
    trim: true
  },
  updated: Date,
  created: {
    type: Date,
    "default": Date.now
  },
  recorded_by: {
    type: _mongoose["default"].Schema.ObjectId,
    ref: 'User'
  }
});
var _default = _mongoose["default"].model('Expense', ExpenseSchema);
exports["default"] = _default;