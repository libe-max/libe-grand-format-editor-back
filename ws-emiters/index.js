function emitAllLongforms (socket, io, payload) {
  console.log('emitAllLongforms', payload)
  socket.emit('ALL LONGFORMS', payload)
}

function emitLongform (socket, io, payload) {
  console.log('emitLongform', payload)
  socket.emit('LONGFORM', payload)
}

function emitUserJoinedRoom (socket, io, payload) {
  console.log('emitUserJoinedRoom', payload)
  socket.broadcast.to(socket._current_room).emit('USER JOINED ROOM', payload)
  socket.emit('YOU JOINED ROOM', payload)
}

function emitUserLeftRoom (socket, io, payload) {
  console.log('emitUserLeftRoom', payload)
  socket.broadcast.to(socket._current_room).emit('USER LEFT ROOM', payload)
  socket.emit('YOU LEFT ROOM', payload)
}

function emitUserChangedName (socket, io, payload) {
  console.log('emitUserChangedName', payload)
  socket.broadcast.to(socket._current_room).emit('USER CHANGED NAME', payload)
  socket.emit('YOU CHANGED NAME', payload)
}

function emitNewMessage (socket, io, payload) {
  console.log('emitNewMessage', payload)
  socket.broadcast.to(socket._current_room).emit('NEW MESSAGE', payload)
  socket.emit('YOUR NEW MESSAGE', payload)
}

function emitServerError (socket, io, payload) {
  console.log('emitServerError', payload)
  socket.emit('SERVER ERROR', payload)
}

module.exports = {
  emitAllLongforms,
  emitLongform,
  emitUserJoinedRoom,
  emitUserLeftRoom,
  emitUserChangedName,
  emitNewMessage,
  emitServerError
}
