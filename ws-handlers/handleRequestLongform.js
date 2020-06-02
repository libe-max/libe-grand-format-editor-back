const ObjectId = require('mongodb').ObjectId
const emitServerError = require('../ws-emiters/emitServerError')
const emitLongform = require('../ws-emiters/emitLongform')

function handleRequestLongform (socket, io, payload) {
  console.log('handleRequestLongform', socket.id, payload)
  io.socket_username_joint.forEach(client => {
    if (client.socket === socket && payload.username) {
      client.username = payload.username
    }
  })
  const { db } = io
  const collection = db.collection('longforms')
  collection.find({ _id: ObjectId(payload.id) }).toArray((e, longforms) => {
    if (e) emitServerError(socket, io, e.message)
    else emitLongform(socket, io, { longform: longforms[0] })
  })
}

module.exports = handleRequestLongform
