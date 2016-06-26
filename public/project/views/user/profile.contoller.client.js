(function() {
    angular
        .module("FotoTag")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams,$rootScope, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.unRegister = unRegister;
        vm.logout = logout;

        var uid = $routeParams["uid"];

        function init() {
            if (!uid && $rootScope.currentUser) {
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
                    function (response) {
                        $location.url("/login");
                    },
                    function (error) {
                        $location.url("/login");
                    }
                )
        }

        function updateUser() {
            UserService
                .updateUser(vm.user._id, vm.user)
                .then(
                    function (res) {
                        vm.success = "User successfully updated";
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                )
        }

        function unRegister() {
            UserService
                .deleteUser(vm.user._id)
                .then(
                    function (response) {
                        $location.url("/login");
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                )
        }
    }
})();