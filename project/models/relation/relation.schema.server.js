 module.exports = function() {
var mongoose = require("mongoose");

var RelationSchema = mongoose.Schema({
    followerId: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}],
    followingId: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}]
}, {collection: "project.relation"});
     
  //RelationSchema.index({followerId: 1, followingId: 1}, { unique: true});

return RelationSchema;
};