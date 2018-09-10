var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var TableSchema = new mongoose.Schema({
	key: Number,
	category: String,
    name: String,
    loc: String,
    evtId: String
});

TableSchema.plugin(mongoosePaginate);
const Table = mongoose.model('Table', TableSchema);

module.exports = Table;