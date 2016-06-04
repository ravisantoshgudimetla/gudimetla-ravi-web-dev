(function() {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.createWebsite = createWebsite;

        vm.uid = $routeParams["uid"];

        function createWebsite(name, description) {
            if (name != null) {
                var id = (new Date).getTime();

                var newWebsite = {
                    name: name,
                    developerId: vm.uid,
                    description: description
                };

                WebsiteService
                    .createWebsite(vm.uid, newWebsite)
                    .then(
                        function(response) {
                            vm.success = "Created new website";
                            $location.url("/user/" + vm.uid + "/website");
                        },
                        function(error) {
                            vm.error = error.data;
                        }
                    )
            }
            else {
                vm.error = "Please Enter a Website Name";
            }
        }

    }
})();