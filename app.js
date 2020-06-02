const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongo = require('mongodb')
const SocketIo = require('socket.io')

const handleJoinRoom = require('./ws-handlers/handleJoinRoom')
const handleChangeUsername = require('./ws-handlers/handleChangeUsername')
const handleCreateNewLongform = require('./ws-handlers/handleCreateNewLongform')
const handleRequestAllLongforms = require('./ws-handlers/handleRequestAllLongforms')
const handleRequestLongform = require('./ws-handlers/handleRequestLongform')
const handlePostMessage = require('./ws-handlers/handlePostMessage')
const handleLongformEdition = require('./ws-handlers/handleLongformEdition')
const handleDisconnect = require('./ws-handlers/handleDisconnect')

// const {
//   handleJoinRoom,
//   handleChangeUsername,
//   handleRequestAllLongforms,
//   handleRequestLongform,
//   handlePostMessage,
//   handleLongformEdition,
//   handleDisconnect
// } = require('./ws-handlers/')

const app = express()
app.io = new SocketIo()

const dbUrl = 'mongodb://localhost:27017'
const dbName = 'longformsdb'
mongo.MongoClient.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err, client) => {
  if (err) throw new Error(err)
  db = client.db(dbName)
  app.io.db = db
})

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.io.socket_username_joint = []
app.io.on('connection', socket => {
  console.log('==== CONNECT ====', socket.id)
  app.io.socket_username_joint.push({ username: undefined, socket })
  socket.join('lobby')
  socket.on('JOIN ROOM', payload => handleJoinRoom(socket, app.io, payload))
  socket.on('CHANGE USERNAME', payload => handleChangeUsername(socket, app.io, payload))
  socket.on('CREATE NEW LONGFORM', payload => handleCreateNewLongform(socket, app.io, payload))
  socket.on('REQUEST ALL LONGFORMS', payload => handleRequestAllLongforms(socket, app.io, payload))
  socket.on('REQUEST LONGFORM', payload => handleRequestLongform(socket, app.io, payload))
  socket.on('POST MESSAGE', payload => handlePostMessage(socket, app.io, payload))
  socket.on('POST LONGFORM EDITION', payload => handleLongformEdition(socket, app.io, payload))
  socket.on('disconnect', () => handleDisconnect(socket, app.io, null))
})

app.use((req, res, next) => {
  next(createError(404))
})

app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.json({ err: {
    status: err.status,
    message: err.message
  }})
})

module.exports = app
