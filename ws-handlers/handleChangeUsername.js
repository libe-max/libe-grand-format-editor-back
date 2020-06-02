const emitUserChangedName = require('../ws-emiters/emitUserChangedName')

function handleChangeUsername (socket, io, payload) {
  console.log('handleChangeUsername', socket.id, payload)
  let pUsername = ''
  io.socket_username_joint.forEach(client => {
    if (client.socket === socket && payload.username) {
      pUsername = client.username
      client.username = payload.username
    }
  })
  const resPayload = { pUsername, username: payload.username, room: socket._current_room }
  emitUserChangedName(socket, io, resPayload)
}

module.exports = handleChangeUsername
