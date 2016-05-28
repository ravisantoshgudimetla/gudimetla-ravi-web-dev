(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        function init() {

            vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
        }
        init();
    }
})();