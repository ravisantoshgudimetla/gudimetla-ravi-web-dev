module.exports = function() {

    //var mongoose = require('mongoose');
    //mongoose.connect()
    var userModel = require("./user/user.model.server.js")();
    var relationModel = require("./relation/relation.model.server.js")();
   
    var models = {
        userModel: userModel,
        relationModel: relationModel
    };
    return models;
};