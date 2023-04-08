var express = require('express');
var router = express.Router();
var register = require('./register')
var emailverify = require('./emailVerfication')

var login = require('./login')
var inviteuser = require('./inviteUser')
var invite = require('./invite')
var getFriendByUserId = require('./getFriendByUserId')
router.use('/emailverify',emailverify);
router.use('/register',register);

router.use('/login',login);
router.use('/invite',invite)
router.use('/inviteuser',inviteuser);
router.use('/getFriendByUserId',getFriendByUserId)




module.exports = router;