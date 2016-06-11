module.exports = function(app, models) {

    var websiteModel = models.websiteModel;
    var userModel = models.userModel;

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
        var userId = req.params.userId;
        var newWebsite = req.body;

        websiteModel
            .createWebsite(userId, newWebsite)
            .then(
                function(website) {
                    var websiteId = website._id;
                    userModel
                        .addWebsiteIdToUser(websiteId, userId)
                        .then(
                            function(response) {
                                res.json(website);
                            },
                            function(error) {
                                res.status(400).send(error);
                            }
                        );
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;

        websiteModel
            .findAllWebsitesForUser(userId)
            .then(
                function(websites) {
                    res.json(websites);
                },
                function(error) {
                    res.status(404).send(error);
                }
            );
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;

        websiteModel
            .findWebsiteById(websiteId)
            .then(
                function(website) {
                    res.json(website);
                },
                function(error) {
                    res.status(404).send(error);
                }
            );
    }

    function updateWebsite(req, res) {
        var website = req.body;
        var websiteId = req.params.websiteId;

        websiteModel
            .updateWebsite(websiteId, website)
            .then(
                function(website) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.status(404).send("Unable to update website with ID " + websiteId);
                }
            );
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;

        websiteModel
            .findWebsiteById(websiteId)
            .then(
                function(website) {
                    var userId = website._user;

                    return userModel
                        .removeWebsiteIdFromUser(websiteId, userId)
                },
                function(error) {
                    res.status(404).send("Unable to remove website ID " + websiteId + " from user");
                }
            ).then(
            function(status) {
                return websiteModel
                    .deleteWebsite(websiteId)
            },
            function(error) {
                res.status(404).send("Unable to delete website " + websiteId);
            }
        ).then(
            function(status) {
                res.sendStatus(200);
            },
            function(error) {
                res.status(404).send("Unable to remove website with ID " + websiteId);
            }
        )
    }
};