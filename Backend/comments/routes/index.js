const express = require('express');
const router = express.Router();
const { randomBytes } = require('crypto');
const axios = require('axios');
let commentByPostId = {};
router.get('/posts/:id/comments', function(req, res, next) {
  console.log(commentByPostId);
  res.send(commentByPostId[req.params.id]);
});

router.post('/posts/:id/comments', async (req, res, next) => {
  const id = randomBytes(4).toString('hex');
  const comments = commentByPostId[req.params.id] || [];
  comments.push({id, content: req.body.content, status: 'pending'});
  commentByPostId[req.params.id] = comments;
  await axios.post('http://event-bus-srv:3005/events', {
    type: 'CommentCreated',
    data: {
      id,
      content: req.body.content,
      postId: req.params.id,
      status: 'pending'
    }
  });
  res.send(commentByPostId[req.params.id]);
});

router.post('/events', async (req, res) => {
  const { type, data } = req.body;
  if(type === 'CommentModerated') {
    let { postId, status, id, content } = data;
    const comments = commentByPostId[postId];
    const comment = comments.find(comment => {
      return comment.id === id;
    });
    comment.status = status;
    await axios.post('http://event-bus-srv:3005/events', {
      type: 'CommentUpdated',
      data: {
        id,
        status,
        postId,
        content
      }
    })
  }
  res.send({});
});
module.exports = router;
