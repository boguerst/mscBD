
var UserService = require('../services/user.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getUsers = async function(req, res, next){
    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 10; 

    try{
        var users = await UserService.getUsers({}, page, limit);
        
        // Return the users list with the appropriate HTTP Status Code and Message.
        return res.json(users.docs);
        // return res.status(200).json({status: 200, data: users.docs, message: "Succesfully Users Recieved"});
    }catch(e){
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json(e.message);
    }
};

// Async Controller function to get the To do List
exports.getUser = async function(req, res, next){
    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    var id = req.params.id;

    try{
        var user = await UserService.getUser(id);
        return res.json(user);
    }catch(e){
        //Return an Error Response Message with Code and the Error Message.
        return res.status(204).json(e.message);
    }
};

exports.login = async function(req, res, next){
    console.log("req body : ", req.body);
    var user = {
        email: req.body.email,
        password: req.body.password
    };

    try{
        var user = await UserService.login(req.body);
        return res.json(user);
    }catch(e){
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json(e.message);
    }
};

exports.createUser = async function(req, res, next){
    console.log("req body : ", req.body);
    console.log("req data : ", req.data);
    console.log("req headers : ", req.headers);
    // Req.Body contains the form submit values.
    var user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        role: req.body.role
    };

    try{
        // Calling the Service function with the new object from the Request Body
        var createdUser = await UserService.createUser(user);
        return res.json(createdUser);
    }catch(e){        
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json("User Creation was Unsuccesfull");
    }
};

exports.updateUser = async function(req, res, next){
    // Id is necessary for the update
    console.log(req.body);
    if(!req.body.id && !req.body._id){
        return res.status(400).json("Id must be present");
    }

    var id = req.body._id;
    var user = {
        id,
        firstName: req.body.firstName || null,
        lastName: req.body.lastName || null,
        email: req.body.email || null,
        password: req.body.password || null,
        phoneNumber: req.body.phoneNumber || null,
        role: req.body.role || null
    };

    try{
        var updatedUser = await UserService.updateUser(user);
        return res.json(updatedUser);
    }catch(e){
        return res.status(400).json(e.message);
    }
};

exports.removeUser = async function(req, res, next){
    var id = req.params.id;

    try{
        var deleted = await UserService.deleteUser(id);
        return res.json(deleted);
    }catch(e){
        return res.status(400).json(e.message);
    }
};