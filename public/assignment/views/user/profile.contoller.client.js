(function() {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $rootScope, $routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.unRegister = unRegister;
        vm.logout = logout;

        var uid = $routeParams["uid"];

        function init() {
            if(!uid && $rootScope.currentUser) {
                vm.user = $rootScope.currentUser;
            }
            else {
                UserService
                    .findUserById(uid)
                    .then(function (res) {
                        vm.user = res.data
                    })
            }
        }
        init();

        function logout() {
            $rootScope.currentUser = null;

            UserService
                .logout()
                .then(
                    function(response) {
                        $location.url("/login");
                    },
                    function(error) {
                        $location.url("/login");
                    }
                )
        }

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