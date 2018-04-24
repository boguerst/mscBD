var express = require('express');

var router = express.Router();

// Getting the RoomTable Controller that we just created
var RoomTableController = require('../../controllers/roomTable.controller');


// Map each API to the Controller FUnctions
router.get('/', RoomTableController.getRoomTables);

router.get('/:id', RoomTableController.getRoomTable);

router.post('/', RoomTableController.createRoomTable);

router.put('/', RoomTableController.updateRoomTable);

router.delete('/:id',RoomTableController.removeRoomTable);


// Export the Router
module.exports = router;