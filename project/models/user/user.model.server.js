module.exports = function() {

    var mongoose = require("mongoose");

    var UserSchema = require("./user.schema.server")();
    var User = mongoose.model("ProjectUser", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUserByAPIId:findUserByAPIId,
        updateUser: updateUser,
        deleteUser: deleteUser,
        addWebsiteIdToUser: addWebsiteIdToUser,
        removeWebsiteIdFromUser: removeWebsiteIdFromUser,
        updateUserFollows:updateUserFollows,
        updateUserFollowing: updateUserFollowing
    };
    return api;

    function addWebsiteIdToUser(websiteId, userId) {
        return User.findOne({_id: userId},
            function(err, doc) {
                doc.websites.push(websiteId);
                doc.save();
            });
    }

    function removeWebsiteIdFromUser(websiteId, userId) {
        return User.findOne({_id: userId},
            function(err, doc) {
                doc.websites.pull(websiteId);
                doc.save();
            });
    }

    function createUser(user) {
        return User.create(user);
    }

    function findUserById(userId) {
        return User.findById(userId);
    }

    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }

    function findUserByUsername(username) {
        return User.findOne({username: username});
    }
    
    function findUserByAPIId(apiId){
        //console.log(User.findOne({apiId:apiId}));
        return User.findOne({apiId:apiId});
    }

    function updateUser(userId, newUser) {
        return User.update(
            {_id: userId},
            {$set :
            {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email
            }
            }
        )
    }

    function updateUserFollowing(userId, followsID) {
        return User.update(
            {_id: userId},
            {$set :
            {
                following: followsID
            }
            }
        )
    }

    function updateUserFollows(userId, followerID) {
        return User.update(
            {_id: userId},
            {$set :
            {
                follows: followerID
            }
            }
        )
    }

    function deleteUser(userId) {
        return User.remove({_id: userId});
    }
};