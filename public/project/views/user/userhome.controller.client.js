(function() {
    angular
        .module("FotoTag")
        .controller("HomePageController", HomePageController);

    function HomePageController($location, $routeParams, UserService) {
        var vm = this;
        //vm.updateUser = updateUser;
        //vm.unRegister = unRegister;

        var uid = $routeParams["uid"];
        vm.followUser = followUser;
        function init() {
            UserService
                .findUserById(uid)
                .then(function(res) {
                    vm.user = res.data
                })
        }
        init();

    function followUser(){
        UserService
            .updateFollowing(uid)
            .then(function (res) {
                //if (res == 200){
                // UserService
                //     .findFollowers(){
                //      .then(function(res){
                //             vm.user = res.data    
                //     }, function)
                //     } 
                // }
                //vm.users = 
                //}
            }, function(error){
                console.log("unsuccesful");
            })
        }
    }
})();