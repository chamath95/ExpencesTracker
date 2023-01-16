"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
var _router = _interopRequireDefault(require("./router"));
var _config = require("../_config/config");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// // Connection URL
_mongoose["default"].set("strictQuery", false);
_mongoose["default"].connect(_config.config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  console.log("Successfully connected to database");
})["catch"](function (error) {
  console.log("Unable to connect to db server - (error) - " + error);
});

//  starting a server
_router["default"].listen(_config.config.port, "0.0.0.0", function (err) {
  if (err) {
    console.log(err);
  }
  console.info('Server started on port %s.', _config.config.port);
});