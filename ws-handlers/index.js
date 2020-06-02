const {
  emitAllLongforms,
  emitLongform,
  emitUserJoinedRoom,
  emitUserLeftRoom,
  emitUserChangedName,
  emitNewMessage,
  emitServerError
} = require('../ws-emiters/')

/* Join room */
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

/* Change username */
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

/* Post message */
function handlePostMessage (socket, io, payload) {
  console.log('handlePostMessage', socket.id, payload)
  io.socket_username_joint.forEach(client => {
    if (client.socket === socket && payload.username) {
      client.username = payload.username
    }
  })
  const { username, message } = payload
  const resPayload = { username, message }
  emitNewMessage(socket, io, payload)
}

/* Request all longforms */
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
    else emitAllLongforms(socket, io, { longforms: [{
      _id: '123',
      title: 'Un titre',
      description: 'Une description',
      url: 'Une url',
      author: 'Libé Labo',
      tweet: 'Some tweet text',
      show_header: true,
      image_social: 'https://www.liberation.fr/apps/2020/03/social.jpg',
      image_call: 'https://www.liberation.fr/apps/2020/03/appel.jpg',
      image_theme: 'https://www.liberation.fr/apps/2020/03/theme.jpg',
      blocks: [{
        type: 'header',
        bg_image: 'https://www.liberation.fr/apps/2020/04/une-image.jpg',
        title: 'Un gros titre pour le gros header !',
        buttons: ['Un', 'Deux', 'Trois']
      }],
      meta: {},
      _changes: {}
    }, {
      _id: '234',
      title: 'Un titre',
      description: 'Une description',
      url: 'Une url',
      author: 'Libé Labo',
      tweet: 'Some tweet text',
      show_header: true,
      image_social: 'https://www.liberation.fr/apps/2020/03/social.jpg',
      image_call: 'https://www.liberation.fr/apps/2020/03/appel.jpg',
      image_theme: 'https://www.liberation.fr/apps/2020/03/theme.jpg',
      blocks: [{
        type: 'header',
        bg_image: 'https://www.liberation.fr/apps/2020/04/une-image.jpg',
        title: 'Un gros titre pour le gros header !',
        buttons: ['Un', 'Deux', 'Trois']
      }],
      meta: {},
      _changes: {}
    }, {
      _id: '345',
      title: 'Un titre',
      description: 'Une description',
      url: 'Une url',
      author: 'Libé Labo',
      tweet: 'Some tweet text',
      show_header: true,
      image_social: 'https://www.liberation.fr/apps/2020/03/social.jpg',
      image_call: 'https://www.liberation.fr/apps/2020/03/appel.jpg',
      image_theme: 'https://www.liberation.fr/apps/2020/03/theme.jpg',
      blocks: [{
        type: 'header',
        bg_image: 'https://www.liberation.fr/apps/2020/04/une-image.jpg',
        title: 'Un gros titre pour le gros header !',
        buttons: ['Un', 'Deux', 'Trois']
      }],
      meta: {},
      _changes: {}
    }]})
  })
}

/* Request longform */
function handleRequestLongform (socket, io, payload) {
  console.log('handleRequestLongform', socket.id, payload)
  io.socket_username_joint.forEach(client => {
    if (client.socket === socket && payload.username) {
      client.username = payload.username
    }
  })
  const { db } = io
  const collection = db.collection('longforms')
  collection.find({_id: payload.id}).toArray((e, longforms) => {
    if (e) emitServerError(socket, io, e.message)
    else emitLongform(socket, io, { longform: {
      _id: payload.id,
      title: 'Un titre',
      description: 'Une description',
      url: 'Une url',
      author: 'Libé Labo',
      tweet: 'Some tweet text',
      show_header: true,
      image_social: 'https://www.liberation.fr/apps/2020/03/social.jpg',
      image_call: 'https://www.liberation.fr/apps/2020/03/appel.jpg',
      image_theme: 'https://www.liberation.fr/apps/2020/03/theme.jpg',
      blocks: [{
        type: 'header',
        bg_image: 'https://www.liberation.fr/apps/2020/04/une-image.jpg',
        title: 'Un gros titre pour le gros header !',
        buttons: ['Un', 'Deux', 'Trois']
      }],
      meta: {},
      _changes: {}
    } })
  })
}

/* Longform edition */
function handleLongformEdition (socket, io, payload) {
  console.log('handleLongformEdition', socket.id, payload)
  io.socket_username_joint.forEach(client => {
    if (client.socket === socket && payload.username) {
      client.username = payload.username
    }
  })
}

/* Disconnect */
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

module.exports = {
  handleJoinRoom,
  handleChangeUsername,
  handlePostMessage,
  handleRequestAllLongforms,
  handleRequestLongform,
  handleLongformEdition,
  handleDisconnect
}
