
var Table = require('../models/table.model');

// Saving the context of this module inside the _the variable
_this = this;

// Async function to get the To do List
exports.getTables = async function(query, page, limit){
    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    };
    
    // Try Catch the awaited promise to handle the error 
    try {
        var Tables = await Table.paginate(query, options);
        // Return the Table list that was retured by the mongoose promise
        return Tables;
    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating Tables');
    }
};

// Async function to get the To do List
exports.getTable = async function(id){
    // Try Catch the awaited promise to handle the error 
    try {
        return await Table.findOne({_id: id});
    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while finding the Table : ' + id);
    }
};

exports.createTable = async function(Table){
    // Creating a new Mongoose Object by using the new keyword
    var newTable = new Table({
        roomId: Table.roomId,
        key: Table.key,
        category: Table.category,
        name: Table.name,
        guests: Table.guests,
        loc: Table.loc
    });

    try{
        // Saving the Table 
        var savedTable = await newTable.save();
        return savedTable;
    }catch(e){
        // return a Error message describing the reason     
        throw Error("Error while Creating Table")
    }
};

exports.updateTable = async function(Table){
    try{
        //Find the old Table Object by the Id
        var oldTable = await Table.findById(Table._id);
        return oldTable;
    }catch(e){
        throw Error("Error occured while Finding the Table");
    }

    // If no old Table Object exists return false
    if(!oldTable){
        return false;
    }

    //Edit the Table Object
    oldTable.roomId = Table.roomId;
    oldTable.key = Table.key;
    oldTable.category = Table.category;
    oldTable.name = Table.name;
    oldTable.guests = Table.guests;
    oldTable.loc = Table.loc;
    try{
        var savedTable = await oldTable.save();
        return savedTable;
    }catch(e){
        throw Error("And Error occured while updating the Table");
    }
};

exports.deleteTable = async function(id){
    // Delete the Table
    try{
        var deleted = await Table.remove({_id: id});
        if(deleted.result.n === 0){
            throw Error("Table Could not be deleted");
        }
        return deleted;
    }catch(e){
        throw Error("Error Occured while Deleting the Table");
    }
};