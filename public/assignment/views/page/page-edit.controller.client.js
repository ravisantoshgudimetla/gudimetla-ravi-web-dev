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
            //vm.page = angular.copy(PageService.findPageById(vm.pid));
            PageService
                .findPageById(vm.pid)
                .then(
                    function(response){
                        vm.page = response.data;
                    },
                    function(error){
                        vm.error = error.data;
                    });
        }
        init();

        function updatePage() {
            PageService
                .updatePage(vm.pid, vm.page)
                .then(
                    function(response){
                        vm.success = "Page successfully updated";
                        $location.url("/user/"+ vm.uid + "/website/" + vm.wid + "/page");
                    },
                    function(error){
                        vm.error = error.data;
                    });
        }

        function deletePage() {
            PageService
                .deletePage(vm.pid)
                .then(
                    function(response){
                        vm.success = "Page deleted successfully";
                        $location.url("/user/"+ vm.uid + "/website/" + vm.wid + "/page");
                    },
                    function(error){
                        vm.error = error.data
                    }
                );
            }
        }
})();

