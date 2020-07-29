const emitServerError = require('../ws-emiters/emitServerError')
const emitNewLongform = require('../ws-emiters/emitNewLongform')

function handleCreateNewLongform (socket, io, payload) {
  console.log('handleCreateNewLongform', socket.id, payload)
  const { db } = io
  const collection = db.collection('longforms')
  const newLongform = {
    _meta: {
      versions: [],
      created_on: null
    }
  }
  newLongform._meta.created_on = Date.now()
  newLongform._meta.versions.push({
    timestamp: Date.now(),
    author: io.getUsernameFromSocket(socket),
    changes: null
  })
  collection.insertOne(newLongform, (e, res) => {
    if (e) return emitServerError(socket, io, { message: e.message })
    return emitNewLongform(socket, io, { longform: res.ops[0] })
  })
}

module.exports = handleCreateNewLongform
