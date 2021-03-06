(function() {
    angular
        .module("FotoTag")
        .controller("AdminController", AdminController);

    function AdminController($location, $routeParams, UserService) {
        var vm = this;
        //vm.updateUser = updateUser;
        //vm.unRegister = unRegister;

         vm.uid = $routeParams["uid"];

        function init() {
            UserService
                .listUsers()
                .then(
                    function (response) {
                        vm.users = response.data;
                        //vm.currentuid = uid
                        //$location.url("/project/api/user/");
                        //vm.test = "hello"
                    },
                    function (error) {
                        vm.error = "User not found";
                    }
                )
        }

        init();
    }
})();