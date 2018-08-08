var express = require('express');

var router = express.Router();

// Getting the Event Controller that we just created
var EventController = require('../../controllers/event.controller');


// Map each API to the Controller FUnctions
router.get('/', EventController.getEvents);

// router.get('/by/:userId', EventController.getEventsBy);

router.post('/', EventController.createEvent);

router.put('/', EventController.updateEvent);

router.delete('/:id',EventController.removeEvent);


// Export the Router
module.exports = router;