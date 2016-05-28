

(function() {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);


    function RegisterController($location, UserService) {

        var vm = this;
        vm.register = register;

        function register(username, password, verifypassword) {
            if (username && password && verifypassword) {
                if (UserService.findUserByUsername(username) !== null) {
                    vm.error = "Username taken"
                }
                else if (password === verifypassword) {
                    var id = (new Date).getTime();
                    var newUser = {
                        _id: id,
                        username: username,
                        password: password,
                        firstName: '',
                        lastName: '',
                        email: ''
                    };

                    UserService.createUser(newUser);
                    $location.url("/user/" + id);
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
