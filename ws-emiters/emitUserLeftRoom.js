function emitUserLeftRoom (socket, io, payload) {
  console.log('emitUserLeftRoom', payload)
  socket.broadcast.to(socket._current_room).emit('USER LEFT ROOM', payload)
  socket.emit('YOU LEFT ROOM', payload)
}

module.exports = emitUserLeftRoom
