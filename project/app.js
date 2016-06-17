module.exports = function(app) {
    var models = require("./models/models.js")();
    require("./services/user.service.server.js")(app, models);
    require("./services/relation.service.server")(app, models);
};
