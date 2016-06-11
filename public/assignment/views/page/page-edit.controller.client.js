(function() {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController(PageService, $location, $routeParams) {
        var vm = this;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;
        vm.submitted = false;

        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;

        function init() {
            PageService
                .findPageById(vm.pid)
                .then(
                    function(response) {
                        vm.page = response.data;
                    },
                    function(error) {
                        vm.error = error.data;
                    });
        }
        init();

        function updatePage() {
            vm.submitted = true;
            if (vm.page.name && vm.page.name != "") {
                PageService
                    .updatePage(vm.pid, vm.page)
                    .then(
                        function (response) {
                            vm.success = "Page successfully updated";
                            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
                            vm.submitted = false;
                        },
                        function (error) {
                            vm.error = error.data;
                        }
                    )
            }
            else {
                vm.error = "Please Enter a Page Name";
            }
        }

        function deletePage() {
            PageService
                .deletePage(vm.pid)
                .then(
                    function(response) {
                        vm.success = "Page successfully deleted";
                        $location.url("/user/"+ vm.uid + "/website/" + vm.wid + "/page");
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }

    }
})();