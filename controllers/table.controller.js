
var TableService = require('../services/table.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getTables = async function(req, res, next){
    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 100; 

    try{
        var tables = await TableService.getTables({}, page, limit);
        
        // Return the Tables list with the appropriate HTTP Status Code and Message.
        return res.json(tables.docs);
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
        var table = await TableService.getTable(id);
        return res.json(table);
    }catch(e){
        //Return an Error Response Message with Code and the Error Message.
        return res.status(204).json(e.message);
    }
};

// Async Controller function to get the To do List
exports.getTablesBy = async function(req, res, next){
    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 10; 

    try{
        var params = {};
        if(req.params.evtId) {
            params.evtId = req.params.evtId;
        }

        var tables = await TableService.getTables(params, page, limit);
        
        // Return the events list with the appropriate HTTP Status Code and Message.
        return res.json(tables.docs);
        // return res.status(200).json({status: 200, data: events.docs, message: "Succesfully Events Recieved"});
    }catch(e){
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json(e.message);
    }
};

exports.createTable = async function(req, res, next){
    // Req.Body contains the form submit values.
    var table = req.body;
    try{
        // Calling the Service function with the new object from the Request Body
        var createdTable = await TableService.createTable(table);
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

    var table = req.body;
    console.log('table updated : '+table.category+' - '+table.loc);
    try{
        var updatedTable = await TableService.updateTable(table);
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