var request = require("request");
module.exports = function(app) {
    
    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder",    role: "normal"},
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley",    role: "normal"},
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia",    role: "normal"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi",   role: "normal"},
        {_id: "789", username: "ravi",     password: "ravi",     firstName: "ravi",   lastName: "gudimetla", role: "admin"}
    ];
    var api_base_url = 'https://api.projectoxford.ai/face/v1.0/persongroups/samplegroup';
    var subscription_key = '0a6cc165c1b5415e963541ce642be658';

    app.get("/project/api/user/:userId", findUserById);
    app.get("/project/api/user", getUsers);
    app.post("/project/api/user", createUser);
    app.put("/project/api/user/:userId", updateUser);
    //app.delete("/api/user/:userId", deleteUser);
    app.get("/project/api/admin/listusers, listUsers");
    
    
    function listUsers(req, res){
        res.send(users);
    }

    function createUser(req, res) {
        var newUser = req.body;

        for(var i in users) {
            if(users[i].username === newUser.username) {
                res.status(400).send("Username " + newUser.username + " is already in use");
                return;
            }
        }
        
        request({
            url: api_base_url+'/persons',
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Ocp-Apim-Subscription-Key' : subscription_key
            },
            json:{
                name : newUser.username

            }

        }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                //DB insertion happens here.
                console.log(body)
                face_create(body.personId, newUser.imageurl); // Show the HTML for the Google homepage.
            }
        })
        newUser._id = (new Date()).getTime() + "";
        users.push(newUser);
        res.json(newUser);
    }

    function face_create(personid,imageurl){
        console.log(personid)
        console.log(imageurl)
        //console.log(api_base_url + '/' + personid + '/persistedFaces')
        request({
            url: api_base_url+'/persons/'+personid+'/persistedFaces',
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
                console.log(body); // Show the HTML for the Google homepage.
            }
            else{
                console.log(body)
            }
        })
    }






    function deleteUser(req, res) {
        var id = req.params.userId;
        for(var i in users) {
            if(users[i]._id === id) {
                users.splice(i, 1);
                res.sendStatus(200);
                return true;
            }
        }
        res.status(404).send("Unable to remove user with ID " + id);
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var newUser = req.body;
        for(var i in users) {
            if(users[i]._id == id) {
                users[i].firstName = newUser.firstName;
                users[i].lastName = newUser.lastName;
                users[i].email = newUser.email;
                res.sendStatus(200);
                return true;
            }
        }
        res.status(400).send("User with ID " + id + " not found");
    }

    function getUsers(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if(username && password) {
            findUserByCredentials(username, password, res);
        }
        else if (username) {
            findUserByUsername(username, res);
        }
        else {
            res.send(users);
        }
    }

    function findUserByCredentials(username, password, res) {
        for(var u in users) {
            if(users[u].username === username && users[u].password === password) {
                res.send(users[u]);
                return;
            }
        }
        res.sendStatus(403);
    }

    function findUserByUsername(username, res) {
        for(var u in users) {
            if(users[u].username === username) {
                res.send(users[u]);
                return;
            }
        }
        res.status(400).send("User with username " + username + " not found");
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        for(var i in users) {
            if(users[i]._id === userId) {
                res.send(users[i]);
                return;
            }
        }
        res.status(400).send("User with ID " + userId + " not found");
    }
};
