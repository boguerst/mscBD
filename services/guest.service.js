
var Guest = require('../models/guest.model');

// Saving the context of this module inside the _the variable
_this = this;

// Async function to get the To do List
exports.getGuests = async function(query, page, limit){
    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    };
    
    // Try Catch the awaited promise to handle the error 
    try {
        var guests = await Guest.paginate(query, options);
        // Return the guest list that was retured by the mongoose promise
        return guests;
    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating Guests');
    }
};

// Async function to get the To do List
exports.getGuest = async function(id){
    // Try Catch the awaited promise to handle the error 
    try {
        return await Guest.findOne({_id: id});
    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while finding the guest : ' + id);
    }
};

exports.createGuest = async function(guest){
    // Creating a new Mongoose Object by using the new keyword
    var newGuest = new Guest(guest);
    /*{
        name: guest.name,
        firstName: guest.firstName,
        evtId: guest.evtId
    }*/
    try{
        // Saving the Guest 
        var savedGuest = await newGuest.save();
        return savedGuest;
    }catch(e){
        // return a Error message describing the reason     
        throw Error("Error while Creating Guest")
    }
};

exports.updateGuest = async function(guest){
    try{
        //Find the old Guest Object by the Id
        var oldGuest = await Guest.findById(guest._id);
        return oldGuest;
    }catch(e){
        throw Error("Error occured while Finding the Guest");
    }

    // If no old Guest Object exists return false
    if(!oldGuest){
        return false;
    }

    //Edit the Guest Object
    oldGuest.name = guest.name;
    oldGuest.firstName = guest.firstName;
    oldGuest.evtId = guest.evtId;
    try{
        var savedGuest = await oldGuest.save();
        return savedGuest;
    }catch(e){
        throw Error("And Error occured while updating the Guest");
    }
};

exports.deleteGuest = async function(id){
    // Delete the guest
    try{
        var deleted = await Guest.remove({_id: id});
        if(deleted.result.n === 0){
            throw Error("Guest Could not be deleted");
        }
        return deleted;
    }catch(e){
        throw Error("Error Occured while Deleting the Guest");
    }
};