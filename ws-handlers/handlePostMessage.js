const emitNewMessage = require('../ws-emiters/emitNewMessage')

function handlePostMessage (socket, io, payload) {
  console.log('handlePostMessage', socket.id, payload)
  io.socket_username_joint.forEach(client => {
    if (client.socket === socket && payload.username) {
      client.username = payload.username
    }
  })
  const { username, message } = payload
  const resPayload = { username, message }
  emitNewMessage(socket, io, payload)
}

module.exports = handlePostMessage
