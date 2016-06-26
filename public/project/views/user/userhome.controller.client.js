(function() {
    angular
        .module("FotoTag")
        .controller("HomePageController", HomePageController);

    function HomePageController($rootScope, $routeParams, UserService, RelationService) {
        var vm = this;
        //vm.updateUser = updateUser;
        //vm.unRegister = unRegister;
        vm.followUser = followUser;
        var uid = $routeParams["uid"];

        function init() {
            if (!uid && $rootScope.currentUser) {
                vm.user = $rootScope.currentUser;
            }
            else {
                UserService
                    .findUserById(uid)
                    .then(function (res) {
                        vm.user = res.data;
                        //console.log(vm.user);
                         getFollowerCount(vm.user._id);
                         getFollowingCount(vm.user._id);
                    })
            }

        }

        init();

        function followUser() {
           // console.log(uid);
            RelationService
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
                    //vm.userIds = res.data
                    // console.log(res)
                    // if (res.statusCode==200) {
                    //     vm.success = "User is followed now";
                    // }
                    // else{
                    //     //console.log('hi');
                    //     vm.error = "Either you are trying to follow yourself or relationship already exists";
                    // }
                    console.log(res.data);
                    vm.success = "User is followed now";
                },function(error) {
                    vm.error = "Either you are trying to follow yourself or relationship already exists";

                 })
        }
        function getFollowingCount(id){
            RelationService
                .getFollowing(id)
                    .then(
                    function (response) {
                        //console.log('hi')
                        vm.userIds = response.data;
                        vm.FollowingCount = vm.userIds.length;
                        console.log(vm.FollowingCount)
                    }, function(error){
                            vm.error = "Error getting followers for this user"
                        })
        }
        function getFollowerCount(id){
            RelationService
                .getFollowers(id)
                .then(
                    function (response) {
                        //console.log('hi')
                        userIds = response.data;
                        vm.FollowerCount = userIds.length;
                    }, function(error){
                        vm.error = "Error getting followers for this user"
                    })
        }
    }
})();