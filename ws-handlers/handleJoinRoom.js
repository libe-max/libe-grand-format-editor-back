const emitUserJoinedRoom = require('../ws-emiters/emitUserJoinedRoom')
const emitUserLeftRoom = require('../ws-emiters/emitUserLeftRoom')

function handleJoinRoom (socket, io, payload) {
  console.log('handleJoinRoom', socket.id, payload)
  io.socket_username_joint.forEach(client => {
    if (client.socket.id === socket.id && payload.username) {
      client.username = payload.username
    }
  })
  const currentRoom = socket._current_room
  if (currentRoom) {
    socket.leave(currentRoom, () => {
      const leftPayload = { username: payload.username, room: currentRoom }
      emitUserLeftRoom(socket, io, leftPayload)
      socket._current_room = ''
      socket.join(payload.room, () => {
        const joinedPayload = { username: payload.username, room: payload.room }
        socket._current_room = payload.room
        emitUserJoinedRoom(socket, io, joinedPayload)
      })
    })
  } else {
    socket.join(payload.room, () => {
      const joinedPayload = { username: payload.username, room: payload.room }
      socket._current_room = payload.room
      emitUserJoinedRoom(socket, io, joinedPayload)
    })
  }
}

module.exports = handleJoinRoom
