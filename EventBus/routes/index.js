var express = require('express');
var router = express.Router();
const axios = require('axios');

const events = [];

router.post('/events', function(req, res, next) {
  const event = req.body;
  events.push(event);
  axios.post('http://posts-clusterip-srv:3001/events', event);
  axios.post('http://comments-clusterip-srv:3002/events', event);
  axios.post('http://query-clusterip-srv:3003/events', event);
  axios.post('http://moderation-clusterip-srv:3004/events', event);
  res.send({status: 'Ok'})
});

module.exports = router;
