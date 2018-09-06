var express = require('express');

var router = express.Router();
var user = require('./api/user.route');
var room = require('./api/room.route');
var table = require('./api/table.route');
var guest = require('./api/guest.route');
var contact = require('./api/contact.route');

router.use('/user', user);
router.use('/room', room);
router.use('/table', table);
router.use('/guest', guest);
router.use('/contact', contact);

module.exports = router;