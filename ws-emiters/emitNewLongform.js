function emitNewLongform (socket, io, payload) {
  console.log('emitNewLongform', payload)
  socket.broadcast.to('lobby').emit('NEW LONGFORM', payload)
  socket.emit('YOUR NEW LONGFORM', payload)
}

module.exports = emitNewLongform
