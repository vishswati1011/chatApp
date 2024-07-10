var express = require('express');
var router = express.Router();
var register = require('./register')
var email_verify = require('./emailVerfication')

var login = require('./login')
var invite_user = require('./inviteUser')
var getFriendByUserId = require('./getFriendByUserId')

router.use('/emailverify',email_verify);
router.use('/register',register);
router.use('/login',login);
router.use('/inviteuser',invite_user);
router.use('/getFriendByUserId',getFriendByUserId)
router.use('/getAllUsers',require('./getAllUser'))

module.exports = router;