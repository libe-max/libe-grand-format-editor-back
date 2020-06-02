function emitServerError (socket, io, payload) {
  console.log('emitServerError', payload)
  socket.emit('SERVER ERROR', payload)
}

module.exports = emitServerError
