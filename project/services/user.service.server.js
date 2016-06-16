var request = require("request");
module.exports = function(app, models) {
    var userModel = models.userModel;

    var users = [
        {
            _id: "123",
            username: "alice",
            password: "alice",
            firstName: "Alice",
            lastName: "Wonder",
            role: "normal",
            imageUrl: "http://lorempixel.com/400/200/"
        },
        {
            _id: "234",
            username: "bob",
            password: "bob",
            firstName: "Bob",
            lastName: "Marley",
            role: "normal",
            imageUrl: "http://lorempixel.com/400/200/"
        },
        {
            _id: "345",
            username: "charly",
            password: "charly",
            firstName: "Charly",
            lastName: "Garcia",
            role: "normal",
            imageUrl: "http://lorempixel.com/400/200/"
        },
        {
            _id: "456",
            username: "jannunzi",
            password: "jannunzi",
            firstName: "Jose",
            lastName: "Annunzi",
            role: "normal",
            imageUrl: "http://lorempixel.com/400/200/"
        },
        {
            _id: "b1fd98b0-50a4-470f-ac01-80fea5cc30d2",
            username: "ravi",
            password: "ravi",
            firstName: "ravi",
            lastName: "gudimetla",
            role: "admin",
            imageUrl: "http://lorempixel.com/400/200/"
        }
    ];
    var api_base_url = "https://api.projectoxford.ai/face/v1.0/";
    var api_group_name = "samplegroup";
    var api_person_base_url = api_base_url + "persongroups/" + api_group_name;
    var subscription_key = '0a6cc165c1b5415e963541ce642be658';

    app.get("/project/user/get_images", getUserByImage);
    app.get("/project/api/user/:userId", findUserById);
    app.get("/project/api/user", getUsers);
    app.post("/project/api/user", createUser);
    app.put("/project/api/user/:userId", updateUser);
    //app.get("/project/home/user/:userId", getUser);
    app.delete("/project/api/user/:userId", deleteUser);
    app.put("/project/homepage/user/:userId", updateUserFollower);
    //app.get("/project/api/admin/listusers, listUsers");

    function getUserByImage(req, res) {
        var imageurl = req.query['imageurl'];
        //console.log(imageurl)
        createUserFace(imageurl, res)
        //res.sendStatus(402)
    }

    function createUserFace(imageurl, res) {
        //console.log("hello world")
        api_url = api_base_url + "detect?returnFaceId=true&returnFaceLandmarks=false";
        //console.log(api_url)
        //console.log(imageurl)
        request({
            url: api_url,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': subscription_key
            },
            json: {
                url: imageurl

            }

        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //DB insertion happens here.
                //console.log(response);
                console.log(body)
                console.log(body[0].faceId)
                facialSearch(body[0].faceId, res); // Show the HTML for the Google homepage.
            }
            else {
                //console.log(error)
            }
        })
    }

    function facialSearch(faceId, res) {
        request({
            url: api_base_url + "identify",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': subscription_key
            },
            json: {
                personGroupId: api_group_name,
                faceIds: [faceId],
                maxNumOfCandidatesReturned: 1
            }
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //DB insertion happens here.
                //console.log(body)
                console.log(body[0].candidates[0].personId)
                userId = body[0].candidates[0].personId;
                //userId = body[0]
                console.log(userId);
                userModel
                    .findUserByAPIId(userId)
                    .then(
                        function (user) {
                            //console.log(user)
                            res.send(user);
                        },
                        function (error) {
                            res.status(404).send("User not found");
                        });

                // for(var i in users) {
                //     //console.log(body.candidates[0].personId)
                //     if(users[i]._id === userId) {
                //         res.send(users[i])
                //         return;
                //     }
                // }
                //res.status(404).send("User not found");  // Show the HTML for the Google homepage.
            }
        })
    }

    function userCreateInAPIServer(newUser, res) {
        // var newUser = req.body;

        request({
            url: api_person_base_url + '/persons',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': subscription_key
            },
            json: {
                name: newUser.username
            }

        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //console.log(body);
                face_create(body.personId, newUser, res); // Show the HTML for the Google homepage.
            }
        })
        //newUser._id = (new Date()).getTime() + "";
        //users.push(newUser);
    }

    function face_create(personid, newUser, res) {
        imageurl = newUser.imageurl;
        console.log(personid)
        console.log(imageurl)
        //console.log(api_person_base_url + '/' + personid + '/persistedFaces')
        request({
            url: api_person_base_url + '/persons/' + personid + '/persistedFaces',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': subscription_key
            },
            json: {
                url: imageurl
            }
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                console.log(body.persistedFaceId)
                newUser.apiId = personid;
                //DB insertion happens here.
                userModel
                    .createUser(newUser)
                    .then(
                        function (user) {
                            trainPersonGroup(); //Making an ansyncronous call here as we don't need this.
                            res.json(user);
                        },
                        function (error) {
                            console.log(error);
                            res.status(400).send("Unable to create new user: " + newUser.username);
                        }
                    );

                //res.json(newUser);
            }
            else {
                console.log(body)
            }
        })
    }

    //Ansyncronous call as we don't need it during user creation.
    function trainPersonGroup() {
        request({
            url: api_person_base_url + '/train',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': subscription_key
            }
        }, function (error, response, body) {
            if (!error && response.statusCode == 202) {
                console.log(body);
                //face_create(body.personId, newUser, res); // Show the HTML for the Google homepage.
            }
            else {
                console.log(body);
            }
        })

    }


    function createUser(req, res) {
        var newUser = req.body;
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    if (!user) {
                        userCreateInAPIServer(newUser, res)
                    }
                    else {
                        res.status(400).send("Username " + newUser.username + " is already in use");
                    }
                },
                function (error) {
                    res.status(400).send(error);
                }
            )
    }

    function deleteUserAPI(userId) {
        request({
            url: api_person_base_url + '/persons/' + userId,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': subscription_key
            }
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                //face_create(body.personId, newUser, res); // Show the HTML for the Google homepage.
            }
            else {
                console.log(body);
            }
        })


    }


    function deleteUser(req, res) {
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then(
                function (user) {
                    deleteUserAPI(user.apiId.toString());
                    userModel
                        .deleteUser(userId)
                        .then(
                            function (status) {
                                res.sendStatus(200);
                            },
                            function (error) {
                                res.status(404).send("Unable to remove user with ID " + userId);
                            }
                        );
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;
        userModel
            .updateUser(userId, newUser)
            .then(
                function (user) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.status(404).send("Unable to update user with ID " + userId);
                }
            );
    }

    function getUsers(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if (username && password) {
            findUserByCredentials(req, username, password, res);
        }
        else if (username) {
            findUserByUsername(req, username, res);
        }
        else {
            res.send(users);
        }
    }

    function findUserByCredentials(req, username, password, res) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    if (user) {
                        //console.log(user)
                        req.session.userId = user._id;
                        console.log(req.session.userId)
                        res.json(user);
                    }
                    else {
                        res.status(403).send("Username and Password Not Found");
                    }
                },
                function (error) {
                    res.status(403).send("Unable to login");
                }
            );
    }


    function findUserById(req, res) {
        var userId = req.params.userId;
        userModel.findUserById(userId)
            .then(
                function (user) {
                    console.log(req.session.userId)
                    res.send(user);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }

    function findUserByUsername(req, username, res) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    req.session.userId = user._id;
                    res.json(user);
                },
                function (error) {
                    res.status(400).send("User with username " + username + " not found");
                }
            );
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        userModel.findUserById(userId)
            .then(
                function (user) {
                    //req.session.userId = user._id;
                    res.send(user);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }

    function updateUserFollower(req, res){
        console.log(req.session.userId);
        console.log(req.params.userId);
        userModel.updateUserFollows(req.params.userId, req.session.userId)
            .then(function(newUser){
                userModel.updateUserFollowing(req.session.userId, req.params.userId)
                    .then(function(FollowUser){
                        console.log(FollowUser);
                        //res.json()
                        res.json(newUser)
                    },function(error){
                        res.send(400)
                    })
            },function(error){
                res.send(404)
            })
        }

    //console.log(req.session.userId)
}