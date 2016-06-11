(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.submitted = false;

        vm.login = login;
        function login(username, password) {
            vm.submitted = true;

            UserService
                .findUserByCredentials(username, password)
                .then(
                    function(response) {
                        var user = response.data;

                        if(user) {
                            var id = user._id;
                            $location.url("/user/" + id);
                            vm.submitted = false;
                        }
                    },
                    function(error) {
                        vm.error = error.data;
                    });
        }
    }

})();