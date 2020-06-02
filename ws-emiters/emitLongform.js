function emitLongform (socket, io, payload) {
  console.log('emitLongform', payload)
  socket.emit('LONGFORM', payload)
}

module.exports = emitLongform
