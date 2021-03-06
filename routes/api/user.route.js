var express = require('express');

var router = express.Router();

// Getting the User Controller that we just created
var UserController = require('../../controllers/user.controller');


// Map each API to the Controller FUnctions
router.get('/', UserController.getUsers);

router.get('/:id', UserController.getUser);

router.post('/login', UserController.login);

router.post('/', UserController.createUser);

router.put('/', UserController.updateUser);

router.delete('/:id',UserController.removeUser);


// Export the Router
module.exports = router;