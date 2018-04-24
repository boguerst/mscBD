var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var GuestSchema = new mongoose.Schema({
    name: String,
    firstName: String,
    evtId: String
});

GuestSchema.plugin(mongoosePaginate);
const Guest = mongoose.model('Guest', GuestSchema);

module.exports = Guest;