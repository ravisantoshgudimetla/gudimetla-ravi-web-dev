(function() {
    angular
        .module("FotoTag")
        .controller("HomePageController", HomePageController);

    function HomePageController($rootScope, $routeParams, UserService, RelationService) {
        var vm = this;
        //vm.updateUser = updateUser;
        //vm.unRegister = unRegister;

        var uid = $routeParams["uid"];
        vm.followUser = followUser;
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

        function followUser() {
           // console.log(uid);
            RelationService
                .updateFollowing(vm.user._id)
                .then(function (res) {
                    //if (res == 200){
                    // UserService
                    //     .findFollowers(){
                    //      .then(function(res){
                    //             vm.user = res.data
                    //     }, function)
                    //     }
                    // }
                    //vm.userIds = res.data
                    if (res.status==200) {
                        vm.success = "User is followed now"
                    }
                    else{
                        //console.log('hi');
                        vm.error = "Either you are trying to follow yourself or relationship already exists";
                    }
                },function(error) {
                    vm.error = "Either you are trying to follow yourself or relationship already exists";

                    // RelationService
                    //     .getFollowers(uid)
                    //     .then(function(response){
                    //         vm.userIds = response.data
                    //     },
                    //     function(error){
                    //         console.log("successful");
                    //     })
                    //
                //     UserService
                //         .getFollowers(uid)
                //         .then(function (response) {
                //             vm.followusers = response.data
                //         }, function (error) {
                //             console.log("unsuccesful");
                //         });
                // }, function (error) {
                //     console.log("error");
                 })
        }
    }
})();