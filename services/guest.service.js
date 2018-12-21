
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
        return await Guest.paginate(query, options);
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
    try{
        // Saving the Guest 
        return await newGuest.save();
    }catch(e){
        // return a Error message describing the reason     
        throw Error("Error while Creating Guest")
    }
};

exports.updateGuest = async function(guest){
    try{
        //Find the old Guest Object by the Id
        var oldGuest = await Guest.findById(guest._id);
    }catch(e){
        throw Error("Error occured while Finding the Guest");
    }

    // If no old Guest Object exists return false
    if(!oldGuest){
        return false;
    }

    try{
        //Edit the Table Object
        oldGuest.title = guest.title;
        oldGuest.name = guest.name;
        oldGuest.firstName = guest.firstName;
        oldGuest.phoneNumber = guest.phoneNumber;
        oldGuest.email = guest.email;
        oldGuest.address = guest.address;
        oldGuest.comment = guest.comment;
        oldGuest.evtId = guest.evtId;
        oldGuest.table = guest.table ? guest.table : null;
        oldGuest.seat = guest.seat ? guest.seat : null;
        oldGuest.loc = guest.loc ? guest.loc : null;

    	return await Guest.update({_id: guest._id}, oldGuest, {upsert:true});
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