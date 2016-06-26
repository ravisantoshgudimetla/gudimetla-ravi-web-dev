(function() {
    angular
        .module("FotoTag")
        .controller("LoginController", LoginController);


    function LoginController($location, UserService) {
        var vm = this;

        vm.login = login;
        function login(username, password) {
            vm.submitted = true;
            if (username != null) {
                UserService
                    .login(username, password)
                    .then(
                        function (response) {
                            var user = response.data;
                            if (user.role == "admin") {
                                id = user._id;
                                $location.url("/project/admin/user/" + id)
                            }
                            else if (user) {
                                var id = user._id;
                                $location.url("/project/home/user/" + id);
                            }

                        },
                        function (error) {
                            vm.error = "User not found";
                        }
                    );
            }
            else {
                vm.error = "Please enter a username";
            }
        }
    }
})();