const emitServerError = require('../ws-emiters/emitServerError')
const emitNewLongform = require('../ws-emiters/emitNewLongform')
const initLongformTemplate = {}

function handleCreateNewLongform (socket, io, payload) {
  console.log('handleCreateNewLongform', socket.id, payload)
  const { db } = io
  const collection = db.collection('longforms')
  const newLongform = { ...initLongformTemplate }
  collection.insert(newLongform, (e, res) => {
    if (e) emitServerError(socket, io, e.message)
    else emitNewLongform(socket, io, { longform: res.ops[0] })
  })

}

module.exports = handleCreateNewLongform
