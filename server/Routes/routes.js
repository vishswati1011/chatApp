var express = require('express');
var router = express.Router();
var users = require('./users/users')
var chatroom = require('./chatroom/chatroom')

router.use('/chatroom',chatroom);
router.use('/users',users);


module.exports = router;