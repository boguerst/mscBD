var express = require('express');

var router = express.Router();
var user = require('./api/user.route');
var event = require('./api/event.route');
var room = require('./api/room.route');
var guest = require('./api/guest.route');
var contact = require('./api/contact.route');

router.use('/user', user);
router.use('/event', event);
router.use('/room', room);
router.use('/guest', guest);
router.use('/contact', contact);

module.exports = router;