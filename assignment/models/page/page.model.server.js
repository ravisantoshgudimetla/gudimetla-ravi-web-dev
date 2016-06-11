var mongoose = require("mongoose");

module.exports = function() {
    var PageSchema = require("./page.schema.server")();
    var Page = mongoose.model("Page", PageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage,
        addWidgetIdToPage: addWidgetIdToPage,
        removeWidgetIdFromPage: removeWidgetIdFromPage
    };

    return api;

    function addWidgetIdToPage(widgetId, pageId) {
        return Page.findOne({_id: pageId},
            function(err, doc) {
                doc.widgets.push(widgetId);
                doc.save();
            });
    }

    function removeWidgetIdFromPage(widgetId, pageId) {
        return Page.findOne({_id: pageId},
            function(err, doc) {
                doc.widgets.pull(widgetId);
                doc.save();
            });
    }

    function createPage(websiteId, page) {
        page._website = websiteId;
        return Page.create(page);
    }

    function findAllPagesForWebsite(websiteId) {
        return Page.find({_website: websiteId});
    }

    function findPageById(pageId) {
        return Page.findById(pageId);
    }

    function updatePage(pageId, page) {
        return Page.update(
            {_id: pageId},
            {$set :
            {
                name: page.name,
                title: page.title
            }
            }
        );
    }

    function deletePage(pageId) {
        return Page.remove({_id: pageId});
    }
};