(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        function init() {
            WebsiteService
                .findWebsitesByUser(vm.uid)
                .then(
                    function(response) {
                        vm.websites = response.data;
                    },
                    function(error) {
                        vm.error = error.data;
                    });
        }
        init();
    }
})();