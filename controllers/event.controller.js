
var EventService = require('../services/event.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getEvents = async function(req, res, next){
    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 10; 

    try{	console.log("all");
        var events = await EventService.getEvents({}, page, limit);
        
        // Return the events list with the appropriate HTTP Status Code and Message.
        return res.json(events.docs);
        // return res.status(200).json({status: 200, data: events.docs, message: "Succesfully Events Recieved"});
    }catch(e){
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json(e.message);
    }
};

// Async Controller function to get the To do List
exports.getEventsBy = async function(req, res, next){
    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 10; 

    try{
        var params = {};
        if(req.params.ownerId) {
            params.owner = req.params.ownerId;
        }
        if(req.params.byId) {
            params.by = req.params.byId;
        }

        var events = await EventService.getEvents(params, page, limit);
        
        // Return the events list with the appropriate HTTP Status Code and Message.
        return res.json(events.docs);
        // return res.status(200).json({status: 200, data: events.docs, message: "Succesfully Events Recieved"});
    }catch(e){
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json(e.message);
    }
};

exports.createEvent = async function(req, res, next){
    // Req.Body contains the form submit values.
    var event = {
        name: req.body.name,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        guestNumber: req.body.guestNumber,
        by: req.body.by,
        where: req.body.where,
        bookerEmail: req.body.bookerEmail
    };

    try{
        // Calling the Service function with the new object from the Request Body
        var createdEvent = await EventService.createEvent(event);
        return res.json(createdEvent);
    }catch(e){        
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json("Event Creation failed : " + e.message);
    }
};

exports.updateEvent = async function(req, res, next){
    // Id is necessary for the update
    if(!req.body._id){
        return res.status(400).json("Id must be present");
    }

    var event = {
        _id : req.body._id || null,
        name: req.body.name || null,
        startDate: req.body.startDate || null,
        endDate: req.body.endDate || null,
        guestNumber: req.body.guestNumber || null,
        by: req.body.by || null,
        owner: req.body.owner || null,
        where: req.body.where || null,
        bookerEmail: req.body.bookerEmail || null
    };

    try{
        var updatedEvent = await EventService.updateEvent(event);
        return res.json(updatedEvent);
    }catch(e){
        return res.status(400).json("Event updating failed : " + e.message);
    }
};

exports.removeEvent = async function(req, res, next){
    var id = req.params.id;

    try{
        var deleted = await EventService.deleteEvent(id);
        return res.json("Succesfully Event Deleted");
    }catch(e){
        return res.status(400).json(e.message);
    }
};