var express = require('express');

var router = express.Router();

// Getting the Table Controller that we just created
var TableController = require('../../controllers/table.controller');


// Map each API to the Controller FUnctions
router.get('/', TableController.getTables);

router.get('/:id', TableController.getTable);

router.get('/event/:evtId?', TableController.getTableBy);

router.post('/', TableController.createTable);

router.put('/', TableController.updateTable);

router.delete('/:id',TableController.removeTable);


// Export the Router
module.exports = router;