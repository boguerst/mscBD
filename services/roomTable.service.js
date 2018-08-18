
var RoomTable = require('../models/roomTable.model');

// Saving the context of this module inside the _the variable
_this = this;

// Async function to get the To do List
exports.getRoomTables = async function(query, page, limit){
    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    };
    
    // Try Catch the awaited promise to handle the error 
    try {
        var roomTables = await RoomTable.paginate(query, options);
        // Return the roomTable list that was retured by the mongoose promise
        return roomTables;
    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating RoomTables');
    }
};

// Async function to get the To do List
exports.getRoomTable = async function(id){
    // Try Catch the awaited promise to handle the error 
    try {
        return await RoomTable.findOne({_id: id});
    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while finding the roomTable : ' + id);
    }
};

exports.createRoomTable = async function(roomTable){
    // Creating a new Mongoose Object by using the new keyword
    var newRoomTable = new RoomTable({
        roomId: roomTable.roomId,
        key: roomTable.key,
        category: roomTable.category,
        name: roomTable.name,
        guests: roomTable.guests,
        loc: roomTable.loc
    });

    try{
        // Saving the RoomTable 
        var savedRoomTable = await newRoomTable.save();
        return savedRoomTable;
    }catch(e){
        // return a Error message describing the reason     
        throw Error("Error while Creating RoomTable")
    }
};

exports.updateRoomTable = async function(roomTable){
    try{
        //Find the old RoomTable Object by the Id
        var oldRoomTable = await RoomTable.findById(roomTable._id);
        return oldRoomTable;
    }catch(e){
        throw Error("Error occured while Finding the RoomTable");
    }

    // If no old RoomTable Object exists return false
    if(!oldRoomTable){
        return false;
    }

    //Edit the RoomTable Object
    oldRoomTable.roomId = roomTable.roomId;
    oldRoomTable.key = roomTable.key;
    oldRoomTable.category = roomTable.category;
    oldRoomTable.name = roomTable.name;
    oldRoomTable.guests = roomTable.guests;
    oldRoomTable.loc = roomTable.loc;
    try{
        var savedRoomTable = await oldRoomTable.save();
        return savedRoomTable;
    }catch(e){
        throw Error("And Error occured while updating the RoomTable");
    }
};

exports.deleteRoomTable = async function(id){
    // Delete the roomTable
    try{
        var deleted = await RoomTable.remove({_id: id});
        if(deleted.result.n === 0){
            throw Error("RoomTable Could not be deleted");
        }
        return deleted;
    }catch(e){
        throw Error("Error Occured while Deleting the RoomTable");
    }
};