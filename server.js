var connect = require('connect'),
    socketio = require('socket.io');

var port = process.env.PORT || 3000;
var server = connect(
  connect.static(__dirname + '/public')
).listen(port);

var data = [
    {text:'NodeJS', done:true},
    {text:'WebSocket bidirectional', done:true},
{text:'Adding Objects', done:true},
{text:'Get Start Data', done:true},
{text:'Design', done:false}];

var io = socketio.listen(server);
io.sockets.on('connection', function(socket) {

  socket.emit('change', data);

  socket.on('change', function(obj) {
    console.log(obj);
    data = obj;
    socket.broadcast.emit('change', data);
  });
});