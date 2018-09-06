var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var GuestSchema = new mongoose.Schema({
    name: String,
    firstName: String,
    phoneNumber: String,
    email: String,
    address: String,
    comment: String,
    evtId: String,
    table: String,
    seat: String,
    loc: String
});

GuestSchema.plugin(mongoosePaginate);
const Guest = mongoose.model('Guest', GuestSchema);

module.exports = Guest;