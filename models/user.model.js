var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    phoneNumber: String,
    role: String,
    creationDate: Date
})

UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('User', UserSchema)

module.exports = User;