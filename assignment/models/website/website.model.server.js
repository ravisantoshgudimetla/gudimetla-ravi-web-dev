var mongoose = require("mongoose");

module.exports = function() {
    var WebsiteSchema = require("./website.schema.server")();
    var Website = mongoose.model("Website", WebsiteSchema);

    var api = {
        createWebsite: createWebsite,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        addPageIdToWebsite: addPageIdToWebsite,
        removePageIdFromWebsite: removePageIdFromWebsite
    };

    return api;

    function addPageIdToWebsite(pageId, websiteId) {
        return Website.findOne({_id: websiteId},
            function(err, doc) {
                doc.pages.push(pageId);
                doc.save();
            });
    }

    function removePageIdFromWebsite(pageId, websiteId) {
        return Website.findOne({_id: websiteId},
            function(err, doc) {
                doc.pages.pull(pageId);
                doc.save();
            });
    }

    function createWebsite(userId, website) {
        website._user = userId;
        return Website.create(website);
    }

    function findAllWebsitesForUser(userId) {
        return Website.find({_user: userId});
    }

    function findWebsiteById(websiteId) {
        return Website.findById(websiteId);
    }

    function updateWebsite(websiteId, website) {
        return Website.update(
            {_id: websiteId},
            {$set :
            {
                name: website.name,
                description: website.description
            }
            }
        );
    }

    function deleteWebsite(websiteId) {
        return Website.remove({_id: websiteId});
    }
};