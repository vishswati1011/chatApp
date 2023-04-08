var express = require('express');
var router = express.Router();
var addMessage=  require('./addmessages')
var getAllMessage = require('./getAllMessage')
var addMsg = require('./addMsg')
var getMessage = require('./getMessages')
router.use('/addMessage',addMessage);
router.use('/getAllMessage',getAllMessage);
router.use('addMsg',addMsg)
router.use("getMessage",getMessage)


module.exports = router;