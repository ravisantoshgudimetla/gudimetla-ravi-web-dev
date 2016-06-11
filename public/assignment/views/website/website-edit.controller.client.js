(function() {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;
        vm.submitted = false;

        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;

        function init() {
            WebsiteService
                .findWebsiteById(vm.wid)
                .then(
                    function(response) {
                        vm.website = response.data;
                    },
                    function(error) {
                        vm.error = error.data;
                    });
        }
        init();

        function updateWebsite() {
            vm.submitted = true;
            if (vm.website.name && vm.website.name != "") {
                WebsiteService
                    .updateWebsite(vm.wid, vm.website)
                    .then(
                        function (res) {
                            vm.success = "Website successfully updated";
                            $location.url("/user/" + vm.uid + "/website");
                            vm.submitted = false;
                        },
                        function (error) {
                            vm.error = error.data;
                        }
                    )
            }
            else {
                vm.error = "Please Enter a Website Name";
            }
        }

        function deleteWebsite() {
            WebsiteService
                .deleteWebsite(vm.wid)
                .then(
                    function(res) {
                        vm.success = "Website successfully deleted";
                        $location.url("/user/"+ vm.uid + "/website");
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }
    }
})();