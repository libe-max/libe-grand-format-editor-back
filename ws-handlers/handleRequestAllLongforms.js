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

module.exports = handleRequestAllLongforms
