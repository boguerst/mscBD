
var Room = require('../models/room.model');

// Saving the context of this module inside the _the variable
_this = this;

// Async function to get the To do List
exports.getRooms = async function(query, page, limit){
    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    };
    
    // Try Catch the awaited promise to handle the error 
    try {
        var rooms = await Room.paginate(query, options);
        // Return the room list that was retured by the mongoose promise
        return rooms;
    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating Rooms');
    }
};

// Async function to get the To do List
exports.getRoom = async function(id){
    // Try Catch the awaited promise to handle the error 
    try {
        return await Room.findOne({_id: id});
    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while finding the room : ' + id);
    }
};

exports.createRoom = async function(room){
    // Creating a new Mongoose Object by using the new keyword
    var newRoom = new Room({
        name: room.name,
        surface: room.surface,
        volume: room.volume,
        shape: room.shape,
        address: room.address,
        phoneNumber: room.phoneNumber,
        creationDate: new Date()
    });

    try{
        // Saving the Room 
        var savedRoom = await newRoom.save();
        return savedRoom;
    }catch(e){
        // return a Error message describing the reason     
        throw Error("Error while Creating Room")
    }
};

exports.updateRoom = async function(room){
    try{
        //Find the old Room Object by the Id
        var oldRoom = await Room.findById(room._id);
        return oldRoom;
    }catch(e){
        throw Error("Error occured while Finding the Room");
    }

    // If no old Room Object exists return false
    if(!oldRoom){
        return false;
    }

    //Edit the Room Object
    oldRoom.name = room.name;
    oldRoom.surface = room.volume;
    oldRoom.volume = room.volume;
    oldRoom.shape = room.shape;
    oldRoom.address = room.address;
    oldRoom.phoneNumber = room.phoneNumber;
    try{
        var savedRoom = await oldRoom.save();
        return savedRoom;
    }catch(e){
        throw Error("And Error occured while updating the Room");
    }
};

exports.deleteRoom = async function(id){
    // Delete the room
    try{
        var deleted = await Room.remove({_id: id});
        if(deleted.result.n === 0){
            throw Error("Room Could not be deleted");
        }
        return deleted;
    }catch(e){
        throw Error("Error Occured while Deleting the Room");
    }
};