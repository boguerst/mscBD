
var RoomTableService = require('../services/roomTable.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getRoomTables = async function(req, res, next){
    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 100; 

    try{
        var roomTables = await RoomTableService.getRoomTables({}, page, limit);
        
        // Return the roomTables list with the appropriate HTTP Status Code and Message.
        return res.json(roomTables.docs);
        // return res.status(200).json({status: 200, data: roomTables.docs, message: "Succesfully RoomTables Recieved"});
    }catch(e){
        //Return an Error Response Message with Code and the Error Message.
        return res.json(e.message);
    }
};

// Async Controller function to get the To do List
exports.getRoomTable = async function(req, res, next){
    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    var id = req.params.id;

    try{
        var roomTable = await RoomTableService.getRoomTable(id);
        return res.json(roomTable);
    }catch(e){
        //Return an Error Response Message with Code and the Error Message.
        return res.status(204).json(e.message);
    }
};

exports.createRoomTable = async function(req, res, next){
    // Req.Body contains the form submit values.
    var roomTable = {
        roomId: req.body.roomId,
        key: req.body.key,
        category: req.body.category,
        name: req.body.name,
        guests: req.body.guests,
        loc: req.body.loc
    };

    try{
        // Calling the Service function with the new object from the Request Body
        var createdRoomTable = await RoomTableService.createRoomTable(roomTable);
        return res.json(createdRoomTable);
    }catch(e){        
        //Return an Error Response Message with Code and the Error Message.
        return res.status(204).json("Error roomTable Creation "+e.message);
    }
};

exports.updateRoomTable = async function(req, res, next){
    // Id is necessary for the update
    if(!req.body._id){
        return res.status(400).json("Id must be present");
    }

    var roomTable = {
        req.body._id,
        roomId: req.body.roomId || null,
        key: req.body.key || null,
        category: req.body.category || null,
        name: req.body.name || null,
        guests: req.body.guests || null,
        loc: req.body.loc || null
    };

    try{
        var updatedRoomTable = await RoomTableService.updateRoomTable(roomTable);
        return res.json(updatedRoomTable);
    }catch(e){
        return res.status(204).json(e.message);
    }
};

exports.removeRoomTable = async function(req, res, next){
    var id = req.params.id;

    try{
        var deleted = await RoomTableService.deleteRoomTable(id);
        return res.status(204).json(deleted);
    }catch(e){
        return res.status(400).json(e.message);
    }
};