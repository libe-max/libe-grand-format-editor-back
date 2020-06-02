function emitNewMessage (socket, io, payload) {
  console.log('emitNewMessage', payload)
  socket.broadcast.to(socket._current_room).emit('NEW MESSAGE', payload)
  socket.emit('YOUR NEW MESSAGE', payload)
}

module.exports = emitNewMessage
