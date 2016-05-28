(function() {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController(PageService, $location, $routeParams) {
        var vm = this;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;

        function init() {
            vm.page = angular.copy(PageService.findPageById(vm.pid));
        }
        init();

        function updatePage() {
            PageService.updatePage(vm.pid, vm.page);
            $location.url("/user/"+ vm.uid + "/website/" + vm.wid + "/page");
        }

        function deletePage() {
            PageService.deletePage(vm.pid);
            $location.url("/user/"+ vm.uid + "/website/" + vm.wid + "/page");
        }

    }
})();

