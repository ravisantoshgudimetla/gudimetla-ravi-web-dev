
(function() {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.createPage = createPage;

        vm.uid = $routeParams["uid"];
        vm.wid = $routeParams["wid"];

        function createPage(name, title) {
            var id = (new Date).getTime();

            var newPage = {
                _id: id,
                name: name,
                websiteId: vm.wid,
                title: title
            };
            PageService.createPage(vm.wid, newPage);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
        }

    }
})();