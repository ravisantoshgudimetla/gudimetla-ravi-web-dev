

(function() {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);


    function RegisterController($location, UserService) {

        var vm = this;
        vm.register = register;

        function register(username, password, verifypassword) {
            if (username && password && verifypassword) {

                if (password === verifypassword) {

                    UserService
                        .createUser(username, password)
                        .then(
                            function (res) {
                                var user = res.data;
                                $location.url("/user/" + user._id);
                            },
                            function (error) {
                                vm.error = error.data;
                            }
                        );
                }
                else {
                    vm.error = "Passwords do not match";
                }
            }
            else {
                vm.error = "Please enter a username and password"
            }
        }
    }
})();
