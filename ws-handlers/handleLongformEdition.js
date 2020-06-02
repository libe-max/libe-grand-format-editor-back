function handleLongformEdition (socket, io, payload) {
  console.log('handleLongformEdition', socket.id, payload)
  io.socket_username_joint.forEach(client => {
    if (client.socket === socket && payload.username) {
      client.username = payload.username
    }
  })
}

module.exports = handleLongformEdition
