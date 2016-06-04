module.exports = function(app) {
    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, res) {
        var newWebsite = req.body;
        newWebsite._id = (new Date()).getTime() + "";
        websites.push(newWebsite);
        res.send(200);
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;

        var result = [];
        for(var i in websites) {
            if(websites[i].developerId === userId) {
                result.push(websites[i]);
            }
        }
        res.send(result);
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        for(var i in websites) {
            if(websites[i]._id === websiteId) {
                res.json(websites[i]);
                return;
            }
        }
        res.status(400).send("Website with ID " + websiteId + " not found");
    }

    function updateWebsite(req, res) {
        var website = req.body;
        var websiteId = req.params.websiteId;

        for(var i in websites) {
            if(websites[i]._id === websiteId) {
                websites[i].name = website.name;
                websites[i].description = website.description;
                res.sendStatus(200);
                return true;
            }
        }
        res.status(400).send("Website with ID " + websiteId + " not found");
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        for(var i in websites) {
            if(websites[i]._id === websiteId) {
                websites.splice(i, 1);
                res.sendStatus(200);
                return true;
            }
        }
        res.status(404).send("Unable to remove website with ID " + websiteId);
    }
};
