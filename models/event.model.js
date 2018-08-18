var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var EventSchema = new mongoose.Schema({
    name: String,
    startDate: String,
    endDate: String,
    guestNumber: Number,
    by: String,
    owner: String,
    where: String,
    creationDate: Date,
    bookerEmail: String
})

EventSchema.plugin(mongoosePaginate)
const Event = mongoose.model('Event', EventSchema)

module.exports = Event;