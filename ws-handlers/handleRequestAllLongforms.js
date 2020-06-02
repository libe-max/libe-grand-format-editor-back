const emitServerError = require('../ws-emiters/emitServerError')
const emitAllLongforms = require('../ws-emiters/emitAllLongforms')

function handleRequestAllLongforms (socket, io, payload) {
  console.log('handleRequestAllLongforms', socket.id, payload)
  io.socket_username_joint.forEach(client => {
    if (client.socket === socket && payload.username) {
      client.username = payload.username
    }
  })
  const { db } = io
  const collection = db.collection('longforms')
  collection.find({}).toArray((e, longforms) => {
    if (e) emitServerError(socket, io, e.message)
    else emitAllLongforms(socket, io, { longforms })
  })
}

module.exports = handleRequestAllLongforms
