var express = require('express');

var router = express.Router();

// Getting the Event Controller that we just created
var ContactController = require('../../controllers/contact.controller');


// Map each API to the Controller FUnctions
router.post('/contact-form', ContactController.sendMail);

// Export the Router
module.exports = router;