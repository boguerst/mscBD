var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');


var RoomSchema = new mongoose.Schema({
    name: String,
    surface: Number,
    volume: Number,
    shape: Number,
    address: String,
    phoneNumber: String,
    manager: String,
    creationDate: Date
});

RoomSchema.plugin(mongoosePaginate);
const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;