
var TableService = require('../services/table.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getTables = async function(req, res, next){
    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 100; 

    try{
        var Tables = await TableService.getTables({}, page, limit);
        
        // Return the Tables list with the appropriate HTTP Status Code and Message.
        return res.json(Tables.docs);
        // return res.status(200).json({status: 200, data: Tables.docs, message: "Succesfully Tables Recieved"});
    }catch(e){
        //Return an Error Response Message with Code and the Error Message.
        return res.json(e.message);
    }
};

// Async Controller function to get the To do List
exports.getTable = async function(req, res, next){
    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    var id = req.params.id;

    try{
        var Table = await TableService.getTable(id);
        return res.json(Table);
    }catch(e){
        //Return an Error Response Message with Code and the Error Message.
        return res.status(204).json(e.message);
    }
};

exports.createTable = async function(req, res, next){
    // Req.Body contains the form submit values.
    /*var Table = {
        roomId: req.body.roomId,
        key: req.body.key,
        category: req.body.category,
        name: req.body.name,
        guests: req.body.guests,
        loc: req.body.loc
    };*/
    var Table = req.body;

    try{
        // Calling the Service function with the new object from the Request Body
        var createdTable = await TableService.createTable(Table);
        return res.json(createdTable);
    }catch(e){        
        //Return an Error Response Message with Code and the Error Message.
        return res.status(204).json("Error Table Creation "+e.message);
    }
};

exports.updateTable = async function(req, res, next){
    // Id is necessary for the update
    if(!req.body._id){
        return res.status(400).json("Id must be present");
    }

    /*var Table = {
        req.body._id,
        roomId: req.body.roomId || null,
        key: req.body.key || null,
        category: req.body.category || null,
        name: req.body.name || null,
        guests: req.body.guests || null,
        loc: req.body.loc || null
    };*/
    var Table = req.body;

    try{
        var updatedTable = await TableService.updateTable(Table);
        return res.json(updatedTable);
    }catch(e){
        return res.status(204).json(e.message);
    }
};

exports.removeTable = async function(req, res, next){
    var id = req.params.id;

    try{
        var deleted = await TableService.deleteTable(id);
        return res.status(204).json(deleted);
    }catch(e){
        return res.status(400).json(e.message);
    }
};