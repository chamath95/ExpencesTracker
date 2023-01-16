"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _expense = _interopRequireDefault(require("../controllers/expense.controller"));
var _user = _interopRequireDefault(require("../controllers/user.controller"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.route('/api/expenses/current/preview').get(_user["default"].requireSignin, _expense["default"].currentMonthPreview);
router.route('/api/expenses/by/category').get(_user["default"].requireSignin, _expense["default"].expenseByCategory);
router.route('/api/expenses/plot').get(_user["default"].requireSignin, _expense["default"].plotExpenses);
router.route('/api/expenses/category/averages').get(_user["default"].requireSignin, _expense["default"].averageCategories);
router.route('/api/expenses/yearly').get(_user["default"].requireSignin, _expense["default"].yearlyExpenses);
router.route('/api/expenses').post(_user["default"].requireSignin, _expense["default"].create).get(_user["default"].requireSignin, _expense["default"].listByUser);
router.route('/api/expenses/:expenseId')
// .get(userController.requireSignin, expenseCtrl.read)
.put(_user["default"].requireSignin, _expense["default"].hasAuthorization, _expense["default"].update)["delete"](_user["default"].requireSignin, _expense["default"].hasAuthorization, _expense["default"].remove);
router.param('expenseId', _expense["default"].expenseByID);
var _default = router;
exports["default"] = _default;