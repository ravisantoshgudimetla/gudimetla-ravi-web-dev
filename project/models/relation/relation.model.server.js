module.exports = function() {

    var mongoose = require("mongoose");

    var RelationSchema = require("./relation.schema.server.js")();
    var Relation = mongoose.model("ProjectRelation", RelationSchema);

    var api = {
        createRelation: createRelation,
        findFollowersById: findFollowersById,
        deleteRelation: deleteRelation,
        findFollowingById: findFollowingById,
        findRelationship:findRelationship
    };
    
    return api;

    function createRelation(relation) {
        return Relation.create(relation)
    }

    function deleteRelation(FollowerId) {
        return Relation.remove({followerId: FollowerId});
    }
    
    function findFollowersById(userId){
        return Relation.find({followerId: userId});
    }
    
    function findFollowingById(userId){
        return Relation.find({followingId: userId});
    }
    
    function findRelationship(followerId, followingId){
        return Relation.count({followerId: followerId, followingId: followingId})
    }
};