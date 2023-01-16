"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _express = _interopRequireDefault(require("express"));
var _user = _interopRequireDefault(require("./routes/user.route"));
var _expense = _interopRequireDefault(require("./routes/expense.route"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();

/**
 * Set request configurations
 */
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));

/**
 * Default router
 */
app.get("/", function (request, response, next) {
  response.json({
    message: "Hey! server works!"
  });
  next();
});

/**
 * Routing apps
 */
app.use('/', _user["default"]);
app.use('/', _expense["default"]);
var _default = app;
exports["default"] = _default;