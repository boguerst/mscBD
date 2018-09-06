
var Event = require('../models/event.model');

// Saving the context of this module inside the _the variable
_this = this;

// Async function to get the To do List
exports.getEvents = async function(query, page, limit){
    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    };
    
    // Try Catch the awaited promise to handle the error 
    try {
        var events = await Event.paginate(query, options);
        // Return the event list that was retured by the mongoose promise
        return events;
    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating Events');
    }
};

exports.createEvent = async function(event){
    // Creating a new Mongoose Object by using the new keyword
    var newEvent = new Event({
        name: event.name,
        startDate: event.startDate,
        endDate: event.endDate,
        guestNumber: event.guestNumber,
        by: event.by,
        where: event.where,
        bookerEmail: event.bookerEmail,
        creationDate: new Date()
    });

    try{
        // Saving the Event 
        var savedEvent = await newEvent.save();
        return savedEvent;
    }catch(e){
        // return a Error message describing the reason     
        throw Error("Error while Creating Event")
    }
};

exports.updateEvent = async function(event){
    try{
        //Find the old Event Object by the Id
        var oldEvent = await Event.findById(event._id);
    }catch(e){
        throw Error("Error occured while Finding the Event");
    }
    
    // If no old Event Object exists return false
    if(!oldEvent){
        return false;
    }

    //Edit the Event Object
    oldEvent.name = event.name || oldEvent.name;
    oldEvent.startDate = event.startDate || oldEvent.startDate;
    oldEvent.endDate = event.endDate || oldEvent.endDate;
    oldEvent.guestNumber = event.guestNumber || oldEvent.guestNumber;
    oldEvent.by = event.by || oldEvent.by;
    oldEvent.owner = event.owner || oldEvent.owner;
    oldEvent.where = event.where || oldEvent.where;
    oldEvent.bookerEmail = event.bookerEmail || oldEvent.bookerEmail;
    try{
        var savedEvent = await oldEvent.save();
        return oldEvent;
    }catch(e){
        throw Error("And Error occured while updating the Event");
    }
};

exports.deleteEvent = async function(id){
    // Delete the event
    try{
        var deleted = await Event.remove({_id: id});
        if(deleted.result.n === 0){
            throw Error("Event Could not be deleted");
        }
        return deleted;
    }catch(e){
        throw Error("Error Occured while Deleting the Event");
    }
};