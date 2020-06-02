const initLongformTemplate = {}

function handleCreateNewLongform (socket, io, payload) {
  console.log('handleCreateNewLongform', socket.id, payload)
  const { db } = io
  const collection = db.collection('longforms')
  const newLongform = { ...initLongformTemplate }
  collection.insert(newLongform, (err, res) => {
    console.log(res)
  })

}

module.exports = handleCreateNewLongform
