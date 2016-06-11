(function() {
    angular
        .module("FotoTag")
        .controller("HomePageController", HomePageController);

    function HomePageController($location, $routeParams, UserService) {
        var vm = this;
        //vm.updateUser = updateUser;
        //vm.unRegister = unRegister;

        var uid = $routeParams["uid"];

        function init() {
            UserService
                .findUserById(uid)
                .then(function(res) {
                    vm.user = res.data
                })
        }
        init();
    }
})();