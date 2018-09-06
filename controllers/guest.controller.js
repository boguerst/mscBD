
var GuestService = require('../services/guest.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getGuests = async function(req, res, next){
    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 100; 

    try{
        var guests = await GuestService.getGuests(req.query, page, limit);
        
        // Return the guests list with the appropriate HTTP Status Code and Message.
        return res.json(guests.docs);
        // return res.status(200).json({status: 200, data: guests.docs, message: "Succesfully Guests Recieved"});
    }catch(e){
        //Return an Error Response Message with Code and the Error Message.
        return res.json(e.message);
    }
};

// Async Controller function to get the To do List
exports.getGuest = async function(req, res, next){
    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    var id = req.params.id;

    try{
        var guest = await GuestService.getGuest(id);
        return res.json(guest);
    }catch(e){
        //Return an Error Response Message with Code and the Error Message.
        return res.status(204).json(e.message);
    }
};

exports.createGuest = async function(req, res, next){
    // Req.Body contains the form submit values.
    var guest = req.body;

    try{
        // Calling the Service function with the new object from the Request Body
        var createdGuest = await GuestService.createGuest(guest);
        return res.json(createdGuest);
    }catch(e){        
        //Return an Error Response Message with Code and the Error Message.
        return res.status(204).json("Error guest Creation "+e.message);
    }
};

exports.updateGuest = async function(req, res, next){
    // Id is necessary for the update
    if(!req.body._id){
        return res.status(400).json("Id must be present");
    }

    var id = req.body._id;
    /*var guest = {
        id,
        name: req.body.name || null,
        firstName: req.body.firstName || null,
        position: req.body.position || null,
        phoneNumber: req.body.phoneNumber || null,
        email: req.body.email || null,
        address: req.body.address || null,
        comment: req.body.comment || null
    };*/
    var guest = req.body;

    try{
        var updatedGuest = await GuestService.updateGuest(guest);
        return res.json(updatedGuest);
    }catch(e){
        return res.status(204).json(e.message);
    }
};

exports.removeGuest = async function(req, res, next){
    var id = req.params.id;

    try{
        var deleted = await GuestService.deleteGuest(id);
        return res.status(204).json(deleted);
    }catch(e){
        return res.status(400).json(e.message);
    }
};