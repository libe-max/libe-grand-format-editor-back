function emitUserChangedName (socket, io, payload) {
  console.log('emitUserChangedName', payload)
  socket.broadcast.to(socket._current_room).emit('USER CHANGED NAME', payload)
  socket.emit('YOU CHANGED NAME', payload)
}

module.exports = emitUserChangedName
