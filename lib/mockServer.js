'use strict';

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function startServer(cb) {
  var server = _http2.default.createServer();
  server.listen(7721, 'localhost');
  var io = (0, _socket2.default)(server);
  io.origins('*:*');
  io.on('connection', function (socket) {
    socket.on('sign', function (data) {
      cb(socket.request.headers.referer, data, socket);
    });
  });
};

startServer(function (origin, data, socket) {
  console.log(data);
});
