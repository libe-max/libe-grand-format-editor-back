const emitUserLeftRoom = require('../ws-emiters/emitUserLeftRoom')

function handleDisconnect (socket, io) {
  console.log('handleDisconnect', socket.id)
  const client = io.socket_username_joint.find(client => client.socket.id === socket.id)
  const username = client && client.username ? client.username : 'Anonyme'
  const currentRoom = socket._current_room
  if (!currentRoom) return
  socket.leave(currentRoom, () => {
    const leftPayload = { username, room: currentRoom }
    emitUserLeftRoom(socket, io, leftPayload)
    io.socket_username_joint = io.socket_username_joint.filter(entry => entry.socket !== socket)
  })
}

module.exports = handleDisconnect
