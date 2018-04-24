var express = require('express');

var router = express.Router();

// Getting the Room Controller that we just created
var RoomController = require('../../controllers/room.controller');


// Map each API to the Controller FUnctions
router.get('/', RoomController.getRooms);

router.get('/:id', RoomController.getRoom);

router.post('/', RoomController.createRoom);

router.put('/', RoomController.updateRoom);

router.delete('/:id',RoomController.removeRoom);


// Export the Router
module.exports = router;