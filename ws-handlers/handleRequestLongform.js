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
  if (!ObjectId.isValid(payload.id)) return emitServerError(socket, io, { message: `${payload.id} is not a valid ID` })
  collection.find({ _id: ObjectId(payload.id) }).toArray((e, longforms) => {
    if (e) emitServerError(socket, io, { message: e.message })
    else if (!longforms.length) emitServerError(socket, io, { message: `Requested ID ${payload.id} does not match any entry in database` })
    else emitLongform(socket, io, { longform: longforms[0] })
  })
}

module.exports = handleRequestLongform
