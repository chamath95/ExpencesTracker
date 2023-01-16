"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _user = _interopRequireDefault(require("../controllers/user.controller"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.route('/auth/signup').post(_user["default"].signup);
router.route('/auth/signin').post(_user["default"].signin);
router.route('/auth/signout').get(_user["default"].signout);
var _default = router;
exports["default"] = _default;