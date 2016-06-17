//var request = require("request");
module.exports = function(app, models) {
    var relationModel = models.relationModel;
    app.post("/project/api/user/relationship/:userId", createRelation);
    app.get("/project/api/user/followers/:userId" , getFollowers);
    app.get("/project/api/user/following/:userId" , getFollowing);

    function getFollowers(req, res){
        followingId = req.params.userId;
        console.log("hi");
        console.log(followingId)
        relationModel   
            .findFollowingById(followingId)
            .then(function(userIds) {
                res.json(userIds)
            },function(error){
                res.send(404)
            })
    }

    function getFollowing(req, res){
        followingId = req.params.userId;
        console.log("hi");
        console.log(followingId)
        relationModel
            .findFollowersById(followingId)
            .then(function(userIds) {
                console.log(userIds)
                res.json(userIds)
            },function(error){
                res.send(404)
            })
    }

    function createRelation(req, res) {
        console.log(req.session.userId);
        console.log(req.params.userId);
        var relation = {
            followerId: req.session.userId,
            followingId: req.params.userId
        };
        if(null != req.session.userId && (req.session.userId !== req.params.userId)){
            relationModel
                .findRelationship(req.session.userId, req.params.userId)
                .then(function (count) {
                    if (count == 0) {
                        console.log(count)
                        relationModel.createRelation(relation)
                        res.status(200)
                    }
                    else{
                        res.status(400).send('Relationship already exists')
                    }
                },function(error){
                    res.status(400).send('Relationship already exists')
                })}
                    else {
                        //res.status(400)
                        res.status(400).send('Relationship already exists')
                    }
                }
            // console.log(count)
            // if (count==0) {
            //     relationModel.createRelation(relation)
            //     res.status(200)
            //
            // }
            // else{
            //     res.status(400).send('This user is already being following');
            // }

    }

