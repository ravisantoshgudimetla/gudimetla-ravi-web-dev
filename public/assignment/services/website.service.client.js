(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];

    function PageService() {

        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;

        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            pages.push(page)
        }

        function findPageByWebsiteId(websiteId) {
            var result = [];
            for(var i in pages) {
                if(pages[i].websiteId === websiteId) {
                    result.push(pages[i]);
                }
            }
            return result;
        }

        function findPageById(pageId) {
            for(var i in pages) {
                if(pages[i]._id == pageId) {
                    return pages[i];
                }
            }
            return null;
        }

        function updatePage(pageId, page) {
            for(var i in pages) {
                if(pages[i]._id == pageId) {
                    pages[i].name = page.name;
                    pages[i].title = page.title;
                }
            }
        }

        function deletePage(pageId) {
            for(var i in pages) {
                if (pages[i]._id == pageId) {
                    pages.splice(i, 1);
                }
            }
        }
    }
})();
