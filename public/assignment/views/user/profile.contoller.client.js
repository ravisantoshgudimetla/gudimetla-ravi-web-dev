(function() {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.unRegister = unRegister;

        var uid = $routeParams["uid"];

        function init() {
            UserService
                .findUserById(uid)
                .then(function(res) {
                    vm.user = res.data
                })
        }
        init();

        function updateUser() {
            UserService
                .updateUser(uid, vm.user)
                .then(
                    function(res) {
                        vm.success = "User successfully updated";
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }

        function unRegister() {
            UserService
                .deleteUser(uid)
                .then(
                    function(response) {
                        $location.url("/login");
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }
    }

})();