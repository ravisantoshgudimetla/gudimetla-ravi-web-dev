(function() {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;

        var uid = $routeParams["uid"];

        function init() {
            vm.user = angular.copy(UserService.findUserById(uid));
        }
        init();

        function updateUser() {
            var result = UserService.updateUser(vm.user._id, vm.user);
            if(result === true) {
                vm.success = "User successfully updated";
            }
            else {
                vm.error = "User not successfully updated";
            }
        }
    }

})();