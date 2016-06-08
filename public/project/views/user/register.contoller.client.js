

(function() {
    angular
        .module("FotoTag")
        .controller("RegisterController", RegisterController);


    function RegisterController($location, UserService) {

        var vm = this;
        vm.register = register;

        function register(username, password, verifypassword, imageurl) {
            if (username && password && verifypassword) {

                if (password === verifypassword) {

                    UserService
                        .createUser(username, password, imageurl)
                        .then(
                            function (res) {
                                var user = res.data;
                                $location.url("/project/user" + user._id);
                                console.log(user)
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
