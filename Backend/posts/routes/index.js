const express = require('express');
const router = express.Router();
const { randomBytes } = require('crypto');
const axios = require('axios');

let posts = {};

router.get('/posts', function(req, res, next) {
  res.send(posts);
});

router.post('/posts/create', async(req, res, next) => {
  const id = randomBytes(4).toString('hex');
  posts[id] = {id, title: req.body.title};
  await axios.post('http://event-bus-srv:3005/events', {
    type: 'PostCreated',
    data: {
      id,
      title: req.body.title
    }
  });
  res.send(posts);
});

router.post('/events', (req, res) => {
  res.send({});
});
module.exports = router;
