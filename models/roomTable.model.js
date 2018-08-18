var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');


var RoomTableSchema = new mongoose.Schema({
	roomId: String,
	key: Number,
	category: String,
    name: String,
    guests: String,
    loc: String
});

RoomTableSchema.plugin(mongoosePaginate);
const RoomTable = mongoose.model('RoomTable', RoomTableSchema);

module.exports = RoomTable;