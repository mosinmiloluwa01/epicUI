"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import '@babel/polyfill';
var app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_express.default.static(_path.default.join(__dirname, './src')));
app.get('/', function (req, res) {
  res.header('X-XSS-Protection', 0);
  res.status(200).sendFile(_path.default.join(__dirname, './src/html/login.html'));
});
var port = process.env.PORT || 3000;
app.listen(port, function () {
  return console.log("Listening on ".concat(port));
});
var _default = app;
exports.default = _default;

//# sourceMappingURL=build.js.map