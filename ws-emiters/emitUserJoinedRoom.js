function emitUserJoinedRoom (socket, io, payload) {
  console.log('emitUserJoinedRoom', payload)
  socket.broadcast.to(socket._current_room).emit('USER JOINED ROOM', payload)
  socket.emit('YOU JOINED ROOM', payload)
}

module.exports = emitUserJoinedRoom
