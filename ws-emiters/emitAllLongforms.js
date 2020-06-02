function emitAllLongforms (socket, io, payload) {
  console.log('emitAllLongforms', payload)
  socket.emit('ALL LONGFORMS', payload)
}

module.exports = emitAllLongforms
