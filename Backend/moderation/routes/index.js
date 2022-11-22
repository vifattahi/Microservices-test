var express = require('express');
var router = express.Router();
const axios = require('axios');

router.post('/events', async function(req, res, next) {
  const { type, data } = req.body;
  if(type === 'CommentCreated') {
    const status = data.content.includes('orange')? 'rejected': 'approved';
    await axios.post('http://event-bus-srv:3005/events', {
      type: 'CommentModerated',
      data: {
        id: data.id,
        content: data.content,
        status,
        postId: data.postId
      }
    });
  }
  res.send({});
});

module.exports = router;
