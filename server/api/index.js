var express = require('express');
var router = express.Router();

/* Test api routing */
router.get('/', (req, res, next) => {
  res.send('Welcome to your express server! Start creating and editing your api routes in the server/api folder.');
});

router.post('/', (req, res, next) => {
  res.send(`POST request received! This is the message that was sent: ${req.body.post}`);
})

module.exports = router;
