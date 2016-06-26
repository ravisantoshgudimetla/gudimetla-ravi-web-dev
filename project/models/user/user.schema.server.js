 module.exports = function() {
var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    role: String,
    email: String,
    phone: String,
    apiId: String,
    imageurl: String,//URL of the image, as there is no need to store the image
    dateCreate: {type: Date, default: Date.now()},
    facebook: {
        id:     String,
        token:  String,
        displayName: String
    },
    Description: String,
    dateUpdated: Date
}, {collection: "project.user"});

return UserSchema;
};