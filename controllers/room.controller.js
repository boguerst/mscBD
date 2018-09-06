
var RoomService = require('../services/room.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getRooms = async function(req, res, next){
    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 100; 

    try{
        var rooms = await RoomService.getRooms({}, page, limit);
        
        // Return the rooms list with the appropriate HTTP Status Code and Message.
        return res.json(rooms.docs);
        // return res.status(200).json({status: 200, data: rooms.docs, message: "Succesfully Rooms Recieved"});
    }catch(e){
        //Return an Error Response Message with Code and the Error Message.
        return res.json(e.message);
    }
};

// Async Controller function to get the To do List
exports.getRoom = async function(req, res, next){
    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    var id = req.params.id;

    try{
        var room = await RoomService.getRoom(id);
        return res.json(room);
    }catch(e){
        //Return an Error Response Message with Code and the Error Message.
        return res.status(204).json(e.message);
    }
};

exports.createRoom = async function(req, res, next){
    // Req.Body contains the form submit values.
    /*var room = {
        name: req.body.name,
        surface: req.body.surface,
        volume: req.body.volume,
        shape: req.body.shape,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber
    };*/
    var room = req.body;

    try{
        // Calling the Service function with the new object from the Request Body
        var createdRoom = await RoomService.createRoom(room);
        return res.json(createdRoom);
    }catch(e){        
        //Return an Error Response Message with Code and the Error Message.
        return res.status(204).json("Error room Creation "+e.message);
    }
};

exports.updateRoom = async function(req, res, next){
    // Id is necessary for the update
    if(!req.body._id){
        return res.status(400).json("Id must be present");
    }

    /*var id = req.body._id;
    var room = {
        id,
        name: req.body.name || null,
        surface: req.body.surface || null,
        volume: req.body.volume || null,
        shape: req.body.shape || null,
        address: req.body.address || null,
        phoneNumber: req.body.phoneNumber || null
    };*/
    var room = req.body;

    try{
        var updatedRoom = await RoomService.updateRoom(room);
        return res.json(updatedRoom);
    }catch(e){
        return res.status(204).json(e.message);
    }
};

exports.removeRoom = async function(req, res, next){
    var id = req.params.id;

    try{
        var deleted = await RoomService.deleteRoom(id);
        return res.status(204).json(deleted);
    }catch(e){
        return res.status(400).json(e.message);
    }
};